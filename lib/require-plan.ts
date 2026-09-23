import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Vérification côté serveur : sans elle, n'importe qui peut appeler les routes IA
// directement (curl) et consommer les crédits Anthropic sans compte ni abonnement.

export type PlanLevel = 'free' | 'pro' | 'pro+';

const RANK: Record<PlanLevel, number> = { free: 0, pro: 1, 'pro+': 2 };

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function toLevel(sub: { plan?: string | null; status?: string | null; trial_end?: string | null } | null): PlanLevel {
  if (!sub) return 'free';
  if (sub.status === 'trial') {
    if (!sub.trial_end || new Date(sub.trial_end) < new Date()) return 'free';
    return 'pro';
  }
  if (sub.status !== 'active') return 'free';
  if (sub.plan === 'Pro+') return 'pro+';
  if (sub.plan === 'Pro') return 'pro';
  return 'free';
}

/**
 * Renvoie { userId, level } si l'appel est authentifié et que le plan suffit,
 * sinon une NextResponse 401/403 à retourner telle quelle.
 */
export async function requirePlan(
  req: NextRequest,
  minimum: PlanLevel
): Promise<{ userId: string; level: PlanLevel } | NextResponse> {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) {
    return NextResponse.json({ error: 'Connecte-toi pour utiliser cet outil.' }, { status: 401 });
  }

  const { data: userData, error } = await admin.auth.getUser(token);
  if (error || !userData?.user) {
    return NextResponse.json({ error: 'Session expirée, reconnecte-toi.' }, { status: 401 });
  }

  const { data: sub } = await admin
    .from('subscriptions')
    .select('plan, status, trial_end')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  const level = toLevel(sub);
  if (RANK[level] < RANK[minimum]) {
    return NextResponse.json(
      { error: minimum === 'pro+' ? 'Cet outil est réservé au plan Pro+.' : 'Cet outil est réservé au plan Pro.' },
      { status: 403 }
    );
  }

  return { userId: userData.user.id, level };
}
