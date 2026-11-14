'use client';
import { useState } from 'react';
import Link from 'next/link';
import { GENRES, PlanTask, buildPlan, cleanAnswers, daysBetween, todayParis } from '@/lib/release-plan';

// Outil public, sans compte : le rétroplanning daté d'une sortie, calculé dans le navigateur.
// L'artiste peut l'ajouter à son agenda (.ics). Pour cocher les étapes et recevoir les rappels,
// il crée un compte : ses réponses sont reprises dans le formulaire du tableau de bord.

const input: React.CSSProperties = { width: '100%', background: '#1a0030', border: '1px solid #2d1040', borderRadius: '10px', padding: '12px', color: '#fff', marginBottom: '18px', boxSizing: 'border-box', fontSize: '16px' };
const label: React.CSSProperties = { color: '#ddd', fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '8px' };

const track = (name: string, meta: Record<string, string | number> = {}) =>
  fetch('/api/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, meta }) }).catch(() => {});

function frDate(iso: string) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', timeZone: 'UTC' });
}
function dayLabel(d: number) {
  return d === 0 ? 'JOUR J' : d > 0 ? `J+${d}` : `J${d}`;
}

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on}
      style={{ background: on ? '#9B59B6' : '#1a0030', color: '#fff', border: on ? '1px solid #9B59B6' : '1px solid #2d1040', padding: '10px 14px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }}>
      {children}
    </button>
  );
}

// Fichier agenda : un événement d'une journée par étape, lisible par Google Agenda, Apple et Outlook.
function toIcs(trackName: string, tasks: PlanTask[]): string {
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  const fold = (line: string) => {
    const out: string[] = [];
    let rest = line;
    while (rest.length > 74) { out.push(rest.slice(0, 74)); rest = ' ' + rest.slice(74); }
    out.push(rest);
    return out.join('\r\n');
  };
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Spotlift//Plan de sortie//FR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  tasks.filter(t => !t.title.includes('trop tard')).forEach((t, i) => {
    const start = t.date.replace(/-/g, '');
    const end = new Date(t.date + 'T12:00:00Z');
    end.setUTCDate(end.getUTCDate() + 1);
    lines.push(
      'BEGIN:VEVENT',
      `UID:spotlift-${start}-${i}-${t.id}@getspotlift.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end.toISOString().slice(0, 10).replace(/-/g, '')}`,
      fold(`SUMMARY:${esc(`${trackName} · ${t.title}`)}`),
      fold(`DESCRIPTION:${esc(t.detail + '\n\nPlan préparé avec Spotlift : https://getspotlift.com/plan-de-sortie-gratuit')}`),
      'END:VEVENT',
    );
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export default function PlanDeSortieGratuit() {
  const today = todayParis();
  const [trackName, setTrackName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [distributor, setDistributor] = useState('ready');
  const [networks, setNetworks] = useState<string[]>(['instagram']);
  const [sacem, setSacem] = useState('unknown');
  const [adsBudget, setAdsBudget] = useState('no');
  const [tasks, setTasks] = useState<PlanTask[] | null>(null);
  const [error, setError] = useState('');

  const create = () => {
    setError('');
    if (trackName.trim().length < 2) { setError('Donne le titre de ton morceau.'); return; }
    if (!releaseDate) { setError('Choisis une date de sortie, même approximative.'); return; }
    const left = daysBetween(today, releaseDate);
    if (left < 0 || left > 366) { setError('La date de sortie doit être entre aujourd\'hui et dans un an.'); return; }
    if (!genre) { setError('Choisis ton genre musical.'); return; }
    const answers = cleanAnswers({ genre, distributor, networks, sacem, adsBudget: adsBudget === 'yes' });
    setTasks(buildPlan(trackName.trim().slice(0, 80), releaseDate, answers, today));
    try {
      localStorage.setItem('spotlift_plan_draft', JSON.stringify({ trackName: trackName.trim().slice(0, 80), releaseDate, genre, distributor, networks, sacem, adsBudget }));
    } catch {}
    track('public_plan_created', { genre, days_left: left, distributor });
    setTimeout(() => document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const downloadIcs = () => {
    if (!tasks) return;
    const blob = new Blob([toIcs(trackName.trim(), tasks)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plan-de-sortie-${trackName.trim().toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'spotlift'}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    track('public_plan_ics');
  };

  const daysLeft = releaseDate ? daysBetween(today, releaseDate) : 0;
  const toggleNet = (n: string) => setNetworks(networks.includes(n) ? networks.filter(x => x !== n) : [...networks, n]);

  return (
    <main style={{ background: '#000', color: '#fff', fontFamily: 'sans-serif', minHeight: '100vh', padding: '50px 20px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#9B59B6', textDecoration: 'none', fontSize: '14px' }}>← Spotlift</Link>

        <h1 style={{ fontSize: '34px', fontWeight: 'bold', margin: '20px 0 12px 0', lineHeight: 1.2 }}>Ton rétroplanning de sortie, gratuit</h1>
        <p style={{ color: '#bbb', fontSize: '17px', lineHeight: 1.6, margin: '0 0 8px 0' }}>
          Donne le titre et la date de sortie de ton morceau. Tu obtiens toutes les étapes datées, du master au bilan, et tu peux les ajouter à ton agenda en un clic.
        </p>
        <p style={{ color: '#1DB954', fontSize: '14px', margin: '0 0 28px 0' }}>✓ Sans inscription · ✓ Gratuit · ✓ Pensé pour les artistes indépendants francophones</p>

        <div style={{ background: '#0d0020', padding: '24px', borderRadius: '20px', border: '1px solid #2d1040' }}>
          <label style={label} htmlFor="t">Quel titre sors-tu ?</label>
          <input id="t" style={input} value={trackName} onChange={e => setTrackName(e.target.value)} placeholder="Titre du morceau" maxLength={80} />

          <label style={label} htmlFor="d">Quand sort-il ?</label>
          <input id="d" type="date" style={input} value={releaseDate} min={today} onChange={e => setReleaseDate(e.target.value)} />

          <label style={label} htmlFor="g">Ton genre musical</label>
          <select id="g" style={input} value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="">Choisir…</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          <span style={label}>Où en es-tu avec ton distributeur ?</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
            <Choice on={distributor === 'none'} onClick={() => setDistributor('none')}>Je n&apos;ai pas encore de distributeur</Choice>
            <Choice on={distributor === 'ready'} onClick={() => setDistributor('ready')}>J&apos;en ai un, le titre n&apos;est pas encore envoyé</Choice>
            <Choice on={distributor === 'sent'} onClick={() => setDistributor('sent')}>Le titre est déjà envoyé</Choice>
          </div>

          <span style={label}>Où publies-tu ?</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
            {[['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['youtube', 'YouTube']].map(([id, name]) => (
              <Choice key={id} on={networks.includes(id)} onClick={() => toggleNet(id)}>{networks.includes(id) ? '✓ ' : ''}{name}</Choice>
            ))}
          </div>

          <span style={label}>Es-tu inscrit à la SACEM ?</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
            <Choice on={sacem === 'yes'} onClick={() => setSacem('yes')}>Oui</Choice>
            <Choice on={sacem === 'no'} onClick={() => setSacem('no')}>Non</Choice>
            <Choice on={sacem === 'unknown'} onClick={() => setSacem('unknown')}>Je ne sais pas ce que c&apos;est</Choice>
          </div>

          <span style={label}>As-tu un petit budget pub ?</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
            <Choice on={adsBudget === 'no'} onClick={() => setAdsBudget('no')}>Non, 0 €</Choice>
            <Choice on={adsBudget === 'yes'} onClick={() => setAdsBudget('yes')}>Oui, un peu</Choice>
          </div>

          {error && <p role="alert" style={{ color: '#fff', background: '#7a1f2b', border: '1px solid #e67e80', borderRadius: '10px', padding: '12px 14px', margin: '0 0 14px 0', fontSize: '15px', fontWeight: 'bold' }}>⚠️ {error}</p>}
          <button onClick={create} style={{ background: '#9B59B6', color: '#fff', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '17px', width: '100%' }}>
            Voir mon plan de sortie
          </button>
        </div>

        {tasks && (
          <section id="plan" style={{ marginTop: '36px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 6px 0' }}>« {trackName.trim()} »</h2>
            <p style={{ color: '#aaa', margin: '0 0 20px 0' }}>
              {daysLeft > 1 ? `Sortie dans ${daysLeft} jours` : daysLeft === 1 ? 'Sortie demain' : 'Sortie aujourd\'hui'} · {frDate(releaseDate)} · {tasks.length} étapes
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
              <button onClick={downloadIcs} style={{ background: '#1DB954', color: '#000', padding: '12px 18px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
                📅 Ajouter à mon agenda
              </button>
              <a href="/inscription?utm_source=outil&utm_medium=plan-gratuit&utm_campaign=haut" onClick={() => track('public_plan_cta', { position: 'haut' })}
                style={{ background: 'transparent', color: '#c38be0', border: '1px solid #9B59B6', padding: '12px 18px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>
                ✉️ Recevoir les rappels par email
              </a>
            </div>

            {tasks.map((t, i) => (
              <div key={t.id} style={{ padding: '16px', borderRadius: '14px', marginBottom: '10px', background: '#0d0020', border: i === 0 ? '1px solid #9B59B6' : '1px solid #2d1040' }}>
                <p style={{ color: t.late ? '#f39c12' : '#9B59B6', fontSize: '12px', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                  {t.late ? 'À rattraper dès maintenant' : `${dayLabel(t.day)} · ${frDate(t.date)}`}
                </p>
                <p style={{ color: '#fff', fontSize: '16px', margin: '0 0 6px 0', fontWeight: 'bold' }}>{t.title}</p>
                <p style={{ color: '#bbb', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{t.detail}</p>
              </div>
            ))}

            <div style={{ background: 'linear-gradient(135deg,#6C3483,#9B59B6)', padding: '26px', borderRadius: '20px', margin: '28px 0', textAlign: 'center' }}>
              <h2 style={{ fontSize: '22px', margin: '0 0 10px 0' }}>Ne rate aucune étape</h2>
              <p style={{ margin: '0 0 18px 0', lineHeight: 1.6, opacity: 0.95 }}>
                Avec un compte gratuit, ton plan est enregistré, tu coches les étapes au fur et à mesure, tu reçois un email les jours où il y a quelque chose à faire, et des conseils adaptés à ton style. Tes réponses sont déjà remplies.
              </p>
              <a href="/inscription?utm_source=outil&utm_medium=plan-gratuit&utm_campaign=bas" onClick={() => track('public_plan_cta', { position: 'bas' })}
                style={{ background: '#fff', color: '#6C3483', padding: '14px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
                Créer mon compte gratuit →
              </a>
              <p style={{ margin: '12px 0 0 0', fontSize: '13px', opacity: 0.85 }}>Sans carte bancaire</p>
            </div>
          </section>
        )}

        <section style={{ marginTop: '44px', color: '#bbb', fontSize: '15px', lineHeight: 1.7 }}>
          <h2 style={{ color: '#fff', fontSize: '22px' }}>Pourquoi un rétroplanning pour une sortie ?</h2>
          <p>Une sortie se prépare à l&apos;envers : on part du jour J et on remonte le temps. Certaines étapes ont une vraie date limite. Spotify demande par exemple de recevoir ta musique au moins 7 jours avant sa sortie pour pouvoir la pitcher à ses éditeurs, et ton titre doit d&apos;abord être livré par ton distributeur.</p>
          <p>Ce plan place chaque étape au bon moment : envoi au distributeur, pitch éditorial, pré-enregistrement, annonce, extraits, jour J, relances et bilan. Il s&apos;adapte à tes réponses : sans distributeur, une étape pour en choisir un apparaît ; si ta sortie est proche, les étapes en retard passent en premier.</p>
          <p>Pour aller plus loin, lis notre guide <Link href="/blog/pitch-editorial-spotify-date-limite" style={{ color: '#c38be0' }}>sur la date limite du pitch éditorial Spotify</Link>.</p>
        </section>
      </div>
    </main>
  );
}
