import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendDay1, sendDay2 } from '@/lib/emails';

// Cron quotidien (vercel.json). Chaque essai tombe une seule fois dans chaque fenêtre
// de 24h, donc chaque inscrit reçoit exactement un email J+1 et un email J+2.
//  - J+1 : entre 20h et 44h après l'inscription (contenu adapté selon l'usage)
//  - J+2 : entre 44h et 68h après l'inscription (l'essai se termine le lendemain)
export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const now = Date.now();
    const since = new Date(now - 68 * 60 * 60 * 1000).toISOString();

    const { data: trials, error } = await supabase
      .from('subscriptions')
      .select('user_id, created_at')
      .eq('status', 'trial')
      .gte('created_at', since);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    let sentJ1 = 0, sentJ2 = 0;
    for (const trial of trials || []) {
      const hours = (now - new Date(trial.created_at + (String(trial.created_at).endsWith('Z') ? '' : 'Z')).getTime()) / 3_600_000;
      if (hours < 20 || hours >= 68) continue;

      const { data: userData } = await supabase.auth.admin.getUserById(trial.user_id);
      const email = userData?.user?.email;
      if (!email) continue;

      if (hours < 44) {
        const { count } = await supabase
          .from('tool_usage')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', trial.user_id);
        if (await sendDay1(email, (count ?? 0) > 0)) sentJ1++;
      } else {
        if (await sendDay2(email)) sentJ2++;
      }
    }

    return NextResponse.json({ success: true, sentJ1, sentJ2 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
