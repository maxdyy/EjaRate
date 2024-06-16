import { NextRequest } from "next/server";

import { buildingsDB } from "@/lib/db";
import { BuildingData } from "@/lib/interfaces";

export async function GET(req: NextRequest) {
  // Get the id query parameter from the URL
  const searchID = req.nextUrl.searchParams.get("id");

  // Find the building data from the database
  const buildingData =
    (buildingsDB.find(
      (building) => building.id === searchID
    ) as BuildingData) || null;

  return Response.json({ buildingData });
}
