import { NextRequest, NextResponse } from 'next/server';

let spotifyAccessToken: string | null = null;
let tokenExpireTime: number = 0;

async function getSpotifyAccessToken() {
  const now = Date.now();
  
  if (spotifyAccessToken && now < tokenExpireTime) {
    return spotifyAccessToken;
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    } );

    if (!response.ok) {
      throw new Error(`Spotify auth failed: ${response.status}`);
    }

    const data = await response.json();
    spotifyAccessToken = data.access_token;
    tokenExpireTime = now + (data.expires_in * 1000) - 60000;

    return spotifyAccessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'artist,track';

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
    }

    const accessToken = await getSpotifyAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query )}&type=${type}&limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();

    const formattedResults = {
      artists: data.artists?.items?.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images?.[0]?.url || null,
        followers: artist.followers?.total || 0,
        genres: artist.genres || [],
        popularity: artist.popularity || 0,
        externalUrl: artist.external_urls?.spotify || '',
      })) || [],
      tracks: data.tracks?.items?.map((track: any) => ({
        id: track.id,
        name: track.name,
        artist: track.artists?.[0]?.name || 'Unknown',
        album: track.album?.name || 'Unknown',
        image: track.album?.images?.[0]?.url || null,
        duration: track.duration_ms,
        popularity: track.popularity || 0,
        preview: track.preview_url || null,
        externalUrl: track.external_urls?.spotify || '',
      })) || [],
    };

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search Spotify' },
      { status: 500 }
    );
  }
}
