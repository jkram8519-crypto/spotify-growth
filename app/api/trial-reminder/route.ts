import { NextRequest, NextResponse } from 'next/server';

// Désactivé : ce rappel partait 2 jours de suite et faisait doublon avec l'email J+2
// de /api/trial-sequence ("Ton essai se termine demain"). Gardé pour ne pas casser le cron.
export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  return NextResponse.json({ success: true, skipped: 'remplacé par l\'email J+2 de trial-sequence' });
}
