export default function ProPlusPage() {
  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif',minHeight:'100vh',padding:'60px 20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>

        <div style={{textAlign:'center',marginBottom:'50px'}}>
          <div style={{background:'linear-gradient(135deg,#1a5276,#2980b9)',borderRadius:'20px',padding:'30px',marginBottom:'30px'}}>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'14px',margin:'0 0 10px 0',fontWeight:'bold'}}>PLAN ULTIME</p>
            <h1 style={{fontSize:'42px',fontWeight:'bold',margin:'0 0 10px 0'}}>Plan Pro+</h1>
            <p style={{fontSize:'48px',fontWeight:'bold',margin:'0 0 5px 0'}}>19.99€<span style={{fontSize:'18px',opacity:0.8}}>/mois</span></p>
            <p style={{opacity:0.8,margin:'0 0 20px 0'}}>ou 15.99€/mois en annuel — économisez 20%</p>
            <a href="/pricing" style={{background:'#fff',color:'#1a5276',padding:'14px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',display:'inline-block'}}>Commencer Pro+</a>
          </div>
        </div>

        <h2 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'10px',textAlign:'center'}}>Tout le Plan Pro +</h2>
        <p style={{textAlign:'center',color:'#aaa',marginBottom:'30px'}}>Ces fonctionnalités exclusives Pro+</p>

        {[
          {emoji:'🔥',titre:'Détection Viral Potentiel',desc:'Analyse ton track et détecte son potentiel viral sur TikTok. L\'IA évalue la durée de l\'intro, le placement du drop, l\'accroche, la partie dansable et te donne un score viral avec des recommandations précises pour maximiser tes chances de buzz.',badge:'EXCLUSIF PRO+'},
          {emoji:'🎨',titre:'Optimisation Profil Artiste',desc:'Analyse complète de ton profil Spotify : photo, biographie, genres, playlists artiste. L\'IA te donne un plan d\'optimisation détaillé pour maximiser ton impact sur chaque visiteur de ton profil.',badge:'EXCLUSIF PRO+'},
          {emoji:'🚀',titre:'Pitch Generator IA — Prioritaire',desc:'Accès prioritaire au Pitch Generator avec des pitches encore plus personnalisés grâce aux données Spotify en temps réel. Génération plus rapide et résultats optimisés.',badge:'PRIORITAIRE'},
          {emoji:'🗓️',titre:'Manager IA — Version Avancée',desc:'Planning de sortie étendu avec des actions supplémentaires sur 60 jours. Inclut des stratégies avancées de promotion, de collaboration et de monétisation.',badge:'AVANCÉ'},
          {emoji:'🎯',titre:'Playlist Finder — Résultats Illimités',desc:'Accès illimité aux playlists avec filtres avancés par genre, taille, engagement et taux d\'acceptation. Trouve les meilleures opportunités pour ton style musical.',badge:'ILLIMITÉ'},
          {emoji:'📊',titre:'Analytics IA — Rapports Complets',desc:'Rapports hebdomadaires automatiques avec analyse approfondie de tes performances. Comparaison avec des artistes similaires et recommandations stratégiques personnalisées.',badge:'COMPLET'},
          {emoji:'🎯',titre:'Growth Score — Historique Complet',desc:'Historique complet de ton Growth Score avec graphiques d\'évolution, analyse des tendances et prévisions de croissance sur 3 mois.',badge:''},
          {emoji:'📱',titre:'Contenu Social — Templates Premium',desc:'Accès à des templates premium pour chaque réseau social. Contenu viral optimisé par l\'IA avec les dernières tendances TikTok et Instagram.',badge:'PREMIUM'},
          {emoji:'🤖',titre:'IA Assistant — Conversations Illimitées',desc:'Conversations illimitées avec l\'IA manager. Accès à des conseils avancés sur la stratégie de label, les négociations, le booking et la gestion de carrière.',badge:'ILLIMITÉ'},
          {emoji:'📊',titre:'Dashboard Multi-Plateformes — Avancé',desc:'Statistiques avancées avec analyses croisées entre plateformes. Identifie quel réseau social génère le plus de streams Spotify.',badge:'AVANCÉ'},
          {emoji:'⚡',titre:'Support Prioritaire',desc:'Support par email avec réponse garantie en moins de 4 heures. Accès à des sessions de consultation individuelle avec l\'équipe Spotlift.',badge:'PRIORITAIRE'},
          {emoji:'🔮',titre:'Accès Anticipé aux Nouvelles Fonctionnalités',desc:'Tu es le premier à tester toutes les nouvelles fonctionnalités de Spotlift avant leur sortie officielle. Tu influences directement le développement du produit.',badge:'EXCLUSIF'},
        ].map((f,i) => (
          <div key={i} style={{background:'#0a1628',padding:'25px',borderRadius:'16px',marginBottom:'15px',border:'1px solid #1a5276',display:'flex',gap:'20px',alignItems:'flex-start'}}>
            <span style={{fontSize:'36px',flexShrink:0}}>{f.emoji}</span>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px',flexWrap:'wrap'}}>
                <h3 style={{fontSize:'18px',fontWeight:'bold',margin:0}}>{f.titre}</h3>
                {f.badge && <span style={{background:'#2980b9',color:'#fff',fontSize:'11px',padding:'2px 8px',borderRadius:'10px',fontWeight:'bold'}}>{f.badge}</span>}
              </div>
              <p style={{color:'#aaa',margin:0,lineHeight:'1.7',fontSize:'14px'}}>{f.desc}</p>
            </div>
            <span style={{color:'#1DB954',fontSize:'24px',flexShrink:0}}>✓</span>
          </div>
        ))}

        <div style={{background:'linear-gradient(135deg,#0a1628,#1a2a40)',padding:'30px',borderRadius:'20px',border:'1px solid #2980b9',marginTop:'40px',textAlign:'center'}}>
          <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'10px'}}>Garanties Pro+</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'15px',marginBottom:'25px'}}>
            {['Annulation en 1 clic','Sans engagement','Support 4h garanti','Accès immédiat'].map((g,i) => (
              <div key={i} style={{background:'#0d0020',padding:'15px',borderRadius:'12px',border:'1px solid #1a5276'}}>
                <p style={{color:'#1DB954',margin:'0 0 5px 0',fontSize:'20px'}}>✓</p>
                <p style={{color:'#ccc',margin:0,fontSize:'14px'}}>{g}</p>
              </div>
            ))}
          </div>
          <a href="/pricing" style={{background:'linear-gradient(135deg,#1a5276,#2980b9)',color:'#fff',padding:'16px 50px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'18px',display:'inline-block',boxShadow:'0 0 30px rgba(41,128,185,0.4)'}}>
            Commencer Pro+ — 19.99€/mois
          </a>
          <p style={{color:'#555',marginTop:'15px',fontSize:'13px'}}>Aucune carte bancaire requise pour l'essai gratuit</p>
          <p style={{marginTop:'10px'}}><a href="/pro" style={{color:'#9B59B6',textDecoration:'none',fontSize:'14px'}}>Voir le Plan Pro →</a></p>
        </div>

        <div style={{textAlign:'center',marginTop:'30px'}}>
          <a href="/" style={{color:'#555',textDecoration:'none',fontSize:'14px'}}>← Retour à l'accueil</a>
        </div>

      </div>
    </main>
  );
}
