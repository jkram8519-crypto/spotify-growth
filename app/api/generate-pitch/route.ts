import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { track, genre, releaseType, releaseDate, ambiance, description, artistName } = await req.json();

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
    return NextResponse.json({ pitch });

import { NextRequest, NextResponse } from 'next/server';
import { moderate } from '@/lib/moderation';

export async function POST(req: NextRequest) {
  try {
    const { track, genre } = await req.json();

    // ---- MODÉRATION DE L'ENTRÉE ----
    const check = await moderate(`${track} ${genre || ''}`, false);
    if (!check.allowed) {
      return NextResponse.json(
        { error: "Ton texte contient des propos inappropriés. Merci de le reformuler." },
        { status: 400 }
      );
    }
    // ---------------------------------

    const pitches = [
      `"${track}" est un titre ${genre || 'musical'} captivant qui fusionne émotion et énergie. Avec une production soignée et une atmosphère unique, ce track est parfait pour les playlists de découverte. Son son distinctif saura toucher un large public et créer une connexion immédiate avec l'auditeur.`,
      `Découvrez "${track}", un titre ${genre || 'musical'} qui repousse les limites du genre. Sa mélodie accrocheuse et sa production moderne en font un candidat idéal pour vos playlists. Un son frais et authentique qui mérite d'être entendu par le plus grand nombre.`,
      `"${track}" représente une nouvelle vision du ${genre || 'music'} contemporain. Alliant créativité et accessibilité, ce track offre une expérience d'écoute mémorable. Idéal pour les playlists mood et les sessions d'écoute intense.`,
    ];
    const pitch = pitches[Math.floor(Math.random() * pitches.length)];
    return NextResponse.json({ pitch });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}