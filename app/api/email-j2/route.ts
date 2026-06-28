import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const prenom = email.split('@')[0];

    const html = `<div style="background:#0a0015;color:#fff;padding:0;font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;overflow:hidden;"><div style="background:linear-gradient(135deg,#6C3483,#9B59B6);padding:35px 40px;"><h1 style="margin:0;font-size:24px;">Ce que Spotlift peut vraiment faire pour toi 🎵</h1></div><div style="padding:35px 40px;"><p style="font-size:16px;margin:0 0 20px 0;">Salut ${prenom},</p><p style="color:#ccc;line-height:1.7;margin:0 0 20px 0;">Ton essai se termine demain — j'espère que tu as pu explorer un peu Spotlift.</p><p style="color:#ccc;line-height:1.8;margin:0 0 8px 0;">🗓️ <strong style="color:#fff;">Manager IA</strong> — planifie ta prochaine sortie sur 44 jours, sans rien oublier</p><p style="color:#ccc;line-height:1.8;margin:0 0 8px 0;">🎯 <strong style="color:#fff;">Playlist Finder</strong> — trouve les playlists qui collent vraiment à ton style</p><p style="color:#ccc;line-height:1.8;margin:0 0 8px 0;">🎬 <strong style="color:#fff;">Script Vidéo IA</strong> — génère un script complet pour ta prochaine vidéo TikTok</p><div style="text-align:center;margin:30px 0;"><a href="https://getspotlift.com/dashboard" style="background:#9B59B6;color:#fff;padding:15px 45px;border-radius:30px;text-decoration:none;font-weight:bold;font-size:15px;display:inline-block;">Continuer à explorer</a></div><p style="color:#ccc;line-height:1.7;margin:20px 0;">Des questions sur un outil en particulier ? Réponds à cet email.</p><p style="color:#9B59B6;font-weight:bold;margin:25px 0 0 0;">J.K. RAM</p><p style="color:#888;font-size:13px;margin:2px 0;">Fondateur de Spotlift</p></div></div>`;

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
        subject: 'Ce que Spotlift peut faire pour toi 🎵',
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
