import { NextRequest, NextResponse } from "next/server";
import { SPOTIFY_CONFIG } from "@/lib/spotify-config";
import { createClient, createServiceClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const serviceClient = createServiceClient();
    const { data: connection } = await serviceClient
      .from("spotify_connections")
      .select("refresh_token")
      .eq("user_id", user.id)
      .single();

    if (!connection) {
      return NextResponse.json({ error: "Aucune connexion Spotify" }, { status: 404 });
    }

    const tokenResponse = await fetch(SPOTIFY_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CONFIG.clientId}:${SPOTIFY_CONFIG.clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: connection.refresh_token,
      }),
    });

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: "Impossible de rafraîchir le token" }, { status: 400 });
    }

    const newTokens = await tokenResponse.json();

    const updateData: Record<string, string> = {
      access_token: newTokens.access_token,
      token_expires_at: new Date(Date.now() + newTokens.expires_in * 1000).toISOString(),
    };
    if (newTokens.refresh_token) {
      updateData.refresh_token = newTokens.refresh_token;
    }

    await serviceClient.from("spotify_connections").update(updateData).eq("user_id", user.id);

    return NextResponse.json({ access_token: newTokens.access_token, expires_in: newTokens.expires_in });
  } catch (error) {
    console.error("Erreur refresh:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
