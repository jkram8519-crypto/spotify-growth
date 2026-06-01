import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email || session.customer_details?.email;
    
    if (email) {
      const { data: user } = await supabase
        .from("auth.users")
        .select("id")
        .eq("email", email)
        .single();

      const priceId = session.line_items?.data?.[0]?.price?.id;
      let plan = "Pro";
      if (priceId === "price_1TZe1TEJZOJWQzK8rI39hcAv") plan = "Pro+";
      if (priceId === "price_1TZdyqEJZOJWQzK8MHbox9HP") plan = "Pro";

      const { data: authUser } = await supabase.auth.admin.getUserByEmail(email);
      
      if (authUser?.user?.id) {
        await supabase.from("subscriptions").upsert({
          user_id: authUser.user.id,
          status: "active",
          stripe_id: session.subscription as string,
          plan: plan,
          created_at: new Date().toISOString(),
        }, { onConflict: "user_id" });
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase
      .from("subscriptions")
      .update({ status: "cancelled" })
      .eq("stripe_id", subscription.id);
  }

  return NextResponse.json({ received: true });
}
