import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' });

export async function POST(req: NextRequest) {
  try {
    const { plan, billing } = await req.json();

    let priceId: string | null = null;

    if (billing === 'annual') {
      if (plan === 'pro') {
        priceId = 'price_1TZdyqEJZOJWQzK8MHbox9HP';
      } else if (plan === 'pro_plus') {
        priceId = 'price_1TZe1TEJZOJWQzK8rI39hcAv';
      }
    }

    if (priceId) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        allow_promotion_codes: true,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: 'https://getspotlift.vercel.app/dashboard',
        cancel_url: 'https://getspotlift.vercel.app/pricing',
      });
      return NextResponse.json({ url: session.url });
    }

    const amount = plan === 'pro' ? 999 : 1999;
    const name = plan === 'pro' ? 'Spotlift Pro' : 'Spotlift Pro+';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      allow_promotion_codes: true,
      line_items: [{ price_data: { currency: 'eur', product_data: { name }, unit_amount: amount, recurring: { interval: 'month' } }, quantity: 1 }],
      success_url: 'https://getspotlift.vercel.app/dashboard',
      cancel_url: 'https://getspotlift.vercel.app/pricing',
    });
    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error('Stripe error details:', JSON.stringify(err));
    return NextResponse.json({ error: err.message, details: err.raw || err }, { status: 500 });
  }
}