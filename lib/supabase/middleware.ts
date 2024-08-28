import { NextResponse, type NextRequest } from "next/server";
import { createClientServer } from "@/lib/supabase/server";

// This function is called for every request that matches the config
// object in the middleware. It is necessary to update the session and
// user data on every request.

export async function updateSession(request: NextRequest) {
  const supabase = createClientServer();
  const supabaseResponse = NextResponse.next({
    request,
  });

  // Get the user data on every request and check if the user is logged in
  const { data, error } = await supabase.auth.getUser();

  // These pages are protected by the middleware and authentication is required
  const isDashboardPage = request.nextUrl.pathname === "/dashboard";
  const isSubmitReviewPage = request.nextUrl.pathname === "/submit-review";

  // Check if the user is trying to access the dashboard page and is not logged in
  if ((isDashboardPage || isSubmitReviewPage) && (!data.user || error)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return supabaseResponse;
}
