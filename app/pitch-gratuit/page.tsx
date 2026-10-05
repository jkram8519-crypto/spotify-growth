'use client';
import { useState } from 'react';

const GENRES = ['Électro', 'Rap / Hip-hop', 'Pop', 'R&B', 'Rock', 'Afro', 'Lo-fi', 'House / Techno', 'Variété française', 'Autre'];

const input: React.CSSProperties = {
  width: '100%', background: '#1a0030', border: '1px solid #2d1040', borderRadius: '10px',
  padding: '12px', color: '#fff', marginBottom: '16px', boxSizing: 'border-box', fontSize: '15px',
};
const label: React.CSSProperties = { color: '#aaa', fontSize: '14px', display: 'block', marginBottom: '6px' };

export default function PitchGratuit() {
  const [track, setTrack] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('');
  const [ambiance, setAmbiance] = useState('');
  const [description, setDescription] = useState('');
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [limitReached, setLimitReached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setError('');
    if (track.trim().length < 2 || ambiance.trim().length < 3 || description.trim().length < 10) {
      setError('Remplis le titre, l\'ambiance et une courte description (au moins une phrase).');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/public-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track, artistName, genre, ambiance, description }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setLimitReached(true);
        setError(data.message);
      } else if (data.pitch) {
        setPitch(data.pitch);
        try { localStorage.setItem('spotlift_last_pitch', JSON.stringify({ track, pitch: data.pitch })); } catch {}
        try { (window as any).gtag?.('event', 'public_pitch_generated'); } catch {}
      } else {
        setError(data.error || 'La génération a échoué. Réessaie.');
      }
    } catch {
      setError('Erreur de connexion. Réessaie.');
    }
    setLoading(false);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(pitch); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'sans-serif', padding: '40px 16px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#9B59B6', textDecoration: 'none', fontWeight: 'bold' }}>← Spotlift</a>

        <h1 style={{ fontSize: '34px', fontWeight: 'bold', margin: '24px 0 10px', lineHeight: 1.2 }}>
          Générateur de pitch Spotify <span style={{ color: '#9B59B6' }}>gratuit</span>
        </h1>
        <p style={{ color: '#aaa', fontSize: '17px', marginBottom: '30px', lineHeight: 1.6 }}>
          Décris ton morceau, l&apos;IA écrit le pitch à envoyer aux curateurs de playlists et à Spotify for Artists.
          Sans inscription, en 10 secondes.
        </p>

        <div style={{ background: '#0d0020', padding: '24px', borderRadius: '20px', border: '1px solid #2d1040', marginBottom: '24px' }}>
          <label style={label}>Titre du morceau *</label>
          <input style={input} value={track} onChange={e => setTrack(e.target.value)} placeholder="ex : Eclipse" maxLength={80} />

          <label style={label}>Nom d&apos;artiste</label>
          <input style={input} value={artistName} onChange={e => setArtistName(e.target.value)} placeholder="ex : J.K. RAM" maxLength={60} />

          <label style={label}>Genre</label>
          <select style={input} value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="">Choisir un genre</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          <label style={label}>Ambiance / émotion *</label>
          <input style={input} value={ambiance} onChange={e => setAmbiance(e.target.value)} placeholder="ex : nocturne, mélancolique, montée d'énergie" maxLength={120} />

          <label style={label}>Décris ton morceau en 1 ou 2 phrases *</label>
          <textarea style={{ ...input, minHeight: '90px', resize: 'vertical' }} value={description} onChange={e => setDescription(e.target.value)}
            placeholder="ex : Un titre électro écrit après une rupture, avec un drop inspiré de la French Touch." maxLength={400} />

          <button onClick={generate} disabled={loading || limitReached}
            style={{ width: '100%', background: limitReached ? '#444' : '#9B59B6', color: '#fff', padding: '15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: loading || limitReached ? 'default' : 'pointer' }}>
            {loading ? 'Génération en cours…' : '✨ Générer mon pitch'}
          </button>
          {error && <p style={{ color: '#e67e80', marginTop: '14px', marginBottom: 0 }}>{error}</p>}
        </div>

        {pitch && (
          <div style={{ background: '#0d0020', padding: '24px', borderRadius: '20px', border: '1px solid #9B59B6', marginBottom: '24px' }}>
            <p style={{ color: '#9B59B6', fontWeight: 'bold', fontSize: '13px', margin: '0 0 12px' }}>TON PITCH</p>
            <p style={{ color: '#eee', lineHeight: 1.7, whiteSpace: 'pre-line', margin: '0 0 18px' }}>{pitch}</p>
            <button onClick={copy} style={{ background: 'transparent', color: '#fff', border: '1px solid #555', padding: '10px 18px', borderRadius: '20px', cursor: 'pointer' }}>
              {copied ? '✓ Copié' : 'Copier le pitch'}
            </button>
          </div>
        )}

        {(pitch || limitReached) && (
          <div style={{ background: 'linear-gradient(135deg,#6C3483,#9B59B6)', padding: '26px', borderRadius: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px' }}>Et maintenant, prépare toute ta sortie</p>
            <p style={{ opacity: 0.9, margin: '0 0 18px', lineHeight: 1.6 }}>
              Crée ton compte pour sauvegarder tes pitchs, trouver des playlists et suivre ton plan jour par jour jusqu&apos;à la sortie.
              Essai Pro gratuit 3 jours, sans carte bancaire.
            </p>
            <a href="/inscription" style={{ background: '#000', color: '#fff', padding: '14px 30px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
              Créer mon compte gratuit →
            </a>
          </div>
        )}

        <div style={{ color: '#888', fontSize: '14px', lineHeight: 1.7, marginTop: '40px' }}>
          <h2 style={{ color: '#fff', fontSize: '20px' }}>À quoi sert un pitch Spotify ?</h2>
          <p>
            Quand tu soumets un titre dans Spotify for Artists ou que tu contactes un curateur de playlist, tu as quelques lignes pour donner envie d&apos;écouter.
            Un bon pitch présente l&apos;ambiance, l&apos;histoire du morceau et le public visé, sans formules creuses.
          </p>
          <h2 style={{ color: '#fff', fontSize: '20px' }}>Quand l&apos;envoyer ?</h2>
          <p>
            Soumets ton titre dans Spotify for Artists au moins 7 jours avant la sortie (idéalement 3 à 4 semaines), et contacte les curateurs indépendants 2 semaines avant.
          </p>
        </div>
      </div>
    </main>
  );
}
