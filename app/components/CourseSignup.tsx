'use client';
import { useState } from 'react';
import Link from 'next/link';

// Encart d'inscription à la formation gratuite « Ta sortie en 6 emails ».

const LESSONS = [
  'Choisir ta date et travailler à rebours',
  'Envoyer ton titre au distributeur à temps',
  'Réussir ton pitch éditorial Spotify',
  'Prévenir ton public avant le jour J',
  'Le jour J et la première semaine',
  'Faire le bilan et préparer la suivante',
];

export default function CourseSignup({ source }: { source: string }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'already' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, consent: true, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setState('error'); setMessage(data.error || 'Une erreur est survenue, réessaie.'); return; }
      setState(data.already ? 'already' : 'done');
    } catch {
      setState('error'); setMessage('Connexion impossible, réessaie.');
    }
  }

  return (
    <section style={{ background: '#0d0020', border: '1px solid #9B59B6', borderRadius: '20px', padding: '26px', margin: '32px 0' }}>
      <p style={{ color: '#c38be0', fontSize: '13px', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>FORMATION GRATUITE PAR EMAIL</p>
      <h2 style={{ color: '#fff', fontSize: '22px', margin: '0 0 10px 0' }}>Ta sortie en 6 emails</h2>
      <p style={{ color: '#bbb', margin: '0 0 14px 0', lineHeight: 1.6, fontSize: '15px' }}>
        Un email tous les 2 ou 3 jours pendant 12 jours, avec une étape concrète à chaque fois :
      </p>
      <ol style={{ color: '#ddd', margin: '0 0 18px 0', paddingLeft: '20px', lineHeight: 1.8, fontSize: '15px' }}>
        {LESSONS.map(l => <li key={l}>{l}</li>)}
      </ol>

      {state === 'done' || state === 'already' ? (
        <p style={{ color: '#1DB954', fontWeight: 'bold', margin: 0, lineHeight: 1.6 }}>
          {state === 'done'
            ? '✓ C\'est parti ! Le premier email arrive dans ta boîte (pense à vérifier les spams ou l\'onglet Promotions).'
            : '✓ Tu es déjà inscrit à la formation.'}
        </p>
      ) : (
        <form onSubmit={submit}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <label htmlFor={`course-email-${source}`} style={{ position: 'absolute', left: '-9999px' }}>Ton adresse email</label>
            <input id={`course-email-${source}`} type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="ton@email.com" autoComplete="email"
              style={{ flex: '1 1 220px', background: '#1a0030', border: '1px solid #2d1040', borderRadius: '12px', padding: '13px', color: '#fff', fontSize: '16px' }} />
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={e => setWebsite(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }} />
            <button type="submit" disabled={state === 'loading'}
              style={{ flex: '0 0 auto', background: '#9B59B6', color: '#fff', border: 'none', borderRadius: '12px', padding: '13px 20px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', opacity: state === 'loading' ? 0.6 : 1 }}>
              {state === 'loading' ? 'Inscription…' : 'Recevoir la formation'}
            </button>
          </div>
          {state === 'error' && <p style={{ color: '#ff6b6b', margin: '10px 0 0 0', fontSize: '14px' }}>{message}</p>}
          <p style={{ color: '#888', fontSize: '12px', margin: '12px 0 0 0', lineHeight: 1.5 }}>
            En t&apos;inscrivant, tu acceptes de recevoir ces 6 emails de Spotlift. Désinscription en un clic dans chaque email. <Link href="/confidentialite" style={{ color: '#aaa' }}>Confidentialité</Link>
          </p>
        </form>
      )}
    </section>
  );
}
