import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Résultats Spotlift — Témoignages artistes indépendants',
  description: 'Découvrez comment Alex M., Sarah K. et DJ Marco ont augmenté leurs streams Spotify grâce à Spotlift. +150% de playlists, +300% de pitches acceptés.',
};

'use client';

export default function CaseStudiesPage() {
  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif'}}>
      <section style={{padding:'80px 40px',textAlign:'center',background:'linear-gradient(135deg,#0d0020,#1a0030)'}}>
        <h1 style={{fontSize:'48px',fontWeight:'bold',marginBottom:'20px'}}>
          Resultats reels avec <span style={{color:'#9B59B6'}}>Spotlift</span>
        </h1>
        <p style={{color:'#aaa',fontSize:'18px',maxWidth:'600px',margin:'0 auto'}}>
          Decouvrez comment des artistes independants augmentent leurs streams et economisent du temps chaque semaine
        </p>
      </section>

      <section style={{padding:'80px 40px',maxWidth:'1000px',margin:'0 auto'}}>

        <div style={{marginBottom:'60px',background:'#0d0020',padding:'40px',borderRadius:'20px',border:'1px solid #2d1040'}}>
          <div style={{display:'flex',gap:'20px',alignItems:'flex-start',marginBottom:'20px'}}>
            <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'linear-gradient(135deg,#9B59B6,#6C3483)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0}}>🎵</div>
            <div>
              <h2 style={{fontSize:'24px',fontWeight:'bold',margin:'0 0 5px 0'}}>Alex M. — Producteur Electronic</h2>
              <p style={{color:'#9B59B6',margin:0,fontSize:'14px'}}>500 followers Spotify</p>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'20px'}}>
            <div style={{background:'#000',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
              <p style={{color:'#aaa',fontSize:'12px',margin:'0 0 5px 0',fontWeight:'bold'}}>AVANT</p>
              <p style={{color:'#ccc',fontSize:'14px',lineHeight:'1.8'}}>Temps de pitching : 2-3h/semaine<br/>Taux acceptation : 5%<br/>Streams/mois : 2,000</p>
            </div>
            <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',border:'1px solid #9B59B6'}}>
              <p style={{color:'#9B59B6',fontSize:'12px',margin:'0 0 5px 0',fontWeight:'bold'}}>APRES (3 mois)</p>
              <p style={{color:'#ccc',fontSize:'14px',lineHeight:'1.8'}}>Temps de pitching : 30 min/semaine<br/>Taux acceptation : 20% <span style={{color:'#1DB954'}}>+300%</span><br/>Streams/mois : 2,200 <span style={{color:'#1DB954'}}>+10%</span></p>
            </div>
          </div>
          <blockquote style={{borderLeft:'3px solid #9B59B6',paddingLeft:'15px',margin:0,fontStyle:'italic',color:'#aaa'}}>
            "Le Pitch Generator m a permis de creer des pitches professionnels en 10 secondes. Mes pitches sont acceptes 4x plus souvent !"
          </blockquote>
        </div>

        <div style={{marginBottom:'60px',background:'#0d0020',padding:'40px',borderRadius:'20px',border:'1px solid #2d1040'}}>
          <div style={{display:'flex',gap:'20px',alignItems:'flex-start',marginBottom:'20px'}}>
            <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'linear-gradient(135deg,#1DB954,#1aa34a)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0}}>🎤</div>
            <div>
              <h2 style={{fontSize:'24px',fontWeight:'bold',margin:'0 0 5px 0'}}>Sarah K. — Artiste Independante</h2>
              <p style={{color:'#1DB954',margin:0,fontSize:'14px'}}>1,000 followers Spotify</p>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'20px'}}>
            <div style={{background:'#000',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
              <p style={{color:'#aaa',fontSize:'12px',margin:'0 0 5px 0',fontWeight:'bold'}}>AVANT</p>
              <p style={{color:'#ccc',fontSize:'14px',lineHeight:'1.8'}}>Strategie : Desorganisee<br/>Streams a la sortie : 500<br/>Playlists obtenues : 2</p>
            </div>
            <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',border:'1px solid #1DB954'}}>
              <p style={{color:'#1DB954',fontSize:'12px',margin:'0 0 5px 0',fontWeight:'bold'}}>APRES (1 sortie)</p>
              <p style={{color:'#ccc',fontSize:'14px',lineHeight:'1.8'}}>Strategie : Planifiee 44j<br/>Streams a la sortie : 550 <span style={{color:'#1DB954'}}>+10%</span><br/>Playlists obtenues : 5 <span style={{color:'#1DB954'}}>+150%</span></p>
            </div>
          </div>
          <blockquote style={{borderLeft:'3px solid #1DB954',paddingLeft:'15px',margin:0,fontStyle:'italic',color:'#aaa'}}>
            "Le Manager IA m a permis de planifier ma sortie sans stress. Mes playlists ont augmente de 150% !"
          </blockquote>
        </div>

        <div style={{marginBottom:'60px',background:'#0d0020',padding:'40px',borderRadius:'20px',border:'1px solid #2d1040'}}>
          <div style={{display:'flex',gap:'20px',alignItems:'flex-start',marginBottom:'20px'}}>
            <div style={{width:'60px',height:'60px',borderRadius:'50%',background:'linear-gradient(135deg,#f39c12,#e67e22)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0}}>🎧</div>
            <div>
              <h2 style={{fontSize:'24px',fontWeight:'bold',margin:'0 0 5px 0'}}>DJ Marco — DJ Producteur</h2>
              <p style={{color:'#f39c12',margin:0,fontSize:'14px'}}>5,000 followers Spotify</p>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'20px'}}>
            <div style={{background:'#000',padding:'15px',borderRadius:'12px',border:'1px solid #2d1040'}}>
              <p style={{color:'#aaa',fontSize:'12px',margin:'0 0 5px 0',fontWeight:'bold'}}>AVANT</p>
              <p style={{color:'#ccc',fontSize:'14px',lineHeight:'1.8'}}>Playlists : 20-30/mois<br/>Temps recherche : 3-4h/semaine<br/>Streams/mois : 5,000</p>
            </div>
            <div style={{background:'#1a0030',padding:'15px',borderRadius:'12px',border:'1px solid #f39c12'}}>
              <p style={{color:'#f39c12',fontSize:'12px',margin:'0 0 5px 0',fontWeight:'bold'}}>APRES (2 mois)</p>
              <p style={{color:'#ccc',fontSize:'14px',lineHeight:'1.8'}}>Playlists : 100+/mois <span style={{color:'#1DB954'}}>+300%</span><br/>Temps recherche : 30 min/semaine<br/>Streams/mois : 5,500 <span style={{color:'#1DB954'}}>+10%</span></p>
            </div>
          </div>
          <blockquote style={{borderLeft:'3px solid #f39c12',paddingLeft:'15px',margin:0,fontStyle:'italic',color:'#aaa'}}>
            "Playlist Finder m a montre des playlists que je ne trouvais jamais manuellement. J ai gagne 10h par mois !"
          </blockquote>
        </div>

        <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'40px',borderRadius:'20px',textAlign:'center'}}>
          <h2 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'30px'}}>Resultats moyens</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'20px'}}>
            <div><p style={{fontSize:'36px',fontWeight:'bold',margin:'0 0 5px 0'}}>+10%</p><p style={{color:'rgba(255,255,255,0.8)',margin:0}}>Streams en plus</p></div>
            <div><p style={{fontSize:'36px',fontWeight:'bold',margin:'0 0 5px 0'}}>1h/sem</p><p style={{color:'rgba(255,255,255,0.8)',margin:0}}>Temps economise</p></div>
            <div><p style={{fontSize:'36px',fontWeight:'bold',margin:'0 0 5px 0'}}>2-4 sem</p><p style={{color:'rgba(255,255,255,0.8)',margin:0}}>Avant les resultats</p></div>
            <div><p style={{fontSize:'36px',fontWeight:'bold',margin:'0 0 5px 0'}}>8.6x ROI</p><p style={{color:'rgba(255,255,255,0.8)',margin:0}}>Retour investissement</p></div>
          </div>
        </div>
      </section>

      <section style={{padding:'80px 40px',textAlign:'center',background:'#0d0020'}}>
        <h2 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'20px'}}>Pret a rejoindre ces artistes ?</h2>
        <p style={{color:'#aaa',fontSize:'16px',marginBottom:'30px'}}>Commencez gratuitement, aucune carte bancaire requise</p>
        <a href="/login" style={{background:'#9B59B6',color:'#fff',padding:'16px 40px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',display:'inline-block'}}>Essayer Spotlift Gratuitement</a>
      </section>
    </main>
  );
}
