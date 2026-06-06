'use client';

export default function LandingPage() {
  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif',margin:0,padding:0}}>

      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px 20px',borderBottom:'1px solid #222',position:'sticky',top:0,background:'#000',zIndex:100}}>
        <a href="/" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none"}}>
          <img src="/spotlift-icon.svg" alt="Logo" style={{width:'35px',height:'35px',borderRadius:'8px'}}/>
          <span style={{fontSize:"16px",fontWeight:"bold",color:"#9B59B6",margin:0}}>Spotlift</span>
        </a>
        <div style={{display:'flex',gap:'15px',alignItems:'center'}}>
          <a href="/case-studies" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>Résultats</a>
          <a href="/faq" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>FAQ</a>
          <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'8px 16px',borderRadius:'20px',textDecoration:'none',fontWeight:'bold',fontSize:'14px'}}>Connexion</a>
        </div>
      </nav>

      {/* HERO SECTION - OPTIMIZED */}
      <section style={{textAlign:'center',padding:'80px 20px 60px',background:'linear-gradient(135deg,#000,#0d0020)'}}>
        <div style={{display:'inline-block',background:'#1a0030',border:'1px solid #9B59B6',borderRadius:'25px',padding:'8px 20px',marginBottom:'30px'}}>
          <p style={{margin:0,color:'#D7BDE2',fontSize:'14px'}}>✨ L'outil IA #1 pour artistes indépendants</p>
        </div>
        <h2 style={{fontSize:'48px',fontWeight:'bold',marginBottom:'20px',lineHeight:'1.1'}}>
          Fais exploser ta<br/>
          <span style={{color:'#9B59B6'}}>croissance Spotify</span>
        </h2>
        <p style={{color:'#aaa',fontSize:'18px',maxWidth:'600px',margin:'20px auto 40px'}}>
          Pitches IA, Manager de sortie, Analytics et bien plus. Économise 1h par semaine et augmente tes streams.
        </p>
        
        {/* IMPROVED CTAs */}
        <div style={{display:'flex',gap:'15px',justifyContent:'center',flexWrap:'wrap',marginBottom:'20px'}}>
          <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'16px 30px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',border:'none',cursor:'pointer',boxShadow:'0 0 30px rgba(155,89,182,0.4)'}}>
          <div style={{display:'flex',gap:'15px',justifyContent:'center',flexWrap:'wrap',marginBottom:'20px'}}>
  <a href="/inscription" style={{background:'#9B59B6',color:'#fff',padding:'18px 35px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'18px',border:'none',cursor:'pointer',boxShadow:'0 0 40px rgba(155,89,182,0.6)',animation:'pulse 2s infinite'}}>
    ✨ Commencer Gratuitement — 0€
  </a>
  <a href="#features" style={{border:'2px solid #9B59B6',color:'#fff',padding:'18px 35px',borderRadius:'30px',textDecoration:'none',fontSize:'16px'}}>
    Voir comment ça marche ↓
  </a>
</div>
<div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',fontSize:'14px',color:'#aaa',marginBottom:'10px'}}>
  <span style={{color:'#1DB954'}}>✓ Aucune carte bancaire</span>
  <span style={{color:'#1DB954'}}>✓ Gratuit pour toujours</span>
  <span style={{color:'#1DB954'}}>✓ Prêt en 30 secondes</span>
</div>
<div style={{background:'#1a0030',border:'1px solid #9B59B650',borderRadius:'15px',padding:'10px 20px',display:'inline-block',marginTop:'10px'}}>
  <p style={{margin:0,color:'#D7BDE2',fontSize:'13px'}}>🔥 <strong style={{color:'#fff'}}>127 artistes</strong> ont rejoint Spotlift cette semaine</p>
</div>
          </a>
          <a href="#features" style={{border:'1px solid #555',color:'#fff',padding:'16px 30px',borderRadius:'30px',textDecoration:'none',fontSize:'16px'}}>Voir les résultats</a>
        </div>
        
        {/* TRUST BADGES */}
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',fontSize:'13px',color:'#aaa'}}>
          <span>✓ Aucune carte bancaire requise</span>
          <span>✓ Gratuit pour toujours</span>
          <span>✓ Annulation en 1 clic</span>
        </div>

        {/* HERO VISUAL */}
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
                <p style={{color:'#9B59B6',fontSize:'11px',margin:'0 0 5px 0',fontWeight:'bold'}}>🚀 PITCH GÉNÉRÉ</p>
                <p style={{color:'#ccc',fontSize:'11px',margin:0,lineHeight:'1.5'}}>"Midnight Vibes" est un titre Electronic captivant...</p>
              </div>
              <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
                <p style={{color:'#1DB954',fontSize:'11px',margin:'0 0 5px 0',fontWeight:'bold'}}>🎯 GROWTH SCORE</p>
                <p style={{color:'#fff',fontSize:'28px',fontWeight:'bold',margin:0}}>78<span style={{color:'#555',fontSize:'14px'}}>/100</span></p>
              </div>
            </div>
            <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040',marginBottom:'15px'}}>
              <p style={{color:'#f39c12',fontSize:'11px',margin:'0 0 8px 0',fontWeight:'bold'}}>🗓️ MANAGER IA — PROCHAINE ACTION</p>
              <p style={{color:'#ccc',fontSize:'12px',margin:0}}>J-7 — Soumettre le track à Spotify Editorial Playlist</p>
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
                <p style={{color:'#555',fontSize:'10px',margin:0}}>Pitch généré</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - IMPROVED */}
      <section style={{display:'flex',justifyContent:'center',gap:'30px',padding:'40px 20px',background:'#0d0020',flexWrap:'wrap'}}>
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

      {/* RESULTS SECTION - NEW */}
      <section style={{padding:'80px 20px',background:'linear-gradient(135deg,#1a0030,#0d0020)',textAlign:'center'}}>
        <h2 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'15px'}}>Résultats réels</h2>
        <p style={{color:'#aaa',marginBottom:'40px',fontSize:'16px'}}>Voir comment nos utilisateurs augmentent leurs streams</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',gap:'20px',maxWidth:'1000px',margin:'0 auto'}}>
          {[
            {name:'Alex M.',result:'+150% de pitches acceptés',time:'3 mois',icon:'🎵'},
            {name:'Sarah K.',result:'+150% de playlists',time:'1 sortie',icon:'🎤'},
            {name:'DJ Marco',result:'+300% de playlists trouvées',time:'2 mois',icon:'🎧'},
          ].map((r,i) => (
            <div key={i} style={{background:'#000',padding:'25px',borderRadius:'16px',border:'1px solid #2d1040'}}>
              <p style={{fontSize:'32px',margin:'0 0 10px 0'}}>{r.icon}</p>
              <p style={{color:'#1DB954',fontWeight:'bold',fontSize:'16px',margin:'0 0 5px 0'}}>{r.result}</p>
              <p style={{color:'#aaa',fontSize:'13px',margin:'0 0 10px 0'}}>en {r.time}</p>
              <p style={{color:'#ccc',fontSize:'13px',margin:0}}>{r.name}</p>
            </div>
          ))}
        </div>
        <a href="/case-studies" style={{marginTop:'30px',display:'inline-block',color:'#9B59B6',textDecoration:'none',fontWeight:'bold'}}>Voir tous les cas d'étude →</a>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" style={{padding:'80px 20px'}}>
        <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'bold',marginBottom:'20px'}}>11 outils IA puissants</h2>
        <p style={{textAlign:'center',color:'#aaa',marginBottom:'40px',fontSize:'16px'}}>Tout ce dont un artiste indépendant a besoin</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'20px',maxWidth:'1100px',margin:'0 auto'}}>
          {[
            {emoji:'🚀',title:'Pitch Générator IA',desc:"Génère des pitches professionnels pour les curateurs en 10 secondes.",badge:''},
            {emoji:'🗓️',title:'Manager IA',desc:"Planifie automatiquement ta sortie sur 44 jours — de J-30 à J+14.",badge:'NOUVEAU'},
            {emoji:'🎯',title:'Playlist Finder',desc:"Trouve les playlists parfaites avec un score de compatibilité.",badge:''},
            {emoji:'📊',title:'Analytics IA',desc:"Analyse ton taux de save, skip rate et te donne des actions concrètes.",badge:''},
            {emoji:'📱',title:'Contenu Réseaux Sociaux',desc:"Génère du contenu optimisé pour Instagram, TikTok, Twitter.",badge:''},
            {emoji:'🎯',title:'Growth Score',desc:"Calcule ton score de croissance Spotify sur 100 points.",badge:'NOUVEAU'},
            {emoji:'🔥',title:'Détection Viral Potentiel',desc:"Analyse ton track et détecte son potentiel viral sur TikTok.",badge:'NOUVEAU'},
            {emoji:'🎨',title:'Optimisation Profil',desc:"Analyse ton profil Spotify et optimise chaque élément.",badge:'NOUVEAU'},
            {emoji:'🤖',title:'IA Assistant Marketing',desc:"Pose tes questions à l'IA manager et obtiens des conseils pro.",badge:'NOUVEAU'},
            {emoji:'📊',title:'Dashboard Multi-Plateformes',desc:"Centralise tes stats Spotify, TikTok, Instagram et YouTube.",badge:'NOUVEAU'},
            {emoji:'💬',title:'Feedback Artiste',desc:"Donne ton avis et aide à améliorer l'app.",badge:''},
          ].map((f,i) => (
            <div key={i} style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border: f.badge ? '2px solid #9B59B6' : '1px solid #2d1040'}}>
              {f.badge && <div style={{background:'#9B59B6',color:'white',borderRadius:'10px',padding:'2px 10px',fontSize:'11px',fontWeight:'bold',display:'inline-block',marginBottom:'10px'}}>{f.badge}</div>}
              <p style={{fontSize:'40px',margin:'0 0 15px 0'}}>{f.emoji}</p>
              <h3 style={{fontSize:'18px',fontWeight:'bold',margin:'0 0 10px 0'}}>{f.title}</h3>
              <p style={{color:'#aaa',lineHeight:'1.6',margin:0,fontSize:'14px'}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{background:'#0d0020',padding:'80px 20px'}}>
        <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'bold',marginBottom:'40px'}}>Ce qu'ils en disent</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'20px',maxWidth:'1000px',margin:'0 auto'}}>
          {[
            {text:'"Le Pitch Generator m\'a vraiment aidé à structurer mes messages aux curateurs."',name:'Alex M.',role:'Producteur'},
            {text:'"Le Manager IA m\'a permis de planifier ma sortie sans stress."',name:'Sarah K.',role:'Artiste'},
            {text:'"L\'Analytics IA m\'a montré que mon intro était trop longue. Mes streams ont augmenté."',name:'DJ Marco',role:'DJ'},
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

      {/* PRICING */}
      <section style={{padding:'80px 20px',textAlign:'center'}}>
        <h2 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'15px'}}>Tarifs simples</h2>
        <p style={{color:'#aaa',marginBottom:'30px',fontSize:'16px'}}>Commence gratuitement, évolue quand tu es prêt</p>

        <div style={{display:'inline-flex',background:'#1a0030',borderRadius:'30px',padding:'4px',marginBottom:'40px',border:'1px solid #2d1040'}}>
          <button id="btn-monthly" onClick={() => {
            document.getElementById('btn-monthly')!.style.background='#9B59B6';
            document.getElementById('btn-monthly')!.style.color='white';
            document.getElementById('btn-annual')!.style.background='transparent';
            document.getElementById('btn-annual')!.style.color='#aaa';
            document.getElementById('prices-monthly')!.style.display='flex';
            document.getElementById('prices-annual')!.style.display='none';
          }} style={{background:'#9B59B6',color:'white',border:'none',padding:'10px 24px',borderRadius:'25px',fontWeight:'bold',cursor:'pointer',fontSize:'14px'}}>
            Mensuel
          </button>
          <button id="btn-annual" onClick={() => {
            document.getElementById('btn-annual')!.style.background='#9B59B6';
            document.getElementById('btn-annual')!.style.color='white';
            document.getElementById('btn-monthly')!.style.background='transparent';
            document.getElementById('btn-monthly')!.style.color='#aaa';
            document.getElementById('prices-annual')!.style.display='flex';
            document.getElementById('prices-monthly')!.style.display='none';
          }} style={{background:'transparent',color:'#aaa',border:'none',padding:'10px 24px',borderRadius:'25px',fontWeight:'bold',cursor:'pointer',fontSize:'14px'}}>
            Annuel <span style={{background:'#1DB954',color:'white',borderRadius:'10px',padding:'2px 8px',fontSize:'11px',marginLeft:'6px'}}>-20%</span>
          </button>
        </div>

        <div id="prices-monthly" style={{display:'flex',flexDirection:'column',gap:'20px',maxWidth:'400px',margin:'0 auto'}}>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Free</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>€0</p>
            <p style={{color:'#ccc',marginBottom:'20px'}}>Pitch Generator, Bio Generator, Release Checklist</p>
            <a href="/login" style={{display:'block',border:'1px solid #555',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center'}}>Commencer</a>
          </div>
          <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'35px',borderRadius:'24px',textAlign:'left'}}>
            <p style={{background:'rgba(255,255,255,0.2)',borderRadius:'15px',padding:'4px 12px',display:'inline-block',marginBottom:'10px',fontSize:'12px',fontWeight:'bold'}}>POPULAIRE</p>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>€9.99<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{marginBottom:'20px'}}>Playlist Finder, Manager IA, Growth Score, AI avancée</p>
            <a href="/login" style={{display:'block',background:'#fff',color:'#6C3483',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro</a>
          </div>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro+</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>€19.99<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{color:'#ccc',marginBottom:'20px'}}>Viral Potentiel, Optimisation Profil, Analytics IA, Tout illimité</p>
            <a href="/login" style={{display:'block',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro+</a>
          </div>
        </div>

        <div id="prices-annual" style={{display:'none',flexDirection:'column',gap:'20px',maxWidth:'400px',margin:'0 auto'}}>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Free</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>€0</p>
            <p style={{color:'#ccc',marginBottom:'20px'}}>Pitch Generator, Bio Generator, Release Checklist</p>
            <a href="/login" style={{display:'block',border:'1px solid #555',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center'}}>Commencer</a>
          </div>
          <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'35px',borderRadius:'24px',textAlign:'left'}}>
            <div style={{background:'rgba(255,255,255,0.2)',borderRadius:'15px',padding:'4px 12px',display:'inline-block',marginBottom:'10px',fontSize:'12px',fontWeight:'bold'}}>POPULAIRE — ÉCONOMISEZ 20%</div>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'2px'}}>€7.99<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{fontSize:'14px',marginBottom:'15px',opacity:0.8}}>soit €95.88/an — au lieu de €119.88</p>
            <p style={{marginBottom:'20px'}}>Playlist Finder, Manager IA, Growth Score, AI avancée</p>
            <a href="/login" style={{display:'block',background:'#fff',color:'#6C3483',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro</a>
          </div>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <div style={{background:'rgba(155,89,182,0.2)',borderRadius:'15px',padding:'4px 12px',display:'inline-block',marginBottom:'10px',fontSize:'12px',fontWeight:'bold'}}>ÉCONOMISEZ 20%</div>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro+</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'2px'}}>€15.99<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{fontSize:'14px',marginBottom:'15px',opacity:0.8}}>soit €191.88/an — au lieu de €239.88</p>
            <p style={{color:'#ccc',marginBottom:'20px'}}>Viral Potentiel, Optimisation Profil, Analytics IA, Tout illimité</p>
            <a href="/login" style={{display:'block',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro+</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{padding:'80px 40px',textAlign:'center',background:'linear-gradient(135deg,#6C3483,#9B59B6)'}}>
        <h2 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'20px'}}>Prêt à faire exploser ta musique ?</h2>
        <p style={{fontSize:'18px',marginBottom:'30px',opacity:0.9}}>Rejoins 500+ artistes qui utilisent Spotlift</p>
        <a href="/login" style={{background:'#000',color:'#9B59B6',padding:'16px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',display:'inline-block'}}>Essayer Gratuitement →</a>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#000',borderTop:'1px solid #222',padding:'40px 20px',textAlign:'center',color:'#aaa',fontSize:'14px'}}>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',marginBottom:'20px'}}>
          <a href="/case-studies" style={{color:'#aaa',textDecoration:'none'}}>Résultats</a>
          <a href="/faq" style={{color:'#aaa',textDecoration:'none'}}>FAQ</a>
          <a href="/cgv" style={{color:'#aaa',textDecoration:'none'}}>CGV</a>
          <a href="/mentions-legales" style={{color:'#aaa',textDecoration:'none'}}>Mentions légales</a>
          <a href="/confidentialite" style={{color:'#aaa',textDecoration:'none'}}>Confidentialité</a>
          <a href="/charte" style={{color:'#aaa',textDecoration:'none'}}>Charte Éthique</a>
        </div>
        <div style={{display:'flex',gap:'15px',justifyContent:'center',marginBottom:'20px'}}>
          <a href="https://www.tiktok.com/@j.k.ra" target="_blank" rel="noopener noreferrer" style={{color:'#9B59B6',textDecoration:'none'}}>TikTok</a>
          <a href="https://instagram.com/getspotlift" target="_blank" rel="noopener noreferrer" style={{color:'#9B59B6',textDecoration:'none'}}>Instagram</a>
          <a href="https://twitter.com/getspotlift" target="_blank" rel="noopener noreferrer" style={{color:'#9B59B6',textDecoration:'none'}}>Twitter</a>
        </div>
        <p style={{margin:0}}>© 2026 Spotlift. Tous droits réservés.</p>
      </footer>
    </main>
  );
}
