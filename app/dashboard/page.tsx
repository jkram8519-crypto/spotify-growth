'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);const [activeSection, setActiveSection] = useState('pitch');
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
    <main className="min-h-screen bg-black text-white"><div style={{display:'flex',minHeight:'100vh'}}>
  {/* SIDEBAR */}
  <div style={{width:'220px',background:'#0d0020',borderRight:'1px solid #2d1040',padding:'20px 0',position:'fixed',height:'100vh',overflowY:'auto',zIndex:50}}>
    <div style={{padding:'0 15px',marginBottom:'30px'}}>
      <img src="/spotlift-icon.svg" alt="Logo" style={{width:'35px',height:'35px',borderRadius:'8px'}}/>
      <p style={{color:'#9B59B6',fontWeight:'bold',fontSize:'14px',margin:'8px 0 0 0'}}>Spotlift</p>
    </div>
    {[
      {id:'pitch', emoji:'🚀', label:'Pitch Generator'},
      {id:'manager', emoji:'🗓️', label:'Manager IA'},
      {id:'playlists', emoji:'🎯', label:'Playlist Finder'},
      {id:'analytics', emoji:'📊', label:'Analytics IA'},
      {id:'growth', emoji:'🎯', label:'Growth Score'},
      {id:'viral', emoji:'🔥', label:'Viral Potentiel'},
      {id:'profil', emoji:'🎨', label:'Profil Artiste'},
      {id:'contenu', emoji:'📱', label:'Contenu Social'},
      {id:'ia', emoji:'🤖', label:'IA Assistant'},
      {id:'multi', emoji:'📊', label:'Multi-Plateformes'},
      {id:'feedback', emoji:'💬', label:'Feedback'},
    ].map((item) => (
      <button key={item.id}
        onClick={() => setActiveSection(item.id)}
        style={{
          width:'100%',
          padding:'12px 15px',
          background: activeSection === item.id ? '#1a0030' : 'transparent',
          border:'none',
          borderLeft: activeSection === item.id ? '3px solid #9B59B6' : '3px solid transparent',
          color: activeSection === item.id ? '#fff' : '#aaa',
          textAlign:'left',
          cursor:'pointer',
          fontSize:'13px',
          display:'flex',
          alignItems:'center',
          gap:'10px',
          transition:'all 0.2s',
        }}>
        <span>{item.emoji}</span>
        <span>{item.label}</span>
      </button>
    ))}
    <div style={{padding:'15px',marginTop:'20px',borderTop:'1px solid #2d1040'}}>
      <a href="/profil" style={{color:'#aaa',fontSize:'12px',textDecoration:'none',display:'block',marginBottom:'8px'}}>👤 Mon profil</a>
      <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login'; }}
        style={{color:'#555',background:'none',border:'none',cursor:'pointer',fontSize:'12px',padding:0}}>
        Déconnexion
      </button>
    </div>
  </div>

  {/* CONTENU PRINCIPAL */}
  <div style={{marginLeft:'220px',flex:1,padding:'20px'}}>
  <nav className="flex items-center justify-between p-4 border-b border-zinc-800 bg-black sticky top-0 z-50">
  <div className="flex items-center gap-3">
    <img src="/spotlift-icon.svg" alt="Logo" style={{width:'36px',height:'36px',borderRadius:'10px'}}/>
    <div>
      <h1 className="text-lg font-bold text-white">Spotlift</h1>
      <p className="text-zinc-500 text-xs">Dashboard Artiste</p><a href="/profil" style={{color:'#9B59B6',fontSize:'12px',textDecoration:'none'}}>👤 Mon profil</a>
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
  {/* GROWTH SCORE */}
<div className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
  <h2 className="text-2xl font-bold mb-2">🎯 Growth Score</h2>
  <p className="text-zinc-400 mb-6">Ton score de croissance Spotify sur 100</p>
  <div className="grid md:grid-cols-2 gap-6 mb-6">
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Streams ce mois</label>
      <input id="gs-streams" type="number" placeholder="ex: 5000" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Followers Spotify</label>
      <input id="gs-followers" type="number" placeholder="ex: 500" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Nombre de playlists</label>
      <input id="gs-playlists" type="number" placeholder="ex: 3" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Taux de save (%)</label>
      <input id="gs-save" type="number" placeholder="ex: 15" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Sorties ce mois</label>
      <input id="gs-releases" type="number" placeholder="ex: 1" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Presence reseaux (1-10)</label>
      <input id="gs-social" type="number" placeholder="ex: 7" min="1" max="10" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
  </div>
  <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold w-full mb-6"
    onClick={() => {
      const streams = parseInt((document.getElementById('gs-streams') as HTMLInputElement).value) || 0;
      const followers = parseInt((document.getElementById('gs-followers') as HTMLInputElement).value) || 0;
      const playlists = parseInt((document.getElementById('gs-playlists') as HTMLInputElement).value) || 0;
      const save = parseInt((document.getElementById('gs-save') as HTMLInputElement).value) || 0;
      const releases = parseInt((document.getElementById('gs-releases') as HTMLInputElement).value) || 0;
      const social = parseInt((document.getElementById('gs-social') as HTMLInputElement).value) || 0;
      let score = 0;
      if (streams > 10000) score += 20; else if (streams > 5000) score += 15; else if (streams > 1000) score += 10; else score += 5;
      if (followers > 1000) score += 20; else if (followers > 500) score += 15; else if (followers > 100) score += 10; else score += 5;
      if (playlists > 10) score += 20; else if (playlists > 5) score += 15; else if (playlists > 0) score += 10;
      if (save > 20) score += 20; else if (save > 10) score += 15; else if (save > 5) score += 10; else score += 5;
      if (releases >= 2) score += 10; else if (releases === 1) score += 7;
      score += Math.min(social, 10);
      const scoreColor = score >= 70 ? 'color:#1DB954' : score >= 40 ? 'color:#f39c12' : 'color:#e74c3c';
      const scoreLabel = score >= 70 ? 'Excellent 🚀' : score >= 40 ? 'En progression 📈' : 'A ameliorer ⚠️';
      const scoreTip = score >= 70 ? 'Continue comme ca, tu es sur la bonne voie!' : 'Soumets ton track aux curateurs et ameliore ta presence sur les reseaux.';
      const container = document.getElementById('growth-score-result');
      if (!container) return;
      container.innerHTML = '<div style="text-align:center;margin-bottom:20px"><div style="font-size:96px;font-weight:bold;' + scoreColor + '">' + score + '</div><div style="color:#aaa">/100</div><div style="font-size:24px;margin-top:8px">' + scoreLabel + '</div></div><div style="background:#27272a;padding:15px;border-radius:12px"><p style="color:#aaa;font-size:14px">Conseil : ' + scoreTip + '</p></div>';
      container.style.display = 'block';
    }}>
    🎯 Calculer mon Growth Score
  </button>
  <div id="growth-score-result" style={{display:'none'}}></div>
  {/* DETECTION VIRAL POTENTIEL */}
<div className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
  <h2 className="text-2xl font-bold mb-2">🔥 Détection Viral Potentiel</h2>
  <p className="text-zinc-400 mb-6">Analyse ton track et détecte son potentiel viral sur TikTok et Spotify</p>
  <div className="grid md:grid-cols-2 gap-6 mb-6">
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Durée de l'intro (secondes)</label>
      <input id="vp-intro" type="number" placeholder="ex: 15" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Durée avant le drop/refrain (secondes)</label>
      <input id="vp-drop" type="number" placeholder="ex: 30" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Tempo (BPM)</label>
      <input id="vp-bpm" type="number" placeholder="ex: 128" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Genre musical</label>
      <select id="vp-genre" className="w-full bg-zinc-800 p-3 rounded-xl text-white">
        <option value="pop">Pop</option>
        <option value="hiphop">Hip-Hop / Rap</option>
        <option value="electronic">Electronic / Dance</option>
        <option value="rnb">R&B / Soul</option>
        <option value="latin">Latin</option>
        <option value="rock">Rock</option>
        <option value="other">Autre</option>
      </select>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Le track a un hook mémorable ?</label>
      <select id="vp-hook" className="w-full bg-zinc-800 p-3 rounded-xl text-white">
        <option value="yes">Oui — très accrocheur</option>
        <option value="maybe">Peut-être</option>
        <option value="no">Non — pas vraiment</option>
      </select>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Le track a une partie dansable ?</label>
      <select id="vp-dance" className="w-full bg-zinc-800 p-3 rounded-xl text-white">
        <option value="yes">Oui</option>
        <option value="no">Non</option>
      </select>
    </div>
  </div>
  <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold w-full mb-6"
    onClick={() => {
      const intro = parseInt((document.getElementById('vp-intro') as HTMLInputElement).value) || 0;
      const drop = parseInt((document.getElementById('vp-drop') as HTMLInputElement).value) || 0;
      const bpm = parseInt((document.getElementById('vp-bpm') as HTMLInputElement).value) || 0;
      const genre = (document.getElementById('vp-genre') as HTMLSelectElement).value;
      const hook = (document.getElementById('vp-hook') as HTMLSelectElement).value;
      const dance = (document.getElementById('vp-dance') as HTMLSelectElement).value;
      let score = 0;
      const signals = [];
      if (intro <= 10) { score += 25; signals.push({emoji:'🟢', text:'Intro courte — parfait pour TikTok et Spotify'}); }
      else if (intro <= 20) { score += 15; signals.push({emoji:'🟡', text:'Intro correcte — essaie de la raccourcir a 10 secondes'}); }
      else { score += 0; signals.push({emoji:'🔴', text:'Intro trop longue — les auditeurs vont skipper avant le drop'}); }
      if (drop <= 20) { score += 25; signals.push({emoji:'🟢', text:'Drop tres rapide — viral potentiel eleve sur TikTok'}); }
      else if (drop <= 35) { score += 15; signals.push({emoji:'🟡', text:'Drop correct — essaie de le placer avant 20 secondes'}); }
      else { score += 5; signals.push({emoji:'🔴', text:'Drop trop tardif — 70% des auditeurs TikTok partent avant 30s'}); }
      if (bpm >= 120 && bpm <= 140) { score += 20; signals.push({emoji:'🟢', text:'BPM ideal pour les playlists Dance et TikTok'}); }
      else if (bpm >= 90 && bpm <= 120) { score += 15; signals.push({emoji:'🟡', text:'BPM correct pour le streaming Spotify'}); }
      else { score += 10; signals.push({emoji:'🟡', text:'BPM atypique — peut fonctionner dans une niche specifique'}); }
      if (hook === 'yes') { score += 20; signals.push({emoji:'🟢', text:'Hook memorables — cle du succes viral'}); }
      else if (hook === 'maybe') { score += 10; signals.push({emoji:'🟡', text:'Hook a ameliorer — travaille sur la melodie principale'}); }
      else { score += 0; signals.push({emoji:'🔴', text:'Pas de hook — difficile de percer sans element memorables'}); }
      if (dance === 'yes') { score += 10; signals.push({emoji:'🟢', text:'Partie dansable — parfait pour les challenges TikTok'}); }
      else { score += 5; signals.push({emoji:'🟡', text:'Pas de partie dansable — mise sur lemotion pour les Reels'}); }
      const genreBonus: Record<string, string> = {pop:'Pop tres populaire sur Spotify', hiphop:'Hip-Hop tres performant sur TikTok', electronic:'Electronic ideal pour les playlists Dance', rnb:'R&B tres applaudi sur les Reels', latin:'Latin en pleine explosion mondiale', rock:'Rock niche mais audience fidelissime', other:'Genre unique — trouve ta niche specifique'};
      signals.push({emoji:'🎵', text:genreBonus[genre]});
      const viral = score >= 75 ? 'VIRAL POTENTIEL ELEVE' : score >= 50 ? 'BON POTENTIEL' : 'POTENTIEL LIMITE';
      const viralColor = score >= 75 ? '#1DB954' : score >= 50 ? '#f39c12' : '#e74c3c';
      const container = document.getElementById('viral-result');
      if (!container) return;
      container.innerHTML = '<div style="text-align:center;margin-bottom:20px"><div style="font-size:72px;font-weight:bold;color:' + viralColor + '">' + score + '%</div><div style="font-size:22px;color:' + viralColor + ';font-weight:bold;margin-top:8px">' + viral + '</div></div>' + signals.map(s => '<div style="background:#27272a;padding:12px;border-radius:10px;margin-bottom:8px;display:flex;gap:10px;align-items:center"><span style="font-size:20px">' + s.emoji + '</span><span style="color:#ccc;font-size:14px">' + s.text + '</span></div>').join('');
      container.style.display = 'block';
    }}>
    🔥 Analyser le potentiel viral
  </button>
  <div id="viral-result" style={{display:'none'}}></div>
  {/* OPTIMISATION PROFIL ARTISTE */}
<div className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
  <h2 className="text-2xl font-bold mb-2">🎨 Optimisation Profil Artiste</h2>
  <p className="text-zinc-400 mb-6">Analyse ton profil Spotify et obtiens des recommandations pour l'optimiser</p>
  <div className="grid md:grid-cols-2 gap-6 mb-6">
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Nom d'artiste</label>
      <input id="op-name" type="text" placeholder="ex: DJ Marco" className="w-full bg-zinc-800 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Tu as une photo de profil professionnelle ?</label>
      <select id="op-photo" className="w-full bg-zinc-800 p-3 rounded-xl text-white">
        <option value="yes">Oui — photo pro</option>
        <option value="ok">Oui — mais pas terrible</option>
        <option value="no">Non</option>
      </select>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Tu as une bio Spotify ?</label>
      <select id="op-bio" className="w-full bg-zinc-800 p-3 rounded-xl text-white">
        <option value="yes">Oui — bio complète</option>
        <option value="short">Oui — mais trop courte</option>
        <option value="no">Non</option>
      </select>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Tu as des liens réseaux sociaux sur Spotify ?</label>
      <select id="op-links" className="w-full bg-zinc-800 p-3 rounded-xl text-white">
        <option value="all">Oui — tous les liens</option>
        <option value="some">Quelques uns</option>
        <option value="no">Non</option>
      </select>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Tu as une Artist Pick (mise en avant) ?</label>
      <select id="op-pick" className="w-full bg-zinc-800 p-3 rounded-xl text-white">
        <option value="yes">Oui</option>
        <option value="no">Non</option>
      </select>
    </div>
    <div>
      <label className="text-zinc-400 text-sm mb-1 block">Ton profil est-il revendiqué sur Spotify for Artists ?</label>
      <select id="op-claimed" className="w-full bg-zinc-800 p-3 rounded-xl text-white">
        <option value="yes">Oui</option>
        <option value="no">Non</option>
      </select>
    </div>
  </div>
  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold w-full mb-6"
    onClick={() => {
      const name = (document.getElementById('op-name') as HTMLInputElement).value || 'Artiste';
      const photo = (document.getElementById('op-photo') as HTMLSelectElement).value;
      const bio = (document.getElementById('op-bio') as HTMLSelectElement).value;
      const links = (document.getElementById('op-links') as HTMLSelectElement).value;
      const pick = (document.getElementById('op-pick') as HTMLSelectElement).value;
      const claimed = (document.getElementById('op-claimed') as HTMLSelectElement).value;
      let score = 0;
      const recs = [];
      if (photo === 'yes') { score += 25; recs.push({emoji:'🟢', text:'Super photo de profil — premiere impression parfaite'}); }
      else if (photo === 'ok') { score += 15; recs.push({emoji:'🟡', text:'Photo acceptable — investis dans une vraie seance photo pro'}); }
      else { score += 0; recs.push({emoji:'🔴', text:'URGENT : Ajoute une photo pro — cest la premiere chose que voient les curateurs'}); }
      if (bio === 'yes') { score += 25; recs.push({emoji:'🟢', text:'Bio complete — les curateurs peuvent te decouvrir facilement'}); }
      else if (bio === 'short') { score += 15; recs.push({emoji:'🟡', text:'Bio trop courte — ajoute ton style, tes influences et tes accomplissements'}); }
      else { score += 0; recs.push({emoji:'🔴', text:'URGENT : Ecris une bio — les playlists editoriales la lisent avant de te placer'}); }
      if (links === 'all') { score += 20; recs.push({emoji:'🟢', text:'Tous les liens reseaux — parfait pour convertir les auditeurs en fans'}); }
      else if (links === 'some') { score += 10; recs.push({emoji:'🟡', text:'Ajoute tous tes liens reseaux sociaux sur Spotify for Artists'}); }
      else { score += 0; recs.push({emoji:'🔴', text:'Ajoute tes liens Instagram, TikTok et YouTube sur ton profil Spotify'}); }
      if (pick === 'yes') { score += 15; recs.push({emoji:'🟢', text:'Artist Pick active — tu mets en avant ton meilleur contenu'}); }
      else { score += 0; recs.push({emoji:'🔴', text:'Active lArtist Pick — mets ton dernier track ou ta meilleure playlist en avant'}); }
      if (claimed === 'yes') { score += 15; recs.push({emoji:'🟢', text:'Profil revendique — tu as acces a toutes les fonctionnalites Spotify for Artists'}); }
      else { score += 0; recs.push({emoji:'🔴', text:'URGENT : Revendique ton profil sur artists.spotify.com maintenant'}); }
      const label = score >= 75 ? 'Profil Optimise' : score >= 50 ? 'Profil Correct' : 'Profil a Ameliorer';
      const color = score >= 75 ? '#1DB954' : score >= 50 ? '#f39c12' : '#e74c3c';
      const container = document.getElementById('profile-result');
      if (!container) return;
      container.innerHTML = '<div style="text-align:center;margin-bottom:20px"><div style="font-size:72px;font-weight:bold;color:' + color + '">' + score + '/100</div><div style="font-size:22px;color:' + color + ';font-weight:bold;margin-top:8px">' + label + ' — ' + name + '</div></div>' + recs.map(r => '<div style="background:#27272a;padding:12px;border-radius:10px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start"><span style="font-size:20px">' + r.emoji + '</span><span style="color:#ccc;font-size:14px">' + r.text + '</span></div>').join('');
      container.style.display = 'block';
    }}>
    🎨 Analyser mon profil artiste
  </button>
  <div id="profile-result" style={{display:'none'}}></div>
</div>
</div>{/* IA ASSISTANT MUSIC MARKETING */}
<div className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
  <h2 className="text-2xl font-bold mb-2">🤖 IA Assistant Music Marketing</h2>
  <p className="text-zinc-400 mb-6">Pose n'importe quelle question sur ta carrière musicale — l'IA te répond comme un vrai manager</p>
  <div className="mb-4">
    <div className="flex gap-2 flex-wrap mb-4">
      {[
        'Comment pitcher sur Spotify ?',
        'Comment choisir ma date de sortie ?',
        'Comment faire une campagne TikTok ?',
        'Comment trouver des playlists ?',
        'Comment augmenter mes streams ?',
      ].map((q, i) => (
        <button key={i}
          className="bg-zinc-800 text-zinc-300 px-3 py-2 rounded-xl text-sm hover:bg-purple-900 transition-all"
          onClick={() => {
            const input = document.getElementById('ai-question') as HTMLTextAreaElement;
            if (input) input.value = q;
          }}>
          {q}
        </button>
      ))}
    </div>
    <textarea
      id="ai-question"
      placeholder="Ex: Comment je peux obtenir plus de placements en playlist ? Mon genre est l'electronic et j'ai 500 streams..."
      className="w-full bg-zinc-800 p-4 rounded-xl text-white placeholder-zinc-500 resize-none"
      rows={4}
    />
  </div>
  <button
    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold w-full mb-6"
    onClick={async () => {
      const question = (document.getElementById('ai-question') as HTMLTextAreaElement).value;
      if (!question) return;
      const container = document.getElementById('ai-response');
      if (!container) return;
      container.innerHTML = '<p style="color:#9B59B6">🤖 L\'IA analyse ta question...</p>';
      container.style.display = 'block';
      try {
        const response = await fetch('/api/assistant', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({question})
        });
        const data = await response.json();
        container.innerHTML = '<div style="background:#1a0030;padding:20px;border-radius:12px;border:1px solid #9B59B6"><p style="color:#9B59B6;font-weight:bold;margin-bottom:10px">🤖 Spotlift IA Manager</p><p style="color:#ccc;line-height:1.8;white-space:pre-wrap">' + data.response + '</p></div>';
      } catch(e) {
        container.innerHTML = '<p style="color:#e74c3c">Erreur — verifie ta connexion</p>';
      }
    }}>
    🤖 Demander à l'IA Manager
  </button>
  <div id="ai-response" style={{display:'none'}}></div>{/* DASHBOARD MULTI-PLATEFORMES */}
<div className="bg-zinc-900 p-8 rounded-3xl mt-8 col-span-2">
  <h2 className="text-2xl font-bold mb-2">📊 Dashboard Multi-Plateformes</h2>
  <p className="text-zinc-400 mb-6">Entre tes stats de toutes tes plateformes et visualise ta croissance globale</p>
  <div className="grid md:grid-cols-2 gap-6 mb-6">
    <div className="bg-zinc-800 p-6 rounded-2xl border border-green-800">
      <p className="text-green-400 font-bold mb-4">🎵 Spotify</p>
      <input id="mp-sp-streams" type="number" placeholder="Streams ce mois" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"/>
      <input id="mp-sp-followers" type="number" placeholder="Followers" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"/>
      <input id="mp-sp-saves" type="number" placeholder="Saves ce mois" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div className="bg-zinc-800 p-6 rounded-2xl border border-pink-800">
      <p className="text-pink-400 font-bold mb-4">📱 TikTok</p>
      <input id="mp-tt-views" type="number" placeholder="Vues ce mois" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"/>
      <input id="mp-tt-followers" type="number" placeholder="Followers" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"/>
      <input id="mp-tt-likes" type="number" placeholder="Likes ce mois" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div className="bg-zinc-800 p-6 rounded-2xl border border-purple-800">
      <p className="text-purple-400 font-bold mb-4">📸 Instagram</p>
      <input id="mp-ig-reach" type="number" placeholder="Reach ce mois" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"/>
      <input id="mp-ig-followers" type="number" placeholder="Followers" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"/>
      <input id="mp-ig-engagement" type="number" placeholder="Taux engagement (%)" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
    <div className="bg-zinc-800 p-6 rounded-2xl border border-red-800">
      <p className="text-red-400 font-bold mb-4">🎬 YouTube</p>
      <input id="mp-yt-views" type="number" placeholder="Vues ce mois" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"/>
      <input id="mp-yt-subscribers" type="number" placeholder="Abonnés" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500 mb-3"/>
      <input id="mp-yt-watchtime" type="number" placeholder="Watch time (heures)" className="w-full bg-zinc-700 p-3 rounded-xl text-white placeholder-zinc-500"/>
    </div>
  </div>
  <button className="bg-gradient-to-r from-green-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold w-full mb-6"
    onClick={() => {
      const spStreams = parseInt((document.getElementById('mp-sp-streams') as HTMLInputElement).value) || 0;
      const spFollowers = parseInt((document.getElementById('mp-sp-followers') as HTMLInputElement).value) || 0;
      const spSaves = parseInt((document.getElementById('mp-sp-saves') as HTMLInputElement).value) || 0;
      const ttViews = parseInt((document.getElementById('mp-tt-views') as HTMLInputElement).value) || 0;
      const ttFollowers = parseInt((document.getElementById('mp-tt-followers') as HTMLInputElement).value) || 0;
      const ttLikes = parseInt((document.getElementById('mp-tt-likes') as HTMLInputElement).value) || 0;
      const igReach = parseInt((document.getElementById('mp-ig-reach') as HTMLInputElement).value) || 0;
      const igFollowers = parseInt((document.getElementById('mp-ig-followers') as HTMLInputElement).value) || 0;
      const igEngagement = parseInt((document.getElementById('mp-ig-engagement') as HTMLInputElement).value) || 0;
      const ytViews = parseInt((document.getElementById('mp-yt-views') as HTMLInputElement).value) || 0;
      const ytSubscribers = parseInt((document.getElementById('mp-yt-subscribers') as HTMLInputElement).value) || 0;
      const totalFollowers = spFollowers + ttFollowers + igFollowers + ytSubscribers;
      const totalViews = spStreams + ttViews + igReach + ytViews;
      const platforms = [
        {name:'Spotify', color:'#1DB954', followers:spFollowers, activity:spStreams, metric:'streams', saves:spSaves},
        {name:'TikTok', color:'#ff0050', followers:ttFollowers, activity:ttViews, metric:'vues', likes:ttLikes},
        {name:'Instagram', color:'#E1306C', followers:igFollowers, activity:igReach, metric:'reach', engagement:igEngagement},
        {name:'YouTube', color:'#FF0000', followers:ytSubscribers, activity:ytViews, metric:'vues', watchtime:0},
      ];
      const best = platforms.reduce((a, b) => a.activity > b.activity ? a : b);
      const container = document.getElementById('multiplatform-result');
      if (!container) return;
      container.innerHTML = '<div style="margin-bottom:20px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:20px">' +
        '<div style="background:#1a0030;padding:20px;border-radius:12px;text-align:center"><div style="font-size:36px;font-weight:bold;color:#9B59B6">' + totalFollowers.toLocaleString() + '</div><div style="color:#aaa;font-size:14px">Total Followers</div></div>' +
        '<div style="background:#1a0030;padding:20px;border-radius:12px;text-align:center"><div style="font-size:36px;font-weight:bold;color:#1DB954">' + totalViews.toLocaleString() + '</div><div style="color:#aaa;font-size:14px">Total Vues/Streams</div></div>' +
        '</div>' +
        '<div style="background:#1a0030;padding:15px;border-radius:12px;margin-bottom:15px"><p style="color:#f39c12;font-weight:bold;margin-bottom:5px">🏆 Plateforme la plus performante</p><p style="color:#ccc">' + best.name + ' avec ' + best.activity.toLocaleString() + ' ' + best.metric + ' ce mois</p></div>' +
        platforms.map(p => '<div style="background:#27272a;padding:15px;border-radius:12px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center"><div><span style="font-weight:bold;color:' + p.color + '">' + p.name + '</span><br/><span style="color:#aaa;font-size:13px">' + p.followers.toLocaleString() + ' followers</span></div><div style="text-align:right"><span style="color:#fff;font-weight:bold">' + p.activity.toLocaleString() + '</span><br/><span style="color:#aaa;font-size:13px">' + p.metric + '</span></div></div>').join('') +
        '<div style="background:#1a0030;padding:15px;border-radius:12px;margin-top:10px"><p style="color:#9B59B6;font-weight:bold;margin-bottom:8px">💡 Conseil IA</p><p style="color:#ccc;font-size:14px">' + (best.name === 'TikTok' ? 'TikTok est ta plateforme principale — utilise-la pour rediriger vers Spotify avec un lien en bio.' : best.name === 'Spotify' ? 'Spotify performe bien — soumets plus de tracks aux curateurs pour accelerer.' : best.name === 'Instagram' ? 'Instagram est fort — convertis ton audience en auditeurs Spotify avec des extraits musicaux.' : 'YouTube performe — cree des clips et behind the scenes pour booster tes autres plateformes.') + '</p></div></div>';
      container.style.display = 'block';
    }}>
    📊 Analyser mes plateformes
  </button>
  <div id="multiplatform-result" style={{display:'none'}}></div>
</div>
</div>
</div>  </main>
  );
}
</div>
  </div>