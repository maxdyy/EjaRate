"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { BuildingReviewsData } from "@/lib/interfaces";
import { getBuildingData } from "@/lib/services";
import { formatBuildingName } from "@/lib/utils";

export default function BuildingPage({ params }: { params: { id: string } }) {
  const [searching, setSearching] = useState<boolean>(true);
  const [buildingData, setBuildingData] = useState<
    BuildingReviewsData[] | null
  >(null);
  const [buildingName, setBuildingName] = useState<string | null>(null);
  const [buildingAddress, setBuildingAddress] = useState<string | null>(null);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);
  const [averageReview, setAverageReview] = useState<number | null>(null);
  const [apartmentAverage, setApartmentAverage] = useState<number | null>(null);

  useEffect(() => {
    const fetchBuildingData = async () => {
      // Here I am setting all the reviews into our state
      const data = await getBuildingData(params.id);
      if (data && data.length > 0) {
        setBuildingData(data);
        setTotalReviews(data.length);
        // We will use the first review to get the building name and address
        setBuildingName(data[0].building_name);
        setBuildingAddress(data[0].building_address);
        // Calculate the average reviews
        let total = 0;
        let apartmentTotal = 0;
        data.forEach((review: BuildingReviewsData) => {
          total += review.building_quality || 0;
          apartmentTotal += review.apartment_quality || 0;
        });

        setAverageReview(total / data.length);
        setApartmentAverage(apartmentTotal / data.length);
      }
      setSearching(false);
    };

    fetchBuildingData();
  }, [params.id]);

  return (
    <main className="flex justify-center">
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
            <Link className="underline" href="/submit-review">
              Write a review
            </Link>
          </p>
        </div>
      )}

      {buildingData && !searching && (
        <div className="pt-40 text-center w-full max-w-[850px]">
          <h1 className="text-2xl font-semibold">{buildingName}</h1>
          <p className="pt-2 text-lg">{buildingAddress}</p>
          <div className="flex w-full justify-between">
            <p className="pt-5 text-lg font-semibold">
              Total Reviews: {totalReviews}
            </p>
            <p className="pt-5 text-lg font-semibold">
              Average Review: {averageReview}
            </p>
            <p className="pt-5 text-lg font-semibold">
              Average Apartment Review: {apartmentAverage}
            </p>
          </div>
          <div className="pt-12 flex">
            {buildingData.map((review: BuildingReviewsData) => (
              <div key={review.id} className="w-1/3 p-2">
                <Card>
                  <CardContent className="text-left pt-4">
                    <p>
                      <span className="font-semibold">Building Quality:</span>{" "}
                      {review.building_quality}
                    </p>
                    <p>
                      <span className="font-semibold">Apartment Quality:</span>{" "}
                      {review.apartment_quality}
                    </p>
                    <div className="py-2">
                      <Separator />
                    </div>
                    <div>
                      {review.rent_amount && (
                        <p>Rent Amount: {review.rent_amount}</p>
                      )}
                      {review.agency_name && (
                        <p>Agency Name: {review.agency_name}</p>
                      )}
                      {review.agency_experience && (
                        <p>Agency Experience: {review.agency_experience}</p>
                      )}
                      <div className="pt-2">
                        <Separator />
                      </div>
                      <div className="pt-4 text-center">
                        <Button size="sm" className="w-full">
                          <Link href={`/review/${review.id}`}>View Review</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
