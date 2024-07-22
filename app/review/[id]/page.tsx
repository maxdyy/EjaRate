"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/Separator";

import { BuildingReviewsData } from "@/lib/interfaces";
import { getReviewData } from "@/lib/services";

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
      }
      setSearching(false);
    };

    fetchBuildingData();
  }, [params.id]);

  return (
    <main className="flex justify-center">
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
        <div className="pt-40 text-center w-full max-w-[850px]">
          <h1 className="text-2xl font-semibold">{reviewData.building_name}</h1>
          <p className="text-lg pb-6">{reviewData.building_address}</p>
          <div className="border p-6 rounded-md">
            {reviewData.building_quality && (
              <p className="font-semibold pb-2">
                Building Quality: {reviewData.building_quality} / 5
              </p>
            )}
            {reviewData.apartment_quality && (
              <p className="font-semibold pb-2">
                Apartment Quality: {reviewData.apartment_quality} / 5
              </p>
            )}
            <div className="py-2">
              <Separator />
            </div>
            <div>
              {reviewData.apartment_number && (
                <p className="pb-2">
                  Apartment Number: {reviewData.apartment_number}
                </p>
              )}
              {reviewData.rent_amount && (
                <p className="pb-2">
                  Rent Amount: {reviewData.rent_amount} AED/Year
                </p>
              )}
            </div>
            <div className="py-2">
              <Separator />
            </div>
            <div>
              {reviewData.agency_name && (
                <p className="pb-2">Agency Name: {reviewData.agency_name}</p>
              )}
              {reviewData.agency_experience && (
                <p className="pb-2">
                  Agency Experience: {reviewData.agency_experience} / 5
                </p>
              )}
            </div>
            <div className="py-2">
              <Separator />
            </div>
            <div>
              {reviewData.additional_notes && (
                <p className="pb-2">
                  Additional Notes: {reviewData.additional_notes}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
