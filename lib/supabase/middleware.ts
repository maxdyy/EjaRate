import { NextResponse, type NextRequest } from "next/server";

// This function is called for every request that matches the config
// object in the middleware. It is necessary to update the session and
// user data on every request.
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  return supabaseResponse;
}
