import { NextRequest, NextResponse } from 'next/server';
import { sendDay2 } from '@/lib/emails';

// Envoi manuel / test de l'email J+2. Protégé par CRON_SECRET :
// l'envoi automatique se fait directement depuis /api/trial-sequence.
export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  try {
    const { email, name } = await req.json();
    const ok = await sendDay2(email, name);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
