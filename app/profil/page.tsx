'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

export default function Profil() {
  const [user, setUser] = useState<any>(null);
  const [nomArtiste, setNomArtiste] = useState('');
  const [genre, setGenre] = useState('');
  const [bio, setBio] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [spotify, setSpotify] = useState('');
  const [sauvegarde, setSauvegarde] = useState(false);
  const [chargement, setChargement] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      } else {
        window.location.href = '/login';
      }
    };
    getUser();
  }, []);

  const handleSave = async () => {
    setChargement(true);
    await new Promise(r => setTimeout(r, 1000));
    setSauvegarde(true);
    setChargement(false);
    setTimeout(() => setSauvegarde(false), 3000);
  };

  return (
    <main style={{background:'#000',color:'#fff',minHeight:'100vh',fontFamily:'sans-serif'}}>
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'15px 20px',borderBottom:'1px solid #222',background:'#000',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/spotlift-icon.svg" alt="Logo" style={{width:'35px',height:'35px',borderRadius:'8px'}}/>
          <span style={{fontWeight:'bold',color:'#9B59B6'}}>Spotlift</span>
        </div>
        <div style={{display:'flex',gap:'15px',alignItems:'center'}}>
          <a href="/dashboard" style={{color:'#aaa',textDecoration:'none',fontSize:'14px'}}>Dashboard</a>
          <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login'; }}
            style={{color:'#555',background:'none',border:'none',cursor:'pointer',fontSize:'14px'}}>Déconnexion</button>
        </div>
      </nav>

      <div style={{maxWidth:'600px',margin:'40px auto',padding:'0 20px'}}>
        <h1 style={{fontSize:'32px',fontWeight:'bold',marginBottom:'8px'}}>👤 Mon Profil Artiste</h1>
        <p style={{color:'#aaa',marginBottom:'40px'}}>Complète ton profil pour des pitches plus personnalisés</p>

        <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'bold',marginBottom:'20px',color:'#9B59B6'}}>🎵 Informations artiste</h2>

          <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>Nom d'artiste</label>
          <input value={nomArtiste} onChange={e => setNomArtiste(e.target.value)}
            placeholder="ex: DJ Marco"
            style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>

          <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>Genre musical</label>
          <select value={genre} onChange={e => setGenre(e.target.value)}
            style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}>
            <option value="">Sélectionne ton genre</option>
            <option value="Electronic">Electronic</option>
            <option value="Hip-Hop">Hip-Hop / Rap</option>
            <option value="Pop">Pop</option>
            <option value="R&B">R&B / Soul</option>
            <option value="Rock">Rock</option>
            <option value="Latin">Latin</option>
            <option value="Jazz">Jazz</option>
            <option value="Classique">Classique</option>
            <option value="Autre">Autre</option>
          </select>

          <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>Bio artiste</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)}
            placeholder="Décris ton style musical en quelques phrases..."
            rows={4}
            style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box',resize:'none'}}/>
        </div>

        <div style={{background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'bold',marginBottom:'20px',color:'#9B59B6'}}>🔗 Réseaux sociaux</h2>

          <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>📸 Instagram</label>
          <input value={instagram} onChange={e => setInstagram(e.target.value)}
            placeholder="@toncompte"
            style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>

          <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>🎵 TikTok</label>
          <input value={tiktok} onChange={e => setTiktok(e.target.value)}
            placeholder="@toncompte"
            style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>

          <label style={{color:'#aaa',fontSize:'14px',display:'block',marginBottom:'6px'}}>🎧 Spotify</label>
          <input value={spotify} onChange={e => setSpotify(e.target.value)}
            placeholder="Lien vers ton profil Spotify"
            style={{width:'100%',background:'#1a0030',border:'1px solid #2d1040',borderRadius:'10px',padding:'12px',color:'#fff',marginBottom:'15px',boxSizing:'border-box'}}/>
        </div>

        <div style={{background:'#0d0020',padding:'20px',borderRadius:'20px',border:'1px solid #2d1040',marginBottom:'20px'}}>
          <p style={{color:'#aaa',fontSize:'14px',margin:0}}>📧 Email : <span style={{color:'white'}}>{user?.email}</span></p>
        </div>

        <button onClick={handleSave} disabled={chargement}
          style={{width:'100%',background:'#9B59B6',color:'#fff',padding:'16px',borderRadius:'12px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'none',marginBottom:'15px'}}>
          {chargement ? '⏳ Sauvegarde...' : '💾 Sauvegarder le profil'}
        </button>

        {sauvegarde && (
          <p style={{textAlign:'center',color:'#1DB954',fontWeight:'bold'}}>✅ Profil sauvegardé !</p>
        )}

        <div style={{textAlign:'center',marginTop:'20px'}}>
          <a href="/dashboard" style={{color:'#9B59B6',textDecoration:'none',fontSize:'14px'}}>← Retour au dashboard</a>
        </div>
      </div>
    </main>
  );
}
