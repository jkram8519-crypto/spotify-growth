import { NextRequest, NextResponse } from 'next/server';

function cleanPrenom(email: string): string {
  const raw = email.split('@')[0];
  const noNumbers = raw.replace(/[0-9]/g, '');
  const firstPart = noNumbers.split(/[._+-]/)[0];
  if (!firstPart) return 'toi';
  return firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const prenom = cleanPrenom(email);

    const html = `<div style="background:#0a0015;color:#fff;padding:0;font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;overflow:hidden;"><div style="background:linear-gradient(135deg,#6C3483,#9B59B6);padding:35px 40px;"><h1 style="margin:0;font-size:24px;">As-tu déjà testé ton premier outil ? 🚀</h1></div><div style="padding:35px 40px;"><p style="font-size:16px;margin:0 0 20px 0;">Salut ${prenom},</p><p style="color:#ccc;line-height:1.7;margin:0 0 20px 0;">Tu t'es inscrit sur Spotlift il y a 1 jour — j'espère que tu as eu l'occasion de jeter un œil au dashboard !</p><p style="color:#ccc;line-height:1.7;margin:0 0 20px 0;">Si tu n'as pas encore essayé, je te recommande de commencer par le <strong style="color:#fff;">Pitch Generator</strong> : décris ton morceau, et l'IA t'écrit un pitch professionnel pour les curateurs de playlists en 10 secondes.</p><div style="text-align:center;margin:30px 0;"><a href="https://getspotlift.com/dashboard" style="background:#9B59B6;color:#fff;padding:15px 45px;border-radius:30px;text-decoration:none;font-weight:bold;font-size:15px;display:inline-block;">Générer mon premier pitch</a></div><p style="color:#ccc;line-height:1.7;margin:20px 0;">Une question ? Réponds directement à cet email, je suis là.</p><p style="color:#9B59B6;font-weight:bold;margin:25px 0 0 0;">J.K. RAM</p><p style="color:#888;font-size:13px;margin:2px 0;">Fondateur de Spotlift</p></div></div>`;

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
        subject: 'As-tu testé ton premier outil Spotlift ? 🚀',
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
