import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { track, genre, ambiance, platform } = await req.json();

    const platformGuides: Record<string, string> = {
      tiktok: "TikTok : format dynamique, hook immédiat dans les 3 premières secondes, ton direct et accrocheur",
      reels: "Instagram Reels : ton un peu plus soigné visuellement, peut être légèrement plus narratif que TikTok",
      shorts: "YouTube Shorts : format informatif/découverte, peut expliquer un peu plus le contexte du morceau",
    };

    const prompt = `Tu es un expert en création de contenu vidéo court pour artistes musicaux indépendants.

Génère un script complet de vidéo courte (30-35 secondes) pour promouvoir ce morceau :
- Titre : "${track}"
- Genre : ${genre}
- Ambiance : ${ambiance}
- Plateforme : ${platformGuides[platform] || platformGuides.tiktok}

Structure le script en 4 séquences avec timing précis :
1. HOOK (0-3 sec) : une phrase d'accroche qui capte l'attention immédiatement
2. DÉMO/CONTENU (3-20 sec) : ce qui doit être montré ou dit, en lien avec l'ambiance du morceau
3. VALEUR (20-28 sec) : un élément qui donne envie d'écouter
4. CTA (28-35 sec) : appel à l'action clair pour écouter sur Spotify

Consignes :
- Réponds en français
- N'utilise JAMAIS de markdown (pas de #, pas de **)
- Pour chaque séquence, donne le timing, ce qui doit être filmé/montré, et le texte exact à dire ou afficher
- Sois créatif et adapté à l'ambiance du morceau (pas générique)
- Termine par une suggestion de légende avec 5-6 hashtags pertinents
- Maximum 250 mots`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Erreur API' }, { status: 500 });
    }

    const script = data.content[0]?.text || '';
    return NextResponse.json({ script });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
