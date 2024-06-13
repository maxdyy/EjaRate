import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchName = req.nextUrl.searchParams.get("name");

  return Response.json({ message: "Hello from the server!" });
}
