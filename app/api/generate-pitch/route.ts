import { NextRequest, NextResponse } from 'next/server';
import { isClean } from '@/lib/moderation';

export async function POST(req: NextRequest) {
  try {
    const { track, genre, releaseType, releaseDate, ambiance, description, artistName } = await req.json();

    // ---- MODÉRATION DE L'ENTRÉE ----
    if (!isClean(String(track) + ' ' + String(genre || '') + ' ' + String(ambiance || '') + ' ' + String(description || '') + ' ' + String(artistName || ''))) {
      return NextResponse.json(
        { error: "Ton texte contient des propos inappropriés. Merci de le reformuler." },
        { status: 400 }
      );
    }
    // ---------------------------------

    const dateInfo = releaseType === 'upcoming' && releaseDate
      ? `disponible le ${releaseDate}`
      : releaseType === 'out'
      ? 'déjà disponible sur Spotify'
      : 'à venir prochainement';
    const prompt = `Tu es un attaché de presse musical expert, spécialisé dans la promotion d'artistes indépendants auprès des curateurs de playlists Spotify.
Génère un pitch professionnel et convaincant pour ce morceau :
- Titre : "${track}"
- Artiste : ${artistName || 'artiste indépendant'}
- Genre : ${genre}
- Statut : ${dateInfo}
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
Réponds uniquement avec le texte du pitch, sans introduction ni commentaire.`;
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
      return NextResponse.json({ error: data.error?.message || 'Erreur API' }, { status: 500 });
    }
    const pitch = data.content[0]?.text || '';

    // ---- MODÉRATION DE LA SORTIE ----
    if (!isClean(pitch)) {
      return NextResponse.json({ error: 'Une erreur est survenue lors de la génération. Réessaie.' }, { status: 500 });
    }
    // ----------------------------------

    return NextResponse.json({ pitch });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}