import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charte Éthique Spotlift — IA au service des artistes',
  description: 'Découvrez les engagements éthiques de Spotlift : transparence, protection des données, lutte contre les fraudes et soutien aux artistes indépendants.',
};

export default function Charte() {
  return (
    <main style={{background:"#000",color:"#fff",fontFamily:"sans-serif",minHeight:"100vh",padding:"60px 20px"}}>
      <div style={{maxWidth:"800px",margin:"0 auto"}}>
        
        <div style={{textAlign:"center",marginBottom:"50px"}}>
          <img src="/spotlift-icon.svg" alt="Logo" style={{width:"60px",height:"60px",borderRadius:"15px",marginBottom:"20px"}}/>
          <h1 style={{fontSize:"36px",fontWeight:"bold",marginBottom:"10px",color:"#9B59B6"}}>Charte Ethique Spotlift</h1>
          <p style={{color:"#aaa",fontSize:"16px",lineHeight:"1.7"}}>
            Chez Spotlift, nous croyons que la musique est l'expression la plus pure de l'âme humaine. 
            Notre mission n'est pas de remplacer l'artiste, mais de lui redonner le pouvoir face aux 
            algorithmes et aux geants de l industrie.
          </p>
        </div>

        {[
          {
            num:"01",
            emoji:"🎵",
            titre:"L'IA comme Assistant, jamais comme Créateur",
            engagement:"Spotlift s'interdit de proposer des outils de génération de musique, de voix ou de mélodies par IA.",
            philosophie:"Nous croyons que la création doit rester 100% humaine. Notre IA intervient uniquement après la création, pour aider à la promotion, à l'organisation et à l'analyse de données."
          },
          {
            num:"02",
            emoji:"🔍",
            titre:"Transparence et Authenticité",
            engagement:"Nos outils de génération de texte (Pitches, Bios) sont conçus comme des bases de travail. Nous encourageons systématiquement l'artiste à personnaliser ces contenus pour refléter sa véritable identité.",
            philosophie:"L'IA aide à structurer la pensée, mais c'est la voix de l'artiste qui doit se faire entendre."
          },
          {
            num:"03",
            emoji:"🔒",
            titre:"Protection des Données et de la Propriété Intellectuelle",
            engagement:"Spotlift ne revend aucune donnée d'artiste à des tiers. Les morceaux analysés par nos algorithmes restent la propriété exclusive de l'artiste.",
            philosophie:"Votre musique est votre patrimoine. Nous sommes là pour le protéger et le valoriser, pas pour l'exploiter."
          },
          {
            num:"04",
            emoji:"🚫",
            titre:"Lutte contre les Pratiques Frauduleuses",
            engagement:"Spotlift refuse et combat toute forme d'achat de streams, de bots ou de fermes à clics. Notre Playlist Finder ne référence que des playlists organiques et vérifiées.",
            philosophie:"Nous privilégions la croissance réelle et durable à la triche éphémère qui finit par bannir les artistes de Spotify."
          },
          {
            num:"05",
            emoji:"🎓",
            titre:"Soutien à l'Écosystème Local (Studios et Écoles)",
            engagement:"Nous reconnaissons le rôle vital des studios d'enregistrement et des écoles de musique. Spotlift se veut un outil complémentaire qui maximise l'impact du travail fourni dans ces lieux d'excellence.",
            philosophie:"Plus un artiste est bien entouré (professeurs, ingénieurs du son), plus les outils de Spotlift seront efficaces pour lui."
          },
        ].map((item, i) => (
          <div key={i} style={{background:"#0d0020",padding:"30px",borderRadius:"20px",marginBottom:"20px",border:"1px solid #2d1040"}}>
            <div style={{display:"flex",alignItems:"center",gap:"15px",marginBottom:"15px"}}>
              <div style={{background:"#9B59B6",width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:"14px",flexShrink:0}}>
                {item.num}
              </div>
              <h2 style={{fontSize:"18px",fontWeight:"bold",margin:0}}>{item.emoji} {item.titre}</h2>
            </div>
            <div style={{background:"#1a0030",padding:"15px",borderRadius:"12px",marginBottom:"12px"}}>
              <p style={{color:"#9B59B6",fontWeight:"bold",fontSize:"12px",margin:"0 0 6px 0"}}>ENGAGEMENT</p>
              <p style={{color:"#ccc",fontSize:"14px",lineHeight:"1.7",margin:0}}>{item.engagement}</p>
            </div>
            <div style={{background:"#0a0015",padding:"15px",borderRadius:"12px"}}>
              <p style={{color:"#1DB954",fontWeight:"bold",fontSize:"12px",margin:"0 0 6px 0"}}>PHILOSOPHIE</p>
              <p style={{color:"#aaa",fontSize:"14px",lineHeight:"1.7",margin:0,fontStyle:"italic"}}>{item.philosophie}</p>
            </div>
          </div>
        ))}

        <div style={{textAlign:"center",padding:"40px",background:"linear-gradient(135deg,#1a0030,#0d0020)",borderRadius:"20px",border:"1px solid #9B59B6",marginTop:"40px"}}>
          <p style={{fontSize:"22px",fontWeight:"bold",marginBottom:"10px",color:"#9B59B6"}}>Notre promesse</p>
          <p style={{color:"#ccc",fontSize:"16px",lineHeight:"1.8",fontStyle:"italic"}}>
            Pour que les artistes passent moins de temps devant un écran,<br/>
            et plus de temps devant un micro.
          </p>
          <p style={{color:"#555",marginTop:"20px",fontSize:"14px"}}>— L'équipe Spotlift</p>
        </div>

        <div style={{textAlign:"center",marginTop:"40px"}}>
          <a href="/" style={{color:"#9B59B6",textDecoration:"none",fontSize:"14px"}}>← Retour à l'accueil</a>
        </div>

      </div>
    </main>
  );
}
