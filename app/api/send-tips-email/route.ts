import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const html = `<div style="background:#0a0015;color:#fff;padding:0;font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;overflow:hidden;"><div style="background:linear-gradient(135deg,#6C3483,#9B59B6);padding:35px 40px;"><h1 style="margin:0;font-size:24px;">🎵 Tes 3 conseils pour percer sur Spotify</h1></div><div style="padding:35px 40px;"><p style="color:#ccc;line-height:1.7;margin:0 0 25px 0;">Voici 3 stratégies concrètes utilisées par les artistes indépendants qui décollent sur Spotify :</p><div style="background:#1a0030;border-radius:12px;padding:20px;margin-bottom:15px;"><p style="color:#9B59B6;font-weight:bold;margin:0 0 8px 0;">1. Optimise ton profil avant ta prochaine sortie</p><p style="color:#ccc;font-size:14px;line-height:1.6;margin:0;">Photo professionnelle, bio complète avec tes influences, tous tes liens réseaux sociaux, et active ton Artist Pick. C'est la base que les curateurs regardent avant même d'écouter ton son.</p></div><div style="background:#1a0030;border-radius:12px;padding:20px;margin-bottom:15px;"><p style="color:#9B59B6;font-weight:bold;margin:0 0 8px 0;">2. Sors le vendredi, pitche 14 jours avant</p><p style="color:#ccc;font-size:14px;line-height:1.6;margin:0;">Spotify met à jour ses playlists algorithmiques le vendredi. Soumets ton titre sur Spotify for Artists au moins 7 jours avant, et contacte les curateurs indépendants 14 jours avant la sortie.</p></div><div style="background:#1a0030;border-radius:12px;padding:20px;margin-bottom:25px;"><p style="color:#9B59B6;font-weight:bold;margin:0 0 8px 0;">3. Capture l'attention dans les 15 premières secondes</p><p style="color:#ccc;font-size:14px;line-height:1.6;margin:0;">Une intro courte et un hook mémorable avant 30 secondes font toute la différence, surtout pour les extraits TikTok. 70% des auditeurs décident de rester ou partir dans ce laps de temps.</p></div><div style="text-align:center;margin:30px 0;"><a href="https://getspotlift.com/inscription" style="background:#9B59B6;color:#fff;padding:15px 45px;border-radius:30px;text-decoration:none;font-weight:bold;font-size:15px;display:inline-block;">Essayer Spotlift gratuitement</a></div><p style="color:#555;font-size:12px;margin:25px 0 0 0;text-align:center;">J.K. RAM — Fondateur Spotlift — getspotlift.com</p></div></div>`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Spotlift <contact@getspotlift.com>',
        to: email,
        reply_to: 'contact.spotlift@gmail.com',
        subject: '🎵 Tes 3 conseils pour percer sur Spotify',
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
