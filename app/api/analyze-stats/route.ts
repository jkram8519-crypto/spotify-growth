import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { saveRate, skipRate, replayRate, listenTime, country, duration } = await req.json();

    const prompt = `Tu es un analyste data expert en streaming musical, spécialisé Spotify.

Voici les statistiques d'un morceau d'un artiste indépendant :
- Taux de save : ${saveRate || 'non renseigné'}%
- Skip rate : ${skipRate || 'non renseigné'}%
- Replay rate : ${replayRate || 'non renseigné'}%
- Durée moyenne d'écoute : ${listenTime || 'non renseigné'} secondes
- Durée totale du morceau : ${duration || 180} secondes
- Pays principal d'audience : ${country || 'non renseigné'}

Analyse ces statistiques et donne des recommandations concrètes et actionnables.

Consignes :
- Réponds en français
- N'utilise JAMAIS de markdown (pas de #, pas de **)
- Identifie 2-4 points clés (forces et faiblesses), avec des emojis pertinents (🟢 pour les points forts, 🔴 pour les points faibles, 🟡 pour les points moyens)
- Pour chaque point, donne une action concrète à entreprendre
- Si certaines données ne sont pas renseignées, ne les invente pas, concentre-toi sur ce qui est disponible
- Maximum 180 mots
- Ton d'expert mais accessible, comme un vrai analyste qui veut aider concrètement`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Erreur API' }, { status: 500 });
    }

    const analysis = data.content[0]?.text || '';
    return NextResponse.json({ analysis });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
