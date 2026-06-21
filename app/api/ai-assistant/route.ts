import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    const prompt = `Tu es l'IA Manager de Spotlift, un assistant marketing musical expert qui aide les artistes indépendants à percer sur Spotify et les réseaux sociaux.

Réponds à cette question avec des conseils concrets, actionnables et structurés :

"${question}"

Consignes :
- Réponds en français
- Sois concret et actionnable (pas de généralités vagues)
- N'utilise JAMAIS de markdown (pas de #, pas de **, pas de tirets de titre)
- Structure avec des numéros simples (1. 2. 3.) et des emojis pertinents
- Reste dans le domaine : Spotify, streaming, promotion musicale, réseaux sociaux pour artistes
- Maximum 200 mots
- Ton chaleureux mais professionnel, comme un vrai manager qui connaît son métier
- Écris en texte brut uniquement, comme un message qu'on lirait dans une appli de chat`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Erreur API' }, { status: 500 });
    }

    const answer = data.content[0]?.text || '';
    return NextResponse.json({ response: answer });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
