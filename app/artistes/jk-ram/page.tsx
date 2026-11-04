import { ARTIST, RELEASES } from '@/lib/artist-journal';

const card: React.CSSProperties = { background: '#0d0020', border: '1px solid #2d1040', borderRadius: '20px', padding: '24px' };
const muted: React.CSSProperties = { color: '#aaa', lineHeight: 1.7, margin: 0 };

export default function JkRamPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'sans-serif', padding: '40px 16px 80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', display: 'grid', gap: '28px' }}>
        <a href="/" style={{ color: '#9B59B6', textDecoration: 'none', fontWeight: 'bold' }}>← Spotlift</a>

        <header style={{ display: 'grid', gap: '12px' }}>
          <p style={{ color: '#9B59B6', fontWeight: 'bold', fontSize: '13px', letterSpacing: '0.08em', margin: 0 }}>ARTISTE SPOTLIFT N°1</p>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold', margin: 0, lineHeight: 1.15 }}>{ARTIST.name}</h1>
          <p style={{ ...muted, fontSize: '17px' }}>{ARTIST.bio}</p>
          <p style={{ color: '#777', fontSize: '13px', margin: 0 }}>
            Transparence : {ARTIST.name} est aussi le créateur de Spotlift. Les chiffres affichés ici sont réels et mis à jour après chaque sortie.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {ARTIST.links.map(l => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                style={{ border: '1px solid #9B59B6', color: '#fff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px' }}>
                {l.label}
              </a>
            ))}
          </div>
        </header>

        <iframe
          title={`${ARTIST.name} sur Spotify`}
          src={`https://open.spotify.com/embed/artist/${ARTIST.spotifyArtistId}?utm_source=generator&theme=0`}
          width="100%" height="352" loading="lazy"
          style={{ border: 0, borderRadius: '12px' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />

        {RELEASES.map(r => (
          <section key={r.slug} id={r.slug} style={{ ...card, display: 'grid', gap: '20px' }}>
            <div style={{ display: 'grid', gap: '8px' }}>
              <p style={{ color: '#9B59B6', fontWeight: 'bold', fontSize: '13px', margin: 0 }}>{r.status.toUpperCase()}</p>
              <h2 style={{ fontSize: '28px', margin: 0 }}>{r.title}</h2>
              <p style={muted}>{r.intro}</p>
              {r.links.map(l => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: '#c38be0', fontWeight: 'bold' }}>{l.label} →</a>
              ))}
            </div>

            <div style={{ display: 'grid', gap: '14px' }}>
              <h3 style={{ fontSize: '17px', margin: 0 }}>Le journal de sortie</h3>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '14px', borderLeft: '2px solid #2d1040' }}>
                {r.steps.map(s => (
                  <li key={s.date + s.title} style={{ paddingLeft: '16px' }}>
                    <p style={{ color: '#9B59B6', fontSize: '13px', fontWeight: 'bold', margin: '0 0 2px' }}>{s.date}</p>
                    <p style={{ fontWeight: 'bold', margin: '0 0 2px' }}>{s.title}</p>
                    <p style={{ ...muted, fontSize: '15px' }}>{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            {r.pitch && (
              <div style={{ display: 'grid', gap: '8px' }}>
                <h3 style={{ fontSize: '17px', margin: 0 }}>Le pitch généré avec Spotlift</h3>
                <p style={{ ...muted, color: '#ddd', background: '#1a0030', borderLeft: '3px solid #9B59B6', padding: '14px 16px', borderRadius: '8px' }}>{r.pitch}</p>
              </div>
            )}

            {r.videos.length > 0 && (
              <div style={{ display: 'grid', gap: '14px' }}>
                <h3 style={{ fontSize: '17px', margin: 0 }}>Les vidéos</h3>
                {r.videos.map(v => (
                  <div key={v.youtubeId} style={{ display: 'grid', gap: '6px' }}>
                    <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden', background: '#111' }}>
                      <iframe
                        title={v.title}
                        src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                        loading="lazy"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>{v.title}</p>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'grid', gap: '6px' }}>
              <h3 style={{ fontSize: '17px', margin: 0 }}>Les résultats</h3>
              {r.results.map(t => <p key={t} style={{ ...muted, fontSize: '15px' }}>{t}</p>)}
            </div>
          </section>
        ))}

        <section style={{ background: 'linear-gradient(135deg,#6C3483,#9B59B6)', padding: '28px', borderRadius: '20px', textAlign: 'center', display: 'grid', gap: '12px' }}>
          <p style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Prépare ta sortie de la même façon</p>
          <p style={{ opacity: 0.9, margin: 0, lineHeight: 1.6 }}>Commence par ton pitch Spotify : gratuit, sans inscription, en 10 secondes.</p>
          <a href="/pitch-gratuit" style={{ background: '#000', color: '#fff', padding: '14px 30px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', justifySelf: 'center' }}>
            Générer mon pitch gratuit →
          </a>
        </section>
      </div>
    </main>
  );
}
