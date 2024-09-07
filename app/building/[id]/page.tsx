"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { BuildingReviewsData } from "@/lib/interfaces";
import { getBuildingData } from "@/lib/services";
import { formatBuildingName, intToAED, average } from "@/lib/utils";

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

        setAverageReview(average(total, data.length));
        setApartmentAverage(average(apartmentTotal, data.length));
      }
      setSearching(false);
    };

    fetchBuildingData();
  }, [params.id]);

  return (
    <div className="flex justify-center items-center flex-col">
      {searching && (
        <div className="pt-40 text-center">
          <p>Searching for reviews...</p>
        </div>
      )}

      {!searching && (
        <Breadcrumb className="container max-w-screen-2xl pt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{formatBuildingName(params.id)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
        <div className="pt-20 text-center w-full max-w-[850px] px-2">
          <h1 className="text-lg lg:text-2xl font-semibold">{buildingName}</h1>
          <p className="pt-2 text-sm lg:text-lg">{buildingAddress}</p>
          {/* Summary of stats */}
          <div className="border rounded-lg p-6 pt-4 mt-4 bg-gray-200 md:mx-2">
            <div className="w-full flex justify-center items-center">
              <div className="w-1/3 text-sm flex flex-col">
                <span>{totalReviews}</span>
                <span>Reviews</span>
              </div>
              <div className="w-[1px] bg-white h-[30px] rounded-lg" />
              <div className="w-1/3 text-sm flex flex-col">
                <span>{averageReview}/5</span>
                <span>Average</span>
              </div>
              <div className="w-[1px] bg-white h-[30px] rounded-lg" />
              <div className="w-1/3 text-sm flex flex-col">
                <span>{apartmentAverage}/5</span>
                <span>Apt. Average</span>
              </div>
            </div>
            <div className="pt-6">
              <Link
                href={`/submit-review?name=${buildingName}&address=${buildingAddress}`}
              >
                <Button size="sm" className="w-full">
                  Write a Review
                </Button>
              </Link>
            </div>
          </div>
          <div className="py-12 flex flex-wrap">
            {buildingData.map((review: BuildingReviewsData) => (
              <div
                key={review.id}
                className="w-full pb-2 md:w-1/2 md:px-2 md:pb-4"
              >
                <Card className="h-full">
                  <CardContent className="pt-4 h-full flex flex-col">
                    <div className="flex justify-center items-center">
                      <div className="w-1/2 text-sm flex flex-col">
                        <span className="font-semibold">
                          {review.apartment_quality}/5
                        </span>
                        <span className="font-semibold">Apartment Quality</span>
                      </div>
                      <div className="w-[1px] bg-white h-[30px] rounded-lg" />
                      <div className="w-1/2 text-sm flex flex-col">
                        <span className="font-semibold">
                          {review.building_quality}/5
                        </span>
                        <span className="font-semibold">Building Quality</span>
                      </div>
                    </div>
                    <div className="pt-4 pb-6">
                      <Separator />
                    </div>
                    <div className="flex flex-col justify-between">
                      {review.apartment_number && (
                        <div className="flex justify-between pb-1">
                          <span className="font-semibold text-sm">
                            Apartment Number
                          </span>
                          <span className="text-sm">
                            {review.apartment_number}
                          </span>
                        </div>
                      )}
                      {review.rent_amount && (
                        <div className="flex justify-between pb-1">
                          <span className="font-semibold text-sm">
                            Rent Amount
                          </span>
                          <span className="text-sm">
                            {intToAED.format(review.rent_amount)}
                          </span>
                        </div>
                      )}
                      {review.agency_name && (
                        <div className="flex justify-between pb-1">
                          <span className="font-semibold text-sm">Agency</span>
                          <span className="text-sm">{review.agency_name}</span>
                        </div>
                      )}
                      {review.agency_experience && (
                        <div className="flex justify-between pb-1">
                          <span className="font-semibold text-sm">
                            Agency Experience
                          </span>
                          <span className="text-sm">
                            {review.agency_experience}/5
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="pt-6 text-center mt-auto">
                      <Link href={`/review/${review.id}`}>
                        <Button size="sm" className="w-full">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
