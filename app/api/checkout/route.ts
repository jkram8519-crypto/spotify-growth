import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    const amount = plan === 'pro' ? 999 : 1999;
    const name = plan === 'pro' ? 'Spotify Growth Pro' : 'Spotify Growth Pro+';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price_data: { currency: 'eur', product_data: { name }, unit_amount: amount, recurring: { interval: 'month' } }, quantity: 1 }],
      success_url: 'http://localhost:3000/dashboard',
      cancel_url: 'http://localhost:3000',
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}