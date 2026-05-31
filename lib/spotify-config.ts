export const SPOTIFY_CONFIG = {
  clientId: process.env.SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI || "https://getspotlift.vercel.app/api/spotify/callback",
  authUrl: "https://accounts.spotify.com/authorize",
  tokenUrl: "https://accounts.spotify.com/api/token",
  apiBaseUrl: "https://api.spotify.com/v1",
};
export const SPOTIFY_SCOPES = ["user-read-private","user-read-email","user-top-read","user-library-read","playlist-read-private","playlist-read-collaborative","user-read-recently-played","user-follow-read"].join(" " );
export function getSpotifyAuthUrl(state: string): string {
  const params = new URLSearchParams({ client_id: SPOTIFY_CONFIG.clientId, response_type: "code", redirect_uri: SPOTIFY_CONFIG.redirectUri, scope: SPOTIFY_SCOPES, state: state, show_dialog: "true" });
  return `${SPOTIFY_CONFIG.authUrl}?${params.toString()}`;
}
