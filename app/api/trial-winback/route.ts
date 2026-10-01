import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function cleanPrenom(email: string): string {
  const raw = email.split('@')[0];
  const noNumbers = raw.replace(/[0-9]/g, '');
  const firstPart = noNumbers.split(/[._+-]/)[0];
  if (!firstPart) return 'toi';
  return firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase();
}

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

    // Essais encore marqués 'trial' dont la date de fin est dépassée depuis 0 à 24h.
    // (ces essais ne basculent jamais seuls vers un autre statut, voir app/api/trial/route.ts)
    const now = new Date();
    const past24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const { data: trials, error } = await supabase
      .from('subscriptions')
      .select('user_id, trial_end, status, winback_sent')
      .eq('status', 'trial')
      .lt('trial_end', now.toISOString())
      .gte('trial_end', past24h.toISOString());

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let sent = 0;
    for (const trial of trials || []) {
      // Ne jamais relancer deux fois la même personne
      if (trial.winback_sent) continue;

      const { data: userData } = await supabase.auth.admin.getUserById(trial.user_id);
      const email = userData?.user?.email;
      if (!email) continue;

      const prenom = cleanPrenom(email);
      const html = `<div style="background:#000;color:#fff;padding:40px;font-family:sans-serif;max-width:600px;margin:0 auto;">
<h1 style="color:#9B59B6;">Ton essai est terminé — reviens avec -20% 🎁</h1>
<p>Bonjour ${prenom},</p>
<p style="color:#ccc;">Ton essai Spotlift Pro est arrivé à son terme. Si tu veux continuer à utiliser tes 11 outils IA (Manager IA, Growth Score, Playlist Finder...), voici -20% sur ton premier mois pour reprendre là où tu t'es arrêté.</p>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:30px auto;">
<tr>
<td align="center" bgcolor="#9B59B6" style="border-radius:30px;">
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://getspotlift.com/pricing" style="height:60px;v-text-anchor:middle;width:260px;" arcsize="50%" fillcolor="#9B59B6" stroke="f">
<w:anchorlock/>
<center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;line-height:20px;">
Reprendre avec -20%
</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-->
<a href="https://getspotlift.com/pricing" target="_blank" style="display:inline-block;padding:16px 32px;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;line-height:1.3;text-align:center;font-family:sans-serif;">
Reprendre avec -20%
</a>
<!--<![endif]-->
</td>
</tr>
</table>

<p style="color:#aaa;font-size:14px;">Code promo <strong style="color:#fff;">WINBACK20</strong> à saisir au paiement • Sans engagement</p>
<p style="color:#555;font-size:12px;">J.K. RAM — Fondateur Spotlift — getspotlift.com</p>
</div>`;
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
          subject: 'Ton essai est terminé — reviens avec -20% 🎁',
          html: html
        })
      });
      if (response.ok) {
        sent++;
        await supabase.from('subscriptions').update({ winback_sent: true }).eq('user_id', trial.user_id);
      }
    }

    return NextResponse.json({ success: true, sent });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}