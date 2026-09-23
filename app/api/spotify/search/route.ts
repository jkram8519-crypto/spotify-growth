import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const allowedTypes = ['artist', 'track', 'playlist'];
  const type = (searchParams.get('type') || 'track')
    .split(',')
    .filter((t) => allowedTypes.includes(t))
    .join(',') || 'track';

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=10`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const data = await searchRes.json();

    const artists = (data.artists?.items || []).map((a: any) => ({
      id: a.id,
      name: a.name,
      image: a.images?.[0]?.url || null,
      followers: a.followers?.total || 0,
      genres: a.genres || [],
      popularity: a.popularity || 0,
      externalUrl: a.external_urls?.spotify || '',
    }));

    const tracks = (data.tracks?.items || []).map((t: any) => ({
      id: t.id,
      name: t.name,
      artist: t.artists?.[0]?.name || '',
      album: t.album?.name || '',
      image: t.album?.images?.[0]?.url || null,
      duration: t.duration_ms || 0,
      popularity: t.popularity || 0,
      preview: t.preview_url || null,
      externalUrl: t.external_urls?.spotify || '',
    }));

    // Playlists : l'API peut renvoyer des entrées null, on les filtre.
    // Depuis février 2026, les champs followers/popularity ne sont plus fournis en mode développement :
    // on n'affiche que des données réellement renvoyées par Spotify.
    const playlists = (data.playlists?.items || [])
      .filter((p: any) => p && p.id)
      .map((p: any) => ({
        id: p.id,
        name: p.name,
        description: (p.description || '').replace(/<[^>]*>/g, ''),
        owner: p.owner?.display_name || p.owner?.id || '',
        ownerId: p.owner?.id || '',
        isSpotifyEditorial: p.owner?.id === 'spotify',
        trackCount: p.tracks?.total ?? p.items?.total ?? null,
        image: p.images?.[0]?.url || null,
        externalUrl: p.external_urls?.spotify || '',
      }));

    return NextResponse.json({ artists, tracks, playlists });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}