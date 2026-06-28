import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: trials, error } = await supabase
      .from('subscriptions')
      .select('user_id, created_at, status')
      .eq('status', 'trial');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const now = new Date();
    let sentJ1 = 0, sentJ2 = 0;

    for (const trial of trials || []) {
      const { data: userData } = await supabase.auth.admin.getUserById(trial.user_id);
      const email = userData?.user?.email;
      if (!email) continue;

      const createdAt = new Date(trial.created_at);
      const hoursSinceSignup = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

      if (hoursSinceSignup >= 20 && hoursSinceSignup < 28) {
        await fetch(`${req.nextUrl.origin}/api/email-j1`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }).catch(() => {});
        sentJ1++;
      } else if (hoursSinceSignup >= 44 && hoursSinceSignup < 52) {
        await fetch(`${req.nextUrl.origin}/api/email-j2`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }).catch(() => {});
        sentJ2++;
      }
    }

    return NextResponse.json({ success: true, sentJ1, sentJ2 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
