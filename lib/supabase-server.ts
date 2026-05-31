import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies() as any;
  return createServerClient(
    {
      cookies: {
        getAll() { 
          return typeof cookieStore.getAll === "function" ? cookieStore.getAll() : []; 
        },
        setAll(cookiesToSet: any[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }: any) => {
              if (typeof cookieStore.set === "function") {
                cookieStore.set(name, value, options);
              }
            });
          } catch {}
        },
      },
    }
  );
}

export function createServiceClient() {
  return createSupabaseClient(
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
