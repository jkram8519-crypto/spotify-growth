'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { GENRES, PlanAnswers, PlanTask, daysBetween } from '@/lib/release-plan';

// Plan de sortie : quelques questions, puis un plan personnalisé, sauvegardé,
// avec des étapes à cocher et des rappels par email. Gratuit pour tous les comptes.

type Plan = { track_name: string; release_date: string; answers: PlanAnswers; tasks: PlanTask[]; reminders: boolean };

async function authFetch(url: string, init: RequestInit = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
}

const track = (name: string, meta: Record<string, string | number> = {}) =>
  authFetch('/api/event', { method: 'POST', body: JSON.stringify({ name, meta }) }).catch(() => {});

const TOOL_LABELS: Record<string, string> = {
  pitch: 'Générer mon pitch',
  playlists: 'Chercher des playlists',
  contenu: 'Générer mes publications',
  script: 'Générer mon script vidéo',
  analytics: 'Analyser mes stats',
};

const card: React.CSSProperties = { background: '#0d0020', padding: '24px', borderRadius: '20px', border: '1px solid #2d1040', marginBottom: '20px' };
const field: React.CSSProperties = { width: '100%', background: '#1a0030', border: '1px solid #2d1040', borderRadius: '10px', padding: '12px', color: '#fff', marginBottom: '18px', boxSizing: 'border-box', fontSize: '15px' };
const label: React.CSSProperties = { display: 'block', color: '#ddd', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' };
const primary: React.CSSProperties = { background: '#9B59B6', color: '#fff', padding: '14px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', width: '100%' };

function frDate(iso: string): string {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', timeZone: 'UTC' });
}

function dayLabel(day: number): string {
  return day === 0 ? 'JOUR J' : day > 0 ? `J+${day}` : `J${day}`;
}

function Choice({ value, current, onPick, children }: { value: string; current: string; onPick: (v: string) => void; children: React.ReactNode }) {
  const on = value === current;
  return (
    <button type="button" onClick={() => onPick(value)} aria-pressed={on}
      style={{ background: on ? '#9B59B6' : '#1a0030', color: '#fff', border: on ? '1px solid #9B59B6' : '1px solid #2d1040', padding: '10px 14px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }}>
      {children}
    </button>
  );
}

export default function ReleasePlan({ onGoTo }: { onGoTo: (section: string) => void }) {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [today, setToday] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [trackName, setTrackName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [distributor, setDistributor] = useState('ready');
  const [networks, setNetworks] = useState<string[]>(['instagram']);
  const [sacem, setSacem] = useState('unknown');
  const [adsBudget, setAdsBudget] = useState('no');

  useEffect(() => {
    (async () => {
      try {
        const res = await authFetch('/api/plan');
        const data = await res.json();
        if (data.plan) setPlan(data.plan);
        if (data.today) setToday(data.today);
        track('plan_viewed', { has_plan: data.plan ? 'oui' : 'non' });
      } catch {
        setError('Impossible de charger ton plan. Recharge la page.');
      }
      setLoading(false);
    })();
  }, []);

  const create = async () => {
    setError('');
    if (trackName.trim().length < 2) { setError('Donne le titre de ton morceau.'); return; }
    if (!releaseDate) { setError('Choisis une date de sortie, même approximative : tu pourras refaire ton plan.'); return; }
    if (!genre) { setError('Choisis ton genre musical.'); return; }
    setSaving(true);
    try {
      const res = await authFetch('/api/plan', {
        method: 'POST',
        body: JSON.stringify({ track: trackName, releaseDate, answers: { genre, distributor, networks, sacem, adsBudget: adsBudget === 'yes' } }),
      });
      const data = await res.json();
      if (data.plan) { setPlan(data.plan); setToday(data.today); setEditing(false); window.scrollTo({ top: 0 }); }
      else setError(data.error || 'Une erreur est survenue. Réessaie.');
    } catch {
      setError('Erreur de connexion. Réessaie.');
    }
    setSaving(false);
  };

  const toggle = async (task: PlanTask) => {
    if (!plan) return;
    const done = !task.done;
    setPlan({ ...plan, tasks: plan.tasks.map(t => (t.id === task.id ? { ...t, done } : t)) });
    const res = await authFetch('/api/plan', { method: 'PATCH', body: JSON.stringify({ taskId: task.id, done }) }).catch(() => null);
    if (!res || !res.ok) {
      setPlan({ ...plan, tasks: plan.tasks.map(t => (t.id === task.id ? { ...t, done: !done } : t)) });
      setError('Cette étape n\'a pas pu être enregistrée. Réessaie.');
    }
  };

  const toggleReminders = async () => {
    if (!plan) return;
    const reminders = !plan.reminders;
    setPlan({ ...plan, reminders });
    await authFetch('/api/plan', { method: 'PATCH', body: JSON.stringify({ reminders }) }).catch(() => {});
  };

  const openTool = (task: PlanTask) => {
    track('tool_opened_from_plan', { task: task.id, tool: task.tool || '' });
    onGoTo(task.tool!);
  };

  if (loading) return <p style={{ color: '#aaa' }}>Chargement de ton plan…</p>;

  // ---------- Formulaire ----------
  if (!plan || editing) {
    const toggleNet = (n: string) => setNetworks(networks.includes(n) ? networks.filter(x => x !== n) : [...networks, n]);
    return (
      <div style={{ maxWidth: '640px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>🗓️ Mon plan de sortie</h1>
        <p style={{ color: '#aaa', marginBottom: '24px', lineHeight: 1.6 }}>
          Réponds à six questions. Tu repars avec ton plan daté, étape par étape, de la préparation jusqu&apos;à deux semaines après la sortie. Il est sauvegardé et gratuit.
        </p>
        <div style={card}>
          <label style={label} htmlFor="plan-track">Quel titre sors-tu ?</label>
          <input id="plan-track" style={field} value={trackName} onChange={e => setTrackName(e.target.value)} placeholder="Titre du morceau" maxLength={80} />

          <label style={label} htmlFor="plan-date">Quand sort-il ?</label>
          <input id="plan-date" type="date" style={field} value={releaseDate} min={today || undefined} onChange={e => setReleaseDate(e.target.value)} />

          <label style={label} htmlFor="plan-genre">Ton genre musical</label>
          <select id="plan-genre" style={field} value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="">Choisir…</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          <span style={label}>Où en es-tu avec ton distributeur ?</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
            <Choice value="none" current={distributor} onPick={setDistributor}>Je n&apos;ai pas encore de distributeur</Choice>
            <Choice value="ready" current={distributor} onPick={setDistributor}>J&apos;en ai un, le titre n&apos;est pas encore envoyé</Choice>
            <Choice value="sent" current={distributor} onPick={setDistributor}>Le titre est déjà envoyé</Choice>
          </div>

          <span style={label}>Où publies-tu ?</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
            {[['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['youtube', 'YouTube']].map(([id, name]) => {
              const on = networks.includes(id);
              return (
                <button key={id} type="button" onClick={() => toggleNet(id)} aria-pressed={on}
                  style={{ background: on ? '#9B59B6' : '#1a0030', color: '#fff', border: on ? '1px solid #9B59B6' : '1px solid #2d1040', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}>
                  {on ? '✓ ' : ''}{name}
                </button>
              );
            })}
          </div>

          <span style={label}>Es-tu inscrit à la SACEM ?</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
            <Choice value="yes" current={sacem} onPick={setSacem}>Oui</Choice>
            <Choice value="no" current={sacem} onPick={setSacem}>Non</Choice>
            <Choice value="unknown" current={sacem} onPick={setSacem}>Je ne sais pas ce que c&apos;est</Choice>
          </div>

          <span style={label}>As-tu un petit budget pub pour cette sortie ?</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
            <Choice value="no" current={adsBudget} onPick={setAdsBudget}>Non, 0 €</Choice>
            <Choice value="yes" current={adsBudget} onPick={setAdsBudget}>Oui, un peu</Choice>
          </div>

          {error && <p role="alert" style={{ color: '#e67e80', margin: '0 0 14px 0', fontSize: '14px' }}>{error}</p>}
          <button onClick={create} disabled={saving} style={{ ...primary, opacity: saving ? 0.7 : 1 }}>
            {saving ? '⏳ Création de ton plan…' : 'Créer mon plan de sortie'}
          </button>
          {editing && (
            <button onClick={() => { setEditing(false); setError(''); }} style={{ background: 'none', border: 'none', color: '#888', marginTop: '14px', width: '100%', cursor: 'pointer', fontSize: '13px' }}>
              Annuler et garder mon plan actuel
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---------- Plan ----------
  const doneCount = plan.tasks.filter(t => t.done).length;
  const percent = Math.round((doneCount / plan.tasks.length) * 100);
  const daysLeft = today ? daysBetween(today, plan.release_date) : 0;
  const next = plan.tasks.find(t => !t.done);
  const countdown = daysLeft > 1 ? `Sortie dans ${daysLeft} jours` : daysLeft === 1 ? 'Sortie demain' : daysLeft === 0 ? 'Sortie aujourd\'hui' : `Sorti il y a ${-daysLeft} jour${daysLeft < -1 ? 's' : ''}`;

  return (
    <div style={{ maxWidth: '720px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '6px' }}>🗓️ « {plan.track_name} »</h1>
      <p style={{ color: '#aaa', marginBottom: '20px' }}>{countdown} · {frDate(plan.release_date)}</p>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px', gap: '10px', flexWrap: 'wrap' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{doneCount} étape{doneCount > 1 ? 's' : ''} sur {plan.tasks.length}</p>
          <p style={{ margin: 0, color: '#1DB954', fontWeight: 'bold' }}>{percent} %</p>
        </div>
        <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} style={{ background: '#1a0030', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${percent}%`, height: '100%', background: '#1DB954', transition: 'width .3s' }} />
        </div>
        <p style={{ margin: '12px 0 0 0', color: '#aaa', fontSize: '13px' }}>Touche le carré à gauche d&apos;une étape quand elle est faite. Ton avancement est enregistré.</p>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', color: '#ccc', fontSize: '14px', cursor: 'pointer' }}>
          <input type="checkbox" checked={plan.reminders} onChange={toggleReminders} style={{ width: '18px', height: '18px', accentColor: '#9B59B6' }} />
          Me rappeler par email les jours où une étape est prévue
        </label>
      </div>

      {error && <p role="alert" style={{ color: '#e67e80', margin: '0 0 14px 0', fontSize: '14px' }}>{error}</p>}

      {plan.tasks.map(task => {
        const isNext = next?.id === task.id;
        return (
          <div key={task.id} style={{ display: 'flex', gap: '14px', padding: '16px', borderRadius: '14px', marginBottom: '10px', background: isNext ? '#1a0030' : '#0d0020', border: isNext ? '1px solid #9B59B6' : '1px solid #2d1040', opacity: task.done ? 0.55 : 1 }}>
            <button type="button" onClick={() => toggle(task)} aria-pressed={task.done}
              aria-label={task.done ? `Marquer comme à faire : ${task.title}` : `Marquer comme faite : ${task.title}`}
              style={{ width: '36px', height: '36px', borderRadius: '10px', border: task.done ? '2px solid #1DB954' : '2px solid #9B59B6', background: task.done ? '#1DB954' : 'transparent', color: '#000', fontWeight: 'bold', fontSize: '20px', lineHeight: 1, cursor: 'pointer', flexShrink: 0, padding: 0 }}>
              {task.done ? '✓' : ''}
            </button>
            <div style={{ minWidth: 0 }}>
              <p style={{ color: task.late && !task.done ? '#f39c12' : '#9B59B6', fontSize: '12px', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                {task.late ? (task.done ? 'Rattrapé' : 'À rattraper dès maintenant') : `${dayLabel(task.day)} · ${frDate(task.date)}`}{isNext ? ' · prochaine étape' : ''}
              </p>
              <p style={{ color: '#fff', fontSize: '16px', margin: '0 0 6px 0', fontWeight: 'bold', textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</p>
              <p style={{ color: '#bbb', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{task.detail}</p>
              {task.tip && (
                <p style={{ color: '#D7BDE2', fontSize: '13px', margin: '10px 0 0 0', lineHeight: 1.6, background: '#14002a', padding: '10px 12px', borderRadius: '10px' }}>
                  💡 Pour ton style : {task.tip}
                </p>
              )}
              {task.tool && !task.done && (
                <button onClick={() => openTool(task)} style={{ marginTop: '12px', background: 'transparent', color: '#c38be0', border: '1px solid #9B59B6', padding: '8px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                  {TOOL_LABELS[task.tool] || 'Ouvrir l\'outil'} →
                </button>
              )}
            </div>
          </div>
        );
      })}

      <button onClick={() => { setEditing(true); setTrackName(''); setReleaseDate(''); setError(''); }}
        style={{ background: 'none', border: '1px solid #444', color: '#aaa', padding: '12px 18px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', marginTop: '10px' }}>
        Préparer une autre sortie (remplace ce plan)
      </button>
    </div>
  );
}
