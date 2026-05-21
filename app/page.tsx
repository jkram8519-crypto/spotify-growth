'use client';

export default function LandingPage() {
  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif',margin:0,padding:0}}>

      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px 20px',borderBottom:'1px solid #222',position:'sticky',top:0,background:'#000',zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/spotlift-icon.svg" alt="Logo" style={{width:'35px',height:'35px',borderRadius:'8px'}}/>
          <h1 style={{fontSize:'16px',fontWeight:'bold',color:'#9B59B6',margin:0}}>Spotlift</h1>
        </div>
        <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'8px 16px',borderRadius:'20px',textDecoration:'none',fontWeight:'bold',fontSize:'14px'}}>Connexion</a>
      </nav>

      <section style={{textAlign:'center',padding:'80px 20px 60px'}}>
        <div style={{display:'inline-block',background:'#1a0030',border:'1px solid #9B59B6',borderRadius:'25px',padding:'8px 20px',marginBottom:'30px'}}>
          <p style={{margin:0,color:'#D7BDE2',fontSize:'14px'}}>L'outil IA numero 1 pour artistes independants</p>
        </div>
        <h2 style={{fontSize:'48px',fontWeight:'bold',marginBottom:'20px',lineHeight:'1.1'}}>
          Fais exploser ta<br/>
          <span style={{color:'#9B59B6'}}>croissance Spotify</span>
        </h2>
        <p style={{color:'#aaa',fontSize:'18px',maxWidth:'600px',margin:'20px auto 40px'}}>
          Pitches IA, Manager de sortie, Analytics et bien plus pour les artistes independants.
        </p>
        <div style={{display:'flex',gap:'15px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'16px 30px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px'}}>Commencer gratuitement</a>
          <a href="#features" style={{border:'1px solid #555',color:'#fff',padding:'16px 30px',borderRadius:'30px',textDecoration:'none',fontSize:'16px'}}>Voir les fonctionnalites</a>
        </div>
      </section>

      <section style={{display:'flex',justifyContent:'center',gap:'30px',padding:'40px 20px',background:'#0d0020',flexWrap:'wrap'}}>
        {[
          {value:'500+',label:'Artistes actifs'},
          {value:'10k+',label:'Pitches generes'},
          {value:'3x',label:'Plus de streams'},
          {value:'11',label:'Fonctionnalites IA'},
        ].map((s,i) => (
          <div key={i} style={{textAlign:'center',minWidth:'120px'}}>
            <p style={{fontSize:'36px',fontWeight:'bold',color:'#9B59B6',margin:'0 0 8px 0'}}>{s.value}</p>
            <p style={{color:'#aaa',margin:0,fontSize:'14px'}}>{s.label}</p>
          </div>
        ))}
      </section>

      <section id="features" style={{padding:'80px 20px'}}>
        <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'bold',marginBottom:'20px'}}>11 outils IA puissants</h2>
        <p style={{textAlign:'center',color:'#aaa',marginBottom:'40px',fontSize:'16px'}}>Tout ce dont un artiste independant a besoin</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'20px',maxWidth:'1100px',margin:'0 auto'}}>
          {[
            {emoji:'🚀',title:'Pitch Generator IA',desc:"Genere des pitches professionnels pour les curateurs en 10 secondes.",badge:''},
            {emoji:'🗓️',title:'Manager IA',desc:"Planifie automatiquement ta sortie sur 44 jours.",badge:'NOUVEAU'},
            {emoji:'🎯',title:'Playlist Finder',desc:"Trouve les playlists parfaites avec un score de compatibilite.",badge:''},
            {emoji:'📊',title:'Analytics IA',desc:"Analyse ton taux de save, skip rate et te donne des actions concretes.",badge:''},
            {emoji:'📱',title:'Contenu Reseaux Sociaux',desc:"Genere du contenu optimise pour Instagram, TikTok, Twitter.",badge:''},
            {emoji:'🎯',title:'Growth Score',desc:"Calcule ton score de croissance Spotify sur 100 points.",badge:'NOUVEAU'},
            {emoji:'🔥',title:'Detection Viral Potentiel',desc:"Analyse ton track et detecte son potentiel viral sur TikTok.",badge:'NOUVEAU'},
            {emoji:'🎨',title:'Optimisation Profil',desc:"Analyse ton profil Spotify et optimise chaque element.",badge:'NOUVEAU'},
            {emoji:'🤖',title:'IA Assistant Marketing',desc:"Pose tes questions a l'IA manager et obtiens des conseils pro.",badge:'NOUVEAU'},
            {emoji:'📊',title:'Dashboard Multi-Plateformes',desc:"Centralise tes stats Spotify, TikTok, Instagram et YouTube.",badge:'NOUVEAU'},
            {emoji:'💬',title:'Feedback Artiste',desc:"Donne ton avis et aide a ameliorer l'app.",badge:''},
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

      <section style={{background:'#0d0020',padding:'80px 20px'}}>
        <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'bold',marginBottom:'40px'}}>Ce qu'ils en disent</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'20px',maxWidth:'1000px',margin:'0 auto'}}>
          {[
            {text:'"Le Pitch Generator m\'a vraiment aide a structurer mes messages aux curateurs."',name:'Alex M.',role:'Producteur'},
            {text:'"Le Manager IA m\'a permis de planifier ma sortie sans stress."',name:'Sarah K.',role:'Artiste'},
            {text:'"L\'Analytics IA m\'a montre que mon intro etait trop longue. Mes streams ont augmente."',name:'DJ Marco',role:'DJ'},
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

      <section style={{padding:'80px 20px',textAlign:'center'}}>
        <h2 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'15px'}}>Tarifs simples</h2>
        <p style={{color:'#aaa',marginBottom:'40px',fontSize:'16px'}}>Commence gratuitement, evolue quand tu es pret</p>
        <div style={{display:'flex',flexDirection:'column',gap:'20px',maxWidth:'400px',margin:'0 auto'}}>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Free</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>0</p>
            <p style={{color:'#ccc',marginBottom:'20px'}}>Pitch Generator, Bio Generator, Release Checklist</p>
            <a href="/login" style={{display:'block',border:'1px solid #555',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center'}}>Commencer</a>
          </div>
          <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'35px',borderRadius:'24px',textAlign:'left'}}>
            <p style={{background:'rgba(255,255,255,0.2)',borderRadius:'15px',padding:'4px 12px',display:'inline-block',marginBottom:'10px',fontSize:'12px',fontWeight:'bold'}}>POPULAIRE</p>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>9.99/mois</p>
            <p style={{marginBottom:'20px'}}>Playlist Finder, Manager IA, Growth Score, AI avancee</p>
            <a href="/login" style={{display:'block',background:'#fff',color:'#6C3483',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro</a>
          </div>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro+</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'5px'}}>19.99/mois</p>
            <p style={{color:'#ccc',marginBottom:'20px'}}>Viral Potentiel, Optimisation Profil, Analytics IA, Tout illimite</p>
            <a href="/login" style={{display:'block',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro+</a>
          </div>
        </div>
      </section>

      <section style={{textAlign:'center',padding:'80px 20px',background:'linear-gradient(135deg,#0d0020,#1a0030)'}}>
        <h2 style={{fontSize:'40px',fontWeight:'bold',marginBottom:'20px',lineHeight:'1.2'}}>
          Pret a faire exploser<br/>
          <span style={{color:'#9B59B6'}}>ta musique ?</span>
        </h2>
        <p style={{color:'#aaa',marginBottom:'40px',fontSize:'18px'}}>Rejoins 500+ artistes qui utilisent Spotlift</p>
        <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'16px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'18px'}}>
          Commencer gratuitement
        </a>
      </section>

      <footer style={{padding:'30px 20px',borderTop:'1px solid #222',textAlign:'center'}}>
        <p style={{color:'#9B59B6',fontWeight:'bold',marginBottom:'15px'}}>Spotlift</p>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',marginBottom:'15px'}}>
          <a href="/cgv" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>CGV</a>
          <a href="/mentions-legales" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>Mentions Legales</a>
          <a href="/a-propos" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>A propos</a>
          <a href="/confidentialite" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>Confidentialite</a>
          <a href="/faq" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>FAQ</a>
        </div>
        <p style={{color:'#555',margin:0,fontSize:'14px'}}>2026 Spotlift. Tous droits reserves.</p>
      </footer>

    </main>
  );
}
