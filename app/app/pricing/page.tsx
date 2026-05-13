'use client';
import { useState } from 'react';

export default function Home() {
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
    <main style={{minHeight:'100vh',background:'black',color:'white',padding:'40px'}}>
      <h1 style={{textAlign:'center',fontSize:'48px'}}>Pricing</h1>
      <div style={{display:'flex',gap:'20px',justifyContent:'center',marginTop:'40px'}}>
        <div style={{background:'#18181b',padding:'40px',borderRadius:'24px',width:'250px'}}>
          <h2>Free - 0 euro</h2>
          <button style={{width:'100%',padding:'12px',marginTop:'20px',color:'white',background:'transparent',border:'1px solid #555',borderRadius:'8px'}}>Plan actuel</button>
        </div>
        <div style={{background:'white',color:'black',padding:'40px',borderRadius:'24px',width:'250px'}}>
          <h2>Pro - 9.99 euro/mois</h2>
          <button onClick={() => handleCheckout('pro')} disabled={loading} style={{width:'100%',padding:'12px',marginTop:'20px',cursor:'pointer',borderRadius:'8px'}}>{loading ? 'Chargement...' : 'Commencer Pro'}</button>
        </div>
        <div style={{background:'#18181b',padding:'40px',borderRadius:'24px',width:'250px'}}>
          <h2>Pro+ - 19.99 euro/mois</h2>
          <button onClick={() => handleCheckout('pro_plus')} disabled={loading} style={{width:'100%',padding:'12px',marginTop:'20px',cursor:'pointer',background:'#22c55e',borderRadius:'8px'}}>{loading ? 'Chargement...' : 'Commencer Pro+'}</button>
        </div>
      </div>
    </main>
  );
}