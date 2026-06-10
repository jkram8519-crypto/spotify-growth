import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Spotlift — Conseils pour artistes indépendants Spotify',
  description: 'Découvrez nos guides et conseils pour percer sur Spotify en tant qu\'artiste indépendant.',
};

export default function Blog() {
  const articles = [
    {
      slug: 'comment-pitcher-spotify',
      titre: 'Comment pitcher une playlist Spotify en 2026',
      description: 'Guide complet pour convaincre les curateurs d\'ajouter ton track à leur playlist.',
      categorie: 'GUIDE',
      temps: '10 min',
      date: '10 Juin 2026',
    },
    {
      slug: 'augmenter-streams-spotify',
      titre: '10 façons d\'augmenter ses streams Spotify en 2026',
      description: 'Les meilleures stratégies pour booster tes streams et trouver de nouveaux auditeurs.',
      categorie: 'STRATÉGIE',
      temps: '8 min',
      date: 'Bientôt',
    },
    {
      slug: 'meilleur-outil-artiste-independant',
      titre: 'Les meilleurs outils pour artistes indépendants Spotify',
      description: 'Comparatif des outils indispensables pour gérer ta carrière musicale.',
      categorie: 'COMPARATIF',
      temps: '12 min',
      date: 'Bientôt',
    },
  ];

  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif',minHeight:'100vh',padding:'60px 20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>

        <div style={{marginBottom:'20px'}}>
          <a href="/" style={{color:'#9B59B6',textDecoration:'none',fontSize:'14px'}}>← Accueil</a>
        </div>

        <h1 style={{fontSize:'42px',fontWeight:'bold',marginBottom:'10px'}}>Blog Spotlift</h1>
        <p style={{color:'#aaa',marginBottom:'50px',fontSize:'16px'}}>Conseils et guides pour artistes indépendants sur Spotify</p>

        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          {articles.map((article, i) => (
            <a key={i} href={`/blog/${article.slug}`} style={{textDecoration:'none'}}>
              <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',transition:'border-color 0.2s'}}>
                <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'12px'}}>
                  <span style={{background:'#9B59B6',color:'#fff',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'bold'}}>{article.categorie}</span>
                  <span style={{color:'#555',fontSize:'13px'}}>{article.temps} de lecture</span>
                  <span style={{color:'#555',fontSize:'13px'}}>• {article.date}</span>
                </div>
                <h2 style={{fontSize:'22px',fontWeight:'bold',margin:'0 0 10px 0',color:'#fff'}}>{article.titre}</h2>
                <p style={{color:'#aaa',margin:'0 0 15px 0',fontSize:'15px',lineHeight:'1.6'}}>{article.description}</p>
                <span style={{color:'#9B59B6',fontSize:'14px',fontWeight:'bold'}}>Lire l'article →</span>
              </div>
            </a>
          ))}
        </div>

        <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'30px',borderRadius:'20px',textAlign:'center',marginTop:'50px'}}>
          <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'10px'}}>Essaie Spotlift gratuitement</h2>
          <p style={{marginBottom:'20px',opacity:0.9}}>L'outil IA pour artistes indépendants sur Spotify</p>
          <a href="/inscription" style={{background:'#fff',color:'#6C3483',padding:'14px 30px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',display:'inline-block'}}>
            Commencer gratuitement →
          </a>
        </div>

      </div>
    </main>
  );
}