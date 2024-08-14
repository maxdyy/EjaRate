// Modified setup from https://supabase.com/docs/guides/auth/server-side/nextjs

import { createBrowserClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClientBrowser = () => {
  const cookieStore = cookies();

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            console.log(
              "No setting cookies on the client for security reasons:",
              cookiesToSet
            );
          } catch (e) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.error("Error from setAll cookies Supabase client:", e);
          }
        },
      },
    }
  );
};
