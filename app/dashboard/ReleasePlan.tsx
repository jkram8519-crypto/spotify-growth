'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { GENRES, PlanAnswers, PlanTask, daysBetween } from '@/lib/release-plan';
import { KIT_SPECS, Kit } from '@/lib/plan-kit';

// Plan de sortie : quelques questions, puis un plan personnalisé, sauvegardé,
// avec des étapes à cocher et des rappels par email. Gratuit pour tous les comptes.

type PlanSummary = { id: string; track_name: string; release_date: string; selected: boolean; done: number; total: number };
type Plan = { id?: string; track_name: string; release_date: string; answers: PlanAnswers; tasks: PlanTask[]; reminders: boolean; shared?: boolean; share_slug?: string | null; artist_name?: string | null; kits?: Record<string, Kit> };

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
  const [level, setLevel] = useState<'free' | 'pro' | 'pro+'>('free');
  const [plans, setPlans] = useState<PlanSummary[]>([]);
  const [newMode, setNewMode] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [kitBusy, setKitBusy] = useState('');
  const [kitMsg, setKitMsg] = useState<Record<string, string>>({});
  const [kitCopied, setKitCopied] = useState('');
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
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Brouillon du formulaire : un rechargement ne fait pas perdre les réponses.
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem('spotlift_plan_draft') || 'null');
      if (d) {
        if (typeof d.trackName === 'string') setTrackName(d.trackName);
        if (typeof d.releaseDate === 'string') setReleaseDate(d.releaseDate);
        if (typeof d.genre === 'string') setGenre(d.genre);
        if (typeof d.distributor === 'string') setDistributor(d.distributor);
        if (Array.isArray(d.networks)) setNetworks(d.networks);
        if (typeof d.sacem === 'string') setSacem(d.sacem);
        if (typeof d.adsBudget === 'string') setAdsBudget(d.adsBudget);
      }
    } catch {}
    setDraftLoaded(true);
  }, []);
  useEffect(() => {
    if (!draftLoaded) return;
    try { localStorage.setItem('spotlift_plan_draft', JSON.stringify({ trackName, releaseDate, genre, distributor, networks, sacem, adsBudget })); } catch {}
  }, [draftLoaded, trackName, releaseDate, genre, distributor, networks, sacem, adsBudget]);

  useEffect(() => {
    (async () => {
      try {
        const res = await authFetch('/api/plan');
        const data = await res.json();
        if (data.plan) { setPlan(data.plan); setArtistName(data.plan.artist_name || ''); }
        if (data.level) setLevel(data.level);
        if (Array.isArray(data.plans)) setPlans(data.plans);
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
        body: JSON.stringify({ track: trackName, releaseDate, mode: newMode ? 'new' : 'replace', answers: { genre, distributor, networks, sacem, adsBudget: adsBudget === 'yes' } }),
      });
      const data = await res.json();
      if (data.plan) {
        setPlan(data.plan); setToday(data.today); setEditing(false); setNewMode(false); setTrackName(''); setReleaseDate('');
        setArtistName(data.plan.artist_name || '');
        if (Array.isArray(data.plans)) setPlans(data.plans);
        window.scrollTo({ top: 0 });
      }
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

  // Rouvre le formulaire avec les réponses du plan actuel (genre, réseaux…) : seuls le titre et la date changent.
  function startPlan(asNew: boolean) {
    if (plan?.answers) {
      setGenre(plan.answers.genre || '');
      setNetworks(plan.answers.networks?.length ? plan.answers.networks : ['instagram']);
      setSacem(plan.answers.sacem || 'unknown');
      setAdsBudget(plan.answers.adsBudget ? 'yes' : 'no');
      setDistributor('ready');
    }
    setNewMode(asNew); setEditing(true); setTrackName(''); setReleaseDate(''); setError('');
    window.scrollTo({ top: 0 });
  }

  async function switchPlan(id: string) {
    if (switching) return;
    setSwitching(true);
    try {
      const res = await authFetch('/api/plan', { method: 'PATCH', body: JSON.stringify({ selectPlan: id }) });
      const data = await res.json();
      if (data.plan) { setPlan(data.plan); setArtistName(data.plan.artist_name || ''); setKitMsg({}); }
      if (Array.isArray(data.plans)) setPlans(data.plans);
    } catch {
      setError('Impossible d\'ouvrir cette sortie. Réessaie.');
    }
    setSwitching(false);
  }

  async function deletePlan(p: PlanSummary) {
    if (!window.confirm(`Supprimer la sortie « ${p.track_name} » et son avancement ? Cette action est définitive.`)) return;
    const res = await authFetch('/api/plan', { method: 'PATCH', body: JSON.stringify({ deletePlan: p.id }) }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (Array.isArray(data.plans)) setPlans(data.plans);
  }

  async function generateKit(task: PlanTask) {
    if (!plan || kitBusy) return;
    const spec = KIT_SPECS[task.id];
    if (!spec.free && level === 'free') {
      setKitMsg(m => ({ ...m, [task.id]: 'locked' }));
      track('kit_locked_click', { task: task.id });
      return;
    }
    setKitBusy(task.id);
    setKitMsg(m => ({ ...m, [task.id]: '' }));
    try {
      const res = await authFetch('/api/plan-kit', { method: 'POST', body: JSON.stringify({ taskId: task.id }) });
      const data = await res.json().catch(() => ({}));
      if (res.status === 403 && data.error === 'pro') { setKitMsg(m => ({ ...m, [task.id]: 'locked' })); return; }
      if (!res.ok || !data.kit) { setKitMsg(m => ({ ...m, [task.id]: data.error || 'La génération n\'a pas abouti. Réessaie.' })); return; }
      setPlan(p => (p ? { ...p, kits: { ...(p.kits || {}), [task.id]: data.kit } } : p));
    } catch {
      setKitMsg(m => ({ ...m, [task.id]: 'Connexion impossible. Réessaie.' }));
    } finally {
      setKitBusy('');
    }
  }

  async function copyKit(key: string, text: string) {
    try { await navigator.clipboard.writeText(text); setKitCopied(key); setTimeout(() => setKitCopied(''), 2000); } catch {}
  }

  const shareUrl = plan?.share_slug ? `https://getspotlift.com/plan/${plan.share_slug}` : '';

  const setShare = async (share: boolean) => {
    if (!plan) return;
    setSharing(true);
    setError('');
    try {
      const res = await authFetch('/api/plan', { method: 'PATCH', body: JSON.stringify({ share, artistName }) });
      const data = await res.json();
      if (res.ok) setPlan({ ...plan, shared: data.shared, share_slug: data.share_slug, artist_name: artistName.trim() || null });
      else setError(data.error || 'Partage impossible. Réessaie.');
    } catch {
      setError('Erreur de connexion. Réessaie.');
    }
    setSharing(false);
  };

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch {}
    track('share_link_copied');
  };

  const nativeShare = async () => {
    if (!plan) return;
    try {
      await navigator.share({ title: `« ${plan.track_name} »`, text: `Ma prochaine sortie « ${plan.track_name} » arrive : voici mon plan.`, url: shareUrl });
      track('share_native');
    } catch {}
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
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{newMode ? '➕ Nouvelle sortie' : '🗓️ Mon plan de sortie'}</h1>
        {newMode && <p style={{ color: '#1DB954', fontSize: '14px', margin: '0 0 10px 0' }}>Ta sortie actuelle est gardée. Tes réponses précédentes sont déjà remplies : change seulement ce qui est différent.</p>}
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

          {error && <p role="alert" style={{ color: '#fff', background: '#7a1f2b', border: '1px solid #e67e80', borderRadius: '10px', padding: '12px 14px', margin: '0 0 14px 0', fontSize: '15px', fontWeight: 'bold' }}>⚠️ {error}</p>}
          <button onClick={create} disabled={saving} style={{ ...primary, opacity: saving ? 0.7 : 1 }}>
            {saving ? '⏳ Création de ton plan… (quelques secondes)' : 'Créer mon plan de sortie'}
          </button>
          <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', margin: '12px 0 0 0' }}>Ton plan n&apos;est enregistré qu&apos;après ce bouton.</p>
          {editing && (
            <button onClick={() => { setEditing(false); setNewMode(false); setError(''); }} style={{ background: 'none', border: 'none', color: '#888', marginTop: '14px', width: '100%', cursor: 'pointer', fontSize: '13px' }}>
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

      {plans.length > 1 && (
        <div style={{ ...card, padding: '16px' }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '14px' }}>🎵 Mes sorties</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {plans.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => !p.selected && switchPlan(p.id)} disabled={p.selected || switching} aria-current={p.selected ? 'true' : undefined}
                  style={{ flex: 1, textAlign: 'left', background: p.selected ? '#1a0030' : 'transparent', border: p.selected ? '1px solid #9B59B6' : '1px solid #2d1040', borderRadius: '10px', padding: '10px 12px', color: '#fff', cursor: p.selected ? 'default' : 'pointer', fontSize: '14px' }}>
                  <b>« {p.track_name} »</b> <span style={{ color: '#aaa' }}>· {frDate(p.release_date)} · {p.done}/{p.total} étapes</span>{p.selected ? <span style={{ color: '#c38be0' }}> · affichée</span> : ''}
                </button>
                {!p.selected && (
                  <button onClick={() => deletePlan(p)} aria-label={`Supprimer la sortie ${p.track_name}`} title="Supprimer"
                    style={{ background: 'none', border: 'none', color: '#777', cursor: 'pointer', fontSize: '18px', padding: '4px 8px' }}>×</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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

      <div style={{ ...card, border: plan.shared ? '1px solid #1DB954' : '1px solid #2d1040' }}>
        <p style={{ margin: '0 0 6px 0', fontWeight: 'bold' }}>📣 Partager mon plan</p>
        {!plan.shared ? (
          <>
            <p style={{ color: '#aaa', fontSize: '14px', margin: '0 0 14px 0', lineHeight: 1.6 }}>
              Crée une page publique avec ton titre, ta date de sortie et ton avancement, à mettre en story ou à envoyer à ton équipe. Aucune information personnelle n&apos;y apparaît, et tu peux la retirer quand tu veux.
            </p>
            <label htmlFor="artist-name" style={{ display: 'block', color: '#ccc', fontSize: '13px', marginBottom: '6px' }}>Ton nom d&apos;artiste (facultatif)</label>
            <input id="artist-name" value={artistName} onChange={e => setArtistName(e.target.value)} maxLength={60} placeholder="Ex. J.K. RAM"
              style={{ ...field, marginBottom: '12px' }} />
            <button onClick={() => setShare(true)} disabled={sharing} style={{ ...primary, fontSize: '15px', padding: '12px', opacity: sharing ? 0.7 : 1 }}>
              {sharing ? 'Création du lien…' : 'Créer mon lien de partage'}
            </button>
          </>
        ) : (
          <>
            <p style={{ color: '#aaa', fontSize: '14px', margin: '0 0 12px 0' }}>Ta page est en ligne. Elle se met à jour quand tu coches une étape.</p>
            <p style={{ background: '#1a0030', borderRadius: '10px', padding: '10px 12px', fontSize: '14px', wordBreak: 'break-all', margin: '0 0 12px 0' }}>{shareUrl}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={copyLink} style={{ background: '#1DB954', color: '#000', border: 'none', padding: '10px 16px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                {copied ? '✓ Lien copié' : 'Copier le lien'}
              </button>
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button onClick={nativeShare} style={{ background: 'transparent', color: '#c38be0', border: '1px solid #9B59B6', padding: '10px 16px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Partager…
                </button>
              )}
              <a href={shareUrl} target="_blank" rel="noopener" style={{ color: '#c38be0', padding: '10px 6px', fontSize: '14px' }}>Voir la page</a>
              <button onClick={() => setShare(false)} disabled={sharing} style={{ background: 'none', border: 'none', color: '#888', padding: '10px 6px', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}>
                Retirer la page
              </button>
            </div>
          </>
        )}
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
              {KIT_SPECS[task.id] && (() => {
                const spec = KIT_SPECS[task.id];
                const kit = plan.kits?.[task.id];
                const locked = !spec.free && level === 'free';
                const busy = kitBusy === task.id;
                const msg = kitMsg[task.id];
                return (
                  <div style={{ marginTop: '12px' }}>
                    {kit ? (
                      <div style={{ background: '#14002a', border: '1px solid #2d1040', borderRadius: '12px', padding: '12px' }}>
                        <p style={{ margin: '0 0 8px 0', color: '#c38be0', fontSize: '12px', fontWeight: 'bold' }}>✨ TON CONTENU PRÊT À L&apos;EMPLOI</p>
                        {kit.blocks.map((b, i) => (
                          <div key={i} style={{ marginBottom: i < kit.blocks.length - 1 ? '12px' : 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <p style={{ margin: 0, color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>{b.label}</p>
                              <button onClick={() => copyKit(`${task.id}-${i}`, b.text)} style={{ background: 'none', border: '1px solid #444', color: kitCopied === `${task.id}-${i}` ? '#1DB954' : '#bbb', borderRadius: '8px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer', flexShrink: 0 }}>
                                {kitCopied === `${task.id}-${i}` ? '✓ Copié' : 'Copier'}
                              </button>
                            </div>
                            <p style={{ margin: 0, color: '#ddd', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{b.text}</p>
                          </div>
                        ))}
                        <button onClick={() => generateKit(task)} disabled={busy} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#888', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                          {busy ? 'Nouvelle version en cours…' : 'Proposer une autre version'}
                        </button>
                      </div>
                    ) : !task.done && (
                      <button onClick={() => generateKit(task)} disabled={busy}
                        style={{ background: locked ? 'transparent' : '#9B59B6', color: locked ? '#c38be0' : '#fff', border: '1px solid #9B59B6', padding: '8px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', opacity: busy ? 0.7 : 1 }}>
                        {busy ? '✨ Préparation… (10 secondes)' : locked ? `🔒 ${spec.button} · Pro` : `✨ ${spec.button}`}
                      </button>
                    )}
                    {msg === 'locked' ? (
                      <p style={{ margin: '10px 0 0 0', fontSize: '13px', color: '#ddd', lineHeight: 1.6, background: '#14002a', padding: '10px 12px', borderRadius: '10px' }}>
                        Avec Pro, Spotlift prépare le contenu de chaque étape pour ton titre : posts, idées de vidéos, messages aux curateurs, relances. Tu n&apos;as plus qu&apos;à copier-coller.{' '}
                        <a href="/pricing?from=kit" onClick={() => track('kit_upgrade_click', { task: task.id })} style={{ color: '#c38be0', fontWeight: 'bold' }}>Voir l&apos;offre Pro →</a>
                      </p>
                    ) : msg ? (
                      <p role="alert" style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#e67e80' }}>{msg}</p>
                    ) : null}
                  </div>
                );
              })()}
              {task.tool && !task.done && !KIT_SPECS[task.id] && (
                <button onClick={() => openTool(task)} style={{ marginTop: '12px', background: 'transparent', color: '#c38be0', border: '1px solid #9B59B6', padding: '8px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                  {TOOL_LABELS[task.tool] || 'Ouvrir l\'outil'} →
                </button>
              )}
            </div>
          </div>
        );
      })}

      {level !== 'free' ? (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          <button onClick={() => startPlan(true)} style={{ background: '#9B59B6', border: 'none', color: '#fff', padding: '12px 18px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
            ➕ Préparer une nouvelle sortie
          </button>
          <button onClick={() => startPlan(false)} style={{ background: 'none', border: '1px solid #444', color: '#aaa', padding: '12px 18px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px' }}>
            Refaire ce plan
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => startPlan(false)}
            style={{ background: 'none', border: '1px solid #444', color: '#aaa', padding: '12px 18px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px' }}>
            Préparer une autre sortie (remplace ce plan)
          </button>
          <p style={{ color: '#888', fontSize: '13px', margin: '10px 0 0 0', lineHeight: 1.6 }}>
            Avec Pro, tu gardes toutes tes sorties et tu prépares la suivante sans effacer celle-ci.{' '}
            <a href="/pricing?from=sorties" onClick={() => track('kit_upgrade_click', { task: 'sorties' })} style={{ color: '#c38be0' }}>Voir l&apos;offre Pro</a>
          </p>
        </div>
      )}
    </div>
  );
}
