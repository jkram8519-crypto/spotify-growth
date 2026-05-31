import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function useSpotify() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

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
