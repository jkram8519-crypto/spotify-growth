import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature invalide: ${err.message}` }, { status: 400 });
  }
  try {
    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
      const email = customer.email;
      const source = subscription.metadata?.source || 'direct';
      if (email) {
        const { data: userData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
        const user = userData.users.find(u => u.email === email);
        if (user) {
          const isTrialing = subscription.status === 'trialing';
          const isActive = subscription.status === 'active';
          const trialEnd = subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null;
          const planName = subscription.items.data[0]?.price?.unit_amount === 1999 ? 'Pro+' : 'Pro';
          await supabase.from('subscriptions').upsert({
            user_id: user.id,
            plan: planName,
            status: isTrialing ? 'trial' : isActive ? 'active' : subscription.status,
            stripe_id: subscription.id,
            trial_end: trialEnd,
            source: source,
          }, { onConflict: 'user_id' });
        }
      }
    }
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
      const email = customer.email;
      if (email) {
        const { data: userData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
        const user = userData.users.find(u => u.email === email);
        if (user) {
          await supabase.from('subscriptions').upsert({
            user_id: user.id,
            plan: 'Free',
            status: 'canceled',
          }, { onConflict: 'user_id' });
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}