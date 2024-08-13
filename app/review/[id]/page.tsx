"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Card, CardContent } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";

import { BuildingReviewsData } from "@/lib/interfaces";
import { getReviewData } from "@/lib/services";
import { intToAED, psTimeStampToDate } from "@/lib/utils";

export default function ReviewPage({ params }: { params: { id: string } }) {
  const [searching, setSearching] = useState<boolean>(true);
  const [reviewData, setReviewData] = useState<BuildingReviewsData | null>(
    null
  );

  useEffect(() => {
    const fetchBuildingData = async () => {
      // Here I am setting all the reviews into our state
      const data = await getReviewData(params.id);
      if (data && data.length > 0) {
        setReviewData(data[0]);
        console.log(data[0]);
      }
      setSearching(false);
    };

    fetchBuildingData();
  }, [params.id]);

  return (
    <div className="flex justify-center items-center flex-col">
      {searching && (
        <div className="pt-40 text-center">
          <p>Searching review...</p>
        </div>
      )}

      {!reviewData && !searching && (
        <div className="pt-40 text-center">
          <p className="text-lg">We couldn&apos;t find this review.</p>
          <p className="pt-4">
            <Link className="underline" href="/submit-review">
              Write a review
            </Link>
          </p>
        </div>
      )}

      {reviewData && !searching && (
        <>
          <Breadcrumb className="container max-w-screen-2xl pt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/building/${reviewData.building_id}`}>
                  {reviewData.building_name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Review</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="pt-20 text-center w-full max-w-[850px] px-2">
            <h1 className="text-lg lg:text-2xl font-semibold">
              {reviewData.building_name}
            </h1>
            <p className="pt-2 text-sm lg:text-lg">
              {reviewData.building_address}
            </p>
            <div className="border rounded-lg p-6 pt-4 mt-4 bg-gray-200 md:mx-2">
              <div className="w-full flex justify-center items-center">
                <div className="w-1/2 text-sm flex flex-col font-semibold">
                  <span>{reviewData.apartment_quality}/5</span>
                  <span>Apartment Quality</span>
                </div>
                <div className="w-[1px] bg-white h-[30px] rounded-lg" />
                <div className="w-1/2 text-sm flex flex-col font-semibold">
                  <span>{reviewData.building_quality}/5</span>
                  <span>Building Quality</span>
                </div>
              </div>
            </div>
            <div className="w-full pt-4 pb-12 md:px-2 flex flex-wrap">
              <Card className="w-full">
                <CardContent className="pt-4">
                  <div className="flex flex-col justify-between">
                    {reviewData.created_at && (
                      <div className="flex justify-between pb-1">
                        <span className="font-semibold text-sm">
                          Review Date
                        </span>
                        <span className="text-sm">
                          {psTimeStampToDate(reviewData.created_at)}
                        </span>
                      </div>
                    )}
                    <div className="py-4">
                      <Separator />
                    </div>
                    {reviewData.apartment_number && (
                      <div className="flex justify-between pb-1">
                        <span className="font-semibold text-sm">
                          Apartment Number
                        </span>
                        <span className="text-sm">
                          {reviewData.apartment_number}
                        </span>
                      </div>
                    )}
                    {reviewData.rent_amount && (
                      <div className="flex justify-between pb-1">
                        <span className="font-semibold text-sm">
                          Rent Amount
                        </span>
                        <span className="text-sm">
                          {intToAED.format(reviewData.rent_amount)}
                        </span>
                      </div>
                    )}
                    {reviewData.agency_name ||
                      reviewData.agency_experience ||
                      (reviewData.additional_notes && (
                        <div className="py-4">
                          <Separator />
                        </div>
                      ))}
                    {reviewData.agency_name && (
                      <div className="flex justify-between pb-1">
                        <span className="font-semibold text-sm">
                          Agency Name
                        </span>
                        <span className="text-sm">
                          {reviewData.agency_name}
                        </span>
                      </div>
                    )}
                    {reviewData.agency_experience && (
                      <div className="flex justify-between pb-1">
                        <span className="font-semibold text-sm">
                          Agency Experience
                        </span>
                        <span className="text-sm">
                          {reviewData.agency_experience}/5
                        </span>
                      </div>
                    )}
                    {reviewData.additional_notes && (
                      <>
                        <div className="py-4">
                          <Separator />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-semibold pb-2">
                            Notes
                          </span>
                          <p className="text-sm">
                            {reviewData.additional_notes}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
