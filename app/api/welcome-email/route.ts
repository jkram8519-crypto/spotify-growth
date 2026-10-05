import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendWelcome } from '@/lib/emails';

// Appelée par la page d'inscription. Garde-fou : on n'envoie qu'à un compte créé
// il y a moins de 15 minutes, pour que personne ne puisse utiliser cette route
// pour envoyer des emails Spotlift à n'importe quelle adresse.
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { data: profile } = await admin
      .from('profiles')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .gte('created_at', since)
      .maybeSingle();
    if (!profile) return NextResponse.json({ success: true, skipped: true });

    const ok = await sendWelcome(email.trim());
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
