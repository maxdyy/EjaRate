"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { BuildingData } from "@/lib/interfaces";
import { getBuildingData } from "@/lib/services";
import { formatBuildingName, generateBuildingAverageRating } from "@/lib/utils";

export default function BuildingPage({ params }: { params: { id: string } }) {
  const [searching, setSearching] = useState<boolean>(true);
  const [buildingData, setBuildingData] = useState<BuildingData | null>(null);

  useEffect(() => {
    const fetchBuildingData = async () => {
      const data = await getBuildingData(params.id);
      setBuildingData(data);
      setSearching(false);
    };

    fetchBuildingData();
  }, [params.id]);

  return (
    <main className="h-[calc(100vh-128px)] lg:h-[calc(100vh-110px)] flex justify-center">
      {searching && (
        <div className="pt-40 text-center">
          <p>Searching for reviews...</p>
        </div>
      )}

      {!buildingData && !searching && (
        <div className="pt-40 text-center">
          <p className="text-lg">
            We couldn&apos;t find any reviews for{" "}
            <span className="font-semibold">
              {`${formatBuildingName(params.id)}`}.
            </span>
          </p>
          <p className="pt-4">
            <Link className="underline" href="/">
              Back to the Home Page
            </Link>
          </p>
        </div>
      )}

      {buildingData && !searching && (
        <div className="pt-40 text-center">
          <h1 className="text-2xl font-semibold">{buildingData.name}</h1>
          <p>{buildingData.address}</p>
          <p className="pt-2">
            Average Review:{" "}
            {generateBuildingAverageRating(buildingData.reviews)}/5
          </p>
          <div className="pt-5 flex">
            {buildingData.reviews.map((review, index) => (
              <Card key={review.id} className="m-2">
                <CardHeader>
                  <CardTitle>Rate: {review.rating}/5</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{review.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
