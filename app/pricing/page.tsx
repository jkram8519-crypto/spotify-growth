'use client';
import { useState } from 'react';

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif',minHeight:'100vh',padding:'60px 20px'}}>
      <h1 style={{textAlign:'center',fontSize:'42px',fontWeight:'bold',marginBottom:'10px'}}>Tarifs simples</h1>
      <p style={{textAlign:'center',color:'#aaa',marginBottom:'30px',fontSize:'16px'}}>Commence gratuitement, evolue quand tu es pret</p>
      <div style={{display:'flex',justifyContent:'center',marginBottom:'40px'}}>
        <div style={{display:'inline-flex',background:'#1a0030',borderRadius:'30px',padding:'4px',border:'1px solid #2d1040'}}>
          <button onClick={() => setAnnual(false)} style={{background: !annual ? '#9B59B6' : 'transparent',color: !annual ? 'white' : '#aaa',border:'none',padding:'10px 24px',borderRadius:'25px',fontWeight:'bold',cursor:'pointer',fontSize:'14px'}}>
            Mensuel
          </button>
          <button onClick={() => setAnnual(true)} style={{background: annual ? '#9B59B6' : 'transparent',color: annual ? 'white' : '#aaa',border:'none',padding:'10px 24px',borderRadius:'25px',fontWeight:'bold',cursor:'pointer',fontSize:'14px'}}>
            Annuel <span style={{background:'#1DB954',color:'white',borderRadius:'10px',padding:'2px 8px',fontSize:'11px',marginLeft:'6px'}}>-20%</span>
          </button>
        </div>
      </div>
      {annual && <p style={{textAlign:'center',color:'#1DB954',marginBottom:'30px',fontSize:'14px',fontWeight:'bold'}}>🎉 Tu economises jusqu'a 48 EUR/an avec le plan annuel !</p>}
      <div style={{display:'flex',flexDirection:'column',gap:'20px',maxWidth:'450px',margin:'0 auto'}}>
        <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040'}}>
          <h2 style={{fontSize:'24px',marginBottom:'8px'}}>Free</h2>
          <p style={{fontSize:'48px',fontWeight:'bold',marginBottom:'5px'}}>0 EUR</p>
          <p style={{color:'#aaa',marginBottom:'25px',fontSize:'14px'}}>Pour decouvrir Spotlift</p>
          <div style={{marginBottom:'25px'}}>
            {['Pitch Generator IA','Bio Generator','Release Checklist'].map((f,i) => (
              <p key={i} style={{color:'#ccc',marginBottom:'8px',fontSize:'14px'}}>✅ {f}</p>
            ))}
          </div>
          <a href="/login" style={{display:'block',border:'1px solid #555',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontSize:'15px'}}>Commencer gratuitement</a>
        </div>
        <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'35px',borderRadius:'24px'}}>
          <p style={{background:'rgba(255,255,255,0.2)',borderRadius:'15px',padding:'4px 12px',display:'inline-block',marginBottom:'10px',fontSize:'12px',fontWeight:'bold'}}>POPULAIRE</p>
          <h2 style={{fontSize:'24px',marginBottom:'8px'}}>Pro</h2>
          <p style={{fontSize:'48px',fontWeight:'bold',marginBottom:'2px'}}>{annual ? '7.99' : '9.99'} EUR<span style={{fontSize:'16px'}}>/mois</span></p>
          {annual && <p style={{fontSize:'13px',marginBottom:'5px',opacity:0.8}}>soit 95.88 EUR/an</p>}
          <div style={{marginBottom:'25px',marginTop:'15px'}}>
            {['Tout le plan Free','Playlist Finder','Manager IA 44 jours','Growth Score','Generateur de contenu','IA Assistant Marketing'].map((f,i) => (
              <p key={i} style={{marginBottom:'8px',fontSize:'14px'}}>✅ {f}</p>
            ))}
          </div>
          <button onClick={async () => {
            const res = await fetch('/api/checkout', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:'pro',billing:annual?'annual':'monthly'})});
            const data = await res.json();
            if(data.url) window.location.href = data.url;
          }} style={{display:'block',background:'#fff',color:'#6C3483',padding:'14px',borderRadius:'12px',textAlign:'center',fontWeight:'bold',fontSize:'15px',border:'none',cursor:'pointer',width:'100%'}}>
            <a href="/pro" style={{display:'block',textAlign:'center',color:'#9B59B6',fontSize:'13px',marginBottom:'10px',textDecoration:'none'}}>📋 Voir ce qui est inclus →</a>
            {annual ? 'Commencer Pro Annuel' : 'Commencer Pro'}
          </button>
        </div>
        <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'2px solid #9B59B6'}}>
          {annual && <div style={{background:'#1DB954',borderRadius:'15px',padding:'4px 12px',display:'inline-block',marginBottom:'10px',fontSize:'12px',fontWeight:'bold',color:'white'}}>ECONOMISEZ 48 EUR/AN</div>}
          <h2 style={{fontSize:'24px',marginBottom:'8px'}}>Pro+</h2>
          <p style={{fontSize:'48px',fontWeight:'bold',marginBottom:'2px'}}>{annual ? '15.99' : '19.99'} EUR<span style={{fontSize:'16px'}}>/mois</span></p>
          {annual && <p style={{fontSize:'13px',color:'#aaa',marginBottom:'5px'}}>soit 191.88 EUR/an</p>}
          <div style={{marginBottom:'25px',marginTop:'15px'}}>
            {['Tout le plan Pro','Analytics IA avancee','Detection Viral Potentiel','Optimisation Profil Artiste','Dashboard Multi-Plateformes','Support prioritaire'].map((f,i) => (
              <p key={i} style={{color:'#ccc',marginBottom:'8px',fontSize:'14px'}}>✅ {f}</p>
            ))}
          </div>
          <button onClick={async () => {
            const res = await fetch('/api/checkout', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:'pro_plus',billing:annual?'annual':'monthly'})});
            const data = await res.json();
            if(data.url) window.location.href = data.url;
          }} style={{display:'block',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'12px',textAlign:'center',fontWeight:'bold',fontSize:'15px',border:'none',cursor:'pointer',width:'100%'}}>
            <a href="/pro-plus" style={{display:'block',textAlign:'center',color:'#2980b9',fontSize:'13px',marginBottom:'10px',textDecoration:'none'}}>📋 Voir ce qui est inclus →</a>
            {annual ? 'Commencer Pro+ Annuel' : 'Commencer Pro+'}
          </button>
        </div>
      </div>
      <div style={{textAlign:'center',marginTop:'40px',padding:'20px',background:'#0d0020',borderRadius:'15px',maxWidth:'450px',margin:'40px auto 0'}}>
        <p style={{color:'#1DB954',fontWeight:'bold',marginBottom:'5px'}}>✅ Annulation a tout moment</p>
        <p style={{color:'#aaa',fontSize:'13px',margin:0}}>Aucun engagement. Annule quand tu veux depuis ton dashboard.</p>
      </div>
      <div style={{maxWidth:'450px',margin:'30px auto 0',textAlign:'center'}}>
        <a href="/faq" style={{color:'#9B59B6',fontSize:'14px'}}>Des questions ? Consulte notre FAQ</a>
      </div>
    </main>
  );
}
