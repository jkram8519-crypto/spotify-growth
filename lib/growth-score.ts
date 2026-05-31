import { SpotifyArtistProfile, SpotifyTrack, GrowthScoreData } from "../types/spotify";
export function calculateGrowthScore(artist: SpotifyArtistProfile, topTracks: SpotifyTrack[]): GrowthScoreData {
  const popularityScore = artist.popularity;
  const followersScore = Math.min(100, (artist.followers.total / 10000) * 100);
  const avgTrackPopularity = topTracks.length > 0 ? topTracks.reduce((acc, t) => acc + t.popularity, 0) / topTracks.length : 0;
  const score = Math.round((popularityScore * 0.4) + (followersScore * 0.2) + (avgTrackPopularity * 0.4));
  const recommendations = [];
  if (score < 50) recommendations.push("Augmente ta fréquence de sortie.");
  if (artist.followers.total < 1000) recommendations.push("Travaille ton branding.");
  return { score, popularity: popularityScore, followers: artist.followers.total, topTrackPopularity: Math.round(avgTrackPopularity), genreRelevance: 85, consistency: 70, recommendations };
}
