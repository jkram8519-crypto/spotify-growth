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
  popularity: number;
  followers: number;
  topTrackPopularity: number;
  genreRelevance: number;
  consistency: number;
  recommendations: string[];
}
