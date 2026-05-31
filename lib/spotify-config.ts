export const SPOTIFY_CONFIG = {
  clientId: process.env.SPOTIFY_CLIENT_ID || "",
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  redirectUri: process.env.SPOTIFY_REDIRECT_URI || "https://getspotlift.vercel.app/api/spotify/callback",
};

export function getSpotifyAuthUrl(state?: string) {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "playlist-read-private",
  ].join(" ");

  const params: Record<string, string> = {
    client_id: SPOTIFY_CONFIG.clientId,
    response_type: "code",
    redirect_uri: SPOTIFY_CONFIG.redirectUri,
    scope: scopes,
  };

  if (state) params.state = state;

  return "https://accounts.spotify.com/authorize?" + new URLSearchParams(params).toString();
}
