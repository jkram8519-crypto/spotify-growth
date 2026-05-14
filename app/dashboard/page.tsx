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
const [contenuType, setContenuType] = useState('instagram');
const [contenu, setContenu] = useState('');
const [loadingContenu, setLoadingContenu] = useState(false);
const [note, setNote] = useState(0);
const [commentaire, setCommentaire] = useState('');
const [feedbackEnvoye, setFeedbackEnvoye] = useState(false);
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
    try {
      const response = await fetch('/api/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track, genre }),
      });
      const data = await response.json();
      if (data.pitch) {
        setPitch(data.pitch);
        await supabase.from('tracks').insert({
          user_id: user?.id,
          name: track,
          pitch: data.pitch,
        });
        chargerHistorique(user?.id);
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
    setLoading(false);
  };
const generateContenu = async () => {
    if (!track) return;
    setLoadingContenu(true);
    const templates: any = {
      instagram: `🎵 Nouvelle musique disponible !\n\n"${track}" est enfin là 🔥\n\nUn son ${genre || 'unique'} qui va vous transporter dans un autre univers. Écoutez maintenant sur Spotify !\n\n#NouvelleMusique #${track?.replace(/\s/g,'')} #Spotify #MusiqueIndependante #Artiste`,
      tiktok: `POV: Tu découvres "${track}" pour la première fois 🎵✨\n\nCe son ${genre || 'incroyable'} va te rester en tête toute la journée 🔁\n\n#${track?.replace(/\s/g,'')} #NouvelleMusique #Spotify #FYP #MusiqueFR`,
      twitter: `🚀 "${track}" est maintenant disponible sur Spotify !\n\nMon nouveau ${genre || 'track'} est enfin là. Écoutez et partagez ! 🎵\n\n#NouvelleMusique #Spotify`,
      email: `Objet : Mon nouveau titre "${track}" est disponible !\n\nBonjour,\n\nJ'ai le plaisir de vous annoncer la sortie de mon nouveau titre "${track}".\n\nCe ${genre || 'titre'} est maintenant disponible sur toutes les plateformes de streaming.\n\nMerci pour votre soutien !\n\nCordialement`,
    };
    setContenu(templates[contenuType]);
    setLoadingContenu(false);
  };
  const envoyerFeedback = async () => {
    if (note === 0) return;
    await supabase.from('feedbacks').insert({
      user_id: user?.id,
      note,
      commentaire,
      page: 'dashboard',
    });
    setFeedbackEnvoye(true);
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
       <div className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
            <h2 className="text-2xl font-bold mb-6">📱 Générateur de Contenu Réseaux Sociaux</h2>
            <div className="flex gap-3 mb-6 flex-wrap">
              {['instagram','tiktok','twitter','email'].map(type => (
                <button key={type} onClick={() => setContenuType(type)}
                  className={`px-4 py-2 rounded-xl font-bold ${contenuType === type ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                  {type === 'instagram' ? '📸 Instagram' : type === 'tiktok' ? '🎵 TikTok' : type === 'twitter' ? '🐦 Twitter' : '📧 Email'}
                </button>
              ))}
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold w-full mb-4"
              onClick={generateContenu} disabled={loadingContenu || !track}>
              {loadingContenu ? '⏳ Génération...' : '📱 Générer le contenu'}
            </button>
            {contenu && (
              <div className="bg-zinc-800 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-purple-400 font-bold">✅ Contenu généré :</p>
                  <button onClick={() => navigator.clipboard.writeText(contenu)}
                    className="text-xs bg-zinc-700 px-3 py-1 rounded-lg text-zinc-300">📋 Copier</button>
                </div>
                <pre className="text-white whitespace-pre-wrap text-sm leading-relaxed">{contenu}</pre>
              </div>
            )}
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
            <h2 className="text-2xl font-bold mb-6">📱 Générateur de Contenu Réseaux Sociaux</h2>
            <div className="flex gap-3 mb-6 flex-wrap">
              {['instagram','tiktok','twitter','email'].map(type => (
                <button key={type} onClick={() => setContenuType(type)}
                  className={`px-4 py-2 rounded-xl font-bold ${contenuType === type ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                  {type === 'instagram' ? '📸 Instagram' : type === 'tiktok' ? '🎵 TikTok' : type === 'twitter' ? '🐦 Twitter' : '📧 Email'}
                </button>
              ))}
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold w-full mb-4"
              onClick={generateContenu} disabled={loadingContenu || !track}>
              {loadingContenu ? '⏳ Génération...' : '📱 Générer le contenu'}
            </button>
            {contenu && (
              <div className="bg-zinc-800 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-purple-400 font-bold">✅ Contenu généré :</p>
                  <button onClick={() => navigator.clipboard.writeText(contenu)}
                    className="text-xs bg-zinc-700 px-3 py-1 rounded-lg text-zinc-300">📋 Copier</button>
                </div>
                <pre className="text-white whitespace-pre-wrap text-sm leading-relaxed">{contenu}</pre>
              </div>
            )}
          </div>
        </div>
        <div className="bg-zinc-900 p-8 rounded-3xl mt-8">
          <h2 className="text-2xl font-bold mb-6">💬 Donner un feedback</h2>
          {feedbackEnvoye ? (
            <p className="text-green-400 font-bold text-center text-xl">✅ Merci pour ton feedback !</p>
          ) : (
            <>
              <p className="text-zinc-400 mb-4">Note ton expérience :</p>
              <div className="flex gap-3 mb-6">
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setNote(n)}
                    className={`text-3xl transition-all ${note >= n ? 'scale-110' : 'opacity-40'}`}>
                    ⭐
                  </button>
                ))}
              </div>
              <textarea
                className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500 mb-4 h-24"
                placeholder="Ton commentaire (optionnel)..."
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
              />
              <button
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold w-full"
                onClick={envoyerFeedback}
                disabled={note === 0}
              >
                Envoyer le feedback
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
