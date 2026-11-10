import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendPlanReminder } from '@/lib/emails';
import { daysBetween, todayParis, PlanTask } from '@/lib/release-plan';

// Cron quotidien : envoie à chaque artiste les étapes de son plan prévues aujourd'hui.
// Un seul email par jour et par plan, et rien si aucune étape n'est due.

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  const today = todayParis();
  const { data: plans, error } = await admin
    .from('release_plans')
    .select('user_id, track_name, release_date, tasks, last_reminder_on')
    .eq('reminders', true)
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let sent = 0;
  for (const plan of plans || []) {
    if (plan.last_reminder_on === today) continue;
    const tasks = plan.tasks as PlanTask[];
    const due = tasks.filter(t => !t.done && t.date === today);
    if (due.length === 0) continue;
    const overdue = tasks.filter(t => !t.done && t.date < today).length;

    const { data: userData } = await admin.auth.admin.getUserById(plan.user_id);
    const account = userData?.user;
    if (!account?.email) continue;
    const email = account.email;
    const name = (account.user_metadata?.full_name || account.user_metadata?.name || '') as string;

    const ok = await sendPlanReminder(email, name, plan.track_name, due, overdue, daysBetween(today, plan.release_date));
    if (ok) {
      sent++;
      await admin.from('release_plans').update({ last_reminder_on: today }).eq('user_id', plan.user_id);
      await admin.from('events').insert({ user_id: plan.user_id, name: 'reminder_sent', meta: { due: due.length } });
    }
  }
  return NextResponse.json({ success: true, plans: plans?.length || 0, sent });
}
