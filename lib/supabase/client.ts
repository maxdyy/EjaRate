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
        setAll() {
          // This is a noop because we are not setting cookies in the browser
          // for security reasons. The cookies are set by the Supabase Auth
          // on the server side.
        },
      },
    }
  );
};
