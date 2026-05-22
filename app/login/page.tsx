'use client';
import { useState } from 'react';
import { supabase } from '../../supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState('');

  const handleConnexion = async () => {
    setChargement(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: motDePasse,
    });

    if (error) {
      setMessage('Erreur : ' + error.message);
    } else {
      setMessage('Connecté avec succès !');
    }
    setChargement(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Connexion</h1>

        <input
          className="w-full bg-zinc-800 p-3 rounded-xl mb-4 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-zinc-800 p-3 rounded-xl mb-6 text-white"
          placeholder="Mot de passe"
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
        />

        <button
          className="w-full bg-green-500 p-3 rounded-xl font-bold text-black"
          onClick={handleConnexion}
          disabled={chargement}
        ><button
  style={{width:'100%',background:'#fff',color:'#333',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'1px solid #ddd',marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}
  onClick={async () => {
    const { supabase } = await import('../../supabase');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://getspotlift.vercel.app/dashboard'
      }
    });
  }}>
  <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="Google"/>
  Se connecter avec Google
</button>

<div style={{textAlign:'center',marginBottom:'15px',color:'#555',fontSize:'14px'}}>— ou —</div>
          {chargement ? 'Chargement...' : 'Se connecter'}
        </button>

        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
        <p style={{textAlign:'center', marginTop:'20px', color:'#aaa'}}>
  Pas de compte ?{' '}
  <a href="/inscription" style={{color:'#9B59B6', fontWeight:'bold'}}>
    S'inscrire
  </a>
</p>
      </div>
    </main>
  );
}