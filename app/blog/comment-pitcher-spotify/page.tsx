import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comment pitcher une playlist Spotify en 2026 — Guide complet',
  description: 'Découvrez comment envoyer un pitch professionnel aux curateurs de playlists Spotify. Guide étape par étape pour artistes indépendants.',
};

export default function BlogPitchSpotify() {
  return (
    <main style={{background:'#000',color:'#fff',fontFamily:'sans-serif',minHeight:'100vh',padding:'60px 20px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>

        <div style={{marginBottom:'20px'}}>
          <a href="/blog" style={{color:'#9B59B6',textDecoration:'none',fontSize:'14px'}}>← Blog</a>
        </div>

        <div style={{background:'#9B59B6',color:'#fff',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'bold',display:'inline-block',marginBottom:'15px'}}>
          GUIDE
        </div>

        <h1 style={{fontSize:'42px',fontWeight:'bold',marginBottom:'15px',lineHeight:'1.2'}}>
          Comment pitcher une playlist Spotify en 2026 — Guide complet
        </h1>

        <p style={{color:'#aaa',marginBottom:'30px',fontSize:'16px'}}>
          Par J.K. RAM • Fondateur Spotlift • 10 min de lecture
        </p>

        <img src="/blog-pitch.jpg" alt="Pitcher playlist Spotify" style={{width:'100%',borderRadius:'15px',marginBottom:'30px',background:'#1a0030',height:'300px',objectFit:'cover'}}/>

        <div style={{fontSize:'17px',lineHeight:'1.8',color:'#ccc'}}>

          <p>Tu es artiste indépendant et tu veux que ta musique soit écoutée par plus de monde sur Spotify ? La clé, c'est d'être ajouté dans des playlists. Mais comment convaincre un curateur d'ajouter ton track ? C'est là qu'intervient le pitch.</p>

          <h2 style={{color:'#fff',fontSize:'28px',fontWeight:'bold',margin:'40px 0 15px 0'}}>Qu'est-ce qu'un pitch Spotify ?</h2>
          <p>Un pitch Spotify est un message que tu envoies à un curateur de playlist pour lui présenter ton track et lui expliquer pourquoi il devrait l'ajouter à sa playlist. C'est comme une lettre de motivation, mais pour ta musique.</p>

          <h2 style={{color:'#fff',fontSize:'28px',fontWeight:'bold',margin:'40px 0 15px 0'}}>Pourquoi le pitch est crucial</h2>
          <p>Les curateurs reçoivent des centaines de demandes par semaine. Un pitch mal rédigé finira directement à la corbeille. Un bon pitch, au contraire, peut transformer un inconnu en fan et placer ton track dans une playlist suivie par des milliers d'auditeurs.</p>

          <h2 style={{color:'#fff',fontSize:'28px',fontWeight:'bold',margin:'40px 0 15px 0'}}>Les éléments d'un bon pitch</h2>

          <div style={{background:'#0d0020',padding:'25px',borderRadius:'15px',border:'1px solid #2d1040',marginBottom:'20px'}}>
            <h3 style={{color:'#9B59B6',margin:'0 0 15px 0'}}>✅ 1. L'accroche</h3>
            <p style={{margin:0}}>Commence par une phrase percutante qui résume ton track en 1-2 phrases. Exemple : "Midnight Vibes est un titre Electronic qui fusionne la mélancolie du lo-fi avec l'énergie du future bass."</p>
          </div>

          <div style={{background:'#0d0020',padding:'25px',borderRadius:'15px',border:'1px solid #2d1040',marginBottom:'20px'}}>
            <h3 style={{color:'#9B59B6',margin:'0 0 15px 0'}}>✅ 2. La compatibilité</h3>
            <p style={{margin:0}}>Montre que tu connais la playlist du curateur. Exemple : "J'ai remarqué que ta playlist 'Chillout Sessions' accueille des titres avec une atmosphère similaire à ce que je propose."</p>
          </div>

          <div style={{background:'#0d0020',padding:'25px',borderRadius:'15px',border:'1px solid #2d1040',marginBottom:'20px'}}>
            <h3 style={{color:'#9B59B6',margin:'0 0 15px 0'}}>✅ 3. Les stats</h3>
            <p style={{margin:0}}>Si tu as des chiffres, utilise-les. Streams, saves, ratio de skip rate... Les curateurs aiment les données concrètes.</p>
          </div>

          <div style={{background:'#0d0020',padding:'25px',borderRadius:'15px',border:'1px solid #2d1040',marginBottom:'20px'}}>
            <h3 style={{color:'#9B59B6',margin:'0 0 15px 0'}}>✅ 4. Le lien Spotify</h3>
            <p style={{margin:0}}>Toujours inclure le lien direct vers ton track sur Spotify. Rends la tâche facile pour le curateur.</p>
          </div>

          <h2 style={{color:'#fff',fontSize:'28px',fontWeight:'bold',margin:'40px 0 15px 0'}}>Exemple de pitch professionnel</h2>

          <div style={{background:'#1a0030',padding:'25px',borderRadius:'15px',border:'1px solid #9B59B6',marginBottom:'20px',fontStyle:'italic'}}>
            <p>"Bonjour,</p>
            <p>Je me permets de vous contacter au sujet de mon titre 'Midnight Vibes', un morceau Electronic Lo-Fi qui sera disponible le 15 juin 2026.</p>
            <p>J'ai découvert votre playlist 'Chillout Sessions' et je pense que ce track s'y intégrerait parfaitement grâce à son atmosphère mélancolique et ses sonorités chaleureuses.</p>
            <p>Le titre a été bien reçu par les premiers auditeurs avec un taux de save de 28% — bien au-dessus de la moyenne du genre.</p>
            <p>Lien Spotify : [lien]</p>
            <p>Merci pour votre temps et votre écoute.</p>
            <p>Cordialement, [Artiste]"</p>
          </div>

          <h2 style={{color:'#fff',fontSize:'28px',fontWeight:'bold',margin:'40px 0 15px 0'}}>Les erreurs à éviter</h2>
          <ul style={{paddingLeft:'20px'}}>
            <li style={{marginBottom:'10px'}}>❌ Envoyer un pitch générique à tous les curateurs</li>
            <li style={{marginBottom:'10px'}}>❌ Ne pas personaliser selon la playlist</li>
            <li style={{marginBottom:'10px'}}>❌ Pitcher après la date de sortie</li>
            <li style={{marginBottom:'10px'}}>❌ Oublier le lien Spotify</li>
            <li style={{marginBottom:'10px'}}>❌ Un pitch trop long (plus de 150 mots)</li>
          </ul>

          <h2 style={{color:'#fff',fontSize:'28px',fontWeight:'bold',margin:'40px 0 15px 0'}}>Générer un pitch en 10 secondes avec Spotlift</h2>
          <p>Tu passes des heures à écrire des pitches ? Spotlift génère des pitches professionnels et personnalisés en 10 secondes grâce à l'IA. Il suffit d'entrer le nom de ton track et l'IA fait le reste.</p>

        </div>

        <div style={{background:'linear-gradient(135deg,#6C3483,#9B59B6)',padding:'30px',borderRadius:'20px',textAlign:'center',marginTop:'40px'}}>
          <h2 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'10px'}}>Génère ton pitch en 10 secondes</h2>
          <p style={{marginBottom:'20px',opacity:0.9}}>Spotlift crée des pitches professionnels adaptés à chaque curateur</p>
          <a href="/inscription" style={{background:'#fff',color:'#6C3483',padding:'14px 30px',borderRadius:'30px',textDecoration:'none',fontWeight:'bold',fontSize:'16px',display:'inline-block'}}>
            Essayer Gratuitement →
          </a>
        </div>

        <div style={{marginTop:'40px',paddingTop:'30px',borderTop:'1px solid #222'}}>
          <a href="/blog" style={{color:'#9B59B6',textDecoration:'none'}}>← Voir tous les articles</a>
        </div>

      </div>
    </main>
  );
}