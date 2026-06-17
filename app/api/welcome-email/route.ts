import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    const prenom = name || email.split('@')[0];

    const html = `<div style="background:#0a0015;color:#fff;padding:0;font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;overflow:hidden;"><div style="background:linear-gradient(135deg,#6C3483,#9B59B6);padding:35px 40px;"><h1 style="margin:0;font-size:26px;">Content de t'avoir ici 🎵</h1></div><div style="padding:35px 40px;"><p style="font-size:16px;margin:0 0 20px 0;">Salut ${prenom},</p><p style="color:#ccc;line-height:1.7;margin:0 0 20px 0;">Moi c'est <strong style="color:#fff;">J.K. RAM</strong>, artiste comme toi — et fondateur de Spotlift. Si j'ai créé cet outil, c'est parce que je sais à quel point c'est dur de se faire entendre quand on est indépendant. Spotlift, c'est tout ce que j'aurais aimé avoir à mes débuts.</p><h3 style="color:#9B59B6;margin:30px 0 15px 0;">Voici comment démarrer en 3 minutes :</h3><p style="color:#ccc;line-height:1.8;margin:0 0 8px 0;">🚀 <strong style="color:#fff;">Génère ton premier pitch</strong> — décris ton morceau, l'IA t'écrit un pitch pro pour les curateurs</p><p style="color:#ccc;line-height:1.8;margin:0 0 8px 0;">🗓️ <strong style="color:#fff;">Planifie ta sortie</strong> — le Manager IA te crée un plan jour par jour</p><p style="color:#ccc;line-height:1.8;margin:0 0 8px 0;">🎯 <strong style="color:#fff;">Trouve tes playlists</strong> — repère celles qui collent à ton son</p><div style="text-align:center;margin:30px 0;"><a href="https://getspotlift.com/dashboard" style="background:#9B59B6;color:#fff;padding:15px 45px;border-radius:30px;text-decoration:none;font-weight:bold;font-size:15px;display:inline-block;">Accéder à mon dashboard</a></div><div style="background:#1a0030;border:1px solid #9B59B6;border-radius:12px;padding:20px;margin:25px 0;text-align:center;"><p style="margin:0;color:#fff;line-height:1.6;">🎁 <strong>Cadeau de bienvenue :</strong> avec le code <strong style="color:#9B59B6;font-size:18px;">EARLY10</strong>, ton premier mois Pro est offert. C'est ma façon de te remercier de faire partie des premiers.</p></div><p style="color:#ccc;line-height:1.7;margin:20px 0;">Une question ? Réponds directement à cet email — c'est moi qui lis, et je réponds sous 24h. Promis.</p><p style="color:#fff;font-weight:bold;margin:20px 0 5px 0;">On va faire décoller ta musique. 🚀</p><p style="color:#9B59B6;font-weight:bold;margin:25px 0 0 0;">J.K. RAM</p><p style="color:#888;font-size:13px;margin:2px 0;">Fondateur de Spotlift</p><p style="color:#555;font-size:12px;margin:2px 0;">getspotlift.com</p></div></div>`;

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
      subject: `Bienvenue dans la famille Spotlift, ${prenom} 🎵`,
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