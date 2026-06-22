import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { track, platform } = await req.json();

    const platformGuides: Record<string, string> = {
      instagram: "Instagram (post ou story) : ton chaleureux, emojis pertinents, hashtags à la fin (5-7 maximum), peut être un peu plus long",
      tiktok: "TikTok : ton direct et accrocheur façon 'POV' ou hook immédiat, court, dynamique, hashtags type #FYP",
      x: "X (anciennement Twitter) : très court et percutant, 1-2 phrases maximum, un call-to-action clair",
      snapchat: "Snapchat : ton très décontracté et personnel, comme un message à un ami proche, court et spontané",
      discord: "Discord (message à une communauté/serveur musical) : ton chaleureux et communautaire, peut inclure un emoji de réaction, invite à la discussion",
      email: "Email à des fans ou contacts : ton professionnel mais chaleureux, avec un objet, une formule de politesse, et une signature",
    };

    const guide = platformGuides[platform] || platformGuides.instagram;

    const prompt = `Tu es un community manager expert en musique qui aide les artistes indépendants à promouvoir leurs sorties.

Génère un post pour annoncer la sortie du titre "${track}" sur la plateforme suivante :

${guide}

Consignes :
- Réponds en français
- N'utilise JAMAIS de markdown (pas de #titre, pas de **gras**)
- Le texte doit donner envie d'écouter le titre
- Reste authentique, pas trop "marketing forcé"
- Termine par une invitation claire à écouter sur Spotify

Réponds uniquement avec le texte du post, sans aucune introduction ni commentaire.`;

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

    const content = data.content[0]?.text || '';
    return NextResponse.json({ content });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
