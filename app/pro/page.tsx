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

        <h2 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'30px',textAlign:'center'}}>Ce que tu obtiens avec le Plan Pro</h2>

        {[
          {emoji:'🚀',titre:'Pitch Generator IA — Illimité',desc:'Génère autant de pitches professionnels que tu veux en 10 secondes. L\'IA adapte chaque pitch au genre musical et au statut du track (à venir ou déjà sorti). Recherche de tracks directement sur Spotify pour des pitches ultra-personnalisés.',badge:'ILLIMITÉ'},
          {emoji:'🗓️',titre:'Manager IA — Planning 44 jours',desc:'Planifie automatiquement toute ta stratégie de sortie de J-30 à J+14. Chaque jour une action précise : soumission playlists, posts réseaux sociaux, pitches curateurs, relances. Plus jamais de sortie désorganisée.',badge:'NOUVEAU'},
          {emoji:'🎯',titre:'Playlist Finder avec Score de Match',desc:'Trouve les playlists Spotify les plus compatibles avec ton style musical. Chaque playlist est accompagnée d\'un score de compatibilité en pourcentage pour maximiser tes chances d\'acceptation.',badge:''},
          {emoji:'📊',titre:'Analytics IA — Recommandations Actionnables',desc:'Analyse ton taux de save, skip rate, et toutes tes métriques Spotify. L\'IA génère des recommandations concrètes pour améliorer tes performances semaine après semaine.',badge:''},
          {emoji:'🎯',titre:'Growth Score sur 100',desc:'Calcule ton score de croissance Spotify sur 100 points en analysant ta popularité, tes followers, tes streams et tes playlists. Suis ton évolution chaque semaine.',badge:'NOUVEAU'},
          {emoji:'📱',titre:'Générateur Contenu Réseaux Sociaux',desc:'Génère du contenu optimisé pour Instagram, TikTok, Twitter et Email. Des posts prêts à publier adaptés à chaque plateforme pour promouvoir ta musique efficacement.',badge:''},
          {emoji:'🤖',titre:'IA Assistant Marketing',desc:'Pose tes questions à l\'IA manager et obtiens des conseils pro instantanés sur ta stratégie musicale, ton marketing, et ta croissance Spotify.',badge:''},
          {emoji:'📊',titre:'Dashboard Multi-Plateformes',desc:'Centralise toutes tes statistiques Spotify, TikTok, Instagram et YouTube en un seul endroit. Une vue d\'ensemble de ta présence digitale.',badge:''},
          {emoji:'💬',titre:'Feedback Prioritaire',desc:'Ton feedback est traité en priorité pour améliorer l\'app. Tu influences directement les nouvelles fonctionnalités de Spotlift.',badge:''},
        ].map((f,i) => (
          <div key={i} style={{background:'#0d0020',padding:'25px',borderRadius:'16px',marginBottom:'15px',border:'1px solid #2d1040',display:'flex',gap:'20px',alignItems:'flex-start'}}>
            <span style={{fontSize:'36px',flexShrink:0}}>{f.emoji}</span>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px',flexWrap:'wrap'}}>
                <h3 style={{fontSize:'18px',fontWeight:'bold',margin:0}}>{f.titre}</h3>
                {f.badge && <span style={{background:'#9B59B6',color:'#fff',fontSize:'11px',padding:'2px 8px',borderRadius:'10px',fontWeight:'bold'}}>{f.badge}</span>}
              </div>
              <p style={{color:'#aaa',margin:0,lineHeight:'1.7',fontSize:'14px'}}>{f.desc}</p>
            </div>
            <span style={{color:'#1DB954',fontSize:'24px',flexShrink:0}}>✓</span>
          </div>
        ))}

        <div style={{background:'#0d0020',padding:'25px',borderRadius:'16px',marginBottom:'15px',border:'1px solid #e74c3c'}}>
          <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
            <span style={{fontSize:'36px'}}>🔥</span>
            <div>
              <h3 style={{fontSize:'18px',fontWeight:'bold',margin:'0 0 5px 0',color:'#e74c3c'}}>Viral Potentiel — Non inclus dans Pro</h3>
              <p style={{color:'#aaa',margin:0,fontSize:'14px'}}>Disponible uniquement dans le Plan Pro+</p>
            </div>
            <span style={{color:'#e74c3c',fontSize:'24px',marginLeft:'auto'}}>✗</span>
          </div>
        </div>

        <div style={{background:'linear-gradient(135deg,#1a0030,#0d0020)',padding:'30px',borderRadius:'20px',border:'1px solid #9B59B6',marginTop:'40px',textAlign:'center'}}>
          <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'10px'}}>Garanties Pro</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'15px',marginBottom:'25px'}}>
            {['Annulation en 1 clic','Sans engagement','Support email 24h','Accès immédiat'].map((g,i) => (
              <div key={i} style={{background:'#0d0020',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
                <p style={{color:'#1DB954',margin:'0 0 5px 0',fontSize:'20px'}}>✓</p>
                <p style={{color:'#ccc',margin:0,fontSize:'14px'}}>{g}</p>
              </div>
            ))}
          </div>
          <a href="/pricing" style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',color:'#fff',padding:'16px 50px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'18px',display:'inline-block',boxShadow:'0 0 30px rgba(155,89,182,0.4)'}}>
            Commencer Pro — 9.99€/mois
          </a>
          <p style={{color:'#555',marginTop:'15px',fontSize:'13px'}}>Aucune carte bancaire requise pour l'essai gratuit</p>
          <p style={{marginTop:'10px'}}><a href="/pro-plus" style={{color:'#9B59B6',textDecoration:'none',fontSize:'14px'}}>Voir le Plan Pro+ →</a></p>
        </div>

        <div style={{textAlign:'center',marginTop:'30px'}}>
          <a href="/" style={{color:'#555',textDecoration:'none',fontSize:'14px'}}>← Retour à l'accueil</a>
        </div>

      </div>
    </main>
  );
}
