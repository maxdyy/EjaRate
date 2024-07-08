"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClientServer } from "@/lib/supabase";

export const googleAuthAction = async () => {
  const origin = headers().get("origin") || "https://ejarate.org";
  const supabase = createClientServer();
  console.log({ origin });

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/api/signin`,
    },
  });

  if (error) {
    console.error("Error signing in with Google", error);
  } else {
    return redirect(data.url);
  }
};

export const emailAuthAction = async () => {
  console.log('email auth');
};
