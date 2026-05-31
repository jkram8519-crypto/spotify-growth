import { NextRequest, NextResponse } from "next/server";
import { SPOTIFY_CONFIG } from "@/lib/spotify-config";
import { createServiceClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL("/dashboard?spotify_error=access_denied", request.url));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/dashboard?spotify_error=missing_params", request.url));
  }

  try {
    const stateData = JSON.parse(Buffer.from(state, "base64url").toString("utf-8"));
    const userId = stateData.userId;

    if (!userId) {
      return NextResponse.redirect(new URL("/dashboard?spotify_error=invalid_state", request.url));
    }

    const tokenResponse = await fetch(SPOTIFY_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CONFIG.clientId}:${SPOTIFY_CONFIG.clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: SPOTIFY_CONFIG.redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Erreur tokens:", await tokenResponse.json());
      return NextResponse.redirect(new URL("/dashboard?spotify_error=token_failed", request.url));
    }

    const tokens = await tokenResponse.json();

    const profileResponse = await fetch(`${SPOTIFY_CONFIG.apiBaseUrl}/me`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const spotifyProfile = await profileResponse.json();

    const supabase = createServiceClient();
    await supabase.from("spotify_connections").upsert({
      user_id: userId,
      spotify_id: spotifyProfile.id,
      spotify_display_name: spotifyProfile.display_name,
      spotify_email: spotifyProfile.email,
      spotify_image_url: spotifyProfile.images?.[0]?.url || null,
      spotify_country: spotifyProfile.country,
      spotify_product: spotifyProfile.product,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      scopes: tokens.scope,
      connected_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

    return NextResponse.redirect(new URL("/dashboard?spotify_connected=true", request.url));
  } catch (err) {
    console.error("Erreur callback:", err);
    return NextResponse.redirect(new URL("/dashboard?spotify_error=unknown", request.url));
  }
}
