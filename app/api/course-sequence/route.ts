import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendCourseMail } from '@/lib/emails';
import { courseEmail, COURSE_GAPS, COURSE_LENGTH, unsubscribeUrl } from '@/lib/course';
import { addDays, todayParis } from '@/lib/release-plan';

// Cron quotidien : envoie l'email suivant de la formation aux inscrits dont c'est le jour.
// Un seul email par inscrit et par passage ; en cas d'échec, on retente le lendemain.

const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  const today = todayParis();
  const { data: subs, error } = await admin
    .from('course_subscribers')
    .select('email, token, step')
    .is('unsubscribed_at', null)
    .is('completed_at', null)
    .lte('next_send_on', today)
    .limit(300);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let sent = 0, failed = 0;
  for (const s of subs || []) {
    const n = s.step + 1;
    const mail = courseEmail(n);
    if (!mail) {
      await admin.from('course_subscribers').update({ completed_at: new Date().toISOString(), next_send_on: null }).eq('token', s.token);
      continue;
    }
    const ok = await sendCourseMail(s.email, mail, unsubscribeUrl(s.token));
    if (!ok) { failed++; continue; }
    sent++;
    const done = n >= COURSE_LENGTH;
    await admin.from('course_subscribers').update(
      done
        ? { step: n, next_send_on: null, completed_at: new Date().toISOString() }
        : { step: n, next_send_on: addDays(today, COURSE_GAPS[n + 1]) },
    ).eq('token', s.token);
    await admin.from('events').insert({ user_id: null, name: 'course_email_sent', meta: { step: n } });
  }
  return NextResponse.json({ success: true, sent, failed });
}
