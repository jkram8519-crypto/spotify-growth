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

      const prenom = cleanPrenom(email);
      const html = `<div style="background:#000;color:#fff;padding:40px;font-family:sans-serif;max-width:600px;margin:0 auto;">
<h1 style="color:#9B59B6;">Ton essai Pro se termine bientôt ⏰</h1>
<p>Bonjour ${prenom},</p>
<p style="color:#ccc;">Ton essai gratuit Spotlift Pro se termine dans moins de 48h. Ne perds pas l'accès à tes 11 outils IA !</p>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:30px auto;">
<tr>
<td align="center" bgcolor="#9B59B6" style="border-radius:30px;">
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://getspotlift.com/pricing" style="height:60px;v-text-anchor:middle;width:260px;" arcsize="50%" fillcolor="#9B59B6" stroke="f">
<w:anchorlock/>
<center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;line-height:20px;">
Continuer en Pro<br/>9.99€/mois
</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-->
<a href="https://getspotlift.com/pricing" target="_blank" style="display:inline-block;padding:16px 32px;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;line-height:1.3;text-align:center;font-family:sans-serif;">
Continuer en Pro<br>9.99€/mois
</a>
<!--<![endif]-->
</td>
</tr>
</table>

<p style="color:#aaa;font-size:14px;">Sans engagement • Annulation en 1 clic</p>
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