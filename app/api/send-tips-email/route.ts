import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const html = `<div style="background:#1a0030;border:1px solid #9B59B6;border-radius:12px;padding:20px;margin:25px 0;text-align:center;"><p style="margin:0;color:#fff;line-height:1.6;">🎁 <strong>Tu as déjà ton cadeau de bienvenue :</strong> 3 jours d'essai Pro gratuits, accès à tous les outils. C'est ma façon de te remercier de faire partie des premiers.</p></div>`;

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
