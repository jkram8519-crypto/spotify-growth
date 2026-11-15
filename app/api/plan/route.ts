import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requirePlan } from '@/lib/require-plan';
import { isClean } from '@/lib/moderation';
import { buildPlan, cleanAnswers, daysBetween, todayParis, PlanTask } from '@/lib/release-plan';
import { shareSlug } from '@/lib/shared-plan';

// Plan de sortie sauvegardé : un plan par compte, gratuit pour tout le monde.
// GET = lire, POST = créer ou remplacer, PATCH = cocher une étape ou couper les rappels.

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Toujours attendu (await) : sur Vercel, une écriture lancée sans attendre est coupée dès que la réponse part.
async function logEvent(userId: string, name: string, meta: Record<string, unknown> = {}) {
  try { await admin.from('events').insert({ user_id: userId, name, meta }); } catch {}
}

// Un conseil d'une phrase par étape clé, adapté au genre. Si l'IA échoue, le plan reste complet sans conseil.
const TIP_IDS = ['pitch', 'playlists', 'annonce', 'curateurs', 'extrait1', 'coulisses', 'bilan'];

async function addTips(tasks: PlanTask[], track: string, genre: string, daysLeft: number): Promise<PlanTask[]> {
  try {
    const targets = tasks.filter(t => TIP_IDS.includes(t.id));
    const prompt = `Tu conseilles un artiste indépendant francophone débutant qui sort le titre "${track}" (genre : ${genre}) dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}.
Pour chaque étape ci-dessous, écris UN conseil concret et spécifique à ce genre musical, en une phrase de 25 mots maximum, en tutoyant.
Dis comment bien faire l'étape, jamais quand la faire : ne mentionne aucun délai, aucune date, aucun nombre de jours ou de semaines.
Français simple, sans jargon du métier ni anglicisme (pas de "DSP", "teaser", "asset").
Pas de promesse de résultat, pas de chiffres inventés, pas de noms de playlists ou de marques.
Format strict : une ligne par étape, sous la forme identifiant | conseil. Aucun autre texte.

${targets.map(t => `${t.id} | ${t.title}`).join('\n')}`;
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: 'claude-haiku-4-5', max_tokens: 700, messages: [{ role: 'user', content: prompt }] }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return tasks;
    const data = await res.json();
    const text: string = data.content?.[0]?.text || '';
    const tips: Record<string, string> = {};
    for (const line of text.split('\n')) {
      const i = line.indexOf('|');
      if (i < 0) continue;
      const id = line.slice(0, i).trim().replace(/[^a-z0-9-]/gi, '');
      const tip = line.slice(i + 1).trim().replace(/[*#_`]/g, '').slice(0, 240);
      if (TIP_IDS.includes(id) && tip.length > 15 && isClean(tip)) tips[id] = tip;
    }
    return tasks.map(t => (tips[t.id] ? { ...t, tip: tips[t.id] } : t));
  } catch {
    return tasks;
  }
}

const PLAN_FIELDS = 'id, track_name, release_date, answers, tasks, reminders, shared, share_slug, artist_name, kits';
const MAX_PLANS = 10;

// Plan affiché : celui marqué « selected ». S'il n'y en a plus (cas rare), on reprend le plus récent.
async function selectedPlan(userId: string) {
  const { data } = await admin.from('release_plans').select(PLAN_FIELDS)
    .eq('user_id', userId).eq('selected', true).maybeSingle();
  if (data) return data;
  const { data: last } = await admin.from('release_plans').select(PLAN_FIELDS)
    .eq('user_id', userId).order('updated_at', { ascending: false }).limit(1).maybeSingle();
  if (last) await admin.from('release_plans').update({ selected: true }).eq('id', last.id);
  return last;
}

async function planList(userId: string) {
  const { data } = await admin.from('release_plans').select('id, track_name, release_date, tasks, selected')
    .eq('user_id', userId).order('release_date', { ascending: false });
  return (data || []).map(p => {
    const tasks = (p.tasks as PlanTask[]) || [];
    return { id: p.id, track_name: p.track_name, release_date: p.release_date, selected: p.selected, done: tasks.filter(t => t.done).length, total: tasks.length };
  });
}

export async function GET(req: NextRequest) {
  const auth = await requirePlan(req, 'free');
  if (auth instanceof NextResponse) return auth;
  const plan = await selectedPlan(auth.userId);
  const plans = plan ? await planList(auth.userId) : [];
  return NextResponse.json({ plan: plan || null, plans, today: todayParis(), level: auth.level });
}

export async function POST(req: NextRequest) {
  const auth = await requirePlan(req, 'free');
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await req.json();
    const track = typeof body.track === 'string' ? body.track.trim().slice(0, 80) : '';
    const releaseDate = typeof body.releaseDate === 'string' ? body.releaseDate.slice(0, 10) : '';
    const answers = cleanAnswers(body.answers);
    const today = todayParis();

    if (track.length < 2 || !/[a-zA-Z0-9]/.test(track)) {
      return NextResponse.json({ error: 'Donne le titre de ton morceau.' }, { status: 400 });
    }
    if (!isClean(track)) {
      return NextResponse.json({ error: 'Ce titre contient des propos inappropriés. Merci de le reformuler.' }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate) || isNaN(new Date(releaseDate + 'T12:00:00Z').getTime())) {
      return NextResponse.json({ error: 'Choisis une date de sortie.' }, { status: 400 });
    }
    const daysLeft = daysBetween(today, releaseDate);
    if (daysLeft < 0 || daysLeft > 366) {
      return NextResponse.json({ error: 'La date de sortie doit être entre aujourd\'hui et dans un an.' }, { status: 400 });
    }

    const tasks = await addTips(buildPlan(track, releaseDate, answers, today), track, answers.genre, daysLeft);
    // Gratuit : un seul plan, remplacé. Pro : « nouvelle sortie » ajoute un plan et garde les autres.
    const asNew = body.mode === 'new';
    if (asNew && auth.level === 'free') {
      return NextResponse.json({ error: 'pro', message: 'Garder plusieurs sorties est inclus dans Pro.' }, { status: 403 });
    }
    const row = {
      user_id: auth.userId,
      track_name: track,
      release_date: releaseDate,
      answers,
      tasks,
      reminders: true,
      last_reminder_on: null,
      shared: false,
      share_slug: null,
      kits: {},
      selected: true,
      updated_at: new Date().toISOString(),
    };
    const current = await selectedPlan(auth.userId);
    let error;
    if (current && !asNew) {
      ({ error } = await admin.from('release_plans').update(row).eq('id', current.id));
    } else {
      const { count } = await admin.from('release_plans').select('id', { count: 'exact', head: true }).eq('user_id', auth.userId);
      if ((count || 0) >= MAX_PLANS) {
        return NextResponse.json({ error: `Tu as déjà ${MAX_PLANS} sorties enregistrées. Supprime une ancienne sortie pour en ajouter une.` }, { status: 400 });
      }
      await admin.from('release_plans').update({ selected: false }).eq('user_id', auth.userId);
      ({ error } = await admin.from('release_plans').insert(row));
    }
    if (error) {
      console.error('release_plans save', error.message);
      return NextResponse.json({ error: 'Impossible d\'enregistrer ton plan. Réessaie.' }, { status: 500 });
    }
    await logEvent(auth.userId, 'plan_created', { genre: answers.genre, days_left: daysLeft, distributor: answers.distributor, mode: asNew ? 'new' : 'replace' });
    const saved = await selectedPlan(auth.userId);
    return NextResponse.json({ plan: saved, plans: await planList(auth.userId), today });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur. Réessaie.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await requirePlan(req, 'free');
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await req.json();
    // Changer de sortie affichée (Pro) : on vérifie que le plan appartient bien au compte.
    if (typeof body.selectPlan === 'string') {
      const { data: target } = await admin.from('release_plans').select('id').eq('id', body.selectPlan).eq('user_id', auth.userId).maybeSingle();
      if (!target) return NextResponse.json({ error: 'Sortie introuvable.' }, { status: 404 });
      await admin.from('release_plans').update({ selected: false }).eq('user_id', auth.userId);
      await admin.from('release_plans').update({ selected: true }).eq('id', target.id);
      return NextResponse.json({ plan: await selectedPlan(auth.userId), plans: await planList(auth.userId) });
    }
    // Supprimer une sortie qui n'est pas celle affichée.
    if (typeof body.deletePlan === 'string') {
      const { error } = await admin.from('release_plans').delete()
        .eq('id', body.deletePlan).eq('user_id', auth.userId).eq('selected', false);
      if (error) return NextResponse.json({ error: 'Suppression impossible. Réessaie.' }, { status: 500 });
      return NextResponse.json({ plans: await planList(auth.userId) });
    }
    // Cocher une étape : une seule requête SQL atomique (fonction set_plan_task_done).
    // Lire puis réécrire toute la liste faisait perdre des coches quand on en touchait plusieurs à la suite.
    if (typeof body.taskId === 'string' && typeof body.done === 'boolean') {
      const { data: doneCount, error } = await admin.rpc('set_plan_task_done', {
        p_user: auth.userId,
        p_task: body.taskId.slice(0, 40),
        p_done: body.done,
      });
      if (error) return NextResponse.json({ error: 'Enregistrement impossible. Réessaie.' }, { status: 500 });
      if (doneCount === null) return NextResponse.json({ error: 'Aucun plan enregistré.' }, { status: 404 });
      if (body.done) await logEvent(auth.userId, 'task_done', { task: body.taskId.slice(0, 40), done_count: doneCount });
    }
    if (typeof body.reminders === 'boolean') {
      const { error } = await admin
        .from('release_plans')
        .update({ reminders: body.reminders, updated_at: new Date().toISOString() })
        .eq('user_id', auth.userId).eq('selected', true);
      if (error) return NextResponse.json({ error: 'Enregistrement impossible. Réessaie.' }, { status: 500 });
      await logEvent(auth.userId, body.reminders ? 'reminders_on' : 'reminders_off');
    }
    // Partage public du plan (choix explicite de l'artiste, réversible).
    if (typeof body.share === 'boolean') {
      const { data: current } = await admin
        .from('release_plans')
        .select('track_name, share_slug')
        .eq('user_id', auth.userId)
        .eq('selected', true)
        .maybeSingle();
      if (!current) return NextResponse.json({ error: 'Aucun plan enregistré.' }, { status: 404 });
      const update: Record<string, unknown> = { shared: body.share, updated_at: new Date().toISOString() };
      if (typeof body.artistName === 'string') {
        const name = body.artistName.trim().replace(/\s+/g, ' ').slice(0, 60);
        if (name && !isClean(name)) return NextResponse.json({ error: 'Ce nom contient des propos inappropriés.' }, { status: 400 });
        update.artist_name = name || null;
      }
      let slug = current.share_slug as string | null;
      if (body.share && !slug) {
        slug = shareSlug(current.track_name);
        update.share_slug = slug;
      }
      const { error } = await admin.from('release_plans').update(update).eq('user_id', auth.userId).eq('selected', true);
      if (error) return NextResponse.json({ error: 'Partage impossible. Réessaie.' }, { status: 500 });
      await logEvent(auth.userId, body.share ? 'plan_shared' : 'plan_unshared');
      return NextResponse.json({ success: true, shared: body.share, share_slug: slug });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur. Réessaie.' }, { status: 500 });
  }
}
