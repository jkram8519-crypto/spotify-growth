import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requirePlan } from '@/lib/require-plan';
import { isClean } from '@/lib/moderation';
import { buildPlan, cleanAnswers, daysBetween, todayParis, PlanTask } from '@/lib/release-plan';

// Plan de sortie sauvegardé : un plan par compte, gratuit pour tout le monde.
// GET = lire, POST = créer ou remplacer, PATCH = cocher une étape ou couper les rappels.

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const logEvent = (userId: string, name: string, meta: Record<string, unknown> = {}) =>
  admin.from('events').insert({ user_id: userId, name, meta }).then(() => {}, () => {});

// Un conseil d'une phrase par étape clé, adapté au genre. Si l'IA échoue, le plan reste complet sans conseil.
const TIP_IDS = ['pitch', 'playlists', 'annonce', 'curateurs', 'extrait1', 'coulisses', 'jourj', 'bilan'];

async function addTips(tasks: PlanTask[], track: string, genre: string): Promise<PlanTask[]> {
  try {
    const targets = tasks.filter(t => TIP_IDS.includes(t.id));
    const prompt = `Tu conseilles un artiste indépendant francophone qui sort le titre "${track}" (genre : ${genre}).
Pour chaque étape ci-dessous, écris UN conseil concret et spécifique à ce genre musical, en une phrase de 25 mots maximum, en tutoyant.
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

export async function GET(req: NextRequest) {
  const auth = await requirePlan(req, 'free');
  if (auth instanceof NextResponse) return auth;
  const { data } = await admin
    .from('release_plans')
    .select('track_name, release_date, answers, tasks, reminders')
    .eq('user_id', auth.userId)
    .maybeSingle();
  return NextResponse.json({ plan: data || null, today: todayParis() });
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

    const tasks = await addTips(buildPlan(track, releaseDate, answers, today), track, answers.genre);
    const row = {
      user_id: auth.userId,
      track_name: track,
      release_date: releaseDate,
      answers,
      tasks,
      reminders: true,
      last_reminder_on: null,
      updated_at: new Date().toISOString(),
    };
    const { error } = await admin.from('release_plans').upsert(row, { onConflict: 'user_id' });
    if (error) {
      console.error('release_plans upsert', error.message);
      return NextResponse.json({ error: 'Impossible d\'enregistrer ton plan. Réessaie.' }, { status: 500 });
    }
    logEvent(auth.userId, 'plan_created', { genre: answers.genre, days_left: daysLeft, distributor: answers.distributor });
    return NextResponse.json({
      plan: { track_name: track, release_date: releaseDate, answers, tasks, reminders: true },
      today,
    });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur. Réessaie.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await requirePlan(req, 'free');
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await req.json();
    const { data: plan } = await admin
      .from('release_plans')
      .select('tasks, reminders')
      .eq('user_id', auth.userId)
      .maybeSingle();
    if (!plan) return NextResponse.json({ error: 'Aucun plan enregistré.' }, { status: 404 });

    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof body.taskId === 'string' && typeof body.done === 'boolean') {
      const tasks = (plan.tasks as PlanTask[]).map(t => (t.id === body.taskId ? { ...t, done: body.done } : t));
      update.tasks = tasks;
      if (body.done) logEvent(auth.userId, 'task_done', { task: body.taskId, done_count: tasks.filter(t => t.done).length });
    }
    if (typeof body.reminders === 'boolean') {
      update.reminders = body.reminders;
      logEvent(auth.userId, body.reminders ? 'reminders_on' : 'reminders_off');
    }
    const { error } = await admin.from('release_plans').update(update).eq('user_id', auth.userId);
    if (error) return NextResponse.json({ error: 'Enregistrement impossible. Réessaie.' }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur. Réessaie.' }, { status: 500 });
  }
}
