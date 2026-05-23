'use client';
import { useState } from 'react';
import { supabase } from '../../supabase';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return; }
    if (password.length < 6) { setError('Le mot de passe doit faire au moins 6 caractères'); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setError(error.message); }
    else { setDone(true); setTimeout(() => window.location.href = '/dashboard', 2000); }
    setLoading(false);
  };

  return (
    <main style={{minHeight:'100vh',background:'#000',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{background:'#0d0020',padding:'40px',borderRadius:'20px',width:'100%',maxWidth:'400px',border:'1px solid #2d1040',margin:'20px'}}>
        <div style={{textAlign:'center',marginBottom:'30px'}}>
          <img src="/spotlift-icon.svg" alt="Logo" style={{width:'50px',height:'50px',borderRadius:'12px',marginBottom:'15px'}}/>
          <h1 style={{fontSize:'24px',fontWeight:'bold',margin:0}}>Nouveau mot de passe</h1>
        </div>
        {done ? (
          <div style={{textAlign:'center',padding:'20px',background:'#1a0030',borderRadius:'12px'}}>
            <p style={{fontSize:'30px',margin:'0 0 10px 0'}}>✅</p>
            <p style={{color:'#1DB954',fontWeight:'bold'}}>Mot de passe mis à jour !</p>
            <p style={{color:'#aaa',fontSize:'14px'}}>Redirection vers le dashboard...</p>
          </div>
        ) : (
          <>
            <input type="password" placeholder="Nouveau mot de passe" value={password}
              onChange={e => setPassword(e.target.value)}
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>
            <input type="password" placeholder="Confirmer le mot de passe" value={confirm}
              onChange={e => setConfirm(e.target.value)}
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>
            {error && <p style={{color:'#e74c3c',fontSize:'13px',marginBottom:'10px'}}>{error}</p>}
            <button onClick={handleUpdate} disabled={loading || !password || !confirm}
              style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
              {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
