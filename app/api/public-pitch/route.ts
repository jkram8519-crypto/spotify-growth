import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';
import { isClean } from '@/lib/moderation';
import { cleanPitch } from '@/lib/clean-pitch';

// Générateur de pitch accessible SANS compte (page /pitch-gratuit).
// Garde-fous pour protéger les crédits Anthropic :
//  - 2 pitchs par IP et par 24h
//  - 300 pitchs publics max par 24h au total
//  - champs courts uniquement
const PER_IP_LIMIT = 2;
const GLOBAL_DAILY_LIMIT = 300;

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function clip(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const track = clip(body.track, 80);
    const artistName = clip(body.artistName, 60);
    const genre = clip(body.genre, 40);
    const ambiance = clip(body.ambiance, 120);
    const description = clip(body.description, 400);

    if (track.length < 2 || ambiance.length < 3 || description.length < 10) {
      return NextResponse.json({ error: 'Remplis le titre, l\'ambiance et une courte description de ton morceau.' }, { status: 400 });
    }
    if (!isClean([track, artistName, genre, ambiance, description].join(' '))) {
      return NextResponse.json({ error: 'Ton texte contient des propos inappropriés. Merci de le reformuler.' }, { status: 400 });
    }

    // ---- Limites d'usage ----
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'inconnu';
    const ipHash = createHash('sha256').update(ip + (process.env.CRON_SECRET || 'spotlift')).digest('hex');
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [{ count: ipCount }, { count: globalCount }] = await Promise.all([
      admin.from('public_pitch_usage').select('id', { count: 'exact', head: true }).eq('ip_hash', ipHash).gte('created_at', since),
      admin.from('public_pitch_usage').select('id', { count: 'exact', head: true }).gte('created_at', since),
    ]);
    if ((ipCount ?? 0) >= PER_IP_LIMIT) {
      return NextResponse.json({ error: 'limit', message: 'Tu as utilisé tes pitchs gratuits du jour. Crée ton compte pour en générer d\'autres.' }, { status: 429 });
    }
    if ((globalCount ?? 0) >= GLOBAL_DAILY_LIMIT) {
      return NextResponse.json({ error: 'limit', message: 'Le générateur gratuit est très demandé aujourd\'hui. Crée ton compte pour continuer.' }, { status: 429 });
    }
    // -------------------------

    const prompt = `Tu es un attaché de presse musical expert, spécialisé dans la promotion d'artistes indépendants auprès des curateurs de playlists Spotify.
Génère un pitch professionnel et convaincant pour ce morceau :
- Titre : "${track}"
- Artiste : ${artistName || 'artiste indépendant'}
- Genre : ${genre || 'non précisé'}
- Ambiance / émotion : ${ambiance}
- Description du morceau : ${description}
Le pitch doit :
- Faire entre 80 et 120 mots
- Être écrit à la 1ère personne (l'artiste qui présente son morceau)
- Être chaleureux, professionnel et authentique
- Mettre en avant l'émotion et l'ambiance du morceau
- Se terminer par une phrase d'accroche pour le curateur
- Être en français
- Ne pas utiliser de termes génériques comme "unique" ou "innovant"
Réponds uniquement avec le texte du pitch, sans titre, sans introduction ni commentaire, et sans mise en forme Markdown (pas de #, pas de **).`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('public-pitch anthropic error', data);
      return NextResponse.json({ error: 'La génération a échoué. Réessaie dans un instant.' }, { status: 500 });
    }
    const pitch: string = cleanPitch(data.content?.[0]?.text || '');
    if (!pitch || !isClean(pitch)) {
      return NextResponse.json({ error: 'La génération a échoué. Réessaie dans un instant.' }, { status: 500 });
    }

    // On compte l'usage seulement quand un pitch a vraiment été produit.
    await Promise.all([
      admin.from('public_pitch_usage').insert({ ip_hash: ipHash }),
      admin.from('tool_usage').insert({ user_id: null, tool_name: 'Pitch public (sans compte)' }),
    ]);

    return NextResponse.json({ pitch, remaining: Math.max(0, PER_IP_LIMIT - (ipCount ?? 0) - 1) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
