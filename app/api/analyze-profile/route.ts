import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { nom, photo, bio, links, pick, claimed } = await req.json();

    const photoDesc = photo === 'yes' ? 'a une photo de profil professionnelle' : photo === 'ok' ? 'a une photo mais pas terrible' : "n'a pas de photo professionnelle";
    const bioDesc = bio === 'yes' ? 'a une bio Spotify complète' : bio === 'short' ? 'a une bio trop courte' : "n'a pas de bio";
    const linksDesc = links === 'all' ? 'a tous ses liens réseaux sociaux sur Spotify' : links === 'some' ? "a seulement quelques liens réseaux" : "n'a aucun lien réseau";
    const pickDesc = pick === 'yes' ? 'a son Artist Pick activé' : "n'a pas activé son Artist Pick";
    const claimedDesc = claimed === 'yes' ? 'a revendiqué son profil Spotify for Artists' : "n'a pas revendiqué son profil";

    const prompt = `Tu es un consultant expert en image de marque pour artistes musicaux sur Spotify.

Voici la situation actuelle du profil Spotify de l'artiste "${nom || 'cet artiste'}" :
- Il/elle ${photoDesc}
- Il/elle ${bioDesc}
- Il/elle ${linksDesc}
- Il/elle ${pickDesc}
- Il/elle ${claimedDesc}

Donne une analyse personnalisée et des conseils concrets pour optimiser ce profil. 

Consignes :
- Réponds en français
- N'utilise JAMAIS de markdown (pas de #, pas de **)
- Commence par un score sur 100 (calcule-le toi-même selon l'importance de chaque élément)
- Donne ensuite 3-4 conseils priorisés du plus urgent au moins urgent, avec des emojis
- Sois concret et actionnable, pas générique
- Maximum 180 mots
- Ton chaleureux mais expert, comme un vrai consultant qui veut vraiment aider`;

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
