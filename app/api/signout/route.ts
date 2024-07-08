import { createClientServer } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const supabase = createClientServer();
  await supabase.auth.signOut();
  return redirect(origin);
}
