import { NextResponse } from "next/server";
import { getSpotifyAuthUrl } from "@/lib/spotify-config";
import { createClient } from "@/lib/supabase-server";
import crypto from "crypto";

export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Vous devez être connecté à Spotlift" }, { status: 401 });
    }

    const state = Buffer.from(
      JSON.stringify({
        userId: user.id,
        random: crypto.randomBytes(16).toString("hex"),
      })
    ).toString("base64url");

    const authUrl = getSpotifyAuthUrl(state);
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Erreur OAuth Spotify:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
