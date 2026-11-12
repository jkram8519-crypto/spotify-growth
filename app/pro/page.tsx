export default function ProPage() {
  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif',minHeight:'100vh',padding:'60px 20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        
        <div style={{textAlign:'center',marginBottom:'50px'}}>
          <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',borderRadius:'20px',padding:'30px',marginBottom:'30px'}}>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'14px',margin:'0 0 10px 0',fontWeight:'bold'}}>PLAN POPULAIRE</p>
            <h1 style={{fontSize:'42px',fontWeight:'bold',margin:'0 0 10px 0'}}>Plan Pro</h1>
            <p style={{fontSize:'48px',fontWeight:'bold',margin:'0 0 5px 0'}}>9.99€<span style={{fontSize:'18px',opacity:0.8}}>/mois</span></p>
            <p style={{opacity:0.8,margin:'0 0 20px 0'}}>ou 7.99€/mois en annuel — économisez 20%</p>
            <a href="/pricing" style={{background:'#fff',color:'#6C3483',padding:'14px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',display:'inline-block'}}>Commencer Pro</a>
          </div>
        </div>

        <h2 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'12px',textAlign:'center'}}>Ce que tu obtiens avec le Plan Pro</h2>
        <p style={{color:'#aaa',textAlign:'center',margin:'0 0 30px 0',lineHeight:1.6}}>Ton plan de sortie, ses rappels et le générateur de pitch restent gratuits. Pro ajoute les outils qui t&apos;aident à faire chaque étape.</p>

        {[
          {emoji:'🎧',titre:'Playlist Finder',desc:'Trouve de vraies playlists Spotify de ton genre et de ton ambiance, avec un lien direct pour les écouter et une checklist anti-arnaque avant de contacter un curateur.',badge:''},
          {emoji:'📱',titre:'Publications pour les réseaux',desc:'Des textes prêts à publier pour Instagram, TikTok, X et email, pour annoncer ta sortie et la faire vivre.',badge:''},
          {emoji:'🎬',titre:'Script vidéo IA',desc:'Un script complet pour tes vidéos TikTok et Reels : accroche, plans, texte à l\'écran.',badge:''},
          {emoji:'📊',titre:'Analyse de tes stats',desc:'Saisis tes chiffres Spotify for Artists (écoutes, enregistrements, playlists) et reçois des recommandations concrètes.',badge:''},
          {emoji:'🔥',titre:'Potentiel viral',desc:'Décris ton morceau (intro, drop, tempo, accroche) et reçois des conseils pour choisir et monter ton extrait TikTok ou Reels.',badge:''},
          {emoji:'🎨',titre:'Optimisation du profil artiste',desc:'Réponds à quelques questions sur ton profil Spotify (photo, bio, liens, Artist Pick) et reçois les priorités à corriger.',badge:''},
          {emoji:'🌐',titre:'Vue multi-plateformes',desc:'Saisis tes chiffres Spotify, TikTok, Instagram et YouTube pour les voir côte à côte sur un seul écran.',badge:''},
          {emoji:'🤖',titre:'Assistant IA marketing',desc:'Pose tes questions sur ta sortie, ton marketing ou ta stratégie, et reçois une réponse adaptée à ta situation.',badge:''},
        ].map((f,i) => (
          <div key={i} className="feat-card" style={{background:'#0d0020',padding:'25px',borderRadius:'16px',marginBottom:'15px',border:'1px solid #2d1040',display:'flex',gap:'20px',alignItems:'flex-start'}}>
            <span style={{fontSize:'36px',flexShrink:0}}>{f.emoji}</span>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px',flexWrap:'wrap'}}>
                <h3 style={{fontSize:'18px',fontWeight:'bold',margin:0}}>{f.titre}</h3>
                {f.badge && <span style={{background:'#9B59B6',color:'#fff',fontSize:'11px',padding:'2px 8px',borderRadius:'10px',fontWeight:'bold'}}>{f.badge}</span>}
              </div>
              <p style={{color:'#aaa',margin:0,lineHeight:'1.7',fontSize:'14px'}}>{f.desc}</p>
            </div>
            <span className="feat-check" style={{color:'#1DB954',fontSize:'24px',flexShrink:0}}>✓</span>
          </div>
        ))}

        <div style={{background:'linear-gradient(135deg,#1a0030,#0d0020)',padding:'30px',borderRadius:'20px',border:'1px solid #9B59B6',marginTop:'40px',textAlign:'center'}}>
          <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'10px'}}>Garanties Pro</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'15px',marginBottom:'25px'}}>
            {['Annulation en 1 clic','Sans engagement','Support par email','Accès immédiat'].map((g,i) => (
              <div key={i} style={{background:'#0d0020',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
                <p style={{color:'#1DB954',margin:'0 0 5px 0',fontSize:'20px'}}>✓</p>
                <p style={{color:'#ccc',margin:0,fontSize:'14px'}}>{g}</p>
              </div>
            ))}
          </div>
          <a href="/pricing" style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',color:'#fff',padding:'16px 50px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'18px',display:'inline-block',boxShadow:'0 0 30px rgba(155,89,182,0.4)'}}>
            Commencer Pro — 9.99€/mois
          </a>
          <p style={{color:'#555',marginTop:'15px',fontSize:'13px'}}>Essai Pro de 3 jours offert à l'inscription, sans carte bancaire</p>
        </div>

        <div style={{textAlign:'center',marginTop:'30px'}}>
          <a href="/" style={{color:'#555',textDecoration:'none',fontSize:'14px'}}>← Retour à l'accueil</a>
        </div>

      </div>
    </main>
  );
}
