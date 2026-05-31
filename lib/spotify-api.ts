import { SPOTIFY_CONFIG } from "./spotify-config";
import { SpotifyArtistProfile, SpotifyTrack, SpotifyAudioFeatures, SpotifyPlaylist } from "../types/spotify";

export class SpotifyAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${SPOTIFY_CONFIG.apiBaseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Erreur API Spotify");
    }

    return response.json();
  }

  async getMe(): Promise<any> {
    return this.fetch("/me");
  }

  async searchArtist(query: string): Promise<SpotifyArtistProfile[]> {
    const data: any = await this.fetch(`/search?q=${encodeURIComponent(query)}&type=artist&limit=5`);
    return data.artists.items;
  }

  async getArtist(artistId: string): Promise<SpotifyArtistProfile> {
    return this.fetch(`/artists/${artistId}`);
  }

  async getArtistTopTracks(artistId: string): Promise<SpotifyTrack[]> {
    const data: any = await this.fetch(`/artists/${artistId}/top-tracks?market=from_token`);
    return data.tracks;
  }

  async getAudioFeatures(trackId: string): Promise<SpotifyAudioFeatures> {
    return this.fetch(`/audio-features/${trackId}`);
  }

  async searchPlaylists(query: string): Promise<SpotifyPlaylist[]> {
    const data: any = await this.fetch(`/search?q=${encodeURIComponent(query)}&type=playlist&limit=10`);
    return data.playlists.items;
  }

  async getRecommendations(seeds: { seedArtists?: string[], seedGenres?: string[], seedTracks?: string[] }): Promise<SpotifyTrack[]> {
    const params = new URLSearchParams();
    if (seeds.seedArtists) params.append("seed_artists", seeds.seedArtists.join(","));
    if (seeds.seedGenres) params.append("seed_genres", seeds.seedGenres.join(","));
    if (seeds.seedTracks) params.append("seed_tracks", seeds.seedTracks.join(","));
    
    const data: any = await this.fetch(`/recommendations?${params.toString()}&limit=10`);
    return data.tracks;
  }
}
