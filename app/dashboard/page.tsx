'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

function isValidInput(value: string): boolean {
  if (!value || !value.trim()) return false;
  const v = value.trim();
  if (v.length < 2) return false;
  if (!/[a-zA-Z0-9]/.test(v)) return false;
  if (/^(.)\1+$/.test(v)) return false;
  return true;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('pitch');
  const [plan, setPlan] = useState('Free');

  useEffect(() => {
    const checkPlan = async () => {
      const { data } = await supabase.from('subscriptions').select('plan, status, trial_end').eq('user_id', (await supabase.auth.getUser()).data.user?.id).in('status', ['active', 'trial']).single();
      if (data?.plan) {
        if (data.status === 'trial' && data.trial_end) {
          const trialEnd = new Date(data.trial_end);
          const now = new Date();
          if (now > trialEnd) {
            setPlan('Free');
          } else {
            const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            setPlan(`Pro (Trial - ${daysLeft}j restants)`);
          }
        } else {
          setPlan(data.plan);
        }
      }
    };
    checkPlan();
  }, []);
const [showWelcome, setShowWelcome] = useState(true);
  const [showToolsModal, setShowToolsModal] = useState(false);
const [tutorialStep, setTutorialStep] = useState(0);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
      else window.location.href = '/login';
    };
    getUser();
  }, []);



  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#000',color:'#fff',fontFamily:'sans-serif'}}>

      {/* SIDEBAR */}
      <div style={{width:'220px',background:'#0d0020',borderRight:'1px solid #2d1040',padding:'20px 0',position:'fixed',height:'100vh',overflowY:'auto',zIndex:50,display:'flex',flexDirection:'column'}}>
        <div style={{padding:'0 15px 20px 15px',borderBottom:'1px solid #2d1040',marginBottom:'10px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <img src="/spotlift-icon.svg" alt="Logo" style={{width:'30px',height:'30px',borderRadius:'8px'}}/>
            <a href="/" style={{fontWeight:"bold",color:"#9B59B6",fontSize:"14px",textDecoration:"none"}}>Spotlift</a>
          </div>
          <p style={{color:'#555',fontSize:'11px',margin:'6px 0 0 0'}}>{user?.email}</p>
        </div>

        {/* SECTION OUTILS IA */}
<p style={{color:'#555',fontSize:'10px',fontWeight:'bold',padding:'0 15px',marginBottom:'5px',marginTop:'10px',textTransform:'uppercase',letterSpacing:'1px'}}>Outils IA</p>
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
].map((item) => (
  <button key={item.id} onClick={() => setActiveSection(item.id)}
    style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 15px',background: activeSection === item.id ? '#2d1040' : 'transparent',border:'none',color: activeSection === item.id ? '#fff' : '#aaa',cursor:'pointer',width:'100%',textAlign:'left',borderRadius:'8px',fontSize:'13px',borderLeft: activeSection === item.id ? '3px solid #9B59B6' : '3px solid transparent'}}>
    <span>{item.emoji}</span>{item.label}
  </button>
))}

{/* SECTION COMMUNAUTÉ */}
<p style={{color:'#555',fontSize:'10px',fontWeight:'bold',padding:'0 15px',marginBottom:'5px',marginTop:'15px',textTransform:'uppercase',letterSpacing:'1px'}}>Communauté</p>
{[
  {id:'referral', emoji:'🎁', label:'Parrainer un ami'},
  {id:'feedback', emoji:'💬', label:'Feedback'},
  {id:'search', emoji:'🔍', label:'Recherche Spotify'},
].map((item) => (
  <button key={item.id} onClick={() => setActiveSection(item.id)}
    style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 15px',background: activeSection === item.id ? '#2d1040' : 'transparent',border:'none',color: activeSection === item.id ? '#fff' : '#aaa',cursor:'pointer',width:'100%',textAlign:'left',borderRadius:'8px',fontSize:'13px',borderLeft: activeSection === item.id ? '3px solid #9B59B6' : '3px solid transparent'}}>
    <span>{item.emoji}</span>{item.label}
  </button>
))}

        <div style={{marginTop:'auto',padding:'15px',borderTop:'1px solid #2d1040'}}>
          <a href="/profil" style={{color:'#aaa',fontSize:'12px',textDecoration:'none',display:'block',marginBottom:'10px'}}>👤 Mon profil</a>
          <a href="/blog" style={{color:"#aaa",fontSize:"12px",textDecoration:"none",display:"block",marginBottom:"10px"}}>📝 Blog</a>
        <a href="https://billing.stripe.com/p/login/14A28reaL5DP8rt0NC1B600" target="_blank" style={{color:"#e74c3c",fontSize:"12px",textDecoration:"none",display:"block",marginBottom:"10px"}}>❌ Gérer abonnement</a>  
          <a href="/case-studies" style={{color:"#aaa",fontSize:"12px",textDecoration:"none",display:"block",marginBottom:"10px"}}>📊 Témoignages</a>
          <a href="/faq" style={{color:"#aaa",fontSize:"12px",textDecoration:"none",display:"block",marginBottom:"10px"}}>❓ FAQ</a>
          <a href="/charte" style={{color:"#aaa",fontSize:"12px",textDecoration:"none",display:"block",marginBottom:"10px"}}>📜 Charte Éthique</a>
          <a href="/pricing" style={{color:'#9B59B6',fontSize:'12px',textDecoration:'none',display:'block',marginBottom:'10px'}}>⭐ Upgrade Pro</a>

          <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login'; }}
            style={{color:'#555',background:'none',border:'none',cursor:'pointer',fontSize:'12px',padding:0}}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{marginLeft:'220px',flex:1,padding:'30px 40px',maxWidth:'860px'}} className="dashboard-content">
        
{showToolsModal && (
  <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.85)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}} onClick={() => setShowToolsModal(false)}>
      <div style={{background:"#0d0020",padding:"30px",borderRadius:"24px",maxWidth:"500px",width:"100%",border:"1px solid #9B59B6",maxHeight:"80vh",overflowY:"auto"}} onClick={e => e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
                    <h2 style={{margin:0,fontSize:"22px",fontWeight:"bold"}}> Les 11 outils IA</h2>
                            <button onClick={() => setShowToolsModal(false)} style={{background:"none",border:"none",color:"#aaa",cursor:"pointer",fontSize:"20px"}}></button>
                                  </div>
                                        {[
                                                {emoji:"",title:"Pitch Generator IA",desc:"Génère des pitches professionnels en 10 secondes.",section:"pitch"},
                                                        {emoji:"",title:"Manager IA",desc:"Planifie ta sortie sur 44 jours automatiquement.",section:"manager"},
                                                                {emoji:"",title:"Playlist Finder",desc:"Trouve les playlists parfaites avec score de match.",section:"playlists"},
                                                                        {emoji:"",title:"Analytics IA",desc:"Recommandations actionnables sur tes stats.",section:"analytics"},
                                                                                {emoji:"",title:"Growth Score",desc:"Calcule ton score de croissance sur 100 points.",section:"growth"},
                                                                                        {emoji:"",title:"Viral Potentiel",desc:"Détecte le potentiel viral de ton track sur TikTok.",section:"viral"},
                                                                                                {emoji:"",title:"Profil Artiste",desc:"Optimise chaque élément de ton profil Spotify.",section:"profil"},
                                                                                                        {emoji:"",title:"Contenu Social",desc:"Génère du contenu pour Instagram, TikTok, Twitter.",section:"contenu"},
                                                                                                                {emoji:"",title:"IA Assistant",desc:"Conseils pro instantanés de ton manager IA.",section:"ia"},
                                                                                                                        {emoji:"",title:"Multi-Plateformes",desc:"Centralise tes stats Spotify, TikTok, YouTube.",section:"multi"},
                                                                                                                                {emoji:"",title:"Feedback",desc:"Donne ton avis et aide à améliorer Spotlift.",section:"feedback"},
                                                                                                                                      ].map((tool, i) => (
                                                                                                                                              <div key={i} onClick={() => { setActiveSection(tool.section); setShowToolsModal(false); }}
                                                                                                                                                        style={{background:"#1a0030",padding:"15px",borderRadius:"12px",marginBottom:"10px",border:"1px solid #2d1040",cursor:"pointer",display:"flex",gap:"12px",alignItems:"flex-start"}}>
                                                                                                                                                                  <span style={{fontSize:"24px"}}>{tool.emoji}</span>
                                                                                                                                                                            <div>
                                                                                                                                                                                        <p style={{margin:"0 0 4px 0",fontWeight:"bold",fontSize:"14px"}}>{tool.title}</p>
                                                                                                                                                                                                    <p style={{margin:0,color:"#aaa",fontSize:"12px",lineHeight:"1.5"}}>{tool.desc}</p>
                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                            ))}
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                  {/* MODAL DE BIENVENUE */}
{showWelcome && (
  <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.85)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div style={{background:'#0d0020',padding:'40px',borderRadius:'24px',maxWidth:'500px',width:'90%',border:'1px solid #9B59B6',textAlign:'center'}}>
      {tutorialStep === 0 && (
        <>
          <p style={{fontSize:'50px',margin:'0 0 15px 0'}}>👋</p>
          <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'10px'}}>Bienvenue sur Spotlift !</h2>
          <p style={{color:'#aaa',marginBottom:'25px',lineHeight:'1.6'}}>L'outil IA numéro 1 pour artistes indépendants sur Spotify. Laisse-nous te guider en 3 étapes rapides !</p>
          <button onClick={() => setTutorialStep(1)}
            style={{background:'#9B59B6',color:'#fff',padding:'12px 30px',borderRadius:'25px',border:'none',cursor:'pointer',fontWeight:'bold',fontSize:'16px',marginRight:'10px'}}>
            Commencer le tour 🚀
          </button>
          <button onClick={() => setShowWelcome(false)}
            style={{background:'transparent',color:'#555',padding:'12px 20px',borderRadius:'25px',border:'none',cursor:'pointer',fontSize:'14px'}}>
            Passer
          </button>
        </>
      )}
      {tutorialStep === 1 && (
        <>
          <p style={{fontSize:'50px',margin:'0 0 15px 0'}}>🚀</p>
          <p style={{color:'#9B59B6',fontSize:'13px',marginBottom:'5px'}}>ÉTAPE 1 SUR 3</p>
          <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'10px'}}>Génère ton premier pitch</h2>
          <p style={{color:'#aaa',marginBottom:'25px',lineHeight:'1.6'}}>Clique sur <strong style={{color:'white'}}>"Pitch Generator"</strong> dans le menu à gauche, entre le nom de ton track et génère un pitch pro en 10 secondes !</p>
          <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',marginBottom:'25px',textAlign:'left'}}>
            <p style={{color:'#ccc',fontSize:'13px',margin:0}}>💡 Astuce : Plus ta description est précise, meilleur sera le pitch généré !</p>
          </div>
          <button onClick={() => setTutorialStep(2)}
            style={{background:'#9B59B6',color:'#fff',padding:'12px 30px',borderRadius:'25px',border:'none',cursor:'pointer',fontWeight:'bold',fontSize:'16px'}}>
            Suivant →
          </button>
        </>
      )}
      {tutorialStep === 2 && (
        <>
          <p style={{fontSize:'50px',margin:'0 0 15px 0'}}>🗓️</p>
          <p style={{color:'#9B59B6',fontSize:'13px',marginBottom:'5px'}}>ÉTAPE 2 SUR 3</p>
          <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'10px'}}>Planifie ta sortie</h2>
          <p style={{color:'#aaa',marginBottom:'25px',lineHeight:'1.6'}}>Utilise le <strong style={{color:'white'}}>"Manager IA"</strong> pour générer automatiquement ton calendrier de sortie sur 44 jours. De J-30 jusqu'à J+14 !</p>
          <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',marginBottom:'25px',textAlign:'left'}}>
            <p style={{color:'#ccc',fontSize:'13px',margin:0}}>💡 Astuce : Entre ta date de sortie et laisse l'IA planifier tout pour toi !</p>
          </div>
          <button onClick={() => setTutorialStep(3)}
            style={{background:'#9B59B6',color:'#fff',padding:'12px 30px',borderRadius:'25px',border:'none',cursor:'pointer',fontWeight:'bold',fontSize:'16px'}}>
            Suivant →
          </button>
        </>
      )}
      {tutorialStep === 3 && (
        <>
          <p style={{fontSize:'50px',margin:'0 0 15px 0'}}>🎯</p>
          <p style={{color:'#9B59B6',fontSize:'13px',marginBottom:'5px'}}>ÉTAPE 3 SUR 3</p>
          <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'10px'}}>Trouve tes playlists</h2>
          <p style={{color:'#aaa',marginBottom:'25px',lineHeight:'1.6'}}>Le <strong style={{color:'white'}}>"Playlist Finder"</strong> analyse ton genre musical et trouve les playlists parfaites avec un score de compatibilité !</p>
          <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',marginBottom:'25px',textAlign:'left'}}>
            <p style={{color:'#ccc',fontSize:'13px',margin:0}}>💡 Astuce : Plus ton score de match est élevé, plus tu as de chances d'être placé !</p>
          </div>
          <button onClick={() => setShowWelcome(false)}
            style={{background:'linear-gradient(135deg,#9B59B6,#1DB954)',color:'#fff',padding:'12px 30px',borderRadius:'25px',border:'none',cursor:'pointer',fontWeight:'bold',fontSize:'16px'}}>
            C'est parti ! 🚀
          </button>
        </>
      )}
    </div>
  </div>
)}
{/* BOTTOM NAV MOBILE */}
<div className="mobile-bottom-nav">
  {[
    {id:'pitch',emoji:'🚀',label:'Pitch'},
    {id:'manager',emoji:'🗓️',label:'Manager'},
    {id:'playlists',emoji:'🎯',label:'Playlist'},
    {id:'analytics',emoji:'📊',label:'Analytics'},
    {id:'growth',emoji:'🎯',label:'Score'},
  ].map((item) => (
    <button key={item.id} onClick={() => setActiveSection(item.id)}
      style={{
        background:'none',
        border:'none',
        color: activeSection === item.id ? '#9B59B6' : '#555',
        cursor:'pointer',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        gap:'4px',
        fontSize:'10px',
        padding:'5px',
      }}>
      <span style={{fontSize:'20px'}}>{item.emoji}</span>
      <span>{item.label}</span>
    </button>
  ))}
  <button onClick={() => setActiveSection('ia')}
    style={{background:'none',border:'none',color: activeSection === 'ia' ? '#9B59B6' : '#555',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',fontSize:'10px',padding:'5px'}}>
    <span style={{fontSize:'20px'}}>🤖</span>
    <span>IA</span>
  </button>
  <button onClick={() => setActiveSection('multi')}
    style={{background:'none',border:'none',color: activeSection === 'multi' ? '#9B59B6' : '#555',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',fontSize:'10px',padding:'5px'}}>
    <span style={{fontSize:'20px'}}>📊</span>
    <span>Multi</span>
  </button>
</div>
{/* HEADER DE BIENVENUE */}
<div style={{background:'linear-gradient(135deg,#2d1040,#1a0030)',padding:'25px 30px',borderRadius:'20px',marginBottom:'25px',border:'1px solid #9B59B650',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 4px 20px rgba(155,89,182,0.15)'}}>
  <div>
    <h2 style={{margin:0,fontSize:'20px',fontWeight:'bold'}}>
      Bonjour 👋 {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
    </h2>
    <p style={{margin:'5px 0 0 0',color:'#aaa',fontSize:'14px'}}>Bienvenue sur ton dashboard Spotlift</p>
  </div>
  <div style={{display:'flex',gap:'10px'}}>
    <button onClick={() => setShowToolsModal(true)} style={{background:'#0d0020',padding:'10px 15px',borderRadius:'10px',textAlign:'center',border:'1px solid #9B59B6',cursor:'pointer'}}>
      <p style={{margin:0,color:'#9B59B6',fontWeight:'bold',fontSize:'18px'}}>11</p>
      <p style={{margin:0,color:'#555',fontSize:'11px'}}>Outils IA</p>
    </button>
    <button onClick={() => window.location.href='/pricing'} style={{background:'#0d0020',padding:'10px 15px',borderRadius:'10px',textAlign:'center',border:'1px solid #2d1040',cursor:'pointer'}}>
      <p style={{margin:0,color:'#1DB954',fontWeight:'bold',fontSize:'18px'}}>{plan}</p>
      <p style={{margin:0,color:'#555',fontSize:'11px'}}>Plan actuel</p>
    </button>
  </div>
</div>
        {/* PITCH GENERATOR */}
        {activeSection === 'pitch' && (
          <PitchGenerator user={user} />
        )}

        {/* MANAGER IA */}
       {activeSection === 'manager' && (plan === 'Free' ? <ProGate plan={plan} feature="Manager IA — Planning 44 jours" /> : <ManagerIA user={user} />)}

        {/* PLAYLIST FINDER */}
        {activeSection === 'playlists' && (plan === 'Free' ? <ProGate plan={plan} feature="Playlist Finder" /> : <PlaylistFinder user={user} />)}

        {/* ANALYTICS IA */}
        {activeSection === 'analytics' && (plan === 'Free' ? <ProGate plan={plan} feature="Analytics IA" /> : <AnalyticsIA user={user} />)}

        {/* GROWTH SCORE */}
         {activeSection === 'growth' && (plan === 'Free' ? <ProGate plan={plan} feature="Growth Score" /> : <GrowthScore user={user} />)}

        {/* VIRAL POTENTIEL */}
        {activeSection === 'viral' && (plan === 'Pro+' ? <ViralPotentiel /> : <ProPlusGate plan={plan} feature="Viral Potentiel" />)}

        {/* PROFIL ARTISTE */}
        {activeSection === 'profil' && (plan === 'Pro+' ? <ProfilArtiste user={user} />: <ProPlusGate plan={plan} feature="Optimisation Profil Artiste" />)}
        
        {/* CONTENU SOCIAL */}
                {activeSection === 'contenu' && (plan === 'Free' ? <ProGate plan={plan} feature="Contenu Social" /> : <ContenuSocial user={user} />)}


        {/* IA ASSISTANT */}
        {activeSection === 'ia' && (plan === 'Free' ? <ProGate plan={plan} feature="IA Assistant" /> : <IAAssistant user={user} />)}

        {/* MULTI PLATEFORMES */}
        {activeSection === 'multi' && (plan === 'Free' ? <ProGate plan={plan} feature="Multi-Plateformes" /> : <MultiPlateformes user={user} />)}

        {activeSection === 'referral' && <Referral user={user} plan={plan} />}

        {/* FEEDBACK */}
        {activeSection === 'feedback' && (
          <Feedback user={user} />
        )}  
          {activeSection === 'search' && <SearchSpotify />}
        </div>
      </div>
    );
  }

function SearchSpotify() {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'artists'|'tracks'>('artists');

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}&type=artist,track`);
      const data = await res.json();
      setArtists(data.artists || []);
      setTracks(data.tracks || []);
    } catch(e) {}
    setLoading(false);
      };
  
  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>🔍 Recherche Spotify</h1>
      <p style={{color:'#aaa',marginBottom:'25px'}}>Cherche des artistes et tracks Spotify</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Tape un nom d'artiste ou de track pour explorer les données Spotify.</p>
      <div style={{background:'#0d0020',padding:'25px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <div style={{display:'flex',gap:'10px',marginBottom:'15px'}}>
          <input value={query} onChange={e => setQuery(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && search()}
            placeholder="Ex: David Guetta, J.K. RAM..."
            style={{flex:1,background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff'}}/>
          <button onClick={search} disabled={loading}
            style={{background:'#9B59B6',color:'#fff',padding:'12px 20px',borderRadius:'10px',border:'none',cursor:'pointer',fontWeight:'bold'}}>
            {loading ? '...' : '🔍'}
          </button>
        </div>
        <div style={{display:'flex',gap:'10px'}}>
          <button onClick={() => setActiveTab('artists')}
            style={{padding:'8px 16px',background:activeTab==='artists'?'#9B59B6':'#1a0030',color:'#fff',border:'none',borderRadius:'20px',cursor:'pointer'}}>
            🎵 Artistes ({artists.length})
          </button>
          <button onClick={() => setActiveTab('tracks')}
            style={{padding:'8px 16px',background:activeTab==='tracks'?'#9B59B6':'#1a0030',color:'#fff',border:'none',borderRadius:'20px',cursor:'pointer'}}>
            🎤 Tracks ({tracks.length})
          </button>
        </div>
      </div>
      {activeTab === 'artists' && artists.map((a:any) => (
        <div key={a.id} style={{background:'#0d0020',padding:'15px',borderRadius:'12px',marginBottom:'10px',border:'1px solid #2d1040',display:'flex',gap:'15px',alignItems:'center'}}>
          {a.image && <img src={a.image} style={{width:'50px',height:'50px',borderRadius:'50%'}} alt={a.name}/>}
          <div style={{flex:1}}>
            <p style={{fontWeight:'bold',margin:'0 0 4px 0'}}>{a.name}</p>
            {a.followers > 0 && <p style={{color:'#9B59B6',margin:'0 0 4px 0',fontSize:'13px'}}>👥 {a.followers?.toLocaleString()} followers</p>}
            {a.popularity > 0 && <p style={{color:'#aaa',margin:0,fontSize:'12px'}}>⭐ Popularité : {a.popularity}/100</p>}
          </div>
          <a href={a.externalUrl} target="_blank" style={{background:'#1DB954',color:'#fff',padding:'8px 14px',borderRadius:'20px',textDecoration:'none',fontSize:'12px',fontWeight:'bold'}}>Spotify</a>
        </div>
      ))}
      {activeTab === 'tracks' && tracks.map((t:any) => (
        <div key={t.id} style={{background:'#0d0020',padding:'15px',borderRadius:'12px',marginBottom:'10px',border:'1px solid #2d1040',display:'flex',gap:'15px',alignItems:'center'}}>
          {t.image && <img src={t.image} style={{width:'50px',height:'50px',borderRadius:'8px'}} alt={t.name}/>}
          <div style={{flex:1}}>
            <p style={{fontWeight:'bold',margin:'0 0 4px 0'}}>{t.name}</p>
            <p style={{color:'#9B59B6',margin:'0 0 4px 0',fontSize:'13px'}}>{t.artist}</p>
            {t.popularity > 0 && <p style={{color:'#aaa',margin:0,fontSize:'12px'}}>⭐ {t.popularity}/100</p>}
          </div>
          <a href={t.externalUrl} target="_blank" style={{background:'#1DB954',color:'#fff',padding:'8px 14px',borderRadius:'20px',textDecoration:'none',fontSize:'12px',fontWeight:'bold'}}>Spotify</a>
        </div>
      ))}
    </div>
  );
}
        

function ProGate({ plan, feature }: { plan: string, feature: string }) {
  if (plan === 'Pro' || plan === 'Pro+') return null;
  return (
    <div style={{textAlign:'center',padding:'60px 30px',background:'#0d0020',borderRadius:'20px',border:'2px solid #9B59B6'}}>
      <p style={{fontSize:'48px',marginBottom:'20px'}}>🔒</p>
      <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'10px'}}>Fonctionnalité Pro</h2>
      <p style={{color:'#aaa',marginBottom:'25px',fontSize:'16px'}}>
        <strong style={{color:'#fff'}}>{feature}</strong> est disponible uniquement dans le plan Pro.
      </p>
      <div style={{background:'#1a0030',padding:'20px',borderRadius:'15px',marginBottom:'25px',border:'1px solid #9B59B650'}}>
        <p style={{color:'#9B59B6',fontWeight:'bold',margin:'0 0 5px 0'}}>🎁 Offre exclusive</p>
        <p style={{color:'#fff',fontSize:'24px',fontWeight:'bold',margin:'0 0 5px 0'}}>Code EARLY10</p>
        <p style={{color:'#aaa',fontSize:'13px',margin:0}}>1 mois Pro gratuit !</p>
      </div>
      <a href="/pricing" style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',color:'#fff',padding:'14px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',display:'inline-block',boxShadow:'0 0 20px rgba(155,89,182,0.4)'}}>
        Passer en Pro — 9.99€/mois →
      </a>
      <p style={{color:'#555',fontSize:'12px',marginTop:'15px'}}>Sans engagement • Annulation en 1 clic</p>
    </div>
  );
}


function ProPlusGate({ plan, feature }: { plan: string, feature: string }) {
  if (plan === 'Pro+') return null;
  return (
    <div style={{textAlign:'center',padding:'60px 30px',background:'#0a1628',borderRadius:'20px',border:'2px solid #2980b9'}}>
      <p style={{fontSize:'48px',marginBottom:'20px'}}>🔒</p>
      <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'10px'}}>Fonctionnalité Pro+</h2>
      <p style={{color:'#aaa',marginBottom:'25px',fontSize:'16px'}}>
        <strong style={{color:'#fff'}}>{feature}</strong> est disponible uniquement dans le plan Pro+.
      </p>
      <div style={{background:'#1a2a40',padding:'20px',borderRadius:'15px',marginBottom:'25px',border:'1px solid #2980b950'}}>
        <p style={{color:'#2980b9',fontWeight:'bold',margin:'0 0 5px 0'}}>🎁 Offre exclusive</p>
        <p style={{color:'#fff',fontSize:'24px',fontWeight:'bold',margin:'0 0 5px 0'}}>Code EARLY10</p>
        <p style={{color:'#aaa',fontSize:'13px',margin:0}}>1 mois Pro+ gratuit !</p>
      </div>
      <a href="/pricing" style={{background:'linear-gradient(135deg,#1a5276,#2980b9)',color:'#fff',padding:'14px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',display:'inline-block',boxShadow:'0 0 20px rgba(41,128,185,0.4)'}}>
        Passer en Pro+ — 19.99€/mois →
      </a>
      <p style={{color:'#555',fontSize:'12px',marginTop:'15px'}}>Sans engagement • Annulation en 1 clic</p>
    </div>
  );
}

function PitchGenerator({ user }: { user: any }) {
  const [track, setTrack] = useState('');
  const [genre, setGenre] = useState('Electronic');
  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);
  const [ambiance, setAmbiance] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState("");
  const [releaseType, setReleaseType] = useState("upcoming");
  const [spotifyResults, setSpotifyResults] = useState<any[]>([]);
const [spotifyLoading, setSpotifyLoading] = useState(false);
const [selectedTrack, setSelectedTrack] = useState<any>(null);
const [artistName, setArtistName] = useState('');
  const [copied, setCopied] = useState(false);

const searchSpotify = async (query: string) => {
  if (query.length < 2) { setSpotifyResults([]); return; }
  setSpotifyLoading(true);
  try {
    const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}&type=track`);
    const data = await res.json();
    setSpotifyResults(data.tracks?.items || []);
  } catch (e) {
    setSpotifyResults([]);
  }
  setSpotifyLoading(false);
};
 
  const generatePitch = async () => {
    if (!isValidInput(track)) { alert('Merci d\'entrer un nom de track valide.'); return; }
    if (!isValidInput(ambiance)) { alert('Merci de décrire l\'ambiance de ton morceau.'); return; }
    if (!isValidInput(description)) { alert('Merci d\'ajouter une description de ton morceau.'); return; }
    setLoading(true);
    try {
      const artistInfo = selectedTrack ? selectedTrack.artists[0]?.name : '';
      const res = await fetch('/api/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track, genre, releaseType, releaseDate, ambiance, description, artistName: artistInfo }),
      });
      const data = await res.json();
      if (data.pitch) {
        setPitch(data.pitch);
        fetch('/api/track-usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.id, toolName: 'Pitch Generator' }),
        }).catch(() => {});
      } else {
        setPitch('Erreur lors de la génération du pitch. Réessaie.');
      }
    } catch {
      setPitch('Erreur de connexion. Réessaie.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>🚀 Pitch Generator IA</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Génère un pitch professionnel en 10 secondes</p>
      <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>Nom du track</label>
        <input value={track} onChange={e => { setTrack(e.target.value); setSelectedTrack(null); searchSpotify(e.target.value); }}
        placeholder="ex: Midnight Vibes"
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'5px',boxSizing:'border-box'}}/><p style={{color:'#555',fontSize:'12px',marginBottom:'10px',marginTop:'5px'}}>
  💡 Tape le nom de ton track — si il n'apparaît pas dans les suggestions, entre-le manuellement et clique sur Générer.
</p>
        {spotifyLoading && <p style={{color:'#aaa',fontSize:'12px',marginBottom:'10px'}}>Recherche sur Spotify...</p>}
        {spotifyResults.length > 0 && !selectedTrack && (
          <div style={{background:'#0d0020',border:'1px solid #2d1040',borderRadius:'10px',marginBottom:'15px',maxHeight:'200px',overflowY:'auto'}}>
            {spotifyResults.map((t: any) => (
              <div key={t.id} onClick={() => { setSelectedTrack(t); setTrack(t.name); setArtistName(t.artists[0]?.name || ''); setSpotifyResults([]); }}
                style={{padding:'10px 15px',cursor:'pointer',borderBottom:'1px solid #2d1040',display:'flex',alignItems:'center',gap:'10px'}}>
                {t.album?.images?.[2]?.url && <img src={t.album.images[2].url} style={{width:'35px',height:'35px',borderRadius:'5px'}} alt="cover"/>}
                <div>
                  <p style={{margin:0,color:'#fff',fontSize:'13px',fontWeight:'bold'}}>{t.name}</p>
                  <p style={{margin:0,color:'#aaa',fontSize:'11px'}}>{t.artists[0]?.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedTrack && (
          <div style={{background:'#1a0030',border:'1px solid #1DB954',borderRadius:'10px',padding:'10px 15px',marginBottom:'15px',display:'flex',alignItems:'center',gap:'10px'}}>
            {selectedTrack.album?.images?.[2]?.url && <img src={selectedTrack.album.images[2].url} style={{width:'40px',height:'40px',borderRadius:'5px'}} alt="cover"/>}
            <div>
              <p style={{margin:0,color:'#1DB954',fontSize:'13px',fontWeight:'bold'}}>Track Spotify trouve !</p>
              <p style={{margin:0,color:'#ccc',fontSize:'12px'}}>{selectedTrack.name} — {selectedTrack.artists[0]?.name}</p>
            </div>
          </div>
        )}
        <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>Statut du track</label>
        <select value={releaseType} onChange={e => setReleaseType(e.target.value)}
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}>
          <option value='upcoming'>A venir — pas encore sorti</option>
          <option value='out'>Deja sorti sur Spotify</option>
        </select>
        {releaseType === 'upcoming' && (
          <>
            <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>Date de sortie prevue</label>
            <input type='date' value={releaseDate} onChange={e => setReleaseDate(e.target.value)}
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>
          </>
        )}
        <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>Genre musical</label>
        <select value={genre} onChange={e => setGenre(e.target.value)}
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'20px',boxSizing:'border-box'}}>
          {['Electronic','Hip-Hop','Pop','R&B','Rock','Latin','Jazz','Autre'].map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <div style={{marginBottom:'15px'}}>
          <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>Ambiance / émotion du morceau</label>
          <select value={ambiance} onChange={e => setAmbiance(e.target.value)}
            style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'0',boxSizing:'border-box'}}>
            <option value="">-- Choisis une ambiance --</option>
            <option value="triste et mélancolique">😢 Triste et mélancolique</option>
            <option value="joyeux et festif">🎉 Joyeux et festif</option>
            <option value="énergique et puissant">⚡ Énergique et puissant</option>
            <option value="romantique et sensuel">❤️ Romantique et sensuel</option>
            <option value="sombre et introspectif">🌑 Sombre et introspectif</option>
            <option value="motivant et inspirant">🚀 Motivant et inspirant</option>
            <option value="nostalgique">🌅 Nostalgique</option>
            <option value="calme et apaisant">🌊 Calme et apaisant</option>
            <option value="agressif et intense">🔥 Agressif et intense</option>
            <option value="mystérieux et envoûtant">🌙 Mystérieux et envoûtant</option>
          </select>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>Décris ton morceau en quelques mots</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Ex: Une chanson sur une rupture amoureuse, inspirée par une nuit d'été. Le refrain parle de lâcher prise..."
            rows={3}
            style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',boxSizing:'border-box',resize:'none'}}/>
        </div>
        <button onClick={generatePitch} disabled={loading || !track}
          style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
          {loading ? '⏳ Génération...' : '🚀 Générer le Pitch'}
        </button>
      </div>
      {pitch && (
        <div style={{background:'#0d0020',padding:'25px',borderRadius:'20px',border:'1px solid #9B59B6'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'15px'}}>
            <p style={{color:'#9B59B6',fontWeight:'bold',margin:0}}>✅ Pitch généré :</p>
            <button onClick={() => { navigator.clipboard.writeText(pitch); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              style={{background: copied ? '#1DB954' : '#1a0030',color: copied ? '#fff' : '#aaa',border:'1px solid #2d1040',padding:'6px 12px',borderRadius:'8px',cursor:'pointer',fontSize:'12px'}}>
              {copied ? '✅ Copié !' : '📋 Copier'}
            </button>
          </div>
          <p style={{color:'#ccc',lineHeight:'1.8',margin:0}}>{pitch}</p>
          <div style={{marginTop:'15px',paddingTop:'15px',borderTop:'1px solid #2d1040',display:'flex',alignItems:'center',gap:'8px'}}>
            <span style={{fontSize:'16px'}}>⏱️</span>
            <p style={{color:'#1DB954',fontSize:'13px',margin:0,fontWeight:'bold'}}>Tu viens d'économiser environ 25 minutes !</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ManagerIA({ user }: { user: any }) {
  const [trackName, setTrackName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [calendar, setCalendar] = useState<any[]>([]);

  const generateCalendar = () => {
    if (!isValidInput(trackName) || !releaseDate) { alert('Merci d\'entrer un nom de track valide et une date de sortie.'); return; }
    const release = new Date(releaseDate);
    const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate()+n); return r; };
    const format = (d: Date) => d.toLocaleDateString('fr-FR', {day:'numeric',month:'long'});
    const items = [
      {day:-30,emoji:'🎭',action:`Teaser mystère Instagram pour "${trackName}"`},
      {day:-21,emoji:'📢',action:`Annonce officielle du titre "${trackName}"`},
      {day:-14,emoji:'🎯',action:`Envoyer le pitch aux curateurs Spotify`},
      {day:-10,emoji:'🎵',action:`Premier extrait TikTok (15 secondes)`},
      {day:-7,emoji:'📮',action:`Soumission Spotify Editorial Playlist`},
      {day:-5,emoji:'🎬',action:`Deuxième TikTok (making of)`},
      {day:-3,emoji:'⏰',action:`Story countdown Instagram`},
      {day:-2,emoji:'💾',action:`Lancer les pré-saves`},
      {day:-1,emoji:'🔥',action:`Teaser final 30 secondes`},
      {day:0,emoji:'🚀',action:`SORTIE DE "${trackName}" — Poster sur tous les réseaux !`,highlight:true},
      {day:1,emoji:'📱',action:`TikTok/Reels reaction à la sortie`},
      {day:3,emoji:'💰',action:`Lancer les ads Facebook/Instagram`},
      {day:7,emoji:'📊',action:`Bilan des streams et ajuster la stratégie`},
      {day:14,emoji:'🔄',action:`Relance avec nouveau contenu`},
    ];
    setCalendar(items.map(item => ({...item, date: format(addDays(release, item.day)), label: item.day === 0 ? 'JOUR J' : item.day > 0 ? `J+${item.day}` : `J${item.day}`})));
    fetch('/api/track-usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id, toolName: 'Manager IA' }),
    }).catch(() => {});
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>🗓️ Manager IA</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Planifie automatiquement ta sortie sur 44 jours</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Renseigne ta date de sortie pour générer un planning complet jour par jour.</p>
      <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <input value={trackName} onChange={e => setTrackName(e.target.value)}
          placeholder="Nom du track"
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>
        <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)}
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'20px',boxSizing:'border-box'}}/>
        <button onClick={generateCalendar}
          style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
          🗓️ Générer le planning
        </button>
      </div>
      {calendar.length > 0 && calendar.map((item, i) => (
        <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'15px',padding:'15px',borderRadius:'12px',marginBottom:'10px',background: item.highlight ? '#2d1040' : '#0d0020',border: item.highlight ? '1px solid #9B59B6' : '1px solid #2d1040'}}>
          <span style={{fontSize:'24px'}}>{item.emoji}</span>
          <div>
            <p style={{color:'#9B59B6',fontSize:'12px',margin:0,fontWeight:'bold'}}>{item.label} — {item.date}</p>
            <p style={{color:'#fff',fontSize:'14px',margin:0}}>{item.action}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlaylistFinder({ user }: { user: any }) {
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const findPlaylists = () => {
if (!isValidInput(genre)) { alert('Merci d\'entrer un genre valide.'); return; }
    const playlists = [
      {name:`${genre} Hits 2026`,followers:'125K',curator:'SpotifyEditor',match:'98%',type:'Editorial'},
      {name:`Best of ${genre}`,followers:'89K',curator:'MusicLover',match:'95%',type:'Indépendante'},
      {name:`${mood || 'Chill'} ${genre} Vibes`,followers:'67K',curator:'PlaylistPro',match:'92%',type:'Indépendante'},
      {name:`${genre} Underground`,followers:'45K',curator:'Underground_FR',match:'88%',type:'Indépendante'},
      {name:`New ${genre} Music`,followers:'234K',curator:'NewMusicFinder',match:'85%',type:'Editorial'},
      {name:`${genre} France`,followers:'56K',curator:'FrenchMusic',match:'79%',type:'Indépendante'},
    ];
    setResults(playlists);
    fetch('/api/track-usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id, toolName: 'Playlist Finder' }),
    }).catch(() => {});
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>🎯 Playlist Finder</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Trouve les playlists parfaites pour ton son</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Indique un genre + une ambiance pour des résultats plus ciblés.</p>
      <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <input value={genre} onChange={e => setGenre(e.target.value)}
          placeholder="Genre (ex: Electronic, Hip-Hop...)"
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>
        <input value={mood} onChange={e => setMood(e.target.value)}
          placeholder="Ambiance (ex: Chill, Energetic...)"
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'20px',boxSizing:'border-box'}}/>
        <button onClick={findPlaylists}
          style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
          🔍 Trouver des playlists
        </button>
      </div>
      {results.map((p, i) => (
        <div key={i} style={{background:'#0d0020',padding:'15px',borderRadius:'12px',marginBottom:'10px',border:'1px solid #2d1040',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <p style={{fontWeight:'bold',margin:'0 0 4px 0'}}>{p.name}</p>
            <p style={{color:'#aaa',fontSize:'13px',margin:'0 0 4px 0'}}>👤 {p.curator} • 👥 {p.followers}</p>
            <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'8px',background: p.type === 'Editorial' ? '#1DB95433' : '#2d1040',color: p.type === 'Editorial' ? '#1DB954' : '#aaa'}}>{p.type}</span>
          </div>
          <div style={{textAlign:'right'}}>
            <p style={{color:'#1DB954',fontWeight:'bold',fontSize:'20px',margin:0}}>{p.match}</p>
            <p style={{color:'#555',fontSize:'12px',margin:0}}>match</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsIA({ user }: { user: any }) {
  const [saveRate, setSaveRate] = useState('');
  const [skipRate, setSkipRate] = useState('');
  const [replayRate, setReplayRate] = useState('');
  const [listenTime, setListenTime] = useState('');
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState('');
  const [recs, setRecs] = useState<any[]>([]);

  const analyze = () => {
    const save = parseInt(saveRate) || 0;
    const skip = parseInt(skipRate) || 0;
    const replay = parseInt(replayRate) || 0;
    const listen = parseInt(listenTime) || 0;
    const dur = parseInt(duration) || 180;
    const results = [];
    if (save < 10) results.push({type:'🔴',title:'Taux de save trop bas',desc:`${save}% de saves. Rends ton hook plus mémorable dans les 30 premières secondes.`,action:'Raccourcis ton intro et place ton meilleur moment avant 30 secondes.'});
    else if (save >= 20) results.push({type:'🟢',title:'Excellent taux de save !',desc:`${save}% de saves — tu as un vrai fan base.`,action:'Lance une campagne de pré-save pour ton prochain track.'});
    else results.push({type:'🟡',title:'Taux de save correct',desc:`${save}% de saves — dans la moyenne.`,action:'Ajoute un call-to-action dans tes posts : "Sauvegarde ce track !"'});
    if (skip > 50) results.push({type:'🔴',title:'Skip rate élevé',desc:`${skip}% des auditeurs skippent ton track.`,action:'Analyse où ils quittent et raccourcis cette partie.'});
    else if (skip < 20) results.push({type:'🟢',title:'Excellent engagement !',desc:`Seulement ${skip}% de skips.`,action:'Ce track est parfait pour les playlists algorithmiques Spotify.'});
    if (replay > 30) results.push({type:'🟢',title:'Moment viral détecté !',desc:`${replay}% de replay rate.`,action:'Identifie ce moment exact et utilise-le comme extrait TikTok.'});
    if (listen < dur * 0.3) results.push({type:'🔴',title:'Écoute trop courte',desc:`Les auditeurs écoutent seulement ${listen}s sur ${dur}s.`,action:`Place ton drop avant ${Math.round(dur * 0.2)}s.`});
    if (country && country.toLowerCase() !== 'france') results.push({type:'🟡',title:`Audience : ${country}`,desc:`Ton audience principale est en ${country}.`,action:`Cible les playlists de ${country} et lance des ads géolocalisées.`});
    setRecs(results);
    fetch('/api/track-usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id, toolName: 'Analytics IA' }),
    }).catch(() => {});
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>📊 Analytics IA</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Recommandations actionnables basées sur tes stats</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Récupère ces chiffres dans Spotify for Artists pour une analyse précise.</p>
      <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px',marginBottom:'20px'}}>
          {[
            {label:'Taux de save (%)',val:saveRate,set:setSaveRate,ph:'ex: 15'},
            {label:'Skip rate (%)',val:skipRate,set:setSkipRate,ph:'ex: 45'},
            {label:'Replay rate (%)',val:replayRate,set:setReplayRate,ph:'ex: 25'},
            {label:'Durée écoute (sec)',val:listenTime,set:setListenTime,ph:'ex: 45'},
            {label:'Pays principal',val:country,set:setCountry,ph:'ex: France'},
            {label:'Durée track (sec)',val:duration,set:setDuration,ph:'ex: 180'},
          ].map((f,i) => (
            <div key={i}>
              <label style={{color:'#aaa',fontSize:'13px',display:'block',marginBottom:'5px'}}>{f.label}</label>
              <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',boxSizing:'border-box'}}/>
            </div>
          ))}
        </div>
        <button onClick={analyze}
          style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
          🔍 Analyser mes performances
        </button>
      </div>
      {recs.map((r,i) => (
        <div key={i} style={{background:'#0d0020',padding:'15px',borderRadius:'12px',marginBottom:'10px',borderLeft:`4px solid ${r.type==='🔴'?'#e74c3c':r.type==='🟢'?'#1DB954':'#f39c12'}`}}>
          <p style={{fontWeight:'bold',margin:'0 0 5px 0'}}>{r.type} {r.title}</p>
          <p style={{color:'#aaa',fontSize:'13px',margin:'0 0 5px 0'}}>{r.desc}</p>
          <p style={{color:'#3498db',fontSize:'13px',margin:0}}>✅ Action : {r.action}</p>
        </div>
      ))}
    </div>
  );
}

function GrowthScore({ user }: { user: any }) {
  const [streams, setStreams] = useState('');
  const [followers, setFollowers] = useState('');
  const [playlists, setPlaylists] = useState('');
  const [save, setSave] = useState('');
  const [releases, setReleases] = useState('');
  const [social, setSocial] = useState('');
  const [score, setScore] = useState<number|null>(null);

  const calculate = () => {
    let s = 0;
    const st = parseInt(streams)||0;
    const fo = parseInt(followers)||0;
    const pl = parseInt(playlists)||0;
    const sa = parseInt(save)||0;
    const re = parseInt(releases)||0;
    const so = parseInt(social)||0;
    if (st > 10000) s+=20; else if (st > 5000) s+=15; else if (st > 1000) s+=10; else s+=5;
    if (fo > 1000) s+=20; else if (fo > 500) s+=15; else if (fo > 100) s+=10; else s+=5;
    if (pl > 10) s+=20; else if (pl > 5) s+=15; else if (pl > 0) s+=10;
    if (sa > 20) s+=20; else if (sa > 10) s+=15; else if (sa > 5) s+=10; else s+=5;
    if (re >= 2) s+=10; else if (re === 1) s+=7;
    s+=Math.min(so,10);
    setScore(s);
    fetch('/api/track-usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id, toolName: 'Growth Score' }),
    }).catch(() => {});
  };

  const color = score !== null ? (score >= 70 ? '#1DB954' : score >= 40 ? '#f39c12' : '#e74c3c') : '#9B59B6';
  const label = score !== null ? (score >= 70 ? 'Excellent 🚀' : score >= 40 ? 'En progression 📈' : 'À améliorer ⚠️') : '';

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>🎯 Growth Score</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Calcule ton score de croissance Spotify sur 100</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Sois honnête sur tes chiffres : le score n'est utile que s'il est réaliste.</p>
      <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px',marginBottom:'20px'}}>
          {[
            {label:'Streams ce mois',val:streams,set:setStreams,ph:'ex: 5000'},
            {label:'Followers Spotify',val:followers,set:setFollowers,ph:'ex: 500'},
            {label:'Nombre de playlists',val:playlists,set:setPlaylists,ph:'ex: 3'},
            {label:'Taux de save (%)',val:save,set:setSave,ph:'ex: 15'},
            {label:'Sorties ce mois',val:releases,set:setReleases,ph:'ex: 1'},
            {label:'Présence réseaux (1-10)',val:social,set:setSocial,ph:'ex: 7'},
          ].map((f,i) => (
            <div key={i}>
              <label style={{color:'#aaa',fontSize:'13px',display:'block',marginBottom:'5px'}}>{f.label}</label>
              <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',boxSizing:'border-box'}}/>
            </div>
          ))}
        </div>
        <button onClick={calculate}
          style={{width:'100%',background:'linear-gradient(135deg,#9B59B6,#1DB954)',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
          🎯 Calculer mon Growth Score
        </button>
      </div>
      {score !== null && (
        <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',textAlign:'center'}}>
          <div style={{fontSize:'80px',fontWeight:'bold',color}}>{score}</div>
          <div style={{color:'#aaa',fontSize:'18px'}}>/100</div>
          <div style={{fontSize:'22px',marginTop:'10px'}}>{label}</div>
          <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',marginTop:'20px',textAlign:'left'}}>
            <p style={{color:'#aaa',fontSize:'14px',margin:0}}>
              {score < 70 ? '💡 Soumets ton track aux curateurs et améliore ta présence sur les réseaux.' : '💡 Continue comme ça, tu es sur la bonne voie !'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ViralPotentiel() {
  const [intro, setIntro] = useState('');
  const [drop, setDrop] = useState('');
  const [bpm, setBpm] = useState('');
  const [genre, setGenre] = useState('electronic');
  const [hook, setHook] = useState('yes');
  const [dance, setDance] = useState('yes');
  const [result, setResult] = useState<any>(null);

  const analyze = () => {
    let score = 0;
    const signals = [];
    const i = parseInt(intro)||0;
    const d = parseInt(drop)||0;
    const b = parseInt(bpm)||0;
    if (i <= 10) { score+=25; signals.push({e:'🟢',t:'Intro courte — parfait pour TikTok'}); }
    else if (i <= 20) { score+=15; signals.push({e:'🟡',t:'Intro correcte — essaie de la raccourcir'}); }
    else { score+=0; signals.push({e:'🔴',t:'Intro trop longue — les auditeurs vont skipper'}); }
    if (d <= 20) { score+=25; signals.push({e:'🟢',t:'Drop très rapide — potentiel viral élevé'}); }
    else if (d <= 35) { score+=15; signals.push({e:'🟡',t:'Drop correct — essaie de le placer avant 20s'}); }
    else { score+=5; signals.push({e:'🔴',t:'Drop trop tardif — 70% partent avant 30s sur TikTok'}); }
    if (b >= 120 && b <= 140) { score+=20; signals.push({e:'🟢',t:'BPM idéal pour les playlists Dance et TikTok'}); }
    else { score+=10; signals.push({e:'🟡',t:'BPM correct pour le streaming Spotify'}); }
    if (hook === 'yes') { score+=20; signals.push({e:'🟢',t:'Hook mémorable — clé du succès viral'}); }
    else if (hook === 'maybe') { score+=10; signals.push({e:'🟡',t:'Hook à améliorer'}); }
    else { score+=0; signals.push({e:'🔴',t:'Pas de hook — difficile de percer sans élément mémorable'}); }
    if (dance === 'yes') { score+=10; signals.push({e:'🟢',t:'Partie dansable — parfait pour les challenges TikTok'}); }
    else { score+=5; signals.push({e:'🟡',t:'Mise sur l\'émotion pour les Reels'}); }
    setResult({score, signals, label: score >= 75 ? 'VIRAL POTENTIEL ÉLEVÉ 🔥' : score >= 50 ? 'BON POTENTIEL 📈' : 'POTENTIEL LIMITÉ ⚠️', color: score >= 75 ? '#1DB954' : score >= 50 ? '#f39c12' : '#e74c3c'});
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>🔥 Détection Viral Potentiel</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Analyse ton track et détecte son potentiel viral</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Une intro courte et un drop rapide augmentent fortement ton score.</p>
      <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px',marginBottom:'20px'}}>
          <div>
            <label style={{color:'#aaa',fontSize:'13px',display:'block',marginBottom:'5px'}}>Durée intro (sec)</label>
            <input value={intro} onChange={e => setIntro(e.target.value)} placeholder="ex: 15"
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',boxSizing:'border-box'}}/>
          </div>
          <div>
            <label style={{color:'#aaa',fontSize:'13px',display:'block',marginBottom:'5px'}}>Durée avant le drop (sec)</label>
            <input value={drop} onChange={e => setDrop(e.target.value)} placeholder="ex: 30"
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',boxSizing:'border-box'}}/>
          </div>
          <div>
            <label style={{color:'#aaa',fontSize:'13px',display:'block',marginBottom:'5px'}}>Tempo (BPM)</label>
            <input value={bpm} onChange={e => setBpm(e.target.value)} placeholder="ex: 128"
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',boxSizing:'border-box'}}/>
          </div>
          <div>
            <label style={{color:'#aaa',fontSize:'13px',display:'block',marginBottom:'5px'}}>Genre</label>
            <select value={genre} onChange={e => setGenre(e.target.value)}
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',boxSizing:'border-box'}}>
              <option value="pop">Pop</option>
              <option value="hiphop">Hip-Hop</option>
              <option value="electronic">Electronic</option>
              <option value="rnb">R&B</option>
              <option value="latin">Latin</option>
            </select>
          </div>
          <div>
            <label style={{color:'#aaa',fontSize:'13px',display:'block',marginBottom:'5px'}}>Hook mémorable ?</label>
            <select value={hook} onChange={e => setHook(e.target.value)}
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',boxSizing:'border-box'}}>
              <option value="yes">Oui — très accrocheur</option>
              <option value="maybe">Peut-être</option>
              <option value="no">Non</option>
            </select>
          </div>
          <div>
            <label style={{color:'#aaa',fontSize:'13px',display:'block',marginBottom:'5px'}}>Partie dansable ?</label>
            <select value={dance} onChange={e => setDance(e.target.value)}
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',boxSizing:'border-box'}}>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
        </div>
        <button onClick={analyze}
          style={{width:'100%',background:'#e74c3c',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
          🔥 Analyser le potentiel viral
        </button>
      </div>
      {result && (
        <div style={{background:'#0d0020',padding:'25px',borderRadius:'20px',border:'1px solid #2d1040'}}>
          <div style={{textAlign:'center',marginBottom:'20px'}}>
            <div style={{fontSize:'60px',fontWeight:'bold',color:result.color}}>{result.score}%</div>
            <div style={{fontSize:'18px',fontWeight:'bold',color:result.color}}>{result.label}</div>
          </div>
          {result.signals.map((s:any,i:number) => (
            <div key={i} style={{background:'#1a0030',padding:'12px',borderRadius:'10px',marginBottom:'8px',display:'flex',gap:'10px',alignItems:'center'}}>
              <span style={{fontSize:'18px'}}>{s.e}</span>
              <span style={{color:'#ccc',fontSize:'13px'}}>{s.t}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilArtiste({ user }: { user: any }) {
  const [nom, setNom] = useState('');
  const [photo, setPhoto] = useState('yes');
  const [bio, setBio] = useState('yes');
  const [links, setLinks] = useState('all');
  const [pick, setPick] = useState('yes');
  const [claimed, setClaimed] = useState('yes');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copiedAnalysis, setCopiedAnalysis] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analyze-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, photo, bio, links, pick, claimed }),
      });
      const data = await res.json();
      if (data.analysis) {
        setResult({ analysis: data.analysis });
        fetch('/api/track-usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.id, toolName: 'Optimisation Profil' }),
        }).catch(() => {});
      } else {
        setResult({ analysis: 'Erreur lors de l\'analyse. Réessaie.' });
      }
    } catch {
      setResult({ analysis: 'Erreur de connexion. Réessaie.' });
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>🎨 Optimisation Profil Artiste</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Analyse ton profil Spotify et optimise chaque élément</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Réponds en regardant ton vrai profil Spotify ouvert à côté. L'IA analyse les informations que tu fournis ci-dessous, pas ton profil en temps réel.</p>
      <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom d'artiste"
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>
        {[
          {label:'Photo de profil professionnelle ?',val:photo,set:setPhoto,opts:[{v:'yes',l:'Oui — photo pro'},{v:'ok',l:'Oui — mais pas terrible'},{v:'no',l:'Non'}]},
          {label:'Bio Spotify ?',val:bio,set:setBio,opts:[{v:'yes',l:'Oui — bio complète'},{v:'short',l:'Oui — trop courte'},{v:'no',l:'Non'}]},
          {label:'Liens réseaux sur Spotify ?',val:links,set:setLinks,opts:[{v:'all',l:'Tous les liens'},{v:'some',l:'Quelques uns'},{v:'no',l:'Non'}]},
          {label:'Artist Pick active ?',val:pick,set:setPick,opts:[{v:'yes',l:'Oui'},{v:'no',l:'Non'}]},
          {label:'Profil revendiqué ?',val:claimed,set:setClaimed,opts:[{v:'yes',l:'Oui'},{v:'no',l:'Non'}]},
        ].map((f,i) => (
          <div key={i} style={{marginBottom:'15px'}}>
            <label style={{color:'#aaa',fontSize:'13px',display:'block',marginBottom:'5px'}}>{f.label}</label>
            <select value={f.val} onChange={e => f.set(e.target.value)}
              style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'10px',color:'#fff',boxSizing:'border-box'}}>
              {f.opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
        ))}
        <button onClick={analyze} disabled={loading}
          style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
          {loading ? '⏳ Analyse en cours...' : '🎨 Analyser mon profil'}
        </button>
      </div>
      {result && (
        <div style={{background:'#0d0020',padding:'25px',borderRadius:'20px',border:'1px solid #9B59B6'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'15px'}}>
            <p style={{color:'#9B59B6',fontWeight:'bold',margin:0}}>🎨 Analyse de ton profil :</p>
            <button onClick={() => { navigator.clipboard.writeText(result.analysis); setCopiedAnalysis(true); setTimeout(() => setCopiedAnalysis(false), 2000); }}
              style={{background: copiedAnalysis ? '#1DB954' : '#1a0030',color: copiedAnalysis ? '#fff' : '#aaa',border:'1px solid #2d1040',padding:'6px 12px',borderRadius:'8px',cursor:'pointer',fontSize:'12px'}}>
              {copiedAnalysis ? '✅ Copié !' : '📋 Copier'}
            </button>
          </div>
          <p style={{color:'#ccc',lineHeight:'1.8',whiteSpace:'pre-wrap',margin:0}}>{result.analysis}</p>
        </div>
      )}
    </div>
  );
}

function ContenuSocial({ user }: { user: any }) {
  const [track, setTrack] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [contenu, setContenu] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedContenu, setCopiedContenu] = useState(false);

  const generate = async () => {
    if (!isValidInput(track)) { alert('Merci d\'entrer un nom de track valide.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/generate-social-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track, platform }),
      });
      const data = await res.json();
      if (data.content) {
        setContenu(data.content);
        fetch('/api/track-usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.id, toolName: 'Contenu Social' }),
        }).catch(() => {});
      } else {
        setContenu('Erreur lors de la génération. Réessaie.');
      }
    } catch {
      setContenu('Erreur de connexion. Réessaie.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>📱 Générateur de Contenu</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Crée du contenu optimisé pour tes réseaux sociaux</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Choisis la plateforme avant de générer : chaque texte est optimisé pour elle.</p>
      <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <input value={track} onChange={e => setTrack(e.target.value)}
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>
        <div style={{display:'flex',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
          {[{id:'instagram',label:'📸 Instagram'},{id:'tiktok',label:'🎵 TikTok'},{id:'x',label:'✖️ X'},{id:'snapchat',label:'👻 Snapchat'},{id:'discord',label:'🎮 Discord'},{id:'email',label:'📧 Email'}].map(p => (
            <button key={p.id} onClick={() => setPlatform(p.id)}
              style={{padding:'8px 16px',borderRadius:'20px',border:'none',background: platform===p.id ? '#9B59B6' : '#1a0030',color: platform===p.id ? 'white' : '#aaa',cursor:'pointer',fontSize:'13px'}}>
              {p.label}
            </button>
          ))}
        </div>
        <button onClick={generate} disabled={loading || !track}
          style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
          {loading ? '⏳ Génération...' : '📱 Générer le contenu'}
        </button>
      </div>
      {contenu && (
        <div style={{background:'#0d0020',padding:'25px',borderRadius:'20px',border:'1px solid #9B59B6'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'15px'}}>
            <p style={{color:'#9B59B6',fontWeight:'bold',margin:0}}>✅ Contenu généré :</p>
           <button onClick={() => { navigator.clipboard.writeText(contenu); setCopiedContenu(true); setTimeout(() => setCopiedContenu(false), 2000); }}
              style={{background: copiedContenu ? '#1DB954' : '#1a0030',color: copiedContenu ? '#fff' : '#aaa',border:'1px solid #2d1040',padding:'6px 12px',borderRadius:'8px',cursor:'pointer',fontSize:'12px'}}>
              {copiedContenu ? '✅ Copié !' : '📋 Copier'}
            </button>
          </div>
          <pre style={{color:'#ccc',whiteSpace:'pre-wrap',fontSize:'14px',lineHeight:'1.6',margin:0}}>{contenu}</pre>
        </div>
      )}
    </div>
  );
}

function IAAssistant({ user }: { user: any }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const quickQuestions = ['Comment pitcher sur Spotify ?','Comment choisir ma date de sortie ?','Comment faire une campagne TikTok ?','Comment augmenter mes streams ?'];

  const ask = async () => {
    if (!isValidInput(question)) { alert('Merci d\'entrer une question valide.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/ai-assistant', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})});
      const data = await res.json();
      setResponse(data.response);
      fetch('/api/track-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, toolName: 'IA Assistant' }),
      }).catch(() => {});
    } catch {
      setResponse('Erreur de connexion. Réessaie.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>🤖 IA Assistant Marketing</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Pose tes questions à l'IA manager</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Pose des questions précises pour des réponses plus actionnables.</p>
      <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'15px'}}>
          {quickQuestions.map((q,i) => (
            <button key={i} onClick={() => setQuestion(q)}
              style={{padding:'6px 12px',borderRadius:'15px',border:'none',background:'#1a0030',color:'#aaa',cursor:'pointer',fontSize:'12px'}}>
              {q}
            </button>
          ))}
        </div>
        <textarea value={question} onChange={e => setQuestion(e.target.value)}
          placeholder="Pose ta question sur ta carrière musicale..."
          rows={4}
          style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box',resize:'none'}}/>
        <button onClick={ask} disabled={loading || !question}
          style={{width:'100%',background:'linear-gradient(135deg,#9B59B6,#3498db)',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
          {loading ? '⏳ Analyse en cours...' : '🤖 Demander à l\'IA Manager'}
        </button>
      </div>
      {response && (
        <div style={{background:'#0d0020',padding:'25px',borderRadius:'20px',border:'1px solid #9B59B6'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'15px'}}>
            <p style={{color:'#9B59B6',fontWeight:'bold',margin:0}}>🤖 Spotlift IA Manager</p>
            <button onClick={() => { navigator.clipboard.writeText(response); setCopiedResponse(true); setTimeout(() => setCopiedResponse(false), 2000); }}
              style={{background: copiedResponse ? '#1DB954' : '#1a0030',color: copiedResponse ? '#fff' : '#aaa',border:'1px solid #2d1040',padding:'6px 12px',borderRadius:'8px',cursor:'pointer',fontSize:'12px'}}>
              {copiedResponse ? '✅ Copié !' : '📋 Copier'}
            </button>
          </div>
          <p style={{color:'#ccc',lineHeight:'1.8',whiteSpace:'pre-wrap',margin:0}}>{response}</p>
        </div>
      )}
    </div>
  );
}

function MultiPlateformes({ user }: { user: any }) {
  const [spStreams, setSpStreams] = useState('');
  const [spFollowers, setSpFollowers] = useState('');
  const [ttViews, setTtViews] = useState('');
  const [ttFollowers, setTtFollowers] = useState('');
  const [igReach, setIgReach] = useState('');
  const [igFollowers, setIgFollowers] = useState('');
  const [ytViews, setYtViews] = useState('');
  const [ytSubs, setYtSubs] = useState('');
  const [result, setResult] = useState<any>(null);

  const analyze = () => {
    const sp = parseInt(spStreams)||0;
    const spF = parseInt(spFollowers)||0;
    const tt = parseInt(ttViews)||0;
    const ttF = parseInt(ttFollowers)||0;
    const ig = parseInt(igReach)||0;
    const igF = parseInt(igFollowers)||0;
    const yt = parseInt(ytViews)||0;
    const ytF = parseInt(ytSubs)||0;
    const totalF = spF+ttF+igF+ytF;
    const totalV = sp+tt+ig+yt;
    const platforms = [
      {name:'Spotify',color:'#1DB954',followers:spF,activity:sp,metric:'streams'},
      {name:'TikTok',color:'#ff0050',followers:ttF,activity:tt,metric:'vues'},
      {name:'Instagram',color:'#E1306C',followers:igF,activity:ig,metric:'reach'},
      {name:'YouTube',color:'#FF0000',followers:ytF,activity:yt,metric:'vues'},
    ];
    const best = platforms.reduce((a,b) => a.activity > b.activity ? a : b);
    const tip = best.name === 'TikTok' ? 'TikTok est ta plateforme principale — redirige vers Spotify avec un lien en bio.' :
      best.name === 'Spotify' ? 'Spotify performe bien — soumets plus de tracks aux curateurs.' :
      best.name === 'Instagram' ? 'Instagram est fort — convertis ton audience en auditeurs Spotify.' :
      'YouTube performe — crée des clips pour booster tes autres plateformes.';
    setResult({totalF, totalV, platforms, best, tip});
    fetch('/api/track-usage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id, toolName: 'Multi-Plateformes' }),
    }).catch(() => {});
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>📊 Dashboard Multi-Plateformes</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Centralise toutes tes stats en un seul endroit</p>
      <p style={{background:'#1a0030',color:'#9B59B6',fontSize:'13px',padding:'10px 14px',borderRadius:'10px',marginBottom:'20px',border:'1px solid #2d1040'}}>💡 Remplis un maximum de plateformes pour une vue d'ensemble fiable.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px',marginBottom:'20px'}}>
        {[
          {title:'🎵 Spotify',color:'#1DB954',fields:[{l:'Streams ce mois',v:spStreams,s:setSpStreams},{l:'Followers',v:spFollowers,s:setSpFollowers}]},
          {title:'📱 TikTok',color:'#ff0050',fields:[{l:'Vues ce mois',v:ttViews,s:setTtViews},{l:'Followers',v:ttFollowers,s:setTtFollowers}]},
          {title:'📸 Instagram',color:'#E1306C',fields:[{l:'Reach ce mois',v:igReach,s:setIgReach},{l:'Followers',v:igFollowers,s:setIgFollowers}]},
          {title:'🎬 YouTube',color:'#FF0000',fields:[{l:'Vues ce mois',v:ytViews,s:setYtViews},{l:'Abonnés',v:ytSubs,s:setYtSubs}]},
        ].map((p,i) => (
          <div key={i} style={{background:'#0d0020',padding:'20px',borderRadius:'15px',border:`1px solid ${p.color}33`}}>
            <p style={{color:p.color,fontWeight:'bold',marginBottom:'12px'}}>{p.title}</p>
            {p.fields.map((f,j) => (
              <div key={j} style={{marginBottom:'10px'}}>
                <label style={{color:'#aaa',fontSize:'12px',display:'block',marginBottom:'4px'}}>{f.l}</label>
                <input value={f.v} onChange={e => f.s(e.target.value)} placeholder="0"
                  style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'8px',padding:'8px',color:'#fff',boxSizing:'border-box'}}/>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={analyze}
        style={{width:'100%',background:'linear-gradient(135deg,#1DB954,#9B59B6)',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none',marginBottom:'20px'}}>
        📊 Analyser mes plateformes
      </button>
      {result && (
        <div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px',marginBottom:'15px'}}>
            <div style={{background:'#0d0020',padding:'20px',borderRadius:'12px',textAlign:'center',border:'1px solid #2d1040'}}>
              <div style={{fontSize:'32px',fontWeight:'bold',color:'#9B59B6'}}>{result.totalF.toLocaleString()}</div>
              <div style={{color:'#aaa',fontSize:'13px'}}>Total Followers</div>
            </div>
            <div style={{background:'#0d0020',padding:'20px',borderRadius:'12px',textAlign:'center',border:'1px solid #2d1040'}}>
              <div style={{fontSize:'32px',fontWeight:'bold',color:'#1DB954'}}>{result.totalV.toLocaleString()}</div>
              <div style={{color:'#aaa',fontSize:'13px'}}>Total Vues/Streams</div>
            </div>
          </div>
          <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',marginBottom:'15px'}}>
            <p style={{color:'#f39c12',fontWeight:'bold',margin:'0 0 5px 0'}}>🏆 Plateforme la plus performante</p>
            <p style={{color:'#ccc',margin:0}}>{result.best.name} avec {result.best.activity.toLocaleString()} {result.best.metric}</p>
          </div>
          {result.platforms.map((p:any,i:number) => (
            <div key={i} style={{background:'#0d0020',padding:'15px',borderRadius:'12px',marginBottom:'10px',display:'flex',justifyContent:'space-between',alignItems:'center',border:'1px solid #2d1040'}}>
              <div>
                <span style={{fontWeight:'bold',color:p.color}}>{p.name}</span>
                <br/>
                <span style={{color:'#aaa',fontSize:'12px'}}>{p.followers.toLocaleString()} followers</span>
              </div>
              <div style={{textAlign:'right'}}>
                <span style={{color:'#fff',fontWeight:'bold'}}>{p.activity.toLocaleString()}</span>
                <br/>
                <span style={{color:'#aaa',fontSize:'12px'}}>{p.metric}</span>
              </div>
            </div>
          ))}
          <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px'}}>
            <p style={{color:'#9B59B6',fontWeight:'bold',margin:'0 0 5px 0'}}>💡 Conseil IA</p>
            <p style={{color:'#ccc',fontSize:'13px',margin:0}}>{result.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Feedback({ user }: { user: any }) {
  const [note, setNote] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  const [envoye, setEnvoye] = useState(false);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!note) return;
    setLoading(true);
    try {
      await supabase.from('feedbacks').insert([{user_id: user?.id, note, commentaire, created_at: new Date()}]);
      setEnvoye(true);
    } catch {
      setEnvoye(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>💬 Feedback</h1>
      <p style={{color:'#aaa',marginBottom:'30px'}}>Aide-nous à améliorer Spotlift</p>
      {envoye ? (
        <div style={{background:'#0d0020',padding:'40px',borderRadius:'20px',textAlign:'center',border:'1px solid #1DB954'}}>
          <p style={{fontSize:'40px',margin:'0 0 15px 0'}}>🎉</p>
          <p style={{color:'#1DB954',fontWeight:'bold',fontSize:'20px',margin:0}}>Merci pour ton feedback !</p>
        </div>
      ) : (
        <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040'}}>
          <p style={{color:'#aaa',marginBottom:'15px'}}>Note ton expérience :</p>
          <div style={{display:'flex',gap:'15px',marginBottom:'25px'}}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setNote(n)}
                style={{fontSize:'32px',background:'none',border:'none',cursor:'pointer',opacity: note>=n ? 1 : 0.3,transform: note>=n ? 'scale(1.1)' : 'scale(1)',transition:'all 0.2s'}}>
                ⭐
              </button>
            ))}
          </div>
          <textarea value={commentaire} onChange={e => setCommentaire(e.target.value)}
            placeholder="Dis-nous ce que tu penses de Spotlift..."
            rows={4}
            style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'20px',boxSizing:'border-box',resize:'none'}}/>
          <button onClick={send} disabled={loading || !note}
            style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none'}}>
            {loading ? '⏳ Envoi...' : '💬 Envoyer le feedback'}
          </button>
        </div>
      )}
    </div>
  );
}
function Referral({ user, plan }: { user: any, plan: string }) {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ total: 0, accepted: 0 });

  useEffect(() => {
    const generateCode = async () => {
      const { data } = await supabase
        .from('referrals')
        .select('code')
        .eq('referrer_id', user?.id)
        .limit(1)
        .single();

      if (data?.code) {
        setCode(data.code);
      } else {
        const newCode = 'SPL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        await supabase.from('referrals').insert({
          referrer_id: user?.id,
          code: newCode,
          status: 'active'
        });
        setCode(newCode);
      }

      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact' })
        .eq('referrer_id', user?.id);
      setStats({ total: count || 0, accepted: 0 });
    };

    if (user?.id) generateCode();
  }, [user]);

  const referralLink = `https://getspotlift.com/inscription?ref=${code}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'8px'}}>🎁 Parrainer un ami</h1>
      <p style={{color:'#aaa',marginBottom:'25px'}}>Invite tes amis artistes et gagnez tous les deux 1 mois Pro gratuit !</p>

      <div style={{background:'linear-gradient(135deg,#1a0030,#0d0020)',padding:'30px',borderRadius:'20px',border:'1px solid #9B59B6',marginBottom:'20px',textAlign:'center'}}>
        <p style={{fontSize:'48px',margin:'0 0 10px 0'}}>🎁</p>
        <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'10px'}}>Toi + ton ami = 1 mois Pro gratuit chacun !</h2>
        <p style={{color:'#aaa',fontSize:'14px',marginBottom:'20px'}}>
          Pour chaque ami qui s'inscrit avec ton lien, vous recevez tous les deux 1 mois Pro gratuit.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px',marginBottom:'20px'}}>
          <div style={{background:'#0d0020',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
            <p style={{color:'#9B59B6',fontWeight:'bold',fontSize:'24px',margin:'0 0 5px 0'}}>{stats.total}</p>
            <p style={{color:'#aaa',fontSize:'13px',margin:0}}>Amis invités</p>
          </div>
          <div style={{background:'#0d0020',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
            <p style={{color:'#1DB954',fontWeight:'bold',fontSize:'24px',margin:'0 0 5px 0'}}>{stats.accepted}</p>
            <p style={{color:'#aaa',fontSize:'13px',margin:0}}>Mois Pro gagnés</p>
          </div>
        </div>
      </div>

      <div style={{background:'#0d0020',padding:'25px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
        <h3 style={{fontSize:'16px',fontWeight:'bold',marginBottom:'15px'}}>Ton lien de parrainage unique</h3>
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          <input value={referralLink} readOnly
            style={{flex:1,background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#9B59B6',fontSize:'13px'}}/>
          <button onClick={copyLink}
            style={{background: copied ? '#1DB954' : '#9B59B6',color:'#fff',padding:'12px 20px',borderRadius:'10px',border:'none',cursor:'pointer',fontWeight:'bold',whiteSpace:'nowrap'}}>
            {copied ? '✅ Copié !' : '📋 Copier'}
          </button>
        </div>
        <p style={{color:'#555',fontSize:'12px',marginTop:'10px'}}>Partage ce lien sur Instagram, TikTok, WhatsApp...</p>
      </div>

      <div style={{background:'#0d0020',padding:'25px',borderRadius:'20px',border:'1px solid #2d1040'}}>
        <h3 style={{fontSize:'16px',fontWeight:'bold',marginBottom:'15px'}}>Comment ça marche ?</h3>
        {[
          {num:'1',text:'Copie ton lien unique ci-dessus'},
          {num:'2',text:'Envoie-le à tes amis artistes'},
          {num:'3',text:'Ils s\'inscrivent via ton lien'},
          {num:'4',text:'Vous recevez tous les deux 1 mois Pro gratuit !'},
        ].map((s,i) => (
          <div key={i} style={{display:'flex',gap:'15px',alignItems:'center',marginBottom:'12px'}}>
            <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#9B59B6',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',flexShrink:0}}>
              {s.num}
            </div>
            <p style={{color:'#ccc',margin:0,fontSize:'14px'}}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
