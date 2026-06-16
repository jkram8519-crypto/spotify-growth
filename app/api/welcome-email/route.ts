import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    const prenom = name || email.split('@')[0];

    const html = `<div style="background:#000;color:#fff;padding:40px;font-family:sans-serif;max-width:600px;margin:0 auto;"><h1 style="color:#9B59B6;">Bienvenue sur Spotlift ! 🎵</h1><p>Bonjour ${prenom},</p><p style="color:#ccc;">Je suis J.K. RAM, le fondateur. Merci de rejoindre Spotlift !</p><h3 style="color:#9B59B6;">Comment bien démarrer :</h3><p style="color:#ccc;">1. Génère ton premier pitch → Clique sur Pitch Generator</p><p style="color:#ccc;">2. Planifie ta sortie → Clique sur Manager IA</p><p style="color:#ccc;">3. Trouve des playlists → Clique sur Playlist Finder</p><div style="text-align:center;margin:30px 0;"><a href="https://getspotlift.com/dashboard" style="background:#9B59B6;color:#fff;padding:14px 40px;border-radius:30px;text-decoration:none;font-weight:bold;">Accéder à mon dashboard</a></div><p style="color:#9B59B6;font-weight:bold;">Code promo : EARLY10 = 1 mois Pro gratuit !</p><p style="color:#aaa;font-size:14px;">Des questions ? Reponds a cet email — je reponds en 24h !</p><p style="color:#555;font-size:12px;">J.K. RAM — Fondateur Spotlift — getspotlift.com</p></div>`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Bienvenue sur Spotlift ! 🎵',
        html: html
      })
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const error = await response.json();
      return NextResponse.json({ error }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}