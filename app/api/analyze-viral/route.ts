import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { intro, drop, bpm, genre, hook, dance } = await req.json();

    const genreLabels: Record<string, string> = {
      pop: 'Pop', hiphop: 'Hip-Hop', electronic: 'Electronic', rnb: 'R&B', latin: 'Latin'
    };
    const hookLabels: Record<string, string> = {
      yes: 'très accrocheur', maybe: 'peut-être accrocheur', no: 'pas vraiment accrocheur'
    };

    const prompt = `Tu es un expert en stratégie de contenu viral musical, spécialisé TikTok et Instagram Reels.

Voici les caractéristiques d'un morceau :
- Genre : ${genreLabels[genre] || genre}
- Durée de l'intro : ${intro || 'non renseigné'} secondes
- Temps avant le drop/refrain : ${drop || 'non renseigné'} secondes
- Tempo : ${bpm || 'non renseigné'} BPM
- Hook mémorable : ${hookLabels[hook] || hook}
- Partie dansable : ${dance === 'yes' ? 'oui' : 'non'}

Analyse le potentiel viral de ce morceau pour les réseaux sociaux.

Consignes :
- Réponds en français
- N'utilise JAMAIS de markdown (pas de #, pas de **)
- Donne d'abord un score de potentiel viral sur 100 (calcule-le toi-même selon les critères)
- Identifie 3-4 signaux clés (forces et points à améliorer), avec emojis 🟢🟡🔴
- Pour chaque signal, suggère une action créative concrète (pas juste technique) : un type de contenu TikTok à créer, un angle, une idée de challenge
- Maximum 180 mots
- Ton énergique et créatif, comme un vrai stratège content créateur`;

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
