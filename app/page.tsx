'use client';

export default function LandingPage() {
  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif',margin:0,padding:0}}>
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px 20px',borderBottom:'1px solid #222',position:'sticky',top:0,background:'#000',zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/spotify-growth-icon.png" alt="Logo" style={{width:'35px',height:'35px',borderRadius:'8px'}}/>
          <h1 style={{fontSize:'16px',fontWeight:'bold',color:'#9B59B6',margin:0}}>Spotify Growth</h1>
        </div>
        <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'8px 16px',borderRadius:'20px',textDecoration:'none',fontWeight:'bold',fontSize:'14px'}}>Connexion</a>
      </nav>
      <section style={{textAlign:'center',padding:'80px 20px 60px'}}>
        <h2 style={{fontSize:'48px',fontWeight:'bold',marginBottom:'20px',lineHeight:'1.1'}}>Fais exploser ta <span style={{color:'#9B59B6'}}>croissance Spotify</span></h2>
        <p style={{color:'#aaa',fontSize:'18px',maxWidth:'600px',margin:'20px auto 40px'}}>Génère des pitches professionnels, trouve des playlists et suis tes performances.</p>
        <div style={{display:'flex',gap:'15px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'16px 30px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px'}}>Commencer gratuitement</a>
        </div>
      </section>
      <section style={{padding:'80px 20px',textAlign:'center'}}>
        <h2 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'40px'}}>Tarifs simples</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'20px',maxWidth:'400px',margin:'0 auto'}}>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Free - 0€</h3>
            <p style={{color:'#ccc',marginBottom:'20px'}}>Pitch Generator, Bio Generator, Release Checklist</p>
            <a href="/login" style={{display:'block',border:'1px solid #555',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center'}}>Commencer</a>
          </div>
          <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'35px',borderRadius:'24px',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro - 9.99€/mois</h3>
            <p style={{marginBottom:'20px'}}>Playlist Finder, Release Planner, AI avancée</p>
            <a href="/login" style={{display:'block',background:'#fff',color:'#6C3483',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro</a>
          </div>
          <div style={{background:'#0d0020',padding:'35px',borderRadius:'24px',border:'1px solid #2d1040',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',marginBottom:'8px'}}>Pro+ - 19.99€/mois</h3>
            <p style={{color:'#ccc',marginBottom:'20px'}}>Spotify Analytics, Growth AI, Marketing Auto</p>
            <a href="/login" style={{display:'block',background:'#9B59B6',color:'#fff',padding:'14px',borderRadius:'12px',textDecoration:'none',textAlign:'center',fontWeight:'bold'}}>Commencer Pro+</a>
          </div>
        </div>
      </section>
      <footer style={{padding:'30px 20px',borderTop:'1px solid #222',textAlign:'center'}}>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',marginBottom:'15px'}}>
          <a href="/cgv" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>CGV</a>
          <a href="/mentions-legales" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>Mentions Légales</a>
          <a href="/a-propos" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>À propos</a>
        </div>
        <p style={{color:'#555',margin:0,fontSize:'14px'}}>© 2026 Spotify Growth. Tous droits réservés.</p>
      </footer>
    </main>
  );
}
