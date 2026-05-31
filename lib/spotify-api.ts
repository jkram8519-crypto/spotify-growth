import { SPOTIFY_CONFIG } from "./spotify-config";
import { SpotifyArtistProfile, SpotifyTrack, SpotifyAudioFeatures, SpotifyPlaylist } from "../types/spotify";
export class SpotifyAPI {
  private accessToken: string;
  constructor(accessToken: string) { this.accessToken = accessToken; }
  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${SPOTIFY_CONFIG.apiBaseUrl}${endpoint}`, { ...options, headers: { ...options.headers, Authorization: `Bearer ${this.accessToken}`, "Content-Type": "application/json" } });
    if (!response.ok) throw new Error("Erreur API Spotify");
    return response.json();
  }
  async getMe(): Promise<any> { return this.fetch("/me"); }
  async searchArtist(query: string): Promise<SpotifyArtistProfile[]> { const data: any = await this.fetch(`/search?q=${encodeURIComponent(query)}&type=artist&limit=5`); return data.artists.items; }
  async getArtistTopTracks(artistId: string): Promise<SpotifyTrack[]> { const data: any = await this.fetch(`/artists/${artistId}/top-tracks?market=from_token`); return data.tracks; }
}
