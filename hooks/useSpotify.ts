"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function useSpotify() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  
  // On utilise la nouvelle méthode recommandée par Supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function checkConnection() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsConnected(false);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("spotify_connections")
        .select("id")
        .eq("user_id", user.id)
        .single();

      setIsConnected(!!data);
      setLoading(false);
    }

    checkConnection();
  }, [supabase]);

  const connect = () => {
    window.location.href = "/api/spotify/auth";
  };

  return { isConnected, loading, connect };
}
