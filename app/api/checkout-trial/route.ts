import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' });
export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: 'Spotlift Pro' },
          unit_amount: 999,
          recurring: { interval: 'month' }
        },
        quantity: 1
      }],
      subscription_data: {
        trial_period_days: 3,
        metadata: { source: source || 'direct' },
      },
      success_url: 'https://getspotlift.com/dashboard',
      cancel_url: 'https://getspotlift.com/inscription',
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}