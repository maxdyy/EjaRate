export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  // Get the id query parameter from the URL
  const searchID = req.nextUrl.searchParams.get("id");

  // Now that we have the ID, we can query the database for the building data
  if (searchID) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("building_id", searchID)
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return Response.json({
        buildingData: [],
        error: "Error fetching building data",
      });
    } else {
      return Response.json({ buildingData: data });
    }
  }
}
