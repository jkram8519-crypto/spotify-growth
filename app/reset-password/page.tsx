'use client';
import { useState } from 'react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          to: email,
          subject: 'Réinitialisation de ton mot de passe Spotlift',
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0020;color:#fff;padding:40px;border-radius:20px;">
              <h1 style="color:#9B59B6;text-align:center;">Spotlift</h1>
              <h2 style="text-align:center;">Réinitialisation de mot de passe</h2>
              <p style="color:#ccc;text-align:center;">Tu as demandé à réinitialiser ton mot de passe.</p>
              <p style="color:#ccc;text-align:center;">Contacte-nous à <a href="mailto:contact.spotlift@gmail.com" style="color:#9B59B6;">contact.spotlift@gmail.com</a> avec ton email et on te recontacte dans les 24h.</p>
              <p style="color:#555;font-size:12px;text-align:center;margin-top:30px;">© 2026 Spotlift</p>
            </div>
          `
        })
      });
      setSent(true);
    } catch(e) {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <main style={{minHeight:'100vh',background:'#000',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{background:'#0d0020',padding:'40px',borderRadius:'20px',width:'100%',maxWidth:'400px',border:'1px solid #2d1040',margin:'20px'}}>
        <div style={{textAlign:'center',marginBottom:'30px'}}>
          <img src="/spotlift-icon.svg" alt="Logo" style={{width:'50px',height:'50px',borderRadius:'12px',marginBottom:'15px'}}/>
          <h1 style={{fontSize:'24px',fontWeight:'bold',margin:0}}>Mot de passe oublié</h1>
          <p style={{color:'#aaa',marginTop:'8px',fontSize:'14px'}}>Entre ton email pour recevoir de l'aide</p>
        </div>
        {sent ? (
          <div style={{textAlign:'center',padding:'20px',background:'#1a0030',borderRadius:'12px'}}>
            <p style={{fontSize:'30px',margin:'0 0 10px 0'}}>📧</p>
            <p style={{color:'#1DB954',fontWeight:'bold',marginBottom:'8px'}}>Demande envoyée !</p>
            <p style={{color:'#aaa',fontSize:'14px',margin:0}}>Vérifie ta boîte email. On te recontacte dans les 24h.</p>
          </div>
        ) : (
          <>
            <input type="email" placeholder="ton@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>
            {error && <p style={{color:'#e74c3c',fontSize:'13px',marginBottom:'10px'}}>{error}</p>}
            <button onClick={handleReset} disabled={loading || !email}
              style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none',marginBottom:'15px'}}>
              {loading ? 'Envoi...' : 'Envoyer la demande'}
            </button>
          </>
        )}
        <p style={{textAlign:'center',marginTop:'20px'}}>
          <a href="/login" style={{color:'#9B59B6',fontSize:'14px',textDecoration:'none'}}>← Retour à la connexion</a>
        </p>
      </div>
    </main>
  );
}
