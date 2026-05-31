export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface SpotifyArtistProfile {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  followers: { total: number };
  images: { url: string; height: number; width: number }[];
  external_urls: { spotify: string };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  popularity: number;
  duration_ms: number;
  album: {
    id: string;
    name: string;
    images: { url: string; height: number; width: number }[];
    release_date: string;
  };
  artists: { id: string; name: string }[];
  external_urls: { spotify: string };
}

export interface SpotifyAudioFeatures {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  time_signature: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  followers: { total: number };
  images: { url: string; height: number; width: number }[];
  owner: { id: string; display_name: string };
  tracks: { total: number };
  external_urls: { spotify: string };
}

export interface GrowthScoreData {
  score: number;
  popularity: number;
  followers: number;
  topTrackPopularity: number;
  genreRelevance: number;
  consistency: number;
  recommendations: string[];
}

export interface PlaylistMatch {
  playlist: SpotifyPlaylist;
  compatibilityScore: number;
  matchReasons: string[];
}

export interface SpotifyUserProfile {
  id: string;
  display_name: string;
  email: string;
  images: { url: string; height: number; width: number }[];
  country: string;
  product: string;
  external_urls: { spotify: string };
}
