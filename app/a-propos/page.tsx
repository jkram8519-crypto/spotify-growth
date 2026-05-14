export default function APropos() {
  return (
    <main style={{background:'#000',color:'#fff',padding:'60px 40px',maxWidth:'800px',margin:'0 auto',fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'10px'}}>À propos</h1>
      <p style={{color:'#aaa',marginBottom:'40px'}}>L'histoire derrière Spotify Growth Optimizer</p>

      <section style={{marginBottom:'40px',background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040'}}>
        <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'15px',color:'#9B59B6'}}>Notre mission</h2>
        <p style={{color:'#ccc',lineHeight:'1.8',fontSize:'18px'}}>
          Spotify Growth Optimizer a été créé pour donner aux artistes indépendants les mêmes outils que les grandes maisons de disques — mais à un prix accessible à tous.
        </p>
      </section>

      <section style={{marginBottom:'40px'}}>
        <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'15px',color:'#9B59B6'}}>Le créateur</h2>
        <div style={{display:'flex',gap:'20px',alignItems:'center',background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040'}}>
          <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'linear-gradient(135deg,#9B59B6,#6C3483)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',flexShrink:0}}>🎵</div>
          <div>
            <h3 style={{fontSize:'20px',fontWeight:'bold',marginBottom:'5px'}}>J.K. Ram</h3>
            <p style={{color:'#9B59B6',marginBottom:'10px'}}>Développeur & Passionné de musique</p>
            <p style={{color:'#ccc',lineHeight:'1.8'}}>Passionné par la technologie et la musique, j'ai créé Spotify Growth Optimizer pour aider les artistes indépendants à percer sans avoir besoin d'un label.</p>
          </div>
        </div>
      </section>

      <section style={{marginBottom:'40px'}}>
        <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'15px',color:'#9B59B6'}}>Nos valeurs</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'20px'}}>
          {[
            {emoji:'🎯',title:'Accessibilité',desc:'Des outils pro à prix abordable pour tous les artistes.'},
            {emoji:'🤖',title:'Innovation',desc:"L'IA au service de la créativité musicale."},
            {emoji:'🔒',title:'Confidentialité',desc:'Vos données ne sont jamais vendues.'},
            {emoji:'💬',title:'Support',desc:'Une équipe réactive pour vous aider.'},
          ].map((v, i) => (
            <div key={i} style={{background:'#0d0020',padding:'25px',borderRadius:'15px',border:'1px solid #2d1040'}}>
              <p style={{fontSize:'30px',marginBottom:'10px'}}>{v.emoji}</p>
              <h3 style={{fontWeight:'bold',marginBottom:'8px'}}>{v.title}</h3>
              <p style={{color:'#aaa'}}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{textAlign:'center',background:'linear-gradient(135deg,#1a0030,#0d0020)',padding:'40px',borderRadius:'20px',border:'1px solid #9B59B6'}}>
        <h2 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'15px'}}>Une question ?</h2>
        <p style={{color:'#aaa',marginBottom:'20px'}}>On est là pour t'aider !</p>
        <a href="mailto:j.k.ram8519@gmail.com" style={{background:'#9B59B6',color:'#fff',padding:'12px 30px',borderRadius:'25px',textDecoration:'none',fontWeight:'bold'}}>Nous contacter</a>
      </section>
    </main>
  );
}