import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  // Sécurité : vérifie le secret du cron
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Cherche les trials qui expirent dans les prochaines 24-48h
    const now = new Date();
    const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    const { data: trials, error } = await supabase
      .from('subscriptions')
      .select('user_id, trial_end, status')
      .eq('status', 'trial')
      .lte('trial_end', in48h.toISOString())
      .gte('trial_end', now.toISOString());

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let sent = 0;
    for (const trial of trials || []) {
      // Récupère l'email de l'utilisateur
      const { data: userData } = await supabase.auth.admin.getUserById(trial.user_id);
      const email = userData?.user?.email;
      if (!email) continue;

      const prenom = email.split('@')[0];
      const html = `<div style="background:#000;color:#fff;padding:40px;font-family:sans-serif;max-width:600px;margin:0 auto;"><h1 style="color:#9B59B6;">Ton essai Pro se termine bientôt ⏰</h1><p>Bonjour ${prenom},</p><p style="color:#ccc;">Ton essai gratuit Spotlift Pro se termine dans moins de 48h. Ne perds pas l'accès à tes 11 outils IA !</p><div style="text-align:center;margin:30px 0;"><a href="https://getspotlift.vercel.app/pricing" style="background:#9B59B6;color:#fff;padding:14px 40px;border-radius:30px;text-decoration:none;font-weight:bold;">Continuer en Pro — 9.99€/mois</a></div><p style="color:#aaa;font-size:14px;">Sans engagement • Annulation en 1 clic</p><p style="color:#555;font-size:12px;">J.K. RAM — Fondateur Spotlift — getspotlift.vercel.app</p></div>`;

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'Ton essai Spotlift Pro se termine bientôt ⏰',
          html: html
        })
      });
      if (response.ok) sent++;
    }

    return NextResponse.json({ success: true, sent });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
