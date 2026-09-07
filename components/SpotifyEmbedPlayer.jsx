'use client';

/* -------------------------------------------------------------------------
   SpotifyEmbedPlayer — lecteur Spotify officiel intégré (iframe)
   Aucune clé API ni authentification requise. Fonctionne avec n'importe
   quel morceau, album, playlist ou épisode PUBLIC sur Spotify.

   Usage:
     import SpotifyEmbedPlayer from '@/components/SpotifyEmbedPlayer';

     // Avec une URL Spotify classique (ce que les gens collent depuis l'app)
     <SpotifyEmbedPlayer url="https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp" />

     // Avec un URI Spotify (format spotify:track:...)
     <SpotifyEmbedPlayer url="spotify:track:3n3Ppam7vgaVa1iaRUc9Lp" />

     // Album ou playlist, même principe
     <SpotifyEmbedPlayer url="https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa" />

     // Version compacte (barre fine, sans grande pochette) — idéale dans une liste
     <SpotifyEmbedPlayer url="..." compact />

     // Thème clair au lieu du thème sombre par défaut de Spotify
     <SpotifyEmbedPlayer url="..." theme="light" />
------------------------------------------------------------------------- */

// Types Spotify supportés par l'embed officiel
const SUPPORTED_TYPES = ['track', 'album', 'playlist', 'episode', 'show', 'artist'];

function parseSpotifyUrl(input) {
  if (!input) return null;

  // Format URI: spotify:track:ID / spotify:album:ID / etc.
  const uriMatch = input.match(/^spotify:(track|album|playlist|episode|show|artist):([a-zA-Z0-9]+)/);
  if (uriMatch) {
    const [, type, id] = uriMatch;
    return SUPPORTED_TYPES.includes(type) ? { type, id } : null;
  }

  // Format URL: https://open.spotify.com/track/ID?si=...
  try {
    const url = new URL(input);
    if (!url.hostname.includes('spotify.com')) return null;
    const parts = url.pathname.split('/').filter(Boolean);
    // Gère aussi les URLs localisées type /intl-fr/track/ID
    const typeIndex = parts.findIndex((p) => SUPPORTED_TYPES.includes(p));
    if (typeIndex === -1 || !parts[typeIndex + 1]) return null;
    return { type: parts[typeIndex], id: parts[typeIndex + 1] };
  } catch {
    return null;
  }
}

export default function SpotifyEmbedPlayer({ url, compact = false, theme = 'dark', className = '' }) {
  const parsed = parseSpotifyUrl(url);

  if (!parsed) {
    return (
      <div
        style={{
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #2d1040',
          background: '#1a0030',
          color: '#aaa',
          fontSize: '13px',
          fontFamily: 'sans-serif',
        }}
      >
        Lien Spotify invalide ou non reconnu.
      </div>
    );
  }

  const { type, id } = parsed;
  const height = compact ? 80 : type === 'track' || type === 'episode' ? 152 : 352;
  const embedSrc = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator${theme === 'light' ? '&theme=1' : ''}`;

  return (
    <div className={className} style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <iframe
        title={`Spotify ${type} player`}
        style={{ borderRadius: '12px', border: 'none' }}
        src={embedSrc}
        width="100%"
        height={height}
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}