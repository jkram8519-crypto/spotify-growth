'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [track, setTrack] = useState('');
  const [genre, setGenre] = useState('');
  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);
  const [historique, setHistorique] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) chargerHistorique(user.id);
    });
  }, []);

  const chargerHistorique = async (userId: string) => {
    const { data } = await supabase
      .from('tracks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setHistorique(data);
  };

  const generatePitch = async () => {
  if (!track) return;
  setLoading(true);

  const response = await fetch('/api/pitch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ track, genre }),
  });

  const data = await response.json();
  setPitch(data.pitch);

  await supabase.from('tracks').insert({
    user_id: user?.id,
    name: track,
    pitch: data.pitch,
  });

  chargerHistorique(user?.id);
  setLoading(false);
};
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold">🎵 Spotify Growth</h1>
        <p className="text-zinc-400 text-sm">{user?.email}</p>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-2">🚀 Pitch Generator</h2>
            <p className="text-green-300 text-sm">Crée des pitches avec l'IA</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-2">🎯 Playlist Finder</h2>
            <p className="text-purple-300 text-sm">Trouve des playlists pour ton son</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-2">📊 Analytics</h2>
            <p className="text-blue-300 text-sm">Suis tes performances</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">✨ Générateur de Pitch IA</h2>

            <input
              className="w-full bg-zinc-800 p-3 rounded-xl mb-4 text-white placeholder-zinc-500"
              placeholder="Nom de ton track..."
              value={track}
              onChange={(e) => setTrack(e.target.value)}
            />

            <input
              className="w-full bg-zinc-800 p-3 rounded-xl mb-6 text-white placeholder-zinc-500"
              placeholder="Genre (ex: Hip-Hop, Pop, Electronic...)"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />

            <button
              className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold w-full mb-4 transition-all"
              onClick={generatePitch}
              disabled={loading}
            >
              {loading ? '⏳ Génération en cours...' : '🚀 Générer le Pitch'}
            </button>

            {pitch && (
              <div className="bg-zinc-800 p-4 rounded-xl">
                <p className="text-green-400 font-bold mb-2">✅ Pitch généré :</p>
                <p className="text-white leading-relaxed">{pitch}</p>
              </div>
            )}
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">📝 Historique</h2>
            {historique.length === 0 ? (
              <p className="text-zinc-500">Aucun pitch généré pour l'instant.</p>
            ) : (
              historique.map((item) => (
                <div key={item.id} className="bg-zinc-800 p-4 rounded-xl mb-3">
                  <p className="font-bold text-green-400">🎵 {item.name}</p>
                  <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{item.pitch}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
