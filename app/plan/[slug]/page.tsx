import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSharedPlan } from '@/lib/shared-plan';
import { daysBetween, todayParis } from '@/lib/release-plan';

// Page publique d'un plan de sortie partagé par un artiste.
// Non indexée (contenu personnel), mais chaque lien partagé ramène vers l'outil gratuit.

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const plan = await getSharedPlan(slug);
  if (!plan) return { robots: { index: false } };
  const who = plan.artist ? ` de ${plan.artist}` : '';
  return {
    title: `« ${plan.track} »${who} : le plan de sortie | Spotlift`,
    description: `Suis la préparation de la sortie de « ${plan.track} »${who}, étape par étape.`,
    robots: { index: false, follow: true },
    openGraph: {
      title: `« ${plan.track} »${who} arrive bientôt`,
      description: 'Le plan de sortie, étape par étape. Prépare le tien gratuitement avec Spotlift.',
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Spotlift',
    },
  };
}

function frDate(iso: string) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
}

export default async function SharedPlanPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const plan = await getSharedPlan(slug);
  if (!plan) notFound();

  // Visite comptée pour le suivi (sans donnée personnelle).
  try {
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    await admin.from('events').insert({ user_id: null, name: 'share_page_viewed', meta: { slug } });
  } catch {}

  const today = todayParis();
  const daysLeft = daysBetween(today, plan.releaseDate);
  const done = plan.steps.filter(s => s.done).length;
  const percent = Math.round((done / plan.steps.length) * 100);
  const countdown = daysLeft > 1 ? `Sortie dans ${daysLeft} jours` : daysLeft === 1 ? 'Sortie demain' : daysLeft === 0 ? 'Sortie aujourd\'hui' : `Sorti depuis ${-daysLeft} jour${daysLeft < -1 ? 's' : ''}`;
  const cta = `/plan-de-sortie-gratuit?utm_source=partage&utm_medium=plan&utm_campaign=${plan.slug}`;

  return (
    <main style={{ background: '#000', color: '#fff', fontFamily: 'sans-serif', minHeight: '100vh', padding: '40px 18px 70px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#9B59B6', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Spotlift</Link>

        <p style={{ color: '#9B59B6', fontWeight: 'bold', fontSize: '13px', letterSpacing: '0.08em', margin: '28px 0 8px 0' }}>PLAN DE SORTIE</p>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 8px 0', lineHeight: 1.15 }}>« {plan.track} »</h1>
        {plan.artist && <p style={{ color: '#ddd', fontSize: '18px', margin: '0 0 8px 0' }}>{plan.artist}</p>}
        <p style={{ color: '#aaa', margin: '0 0 24px 0' }}>{countdown} · {frDate(plan.releaseDate)}</p>

        <div style={{ background: '#0d0020', padding: '20px', borderRadius: '18px', border: '1px solid #2d1040', marginBottom: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>{done} étape{done > 1 ? 's' : ''} sur {plan.steps.length}</span>
            <span style={{ color: '#1DB954', fontWeight: 'bold' }}>{percent} %</span>
          </div>
          <div style={{ background: '#1a0030', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${percent}%`, height: '100%', background: '#1DB954' }} />
          </div>
        </div>

        {plan.steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 14px', borderRadius: '12px', marginBottom: '8px', background: '#0d0020', border: '1px solid #2d1040', opacity: s.done ? 0.6 : 1 }}>
            <span aria-hidden style={{ width: '24px', height: '24px', borderRadius: '7px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', background: s.done ? '#1DB954' : 'transparent', border: s.done ? '2px solid #1DB954' : '2px solid #6C3483', color: '#000' }}>
              {s.done ? '✓' : ''}
            </span>
            <div>
              <p style={{ color: '#9B59B6', fontSize: '12px', fontWeight: 'bold', margin: '0 0 2px 0' }}>{s.day === 0 ? 'JOUR J' : s.day > 0 ? `J+${s.day}` : `J${s.day}`}</p>
              <p style={{ margin: 0, fontSize: '15px', textDecoration: s.done ? 'line-through' : 'none' }}>
                <span style={{ position: 'absolute', left: '-9999px' }}>{s.done ? 'Fait : ' : 'À faire : '}</span>{s.title}
              </p>
            </div>
          </div>
        ))}

        <div style={{ background: 'linear-gradient(135deg,#6C3483,#9B59B6)', padding: '26px', borderRadius: '20px', margin: '30px 0 0 0', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', margin: '0 0 10px 0' }}>Toi aussi, tu prépares une sortie ?</h2>
          <p style={{ margin: '0 0 18px 0', lineHeight: 1.6, opacity: 0.95 }}>
            Donne le titre et la date de ton morceau : tu obtiens ton plan daté en 30 secondes. Gratuit, sans inscription.
          </p>
          <Link href={cta} style={{ background: '#fff', color: '#6C3483', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
            Créer mon plan de sortie →
          </Link>
        </div>
      </div>
    </main>
  );
}
