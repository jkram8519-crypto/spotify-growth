import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Désinscription de la formation en un clic (lien dans l'email + en-tête List-Unsubscribe).

const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function unsubscribe(token: string | null) {
  if (!token || !UUID_RE.test(token)) return false;
  const { error } = await admin.from('course_subscribers')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('token', token)
    .is('unsubscribed_at', null);
  return !error;
}

function page(title: string, text: string) {
  return new NextResponse(
    `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="robots" content="noindex"/><title>${title}</title></head>`
    + `<body style="margin:0;background:#07000f;color:#fff;font-family:Arial,Helvetica,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;">`
    + `<div style="max-width:440px;text-align:center;"><h1 style="font-size:24px;">${title}</h1><p style="color:#bbb;line-height:1.6;">${text}</p>`
    + `<p><a href="https://getspotlift.com" style="color:#c38be0;">Retour sur Spotlift</a></p></div></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}

export async function GET(req: NextRequest) {
  const ok = await unsubscribe(req.nextUrl.searchParams.get('t'));
  return ok
    ? page('Tu es désinscrit', 'Tu ne recevras plus les emails de la formation « Ta sortie en 6 emails ». Bonne sortie !')
    : page('Lien invalide', 'Ce lien de désinscription ne fonctionne pas. Réponds simplement à un de nos emails et on te retire à la main.');
}

// Désinscription « en un clic » déclenchée par Gmail / Outlook
export async function POST(req: NextRequest) {
  await unsubscribe(req.nextUrl.searchParams.get('t'));
  return new NextResponse(null, { status: 200 });
}
