import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Suivi du parcours : enregistre quelques événements nommés (liste fermée),
// rattachés au compte quand l'appel porte un jeton de session valide.

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ALLOWED = ['dashboard_opened', 'plan_viewed', 'gate_seen', 'tool_opened_from_plan', 'signup_page_viewed'];

export async function POST(req: NextRequest) {
  try {
    const { name, meta } = await req.json();
    if (!ALLOWED.includes(name)) return NextResponse.json({ error: 'Événement inconnu' }, { status: 400 });

    let userId: string | null = null;
    const header = req.headers.get('authorization') || '';
    if (header.startsWith('Bearer ')) {
      const { data } = await admin.auth.getUser(header.slice(7));
      userId = data?.user?.id || null;
    }
    const safeMeta: Record<string, string> = {};
    if (meta && typeof meta === 'object') {
      for (const [k, v] of Object.entries(meta).slice(0, 5)) {
        if (typeof v === 'string' || typeof v === 'number') safeMeta[k.slice(0, 30)] = String(v).slice(0, 80);
      }
    }
    await admin.from('events').insert({ user_id: userId, name, meta: safeMeta });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
