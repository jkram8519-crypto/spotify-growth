export interface SpotifyArtistProfile {
  id: string;
  name: string;
  popularity: number;
  followers: {
    total: number;
  };
  genres: string[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  popularity: number;
  duration_ms: number;
}

export interface GrowthScoreData {
  score: number;
  label: string;
  recommendations: string[];
}
