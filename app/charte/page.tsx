export default function Charte() {
  return (
    <main style={{background:"#000",color:"#fff",fontFamily:"sans-serif",minHeight:"100vh",padding:"60px 20px"}}>
      <div style={{maxWidth:"800px",margin:"0 auto"}}>
        
        <div style={{textAlign:"center",marginBottom:"50px"}}>
          <img src="/spotlift-icon.svg" alt="Logo" style={{width:"60px",height:"60px",borderRadius:"15px",marginBottom:"20px"}}/>
          <h1 style={{fontSize:"36px",fontWeight:"bold",marginBottom:"10px",color:"#9B59B6"}}>Charte Ethique Spotlift</h1>
          <p style={{color:"#aaa",fontSize:"16px",lineHeight:"1.7"}}>
            Chez Spotlift, nous croyons que la musique est l expression la plus pure de l ame humaine. 
            Notre mission n est pas de remplacer l artiste, mais de lui redonner le pouvoir face aux 
            algorithmes et aux geants de l industrie.
          </p>
        </div>

        {[
          {
            num:"01",
            emoji:"🎵",
            titre:"L IA comme Assistant, jamais comme Createur",
            engagement:"Spotlift s interdit de proposer des outils de generation de musique, de voix ou de melodies par IA.",
            philosophie:"Nous croyons que la creation doit rester 100% humaine. Notre IA intervient uniquement apres la creation, pour aider a la promotion, a l organisation et a l analyse de donnees."
          },
          {
            num:"02",
            emoji:"🔍",
            titre:"Transparence et Authenticite",
            engagement:"Nos outils de generation de texte (Pitches, Bios) sont concus comme des bases de travail. Nous encourageons systematiquement l artiste a personnaliser ces contenus pour refleter sa veritable identite.",
            philosophie:"L IA aide a structurer la pensee, mais c est la voix de l artiste qui doit se faire entendre."
          },
          {
            num:"03",
            emoji:"🔒",
            titre:"Protection des Donnees et de la Propriete Intellectuelle",
            engagement:"Spotlift ne revend aucune donnee d artiste a des tiers. Les morceaux analyses par nos algorithmes restent la propriete exclusive de l artiste.",
            philosophie:"Votre musique est votre patrimoine. Nous sommes la pour le proteger et le valoriser, pas pour l exploiter."
          },
          {
            num:"04",
            emoji:"🚫",
            titre:"Lutte contre les Pratiques Frauduleuses",
            engagement:"Spotlift refuse et combat toute forme d achat de streams, de bots ou de fermes a clics. Notre Playlist Finder ne reference que des playlists organiques et verifiees.",
            philosophie:"Nous privilegions la croissance reelle et durable a la triche ephemere qui finit par bannir les artistes de Spotify."
          },
          {
            num:"05",
            emoji:"🎓",
            titre:"Soutien a l Ecosysteme Local (Studios et Ecoles)",
            engagement:"Nous reconnaissons le role vital des studios d enregistrement et des ecoles de musique. Spotlift se veut un outil complementaire qui maximise l impact du travail fourni dans ces lieux d excellence.",
            philosophie:"Plus un artiste est bien entoure (professeurs, ingenieurs du son), plus les outils de Spotlift seront efficaces pour lui."
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
            Pour que les artistes passent moins de temps devant un ecran,<br/>
            et plus de temps devant un micro.
          </p>
          <p style={{color:"#555",marginTop:"20px",fontSize:"14px"}}>— L equipe Spotlift</p>
        </div>

        <div style={{textAlign:"center",marginTop:"40px"}}>
          <a href="/" style={{color:"#9B59B6",textDecoration:"none",fontSize:"14px"}}>← Retour a l accueil</a>
        </div>

      </div>
    </main>
  );
}
