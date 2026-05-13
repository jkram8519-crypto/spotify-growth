'use client';
import { useState } from 'react';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (plan: string) => {
    setLoading(true);
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-center mb-4">Pricing</h1>
      <p className="text-zinc-400 text-center mb-16">Choisis ton plan</p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4">Free</h2>
          <p className="text-5xl font-bold mb-6">€0</p>
          <ul className="space-y-3 text-zinc-400 mb-8">
            <li>✅ Pitch Generator</li>
            <li>✅ Bio Generator</li>
            <li>✅ Release Checklist</li>
          </ul>
          <button className="w-full border border-zinc-700 p-3 rounded-xl">
            Plan actuel
          </button>
        </div>

        <div className="bg-white text-black p-8 rounded-3xl scale-105">
          <h2 className="text-3xl font-bold mb-4">Pro</h2>
          <p className="text-5xl font-bold mb-6">€9.99<span className="text-lg">/mois</span></p>
          <ul className="space-y-3 mb-8">
            <li>✅ Tout le plan Free</li>
            <li>✅ Playlist Finder</li>
            <li>✅ Release Planner</li>
            <li>✅ AI avancée</li>
          </ul>
          <button
            className="w-full bg-black text-white p-3 rounded-xl font-bold"
            onClick={() => handleCheckout('pro')}
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Commencer Pro'}
          </button>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4">Pro+</h2>
          <p className="text-5xl font-bold mb-6">€19.99<span className="text-lg">/mois</span></p>
          <ul className="space-y-3 text-zinc-400 mb-8">
            <li>✅ Tout le plan Pro</li>
            <li>✅ Spotify Analytics</li>
            <li>✅ Growth AI</li>
            <li>✅ Marketing Auto</li>
          </ul>
          <button
            className="w-full bg-green-500 text-black p-3 rounded-xl font-bold"
            onClick={() => handleCheckout('pro_plus')}
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Commencer Pro+'}
          </button>
        </div>
      </div>
    </main>
  );
}