import { ImageResponse } from 'next/og';
import { getSharedPlan } from '@/lib/shared-plan';
import { daysBetween, todayParis } from '@/lib/release-plan';

// Image d'aperçu affichée quand le lien du plan est partagé (WhatsApp, Instagram, X, iMessage).

export const alt = 'Plan de sortie partagé avec Spotlift';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = await getSharedPlan(slug);
  const track = plan?.track || 'Ma prochaine sortie';
  const artist = plan?.artist || '';
  const done = plan ? plan.steps.filter(s => s.done).length : 0;
  const total = plan ? plan.steps.length : 1;
  const percent = Math.round((done / total) * 100);
  const daysLeft = plan ? daysBetween(todayParis(), plan.releaseDate) : 0;
  const countdown = !plan ? '' : daysLeft > 1 ? `Sortie dans ${daysLeft} jours` : daysLeft === 1 ? 'Sortie demain' : daysLeft === 0 ? "Sortie aujourd'hui" : 'Disponible maintenant';

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px', background: 'linear-gradient(135deg,#0a0015,#2a0a45)', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 30, color: '#C38BE0', fontWeight: 700 }}>PLAN DE SORTIE</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.1 }}>« {track.slice(0, 40)} »</div>
          {artist ? <div style={{ display: 'flex', fontSize: 40, color: '#ddd', marginTop: 12 }}>{artist.slice(0, 40)}</div> : null}
          <div style={{ display: 'flex', fontSize: 34, color: '#1DB954', marginTop: 24 }}>{countdown}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, marginBottom: 14 }}>
            <span>{done} étape{done > 1 ? 's' : ''} sur {total}</span>
            <span>getspotlift.com</span>
          </div>
          <div style={{ display: 'flex', width: '100%', height: 22, background: '#1a0030', borderRadius: 11 }}>
            <div style={{ display: 'flex', width: `${Math.max(percent, 2)}%`, height: 22, background: '#1DB954', borderRadius: 11 }} />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
