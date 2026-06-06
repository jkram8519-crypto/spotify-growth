import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Kevin de Spotlift <onboarding@resend.dev>',
        to: email,
        subject: '🎵 Bienvenue sur Spotlift !',
        html: `
          <div style="background:#000;color:#fff;padding:40px;font-family:sans-serif;max-width:600px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:30px;">
              <h1 style="color:#9B59B6;font-size:32px;margin:0;">🎵 Spotlift</h1>
              <p style="color:#aaa;margin:5px 0 0 0;">L'outil IA pour artistes indépendants</p>
            </div>
            
            <div style="background:#0d0020;padding:30px;border-radius:20px;border:1px solid #2d1040;margin-bottom:25px;">
              <h2 style="font-size:24px;margin:0 0 15px 0;">Bienvenue ${name || ''} ! 👋</h2>
              <p style="color:#ccc;line-height:1.7;">Je suis Kevin, le fondateur de Spotlift. Merci de nous rejoindre ! Tu fais maintenant partie des artistes indépendants qui utilisent l'IA pour booster leur carrière Spotify.</p>
            </div>

            <h3 style="color:#9B59B6;margin-bottom:15px;">🚀 Comment bien démarrer :</h3>
            
            <div style="background:#0d0020;padding:20px;border-radius:15px;margin-bottom:15px;border-left:3px solid #9B59B6;">
              <h4 style="margin:0 0 8px 0;">1. Génère ton premier pitch</h4>
              <p style="color:#aaa;margin:0;font-size:14px;">Clique sur "Pitch Generator" → Entre le nom de ton track → Copie et envoie aux curateurs !</p>
            </div>

            <div style="background:#0d0020;padding:20px;border-radius:15px;margin-bottom:15px;border-left:3px solid #1DB954;">
              <h4 style="margin:0 0 8px 0;">2. Planifie ta prochaine sortie</h4>
              <p style="color:#aaa;margin:0;font-size:14px;">Clique sur "Manager IA" → Entre ta date de sortie → Suis le planning jour par jour.</p>
            </div>

            <div style="background:#0d0020;padding:20px;border-radius:15px;margin-bottom:25px;border-left:3px solid #f39c12;">
              <h4 style="margin:0 0 8px 0;">3. Trouve des playlists compatibles</h4>
              <p style="color:#aaa;margin:0;font-size:14px;">Clique sur "Playlist Finder" → Découvre les playlists qui matchent ton style musical.</p>
            </div>

            <div style="text-align:center;margin-bottom:25px;">
              <a href="https://getspotlift.vercel.app/dashboard" style="background:#9B59B6;color:#fff;padding:14px 40px;border-radius:30px;text-decoration:none;font-weight:bold;font-size:16px;display:inline-block;">
                Accéder à mon dashboard →
              </a>
            </div>

            <div style="background:#1a0030;padding:20px;border-radius:15px;margin-bottom:25px;text-align:center;">
              <p style="color:#9B59B6;font-weight:bold;margin:0 0 5px 0;">🎁 Code promo exclusif</p>
              <p style="font-size:24px;font-weight:bold;margin:0 0 5px 0;">EARLY10</p>
              <p style="color:#aaa;font-size:13px;margin:0;">1 mois Pro gratuit — offre limitée !</p>
            </div>

            <p style="color:#aaa;font-size:14px;line-height:1.7;">Des questions ? Réponds directement à cet email — je réponds en 24h !</p>
            
            <div style="border-top:1px solid #2d1040;margin-top:30px;padding-top:20px;text-align:center;">
              <p style="color:#555;font-size:12px;margin:0;">Kevin — Fondateur Spotlift</p>
              <p style="color:#555;font-size:12px;margin:5px 0 0 0;">
                <a href="https://getspotlift.vercel.app" style="color:#9B59B6;text-decoration:none;">getspotlift.v