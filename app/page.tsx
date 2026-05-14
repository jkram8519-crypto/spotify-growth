'use client';
import { useState } from 'react';

export default function LandingPage() {
  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif'}}>
      
      {/* NAVBAR */}
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px 20px',borderBottom:'1px solid #222',position:'sticky',top:0,background:'#000',zIndex:100}}>
  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
    <img src="/spotify-growth-icon.png" alt="Logo" style={{width:'35px',height:'35px',borderRadius:'8px'}}/>
    <h1 style={{fontSize:'16px',fontWeight:'bold',color:'#9B59B6',margin:0}}>Spotify Growth</h1>
  </div>
  <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'8px 16px',borderRadius:'20px',textDecoration:'none',fontWeight:'bold',fontSize:'14px'}}>Connexion</a>
</nav>

      {/* HERO */}
      <section style={{textAlign:'center',padding:'100px 20px'}}>
        <p style={{color:'#1DB954',fontWeight:'bold',marginBottom:'20px'}}>🚀 L'outil IA pour artistes indépendants</p>
        <h2 style={{fontSize:'60px',fontWeight:'bold',marginBottom:'20px',lineHeight:'1.1'}}>Fais exploser ta<br/>croissance Spotify</h2>
        <p style={{color:'#aaa',fontSize:'20px',marginBottom:'40px',maxWidth:'600px',margin:'0 auto 40px'}}>Génère des pitches professionnels, trouve des playlists et suis tes performances — tout en un.</p>
        <div style={{display:'flex',gap:'15px',justifyContent:'center'}}>
          <a href="/login" style={{background:'#1DB954',color:'#000',padding:'15px 35px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'18px'}}>Commencer gratuitement</a>
          <a href="#features" style={{border:'1px solid #555',color:'#fff',padding:'15px 35px',borderRadius:'30px',textDecoration:'none',fontSize:'18px'}}>Voir les fonctionnalités</a>
        </div>
      </section>

      {/* STATS */}
      <section style={{display:'flex',justifyContent:'center',gap:'30px',padding:'60px 20px',background:'#0d0020',flexWrap:'wrap'}}>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:'40px',fontWeight:'bold',color:'#1DB954'}}>500+</p>
          <p style={{color:'#aaa'}}>Artistes actifs</p>
        </div>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:'40px',fontWeight:'bold',color:'#1DB954'}}>10k+</p>
          <p style={{color:'#aaa'}}>Pitches générés</p>
        </div>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:'40px',fontWeight:'bold',color:'#1DB954'}}>3x</p>
          <p style={{color:'#aaa'}}>Plus de streams</p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{padding:'80px 40px'}}>
        <h2 style={{textAlign:'center',fontSize:'40px',fontWeight:'bold',marginBottom:'60px'}}>Tout ce dont tu as besoin</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))'
          <div style={{background:'#111',padding:'30px',borderRadius:'20px',border:'1px solid #222'}}>
            <p style={{fontSize:'40px',marginBottom:'15px'}}>🚀</p>
            <h3 style={{fontSize:'22px',marginBottom:'10px'}}>Pitch Generator IA</h3>
            <p style={{color:'#aaa'}}>Génère des pitches professionnels pour les curateurs de playlist en quelques secondes.</p>
          </div>
          <div style={{background:'#111',padding:'30px',borderRadius:'20px',border:'1px solid #222'}}>
            <p style={{fontSize:'40px',marginBottom:'15px'}}>🎯</p>
            <h3 style={{fontSize:'22px',marginBottom:'10px'}}>Playlist Finder</h3>
            <p style={{color:'#aaa'}}>Trouve les playlists parfaites pour ton genre et contacte les curateurs directement.</p>
          </div>
          <div style={{background:'#111',padding:'30px',borderRadius:'20px',border:'1px solid #222'}}>
            <p style={{fontSize:'40px',marginBottom:'15px'}}>📊</p>
            <h3 style={{fontSize:'22px',marginBottom:'10px'}}>Analytics</h3>
            <p style={{color:'#aaa'}}>Suis tes streams, saves et performances en temps réel depuis ton dashboard.</p>
          </div>
          <div style={{background:'#111',padding:'30px',borderRadius:'20px',border:'1px solid #222'}}>
            <p style={{fontSize:'40px',marginBottom:'15px'}}>📱</p>
            <h3 style={{fontSize:'22px',marginBottom:'10px'}}>App Mobile</h3>
            <p style={{color:'#aaa'}}>Gère ta croissance depuis ton téléphone avec notre app iOS et Android.</p>
          </div>
          <div style={{background:'#111',padding:'30px',borderRadius:'20px',border:'1px solid #222'}}>
            <p style={{fontSize:'40px',marginBottom:'15px'}}>💰</p>
            <h3 style={{fontSize:'22px',marginBottom:'10px'}}>Prix abordable</h3>
            <p style={{color:'#aaa'}}>À partir de €9.99/mois, bien moins cher que les agences traditionnelles.</p>
          </div>
          <div style={{background:'#111',padding:'30px',borderRadius:'20px',border:'1px solid #222'}}>
            <p style={{fontSize:'40px',marginBottom:'15px'}}>🤖</p>
            <h3 style={{fontSize:'22px',marginBottom:'10px'}}>IA Avancée</h3>
            <p style={{color:'#aaa'}}>Propulsé par l'IA la plus avancée pour des résultats professionnels garantis.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{background:'#111',padding:'80px 40px'}}>
        <h2 style={{textAlign:'center',fontSize:'40px',fontWeight:'bold',marginBottom:'60px'}}>Ce qu'ils en disent</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'30px',maxWidth:'1000px',margin:'0 auto'}}>
          <div style={{background:'#000',padding:'30px',borderRadius:'20px'}}>
            <p style={{color:'#aaa',marginBottom:'20px'}}>"En 2 semaines j'ai eu 3 playlists avec le pitch généré. Incroyable !"</p>
            <p style={{fontWeight:'bold'}}>— Alex M., Producteur</p>
          </div>
          <div style={{background:'#000',padding:'30px',borderRadius:'20px'}}>
            <p style={{color:'#aaa',marginBottom:'20px'}}>"L'app mobile est parfaite. Je gère tout depuis mon téléphone entre deux concerts."</p>
            <p style={{fontWeight:'bold'}}>— Sarah K., Artiste</p>
          </div>
          <div style={{background:'#000',padding:'30px',borderRadius:'20px'}}>
            <p style={{color:'#aaa',marginBottom:'20px'}}>"J'ai multiplié mes streams par 3 en un mois. Le meilleur investissement de ma carrière."</p>
            <p style={{fontWeight:'bold'}}>— DJ Marco, DJ</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{padding:'80px 40px',textAlign:'center'}}>
        <h2 style={{fontSize:'40px',fontWeight:'bold',marginBottom:'20px'}}>Tarifs simples</h2>
        <p style={{color:'#aaa',marginBottom:'60px'}}>Commence gratuitement, évolue quand tu es prêt</p>
        <div style={{display:'flex',gap:'20px',justifyContent:'center'}}>
          <div style={{background:'#111',padding:'40px',borderRadius:'20px',width:'250px',border:'1px solid #222'}}>
            <h3 style={{fontSize:'24px',marginBottom:'10px'}}>Free</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'20px'}}>€0</p>
            <p style={{color:'#aaa',marginBottom:'30px'}}>Pitch Generator • Bio Generator • Release Checklist</p>
            <a href="/login" style={{display:'block',border:'1px solid #555',color:'#fff',padding:'12px',borderRadius:'10px',textDecoration:'none'}}>Commencer</a>
          </div>
          <div style={{background:'#1DB954',padding:'40px',borderRadius:'20px',width:'250px',color:'#000'}}>
            <h3 style={{fontSize:'24px',marginBottom:'10px'}}>Pro</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'20px'}}>€9.99<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{marginBottom:'30px'}}>Playlist Finder • Release Planner • AI avancée</p>
            <a href="/login" style={{display:'block',background:'#000',color:'#fff',padding:'12px',borderRadius:'10px',textDecoration:'none',fontWeight:'bold'}}>Commencer Pro</a>
          </div>
          <div style={{background:'#111',padding:'40px',borderRadius:'20px',width:'250px',border:'1px solid #222'}}>
            <h3 style={{fontSize:'24px',marginBottom:'10px'}}>Pro+</h3>
            <p style={{fontSize:'40px',fontWeight:'bold',marginBottom:'20px'}}>€19.99<span style={{fontSize:'16px'}}>/mois</span></p>
            <p style={{color:'#aaa',marginBottom:'30px'}}>Spotify Analytics • Growth AI • Marketing Auto</p>
            <a href="/login" style={{display:'block',background:'#1DB954',color:'#000',padding:'12px',borderRadius:'10px',textDecoration:'none',fontWeight:'bold'}}>Commencer Pro+</a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{textAlign:'center',padding:'100px 20px',background:'#111'}}>
        <h2 style={{fontSize:'48px',fontWeight:'bold',marginBottom:'20px'}}>Prêt à faire exploser<br/>ta musique ?</h2>
        <p style={{color:'#aaa',marginBottom:'40px',fontSize:'18px'}}>Rejoins 500+ artistes qui utilisent Spotify Growth</p>
        <a href="/login" style={{background:'#1DB954',color:'#000',padding:'15px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'20px'}}>Commencer gratuitement →</a>
      </section>

      {/* FOOTER */}
      <footer style={{textAlign:'center',padding:'40px',borderTop:'1px solid #222',color:'#aaa'}}>
        <p>© 2026 Spotify Growth Optimizer. Tous droits réservés.</p>
      </footer>

    </main>
  );
}