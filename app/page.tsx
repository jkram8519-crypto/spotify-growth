'use client';
import { useState, useEffect } from 'react';

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.includes('@')) return;
    setLoading(true);
    await fetch('/api/capture-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    setSent(true);
    setLoading(false);
  };

  return (
    <section style={{padding:'60px 40px',background:'#0d0020',textAlign:'center'}}>
      <h2 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'10px'}}>
        🎵 3 conseils gratuits pour percer sur Spotify
      </h2>
      <p style={{color:'#aaa',marginBottom:'30px',fontSize:'16px'}}>
        Reçois nos meilleures stratégies directement dans ta boîte mail
      </p>
      {sent ? (
        <div style={{background:'#1a0030',padding:'20px',borderRadius:'15px',border:'1px solid #1DB954',display:'inline-block'}}>
          <p style={{color:'#1DB954',fontWeight:'bold',fontSize:'18px',margin:0}}>
            ✅ Merci ! Vérifie ta boîte mail 🎵
          </p>
        </div>
      ) : (
        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap',maxWidth:'500px',margin:'0 auto'}}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ton@email.com"
            style={{flex:1,minWidth:'200px',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'14px',color:'#fff',fontSize:'15px'}}
          />
          <button onClick={submit} disabled={loading}
            style={{background:'#9B59B6',color:'#fff',padding:'14px 25px',borderRadius:'10px',border:'none',cursor:'pointer',fontWeight:'bold',fontSize:'15px',whiteSpace:'nowrap'}}>
            {loading ? '...' : 'Recevoir les conseils →'}
          </button>
        </div>
      )}
      <p style={{color:'#555',fontSize:'12px',marginTop:'15px'}}>
        Pas de spam. Désabonnement en 1 clic.
      </p>
    </section>
  );
}

export default function LandingPage() {
  const [lang, setLang] = useState<'fr'|'en'>('fr');
 useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    alert('DEBUG ref capturé: ' + ref);
    if (ref) {
      localStorage.setItem('signupSource', ref);
      alert('DEBUG localStorage sauvegardé: ' + localStorage.getItem('signupSource'));
    }
  }, []);
  const t = {
    fr: {
      badge: "L'outil IA #1 pour artistes independants",
      title1: "Fais exploser ta",
      title2: "croissance Spotify",
      subtitle: "Pitches IA, Manager de sortie, Analytics et bien plus. Economise 1h par semaine et augmente tes streams.",
      cta1: "Essayer Gratuitement",
      cta2: "Voir les resultats",
      trust1: "3 jours gratuits",
      trust2: "Carte requise",
      trust3: "Sans engagement",
    },
    en: {
      badge: "The #1 AI tool for independent artists",
      title1: "Explode your",
      title2: "Spotify growth",
      subtitle: "AI Pitches, Release Manager, Analytics and more. Save 1h per week and increase your streams.",
      cta1: "Try for Free",
      cta2: "See results",
      trust1: "3 days free trial",
      trust2: "Card required",
      trust3: "No commitment",
    }
  };

  return (
    <main style={{background:'#0a0015',color:'#fff',fontFamily:'sans-serif',margin:0,padding:0,overflowX:'hidden'}}>

      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px 20px',borderBottom:'1px solid #222',position:'sticky',top:0,background:'#000',zIndex:100}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
          <img src="/spotlift-icon.svg" alt="Logo" style={{width:'35px',height:'35px',borderRadius:'8px'}}/>
          <span style={{fontSize:'16px',fontWeight:'bold',color:'#9B59B6'}}>Spotlift</span>
        </a>
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          <a href="/blog" style={{color:'#aaa',textDecoration:'none'}}>Blog</a>
          <a href="/case-studies" style={{color:'#aaa',textDecoration:'none',fontSize:'14px',display:'none'}} className="desktop-nav">Resultats</a>
          <a href="/faq" style={{color:'#aaa',textDecoration:'none',fontSize:'14px',display:'none'}} className="desktop-nav">FAQ</a>
          <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} style={{background:'#1a0030',color:'#9B59B6',border:'1px solid #9B59B6',padding:'6px 12px',borderRadius:'15px',cursor:'pointer',fontSize:'13px',fontWeight:'bold'}}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'8px 16px',borderRadius:'20px',textDecoration:'none',fontWeight:'bold',fontSize:'14px'}}>Connexion</a>
        </div>
      </nav>

      <section style={{textAlign:'center',padding:'80px 20px 60px',background:'linear-gradient(135deg,#000,#0d0020)'}}>
        <div style={{display:'inline-block',background:'#1a0030',border:'1px solid #9B59B6',borderRadius:'25px',padding:'8px 20px',marginBottom:'30px'}}>
          <p style={{margin:0,color:'#D7BDE2',fontSize:'14px'}}>{t[lang].badge}</p>
        </div>
        <h2 style={{fontSize:'48px',fontWeight:'bold',marginBottom:'20px',lineHeight:'1.1'}}>
          {t[lang].title1}<br/>
          <span style={{color:'#9B59B6'}}>{t[lang].title2}</span>
        </h2>
        <p style={{color:'#aaa',fontSize:'18px',maxWidth:'600px',margin:'20px auto 40px'}}>
          {t[lang].subtitle}
        </p>
        <div style={{display:'flex',gap:'15px',justifyContent:'center',flexWrap:'wrap',marginBottom:'20px'}}>
          <a href="/inscription" style={{background:'#9B59B6',color:'#fff',padding:'16px 30px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',boxShadow:'0 0 30px rgba(155,89,182,0.4)'}}>
            {t[lang].cta1}
          </a>
          <a href="#features" style={{border:'1px solid #555',color:'#fff',padding:'16px 30px',borderRadius:'30px',textDecoration:'none',fontSize:'16px'}}>
            {t[lang].cta2}
          </a>
        </div>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',fontSize:'13px',color:'#aaa'}}>
          <span style={{color:'#1DB954'}}>✓ {t[lang].trust1}</span>
          <span style={{color:'#1DB954'}}>✓ {t[lang].trust2}</span>
          <span style={{color:'#1DB954'}}>✓ {t[lang].trust3}</span>
        </div>

        <div style={{marginTop:'60px',display:'flex',justifyContent:'center'}}>
          <div style={{background:'#0d0020',border:'1px solid #2d1040',borderRadius:'20px',padding:'25px',maxWidth:'600px',width:'100%',boxShadow:'0 0 60px rgba(155,89,182,0.15)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',borderBottom:'1px solid #2d1040',paddingBottom:'15px'}}>
              <div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#e74c3c'}}/>
              <div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#f39c12'}}/>
              <div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#1DB954'}}/>
              <span style={{color:'#555',fontSize:'13px',marginLeft:'10px'}}>Spotlift Dashboard</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px',marginBottom:'15px'}}>
              <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
                <p style={{color:'#9B59B6',fontSize:'11px',margin:'0 0 5px 0',fontWeight:'bold'}}>PITCH GENERE</p>
                <p style={{color:'#ccc',fontSize:'11px',margin:0,lineHeight:'1.5'}}>"Midnight Vibes" est un titre Electronic captivant...</p>
              </div>
              <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
                <p style={{color:'#1DB954',fontSize:'11px',margin:'0 0 5px 0',fontWeight:'bold'}}>GROWTH SCORE</p>
                <p style={{color:'#fff',fontSize:'28px',fontWeight:'bold',margin:0}}>78<span style={{color:'#555',fontSize:'14px'}}>/100</span></p>
              </div>
            </div>
            <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040',marginBottom:'15px'}}>
              <p style={{color:'#f39c12',fontSize:'11px',margin:'0 0 8px 0',fontWeight:'bold'}}>MANAGER IA - PROCHAINE ACTION</p>
              <p style={{color:'#ccc',fontSize:'12px',margin:0}}>J-7 - Soumettre le track a Spotify Editorial Playlist</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
              <div style={{background:'#1a0030',padding:'12px',borderRadius:'10px',textAlign:'center',border:'1px solid #2d1040'}}>
                <p style={{color:'#9B59B6',fontWeight:'bold',fontSize:'18px',margin:0}}>98%</p>
                <p style={{color:'#555',fontSize:'10px',margin:0}}>Match playlist</p>
              </div>
              <div style={{background:'#1a0030',padding:'12px',borderRadius:'10px',textAlign:'center',border:'1px solid #2d1040'}}>
                <p style={{color:'#1DB954',fontWeight:'bold',fontSize:'18px',margin:0}}>3x</p>
                <p style={{color:'#555',fontSize:'10px',margin:0}}>Plus de streams</p>
              </div>
              <div style={{background:'#1a0030',padding:'12px',borderRadius:'10px',textAlign:'center',border:'1px solid #2d1040'}}>
                <p style={{color:'#f39c12',fontWeight:'bold',fontSize:'18px',margin:0}}>10s</p>
                <p style={{color:'#555',fontSize:'10px',margin:0}}>Pitch genere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{display:'flex',justifyContent:'center',gap:'30px',padding:'40px 40px',background:'#0d0020',flexWrap:'wrap'}}>
        {[
          {value:'500+',label:'Artistes actifs',icon:'👥'},
          {value:'Gratuit',label:'Pour commencer',icon:'💰'},
          {value:'11',label:'Outils IA',icon:'🤖'},
          {value:'+10%',label:'Streams en moyenne',icon:'📈'},
        ].map((s,i) => (
          <div key={i} style={{textAlign:'center',minWidth:'120px'}}>
            <p style={{fontSize:'28px',margin:'0 0 5px 0'}}>{s.icon}</p>
            <p style={{fontSize:'28px',fontWeight:'bold',color:'#9B59B6',margin:'0 0 8px 0'}}>{s.value}</p>
            <p style={{color:'#aaa',margin:0,fontSize:'14px'}}>{s.label}</p>
          </div>
        ))}
      </section>

      <section style={{padding:'80px 40px',background:'linear-gradient(135deg,#1a0030,#0d0020)',textAlign:'center'}}>
        <h2 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'15px'}}>Resultats reels</h2>
        <p style={{color:'#aaa',marginBottom:'40px',fontSize:'16px'}}>Voir comment nos utilisateurs augmentent leurs streams</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',gap:'20px',maxWidth:'1000px',margin:'0 auto'}}>
          {[
            {name:'Alex M.',result:'+150% de pitches acceptes',time:'3 mois',icon:'🎵'},
            {name:'Sarah K.',result:'+150% de playlists',time:'1 sortie',icon:'🎤'},
            {name:'DJ Marco',result:'+300% de playlists trouvees',time:'2 mois',icon:'🎧'},
          ].map((r,i) => (
            <div key={i} style={{background:'#000',padding:'25px',borderRadius:'16px',border:'1px solid #2d1040'}}>
              <p style={{fontSize:'32px',margin:'0 0 10px 0'}}>{r.icon}</p>
              <p style={{color:'#1DB954',fontWeight:'bold',fontSize:'16px',margin:'0 0 5px 0'}}>{r.result}</p>
              <p style={{color:'#aaa',fontSize:'13px',margin:'0 0 10px 0'}}>en {r.time}</p>
              <p style={{color:'#ccc',fontSize:'13px',margin:0}}>{r.name}</p>
            </div>
          ))}
        </div>
        <a href="/case-studies" style={{marginTop:'30px',display:'inline-block',color:'#9B59B6',textDecoration:'none',fontWeight:'bold'}}>Voir tous les cas d&apos;etude →</a>
      </section>

      <section id="features" style={{padding:'80px 40px'}}>
        <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'bold',marginBottom:'20px'}}>11 outils IA puissants</h2>
        <p style={{textAlign:'center',color:'#aaa',marginBottom:'40px',fontSize:'16px'}}>Tout ce dont un artiste independant a besoin</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'20px',maxWidth:'1100px',margin:'0 auto'}}>
          {[
            {emoji:'🚀',title:'Pitch Generator IA',desc:'Genere des pitches professionnels en 10 secondes.',badge:''},
            {emoji:'🗓️',title:'Manager IA',desc:'Planifie ta sortie sur 44 jours automatiquement.',badge:'NOUVEAU'},
            {emoji:'🎯',title:'Playlist Finder',desc:'Trouve les playlists parfaites avec un score de compatibilite.',badge:''},
            {emoji:'📊',title:'Analytics IA',desc:'Analyse tes stats et donne des actions concretes.',badge:''},
            {emoji:'📱',title:'Contenu Reseaux Sociaux',desc:'Genere du contenu pour Instagram, TikTok.',badge:''},
            {emoji:'🎯',title:'Growth Score',desc:'Calcule ton score de croissance Spotify sur 100 points.',badge:'NOUVEAU'},
            {emoji:'🔥',title:'Detection Viral Potentiel',desc:'Analyse ton track et detecte son potentiel viral sur TikTok.',badge:'NOUVEAU'},
            {emoji:'🎨',title:'Optimisation Profil',desc:'Analyse ton profil Spotify et optimise chaque element.',badge:'NOUVEAU'},
            {emoji:'🤖',title:'IA Assistant Marketing',desc:"Pose tes questions a l'IA manager.",badge:'NOUVEAU'},
            {emoji:'📊',title:'Dashboard Multi-Plateformes',desc:'Centralise tes stats Spotify, TikTok, Instagram.',badge:'NOUVEAU'},
            {emoji:'💬',title:'Feedback Artiste',desc:"Donne ton avis et aide a ameliorer l'app.",badge:''},
          ].map((f,i) => (
            <div key={i} style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:f.badge?'2px solid #9B59B6':'1px solid #2d1040'}}>
              {f.badge && <div style={{background:'#9B59B6',color:'white',borderRadius:'10px',padding:'2px 10px',fontSize:'11px',fontWeight:'bold',display:'inline-block',marginBottom:'10px'}}>{f.badge}</div>}
              <p style={{fontSize:'40px',margin:'0 0 15px 0'}}>{f.emoji}</p>
              <h3 style={{fontSize:'18px',fontWeight:'bold',margin:'0 0 10px 0'}}>{f.title}</h3>
              <p style={{color:'#aaa',lineHeight:'1.6',margin:0,fontSize:'14px'}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:'#0d0020',padding:'80px 40px'}}>
        <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'bold',marginBottom:'40px'}}>Ce qu'ils en disent</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'20px',maxWidth:'1000px',margin:'0 auto'}}>
          {[
            {text:'"Le Pitch Generator m a vraiment aide a structurer mes messages aux curateurs."',name:'Alex M.',role:'Producteur'},
            {text:'"Le Manager IA m a permis de planifier ma sortie sans stress."',name:'Sarah K.',role:'Artiste'},
            {text:'"L Analytics IA m a montre que mon intro etait trop longue. Mes streams ont augmente."',name:'DJ Marco',role:'DJ'},
          ].map((t,i) => (
            <div key={i} style={{background:'#000',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040'}}>
              <p style={{color:'#ccc',lineHeight:'1.7',margin:'0 0 20px 0',fontStyle:'italic'}}>{t.text}</p>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'linear-gradient(135deg,#9B59B6,#6C3483)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>🎵</div>
                <div>
                  <p style={{fontWeight:'bold',margin:0}}>{t.name}</p>
                  <p style={{color:'#9B59B6',margin:0,fontSize:'14px'}}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'80px 40px',textAlign:'center'}}>
        <h2 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'15px'}}>Tarifs simples</h2>
        <p style={{color:'#aaa',marginBottom:'40px',fontSize:'16px'}}>Commence gratuitement, evolue quand tu es pret</p>
        <div style={{display:'flex',flexDirection:'column',gap:'20px',maxWidth:'400px',margin:'0 auto'}}>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Free</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>0€</p>
            <p style={{color:'#ccc',marginBottom:'20px'}}>Pitch Generator, Bio Generator, Release Checklist</p>
            <a href="/inscription" style={{display:'block',border:'1px solid #555',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center'}}>Commencer</a>
          </div>
          <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'35px',borderRadius:'24px',textAlign:'left'}}>
            <p style={{background:'rgba(255,255,255,0.2)',borderRadius:'15px',padding:'4px 12px',display:'inline-block',marginBottom:'10px',fontSize:'12px',fontWeight:'bold'}}>POPULAIRE</p>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>9.99€<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{marginBottom:'10px'}}>Playlist Finder, Manager IA, Growth Score, AI avancee</p>
            <a href="/pro" style={{color:'rgba(255,255,255,0.8)',fontSize:'13px',display:'block',marginBottom:'15px'}}>Voir ce qui est inclus →</a>
            <a href="/inscription" style={{display:'block',background:'#fff',color:'#6C3483',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro</a>
          </div>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'2px solid #9B59B6',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro+</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>19.99€<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{color:'#ccc',marginBottom:'10px'}}>Viral Potentiel, Optimisation Profil, Analytics IA, Tout illimite</p>
            <a href="/pro-plus" style={{color:'#9B59B6',fontSize:'13px',display:'block',marginBottom:'15px'}}>Voir ce qui est inclus →</a>
            <a href="/inscription" style={{display:'block',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro+</a>
          </div>
        </div>
      </section>  

      <EmailCapture />

      <section style={{padding:'80px 40px',textAlign:'center',background:'linear-gradient(135deg,#6C3483,#9B59B6)'}}>
        <h2 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'20px'}}>Pret a faire exploser ta musique ?</h2>
        <p style={{fontSize:'18px',marginBottom:'30px',opacity:0.9}}>Rejoins 500+ artistes qui utilisent Spotlift</p>
        <a href="/inscription" style={{background:'#000',color:'#9B59B6',padding:'16px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',display:'inline-block'}}>Essayer Gratuitement →</a>
      </section>

      <footer style={{background:'#000',borderTop:'1px solid #222',padding:'40px 40px',textAlign:'center',color:'#aaa',fontSize:'14px'}}>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',marginBottom:'20px'}}>
          <a href="/case-studies" style={{color:'#aaa',textDecoration:'none'}}>Resultats</a>
          <a href="/faq" style={{color:'#aaa',textDecoration:'none'}}>FAQ</a>
          <a href="/cgv" style={{color:'#aaa',textDecoration:'none'}}>CGV</a>
          <a href="/mentions-legales" style={{color:'#aaa',textDecoration:'none'}}>Mentions legales</a>
          <a href="/confidentialite" style={{color:'#aaa',textDecoration:'none'}}>Confidentialite</a>
          <a href="/charte" style={{color:'#aaa',textDecoration:'none'}}>Charte Ethique</a>
          <a href="/case-studies" style={{color:'#aaa',textDecoration:'none'}}>Temoignages</a>
        </div>
        <div style={{display:'flex',gap:'15px',justifyContent:'center',marginBottom:'20px'}}>
          <a href="https://www.tiktok.com/@j.k.ra" target="_blank" rel="noopener noreferrer" style={{color:'#9B59B6',textDecoration:'none'}}>TikTok</a>
          <a href="https://instagram.com/getspotlift" target="_blank" rel="noopener noreferrer" style={{color:'#9B59B6',textDecoration:'none'}}>Instagram</a>
        </div>
        <p style={{margin:0}}>2026 Spotlift. Tous droits reserves.</p>
        <p style={{margin:'10px 0 0 0',fontSize:'11px',opacity:0.5}}>
          <a href="https://www.aitoolzdir.com" target="_blank" rel="noopener noreferrer" style={{color:'#666',textDecoration:'none'}}>AI Toolz Dir</a>
        </p>
      </footer>

    </main>
  );
}