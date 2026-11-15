import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendCourseMail } from '@/lib/emails';
import { courseEmail, COURSE_GAPS, unsubscribeUrl } from '@/lib/course';
import { addDays, todayParis } from '@/lib/release-plan';

// Inscription à la formation « Ta sortie en 6 emails ».
// L'email 1 part tout de suite, les suivants via le cron /api/course-sequence.

const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export async function POST(req: NextRequest) {
  let body: { email?: string; source?: string; consent?: boolean; website?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Requête invalide' }, { status: 400 }); }

  // Champ piège invisible : rempli uniquement par les robots
  if (body.website) return NextResponse.json({ success: true });

  const email = String(body.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: 'Merci de confirmer ton inscription' }, { status: 400 });
  }
  const source = String(body.source || 'inconnu').slice(0, 60);

  const { data: existing } = await admin
    .from('course_subscribers')
    .select('id, token, step, unsubscribed_at, completed_at')
    .eq('email', email)
    .maybeSingle();

  // Déjà inscrit et actif (ou formation terminée) : on ne renvoie rien.
  if (existing && !existing.unsubscribed_at) {
    return NextResponse.json({ success: true, already: true });
  }

  let token: string;
  if (existing) {
    // S'était désinscrit et se réinscrit volontairement : on repart du début.
    const { data, error } = await admin.from('course_subscribers')
      .update({ unsubscribed_at: null, completed_at: null, step: 0, next_send_on: null, source })
      .eq('id', existing.id).select('token').single();
    if (error) return NextResponse.json({ error: 'Erreur, réessaie' }, { status: 500 });
    token = data.token;
  } else {
    const { data, error } = await admin.from('course_subscribers')
      .insert({ email, source }).select('token').single();
    if (error) {
      // Double clic : la ligne existe déjà
      if (error.code === '23505') return NextResponse.json({ success: true, already: true });
      return NextResponse.json({ error: 'Erreur, réessaie' }, { status: 500 });
    }
    token = data.token;
  }

  const ok = await sendCourseMail(email, courseEmail(1)!, unsubscribeUrl(token));
  await admin.from('course_subscribers')
    .update(ok ? { step: 1, next_send_on: addDays(todayParis(), COURSE_GAPS[2]) } : { next_send_on: todayParis() })
    .eq('token', token);
  await admin.from('events').insert({ user_id: null, name: 'course_signup', meta: { source, sent: ok } });

  return NextResponse.json({ success: true });
}
