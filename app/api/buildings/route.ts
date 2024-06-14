import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchName = req.nextUrl.searchParams.get("name");
  console.log("Searching for:", searchName);

  return Response.json({ buildings: ["Sunset 3", "Sunset 1", "Sunset 2"] });
}
