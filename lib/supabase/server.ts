// Modified setup from https://supabase.com/docs/guides/auth/server-side/nextjs

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClientServer = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (e) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.error("Error from setAll cookies Supabase server:", e);
          }
        },
      },
    }
  );
};
