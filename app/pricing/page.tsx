'use client';
import { useState } from 'react';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const handleCheckout = async (plan: string) => {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    const { url } = await res.json();
    window.location.href = url;
    setLoading(false);
  };
  return (
    <main style={{minHeight:'100vh',background:'black',color:'white',padding:'20px'}}>
      <h1 style={{textAlign:'center',fontSize:'48px'}}>Pricing</h1>
      <div style={{display:'flex',gap:'25px',justifyContent:'center',flexWrap:'wrap',maxWidth:'1000px',margin:'0 auto',flexDirection:'column',alignItems:'center'}}>
        <div style={{background:'#18181b',padding:'20px',borderRadius:'24px',width:'min(260px, 90vw)'}}>
          <h2>Free - 0 euro</h2>
          <button style={{width:'100%',padding:'12px',marginTop:'20px',color:'white',background:'transparent',border:'1px solid #555',borderRadius:'8px'}}>Plan actuel</button>
        </div>
        <div style={{background:'white',color:'black',padding:'20px',borderRadius:'24px',width:'min(260px, 90vw)'}}>
          <h2>Pro - 9.99 euro/mois</h2>
          <button onClick={() => handleCheckout('pro')} disabled={loading} style={{width:'100%',padding:'12px',marginTop:'20px',cursor:'pointer',borderRadius:'8px'}}>{loading ? 'Chargement...' : 'Commencer Pro'}</button>
        </div>
        <div style={{background:'#18181b',padding:'20px',borderRadius:'24px',width:'min(260px, 90vw)'}}>
          <h2>Pro+ - 19.99 euro/mois</h2>
          <button onClick={() => handleCheckout('pro_plus')} disabled={loading} style={{width:'100%',padding:'12px',marginTop:'20px',cursor:'pointer',background:'#22c55e',borderRadius:'8px'}}>{loading ? 'Chargement...' : 'Commencer Pro+'}</button>
        </div>
      </div>
    </main>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' });
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