import SpotifyEmbedPlayer from '@/components/SpotifyEmbedPlayer';

export default function TestSpotifyPlayerPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0a0015',
        color: '#fff',
        padding: '60px 20px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '30px' }}>Test du lecteur Spotify</h1>

        <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '14px' }}>Version normale :</p>
        <SpotifyEmbedPlayer url="https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp" />

        <p style={{ color: '#aaa', margin: '30px 0 10px', fontSize: '14px' }}>Version compacte :</p>
        <SpotifyEmbedPlayer url="https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp" compact />
      </div>
    </main>
  );
}