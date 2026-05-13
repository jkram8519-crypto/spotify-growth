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
        >
          {chargement ? 'Chargement...' : 'Se connecter'}
        </button>

        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
      </div>
    </main>
  );
}