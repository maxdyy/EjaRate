// Modified setup from https://supabase.com/docs/guides/auth/server-side/nextjs

import { createBrowserClient } from "@supabase/ssr";

export const createClientBrowser = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
