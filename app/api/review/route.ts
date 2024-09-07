export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  // Get the id query parameter from the URL
  const searchID = req.nextUrl.searchParams.get("id");

  // Now that we have the ID, we can query the database for the review data
  if (searchID) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", searchID)
      .eq("is_approved", true)
      .neq("building_id", `${Math.random() * Math.random()}`); // This is a fix to force dynamic responses

    if (error) {
      console.error(error);
      return Response.json({
        reviewData: null,
        error: "Error fetching building data",
      });
    } else {
      return Response.json({ reviewData: data });
    }
  }
}
