import axios from "axios";
import { NextRequest } from "next/server";
import { GooglePlace } from "@/lib/interfaces";

export async function GET(req: NextRequest) {
  // Get the name query parameter from the URL
  const searchName = req.nextUrl.searchParams.get("name");

  // Make a POST request to google API to search for places
  try {
    const { data } = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: searchName,
        locationBias: {
          circle: {
            center: {
              // These are the coordinates of Dubai
              latitude: 25.2344723,
              longitude: 55.2209987,
            },
            radius: 500.0,
          },
        },
      },
      {
        headers: {
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
        },
      }
    );
    const places = (data?.places as GooglePlace[]) ?? [];
    // Google API returns duplicated results, multiple results have the same name
    // but they were registered with slightly different formatted address
    // since the place is the same we're going to remove the duplicates based on the
    // displayName.text field in the GooglePlace type object
    const uniquePlaces = new Map<string, GooglePlace>();
    places.forEach((place) => {
      uniquePlaces.set(place?.displayName?.text, place);
    });

    return Response.json({ buildings: Array.from(uniquePlaces.values()) });
  } catch (error) {
    console.error(error);
    return Response.json({ buildings: [] });
  }
}
