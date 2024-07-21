"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BuildingReviewsData } from "@/lib/interfaces";
import { getBuildingData } from "@/lib/services";
import { formatBuildingName } from "@/lib/utils";

export default function BuildingPage({ params }: { params: { id: string } }) {
  const [searching, setSearching] = useState<boolean>(true);
  const [buildingData, setBuildingData] = useState<BuildingReviewsData | null>(
    null
  );

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
          <h1 className="text-2xl font-semibold"></h1>
          <p className="pt-5 text-lg font-semibold">Average Review: </p>
          <div className="pt-5 flex"></div>
        </div>
      )}
    </main>
  );
}
