'use client';

export default function LandingPage() {
  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif',margin:0,padding:0}}>

      {/* NAVBAR */}
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px 20px',borderBottom:'1px solid #222',position:'sticky',top:0,background:'#000',zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/spotify-growth-icon.png" alt="Logo" style={{width:'35px',height:'35px',borderRadius:'8px'}}/>
          <h1 style={{fontSize:'16px',fontWeight:'bold',color:'#9B59B6',margin:0}}>Spotlift</h1>
        </div>
        <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'8px 16px',borderRadius:'20px',textDecoration:'none',fontWeight:'bold',fontSize:'14px'}}>Connexion</a>
      </nav>

      {/* HERO */}
      <section style={{textAlign:'center',padding:'80px 20px 60px'}}>
        <div style={{display:'inline-block',background:'#1a0030',border:'1px solid #9B59B6',borderRadius:'25px',padding:'8px 20px',marginBottom:'30px'}}>
          <p style={{margin:0,color:'#D7BDE2',fontSize:'14px'}}>🚀 L'outil IA numéro 1 pour artistes indépendants</p>
        </div>
        <h2 style={{fontSize:'48px',fontWeight:'bold',marginBottom:'20px',lineHeight:'1.1',margin:'0 0 20px 0'}}>
          Fais exploser ta<br/>
          <span style={{color:'#9B59B6'}}>croissance Spotify</span>
        </h2>
        <p style={{color:'#aaa',fontSize:'18px',maxWidth:'600px',margin:'20px auto 40px'}}>
          Génère des pitches professionnels, trouve des playlists et suis tes performances — tout en un.
        </p>
        <div style={{display:'flex',gap:'15px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'16px 30px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px'}}>
            Commencer gratuitement →
          </a>
          <a href="#features" style={{border:'1px solid #555',color:'#fff',padding:'16px 30px',borderRadius:'30px',textDecoration:'none',fontSize:'16px'}}>
            Voir les fonctionnalités
          </a>
        </div>
      </section>

      {/* STATS */}
      <section style={{display:'flex',justifyContent:'center',gap:'30px',padding:'40px 20px',background:'#0d0020',flexWrap:'wrap'}}>
        {[
          {value:'500+',label:'Artistes actifs'},
          {value:'10k+',label:'Pitches générés'},
          {value:'3x',label:'Plus de streams'},
          {value:'€9.99',label:'Par mois seulement'},
        ].map((s,i) => (
          <div key={i} style={{textAlign:'center',minWidth:'120px'}}>
            <p style={{fontSize:'36px',fontWeight:'bold',color:'#9B59B6',margin:'0 0 8px 0'}}>{s.value}</p>
            <p style={{color:'#aaa',margin:0,fontSize:'14px'}}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section id="features" style={{padding:'80px 20px'}}>
        <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'bold',marginBottom:'20px'}}>Tout ce dont tu as besoin</h2>
        <p style={{textAlign:'center',color:'#aaa',marginBottom:'40px',fontSize:'16px'}}>Des outils professionnels à prix accessible</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'20px',maxWidth:'1000px',margin:'0 auto'}}>
          {[
            {emoji:'🚀',title:'Pitch Generator IA',desc:"Génère des pitches professionnels pour les curateurs de playlist en quelques secondes."},
            {emoji:'🎯',title:'Playlist Finder',desc:"Trouve les playlists parfaites pour ton genre et contacte les curateurs directement."},
            {emoji:'📊',title:'Analytics',desc:"Suis tes streams, saves et performances en temps réel depuis ton dashboard."},
            {emoji:'📱',title:'App Mobile',desc:"Gère ta croissance depuis ton téléphone avec notre app iOS et Android."},
            {emoji:'🤖',title:'IA Avancée',desc:"Propulsé par l'intelligence artificielle pour des résultats professionnels."},
            {emoji:'💰',title:'Prix Abordable',desc:"À partir de €9.99/mois, bien moins cher que les agences traditionnelles."},
          ].map((f,i) => (
            <div key={i} style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040'}}>
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
            {text:'"En 2 semaines j\'ai eu 3 placements en playlist. Incroyable !"',name:'Alex M.',role:'Producteur'},
            {text:'"L\'app mobile est parfaite. Je gère tout depuis mon téléphone."',name:'Sarah K.',role:'Artiste'},
            {text:'"J\'ai multiplié mes streams par 3 en un mois."',name:'DJ Marco',role:'DJ'},
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
        <p style={{color:'#aaa',marginBottom:'40px',fontSize:'16px'}}>Commence gratuitement, évolue quand tu es prêt</p>
        <div style={{display:'flex',flexDirection:'column',gap:'20px',maxWidth:'400px',margin:'0 auto'}}>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Free</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>€0</p>
            <p style={{color:'#aaa',marginBottom:'20px',fontSize:'14px'}}>Pour commencer</p>
            <p style={{color:'#ccc',marginBottom:'20px'}}>✅ Pitch Generator • ✅ Bio Generator • ✅ Release Checklist</p>
            <a href="/login" style={{display:'block',border:'1px solid #555',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center'}}>Commencer</a>
          </div>
          <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'35px',borderRadius:'24px',textAlign:'left'}}>
            <p style={{background:'rgba(255,255,255,0.2)',borderRadius:'15px',padding:'4px 12px',display:'inline-block',marginBottom:'10px',fontSize:'12px',fontWeight:'bold'}}>⭐ POPULAIRE</p>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>€9.99<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{marginBottom:'20px',opacity:0.9}}>✅ Playlist Finder • ✅ Release Planner • ✅ AI avancée</p>
            <a href="/login" style={{display:'block',background:'#fff',color:'#6C3483',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro</a>
          </div>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro+</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>€19.99<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{color:'#aaa',marginBottom:'20px',fontSize:'14px'}}>Le plan ultime</p>
            <p style={{color:'#ccc',marginBottom:'20px'}}>✅ Spotify Analytics • ✅ Growth AI • ✅ Marketing Auto</p>
            <a href="/login" style={{display:'block',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro+</a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{textAlign:'center',padding:'80px 20px',background:'linear-gradient(135deg,#0d0020,#1a0030)'}}>
        <h2 style={{fontSize:'40px',fontWeight:'bold',marginBottom:'20px',lineHeight:'1.2'}}>
          Prêt à faire exploser<br/>
          <span style={{color:'#9B59B6'}}>ta musique ?</span>
        </h2>
        <p style={{color:'#aaa',marginBottom:'40px',fontSize:'18px'}}>Rejoins 500+ artistes qui utilisent Spotlift</p>
        <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'16px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'18px'}}>
          Commencer gratuitement →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'30px 20px',borderTop:'1px solid #222',textAlign:'center'}}>
        <p style={{color:'#9B59B6',fontWeight:'bold',marginBottom:'15px'}}>🎵 Spotlift</p>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',marginBottom:'15px'}}>
          <a href="/cgv" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>CGV</a>
          <a href="/mentions-legales" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>Mentions Légales</a>
          <a href="/a-propos" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>À propos</a>
        </div>
        <p style={{color:'#555',margin:0,fontSize:'14px'}}>© 2026 Spotlift. Tous droits réservés.</p>
      </footer>

    </main>
  );
}