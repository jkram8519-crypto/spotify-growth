import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requirePlan } from '@/lib/require-plan';
import { isClean } from '@/lib/moderation';
import { KIT_SPECS, kitPrompt, parseKit, Kit } from '@/lib/plan-kit';
import { daysBetween, todayParis } from '@/lib/release-plan';

// Génère le contenu prêt à l'emploi d'une étape du plan de sortie, et le garde dans release_plans.kits.
// Le kit « pitch » est gratuit, les autres demandent Pro. Limite : 30 générations par jour et par compte.

const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const DAILY_LIMIT = 30;

export async function POST(req: NextRequest) {
  const auth = await requirePlan(req, 'free');
  if (auth instanceof NextResponse) return auth;

  let body: { taskId?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Requête invalide' }, { status: 400 }); }
  const taskId = String(body.taskId || '');
  const spec = KIT_SPECS[taskId];
  if (!spec) return NextResponse.json({ error: 'Pas de contenu prévu pour cette étape.' }, { status: 400 });

  if (!spec.free && auth.level === 'free') {
    return NextResponse.json({ error: 'pro', message: 'Le contenu prêt à l\'emploi pour cette étape est inclus dans Pro.' }, { status: 403 });
  }

  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count } = await admin.from('events').select('id', { count: 'exact', head: true })
    .eq('user_id', auth.userId).eq('name', 'kit_generated').gte('created_at', since);
  if ((count || 0) >= DAILY_LIMIT) {
    return NextResponse.json({ error: 'Tu as atteint la limite de 30 contenus par jour. Réessaie demain.' }, { status: 429 });
  }

  const { data: plan } = await admin.from('release_plans')
    .select('track_name, release_date, answers, artist_name, kits')
    .eq('user_id', auth.userId).maybeSingle();
  if (!plan) return NextResponse.json({ error: 'Crée d\'abord ton plan de sortie.' }, { status: 404 });

  const answers = (plan.answers || {}) as { genre?: string; networks?: string[] };
  const labels: Record<string, string> = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube Shorts' };
  const prompt = kitPrompt(taskId, {
    track: plan.track_name,
    genre: answers.genre || 'Autre',
    artist: plan.artist_name || '',
    daysLeft: daysBetween(todayParis(), plan.release_date),
    networks: (answers.networks || []).map(n => labels[n]).filter(Boolean),
  });

  let blocks: Kit['blocks'] = [];
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: 'claude-haiku-4-5', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] }),
      signal: AbortSignal.timeout(30000),
    });
    if (res.ok) {
      const data = await res.json();
      blocks = parseKit(data.content?.[0]?.text || '');
    } else {
      console.error('plan-kit anthropic', res.status);
    }
  } catch (e) {
    console.error('plan-kit', e);
  }
  blocks = blocks.filter(b => isClean(b.text) && isClean(b.label));
  if (blocks.length === 0) {
    return NextResponse.json({ error: 'La génération n\'a pas abouti. Réessaie dans un instant.' }, { status: 502 });
  }

  const kit: Kit = { blocks, created_at: new Date().toISOString() };
  const kits = { ...((plan.kits as Record<string, Kit>) || {}), [taskId]: kit };
  await admin.from('release_plans').update({ kits }).eq('user_id', auth.userId);
  try { await admin.from('events').insert({ user_id: auth.userId, name: 'kit_generated', meta: { task: taskId, level: auth.level } }); } catch {}

  return NextResponse.json({ kit });
}
