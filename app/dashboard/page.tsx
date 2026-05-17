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
  <nav className="flex items-center justify-between p-4 border-b border-zinc-800 bg-black sticky top-0 z-50">
  <div className="flex items-center gap-3">
    <img src="/spotify-growth-icon.png" alt="Logo" style={{width:'36px',height:'36px',borderRadius:'10px'}}/>
    <div>
      <h1 className="text-lg font-bold text-white">Spotify Growth</h1>
      <p className="text-zinc-500 text-xs">Dashboard Artiste</p>
    </div>
  </div>
  <div className="flex items-center gap-4">
    <div className="hidden md:flex gap-2">
      <span className="bg-purple-900 text-purple-300 px-3 py-1 rounded-full text-xs font-bold">Plan Free</span>
      <a href="/pricing" className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-purple-500">Upgrade Pro</a>
    </div>
    <p className="text-zinc-400 text-sm hidden md:block">{user?.email}</p>
    <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login'; }} className="text-zinc-500 hover:text-red-400 text-xs transition-all">Déconnexion</button>
  </div>
</nav>  

      <div className="max-w-6xl mx-auto p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-2">🚀 Pitch Generator</h2>
            <p className="text-green-300 text-sm">Crée des pitches avec l'IA</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-3xl cursor-pointer hover:scale-105 transition-all"
  onClick={() => document.getElementById('playlist-finder')?.scrollIntoView({behavior:'smooth'})}>
  <h2 className="text-xl font-bold mb-2">🎯 Playlist Finder</h2>
  <p className="text-purple-300 text-sm">Trouve des playlists pour ton son</p>
  <p className="text-purple-400 text-xs mt-2">↓ Cliquer pour accéder</p>
</div>
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
        {/* MANAGER IA - CALENDRIER DE SORTIE */}
<div className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
  <h2 className="text-2xl font-bold mb-2">🗓️ Manager IA — Calendrier de Sortie</h2>
  <p className="text-zinc-400 mb-6">Entre ta date de sortie et l'IA génère tout ton planning automatiquement</p>
  
  <div className="flex gap-4 mb-6 flex-wrap">
    <input
      type="text"
      className="bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500 flex-1"
      placeholder="Nom du track (ex: Pulse)"
      id="track-name-cal"
    />
    <input
      type="date"
      className="bg-zinc-800 p-3 rounded-xl text-white flex-1"
      id="release-date"
    />
    <button
      className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold"
      onClick={() => {
        const trackName = (document.getElementById('track-name-cal') as HTMLInputElement).value;
        const releaseDate = (document.getElementById('release-date') as HTMLInputElement).value;
        if (!trackName || !releaseDate) return;
        
        const release = new Date(releaseDate);
        const format = (d: Date) => d.toLocaleDateString('fr-FR', {day:'numeric',month:'long'});
        const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate()+n); return r; };
        
        const calendar = [
          {day: -30, emoji: '🎭', action: `Teaser mystère sur Instagram pour "${trackName}"`},
          {day: -21, emoji: '📢', action: `Annonce officielle du titre "${trackName}"`},
          {day: -14, emoji: '🎯', action: `Envoyer le pitch aux curateurs Spotify`},
          {day: -10, emoji: '🎵', action: `Premier extrait TikTok (15 secondes)`},
          {day: -7,  emoji: '📮', action: `Soumission Spotify Editorial Playlist`},
          {day: -5,  emoji: '🎬', action: `Deuxième TikTok (making of)`},
          {day: -3,  emoji: '⏰', action: `Story countdown Instagram`},
          {day: -2,  emoji: '💾', action: `Lancer les pré-saves`},
          {day: -1,  emoji: '🔥', action: `Teaser final 30 secondes`},
          {day:  0,  emoji: '🚀', action: `SORTIE DE "${trackName}" — Poster sur tous les réseaux !`},
          {day:  1,  emoji: '📱', action: `TikTok/Reels reaction à la sortie`},
          {day:  3,  emoji: '💰', action: `Lancer les ads Facebook/Instagram`},
          {day:  7,  emoji: '📊', action: `Bilan des streams et ajuster la stratégie`},
          {day: 14,  emoji: '🔄', action: `Relance avec nouveau contenu`},
        ];
        
        const container = document.getElementById('calendar-result');
        if (!container) return;
        container.innerHTML = `
          <p class="text-purple-400 font-bold mb-4">✅ Calendrier généré pour "${trackName}" — Sortie le ${format(release)}</p>
          ${calendar.map(item => {
            const date = addDays(release, item.day);
            const isToday = item.day === 0;
            return `<div class="flex items-start gap-3 mb-3 p-3 rounded-xl ${isToday ? 'bg-purple-900 border border-purple-500' : 'bg-zinc-800'}">
              <span class="text-2xl">${item.emoji}</span>
              <div>
                <p class="text-zinc-400 text-xs">${item.day === 0 ? '🎯 JOUR J' : item.day > 0 ? `J+${item.day}` : `J${item.day}`} — ${format(date)}</p>
                <p class="text-white text-sm font-medium">${item.action}</p>
              </div>
            </div>`;
          }).join('')}
        `;
        container.style.display = 'block';
      }}
    >
      🗓️ Générer le planning
    </button>
  </div>
  
  <div id="calendar-result" style={{display:'none'}} className="mt-4"></div>
</div>
      {/* ANALYTICS IA */}
<div className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
  <h2 className="text-2xl font-bold mb-2">📊 Analytics IA</h2>
  <p className="text-zinc-400 mb-6">Entre tes stats Spotify et l'IA te donne des recommandations actionnables</p>

  <div className="grid md:grid-cols-2 gap-4 mb-6">
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Taux de save (%)</label>
      <input id="save-rate" type="number" placeholder="ex: 15" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Skip rate (%)</label>
      <input id="skip-rate" type="number" placeholder="ex: 45" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Replay rate (%)</label>
      <input id="replay-rate" type="number" placeholder="ex: 25" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Durée d'écoute moyenne (secondes)</label>
      <input id="listen-time" type="number" placeholder="ex: 45" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Pays principal</label>
      <input id="main-country" type="text" placeholder="ex: France" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Durée totale du track (secondes)</label>
      <input id="track-duration" type="number" placeholder="ex: 180" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
  </div>

  <button
    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold w-full mb-6"
    onClick={() => {
      const saveRate = parseInt((document.getElementById('save-rate') as HTMLInputElement).value) || 0;
      const skipRate = parseInt((document.getElementById('skip-rate') as HTMLInputElement).value) || 0;
      const replayRate = parseInt((document.getElementById('replay-rate') as HTMLInputElement).value) || 0;
      const listenTime = parseInt((document.getElementById('listen-time') as HTMLInputElement).value) || 0;
      const mainCountry = (document.getElementById('main-country') as HTMLInputElement).value || 'France';
      const trackDuration = parseInt((document.getElementById('track-duration') as HTMLInputElement).value) || 180;

      const recommendations = [];

      if (saveRate < 10) {
        recommendations.push({type:'🔴', title:'Taux de save trop bas', desc:`Seulement ${saveRate}% de saves. Les auditeurs n'accrochent pas. Rends ton hook plus mémorable dans les 30 premières secondes.`, action:'Raccourcis ton intro et place ton meilleur moment avant 30 secondes.'});
      } else if (saveRate >= 20) {
        recommendations.push({type:'🟢', title:'Excellent taux de save !', desc:`${saveRate}% de saves — tu as un vrai fan base. Capitalise sur cette audience.`, action:'Lance une campagne de pré-save pour ton prochain track.'});
      } else {
        recommendations.push({type:'🟡', title:'Taux de save correct', desc:`${saveRate}% de saves — c'est dans la moyenne. Tu peux faire mieux !`, action:'Ajoute un call-to-action dans tes posts : "Sauvegarde ce track !"'});
      }

      if (skipRate > 50) {
        recommendations.push({type:'🔴', title:'Skip rate élevé', desc:`${skipRate}% des auditeurs skippent ton track. Quelque chose les fait décrocher.`, action:'Analyse où ils quittent et raccourcis cette partie. L\'intro est souvent trop longue.'});
      } else if (skipRate < 20) {
        recommendations.push({type:'🟢', title:'Excellent engagement !', desc:`Seulement ${skipRate}% de skips. Les gens écoutent jusqu\'au bout !`, action:'Ce track est parfait pour les playlists algorithmiques Spotify.'});
      }

      if (replayRate > 30) {
        recommendations.push({type:'🟢', title:'Moment viral détecté !', desc:`${replayRate}% de replay rate — il y a un moment que les gens réécoutent.`, action:'Identifie ce moment exact et utilise-le comme extrait TikTok. C\'est ton hook viral !'});
      }

      if (listenTime < trackDuration * 0.3) {
        recommendations.push({type:'🔴', title:'Écoute trop courte', desc:`Les auditeurs écoutent seulement ${listenTime}s sur ${trackDuration}s. Ils partent trop tôt.`, action:`Ton drop ou refrain arrive trop tard. Place-le avant ${Math.round(trackDuration * 0.2)}s.`});
      } else if (listenTime > trackDuration * 0.7) {
        recommendations.push({type:'🟢', title:'Excellente rétention !', desc:`Les auditeurs écoutent ${listenTime}s — plus de 70% du track !`, action:'Parfait pour les playlists algorithmiques. Soumet ce track à Spotify Editorial.'});
      }

      if (mainCountry.toLowerCase() !== 'france') {
        recommendations.push({type:'🟡', title:`Audience principale : ${mainCountry}`, desc:`Ton audience principale n\'est pas en France mais en ${mainCountry}.`, action:`Cible les playlists de ${mainCountry} et lance des ads géolocalisées dans ce pays.`});
      }

      const container = document.getElementById('analytics-result');
      if (!container) return;
      container.innerHTML = `
        <p class="text-blue-400 font-bold mb-4">✅ Analyse IA complète — ${recommendations.length} recommandations</p>
        ${recommendations.map(r => `
          <div class="bg-zinc-800 p-4 rounded-xl mb-3 border-l-4 ${r.type==='🔴'?'border-red-500':r.type==='🟢'?'border-green-500':'border-yellow-500'}">
            <p class="font-bold mb-1">${r.type} ${r.title}</p>
            <p class="text-zinc-400 text-sm mb-2">${r.desc}</p>
            <p class="text-blue-400 text-sm font-medium">✅ Action : ${r.action}</p>
          </div>
        `).join('')}
      `;
      container.style.display = 'block';
    }}
  >
    🔍 Analyser mes performances
  </button>

  <div id="analytics-result" style={{display:'none'}}></div>
</div>
{/* PLAYLIST FINDER */}
<div id="playlist-finder" className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
  <h2 className="text-2xl font-bold mb-2">🎯 Playlist Finder</h2>
  <p className="text-zinc-400 mb-6">Trouve les playlists parfaites pour ton genre musical</p>

  <div className="flex gap-4 mb-6 flex-wrap">
    <input
      id="playlist-genre"
      type="text"
      placeholder="Genre (ex: Electronic, Hip-Hop, Pop...)"
      className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"
    />
    <input
      id="playlist-mood"
      type="text"
      placeholder="Ambiance (ex: Chill, Energetic, Dark...)"
      className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"
    />
    <button
      className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold w-full"
      onClick={() => {
        const genre = (document.getElementById('playlist-genre') as HTMLInputElement).value || 'Electronic';
        const mood = (document.getElementById('playlist-mood') as HTMLInputElement).value || 'Chill';
        
        const playlists = [
          {name:`${genre} Hits 2026`, followers:'125K', curator:'SpotifyEditor', match:'98%', type:'Editorial'},
          {name:`Best of ${genre}`, followers:'89K', curator:'MusicLover', match:'95%', type:'Indépendante'},
          {name:`${mood} ${genre} Vibes`, followers:'67K', curator:'PlaylistPro', match:'92%', type:'Indépendante'},
          {name:`${genre} Underground`, followers:'45K', curator:'Underground_FR', match:'88%', type:'Indépendante'},
          {name:`New ${genre} Music`, followers:'234K', curator:'NewMusicFinder', match:'85%', type:'Editorial'},
          {name:`${mood} Sessions`, followers:'178K', curator:'ChillVibes', match:'82%', type:'Indépendante'},
          {name:`${genre} France`, followers:'56K', curator:'FrenchMusic', match:'79%', type:'Indépendante'},
          {name:`Top ${genre} Tracks`, followers:'312K', curator:'TopTracks', match:'76%', type:'Editorial'},
        ];

        const container = document.getElementById('playlist-result');
        if (!container) return;
        container.innerHTML = `
          <p class="text-purple-400 font-bold mb-4">✅ ${playlists.length} playlists trouvées pour ${genre} / ${mood}</p>
          ${playlists.map(p => `
            <div class="bg-zinc-800 p-4 rounded-xl mb-3 flex justify-between items-center">
              <div>
                <p class="font-bold text-white">${p.name}</p>
                <p class="text-zinc-400 text-sm">👤 ${p.curator} • 👥 ${p.followers} followers</p>
                <span class="text-xs px-2 py-1 rounded-full ${p.type==='Editorial' ? 'bg-green-900 text-green-400' : 'bg-zinc-700 text-zinc-300'}">${p.type}</span>
              </div>
              <div class="text-right">
                <p class="text-green-400 font-bold text-lg">${p.match}</p>
                <p class="text-zinc-500 text-xs">Match</p>
              </div>
            </div>
          `).join('')}
          <p class="text-zinc-500 text-xs mt-4">💡 Conseil : Contacte d'abord les curateurs indépendants — ils sont plus réceptifs aux nouveaux artistes.</p>
        `;
        container.style.display = 'block';
      }}
    >
      🔍 Trouver des playlists
    </button>
  </div>

  <div id="playlist-result" style={{display:'none'}}></div>
</div>
    </main>
  );
}
