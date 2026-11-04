import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';
import { sendReleasePlan } from '@/lib/emails';

// Envoie le plan de sortie par email depuis /pitch-gratuit.
// Garde-fous : il faut avoir généré un pitch gratuit depuis cette IP dans les 24 h,
// 3 envois max par IP et par 24 h, 1 seul envoi par adresse email.
const PER_IP_LIMIT = 3;

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const clip = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = clip(body.email, 120).toLowerCase();
    const track = clip(body.track, 80);
    const pitch = clip(body.pitch, 2000);
    const releaseRaw = clip(body.releaseDate, 10);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: 'Cette adresse email ne semble pas valide.' }, { status: 400 });
    }
    if (track.length < 2 || pitch.length < 20) {
      return NextResponse.json({ error: 'Génère d\'abord ton pitch, puis demande ton plan.' }, { status: 400 });
    }
    let release: Date | null = null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(releaseRaw)) {
      const d = new Date(releaseRaw + 'T12:00:00Z');
      const days = (d.getTime() - Date.now()) / 86400000;
      if (!isNaN(d.getTime()) && days > -30 && days < 366) release = d;
    }

    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'inconnu';
    const ipHash = createHash('sha256').update(ip + (process.env.CRON_SECRET || 'spotlift')).digest('hex');
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [{ count: pitchCount }, { count: sentCount }, { data: existing }] = await Promise.all([
      admin.from('public_pitch_usage').select('id', { count: 'exact', head: true }).eq('ip_hash', ipHash).gte('created_at', since),
      admin.from('email_leads').select('id', { count: 'exact', head: true }).eq('ip_hash', ipHash).gte('created_at', since),
      admin.from('email_leads').select('id').eq('email', email).eq('source', 'pitch-gratuit').maybeSingle(),
    ]);
    if ((pitchCount ?? 0) === 0) {
      return NextResponse.json({ error: 'Génère d\'abord ton pitch, puis demande ton plan.' }, { status: 400 });
    }
    if (existing) {
      return NextResponse.json({ success: true, alreadySent: true });
    }
    if ((sentCount ?? 0) >= PER_IP_LIMIT) {
      return NextResponse.json({ error: 'Trop de demandes aujourd\'hui. Réessaie demain.' }, { status: 429 });
    }

    const ok = await sendReleasePlan(email, track, pitch, release);
    if (!ok) {
      return NextResponse.json({ error: 'L\'envoi a échoué. Réessaie dans un instant.' }, { status: 502 });
    }
    await admin.from('email_leads').insert({ email, source: 'pitch-gratuit', ip_hash: ipHash });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur. Réessaie.' }, { status: 500 });
  }
}
