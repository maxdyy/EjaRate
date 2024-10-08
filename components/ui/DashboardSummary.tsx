// This component is totally server side rendered, so we can use all the queries from supabase
// right within the component. This is a great way to keep the logic in one place.
"use server";

import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { createClientBrowser } from "@/lib/supabase/client";

import { intToAED, formatBuildingID } from "@/lib/utils";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { ApproveToggleButton } from "@/components/ui/ApproveReview";

const DashboardSummary = async () => {
  // Get the current user data
  const supabaseClient = createClientBrowser();
  const { data } = await supabaseClient.auth.getUser();
  const user = data.user;
  const email = user?.user_metadata?.email;
  const hasName = user?.user_metadata?.name;
  const userID = data.user?.id || "";

  // Create the Supabase DB connection and query the reviews
  // and check if the user is an admin
  const { data: roles } = await supabase
    .from("roles")
    .select("*")
    .eq("user_id", userID);
  const isAdmin = roles && roles?.length > 0 && roles[0].is_admin;

  let reviews;

  if (isAdmin) {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    reviews = data;
  } else {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("user_id", userID)
      .order("created_at", { ascending: false });
    reviews = data;
  }

  const totalReviews = reviews?.length || 0;
  const approvedReviews = reviews?.filter((r) => r.is_approved).length || 0;

  return (
    <div className="pt-20 text-center w-full max-w-[850px] px-2">
      {hasName && (
        <h1 className="text-lg lg:text-2xl font-semibold">
          Welcome, {user.user_metadata.name}!
        </h1>
      )}
      <p className="pt-2 text-sm lg:text-lg">
        You are now logged in as <span className="underline">{email}</span>
      </p>
      {/* Summary of stats */}
      <div className="border rounded-lg p-6 pt-4 mt-4 bg-gray-200 md:mx-2">
        <div className="w-full flex justify-center items-center">
          <div className="w-1/2 text-sm flex flex-col">
            <span>{totalReviews}</span>
            <span>Total Reviews</span>
          </div>
          <div className="w-[1px] bg-white h-[30px] rounded-lg" />
          <div className="w-1/2 text-sm flex flex-col">
            <span>{approvedReviews}</span>
            <span>Approved Reviews</span>
          </div>
        </div>
        <div className="pt-6">
          <Link href="/submit-review">
            <Button size="sm" className="w-full">
              Write a Review
            </Button>
          </Link>
        </div>
      </div>
      <div className="pt-8 lg:text-lg font-semibold">
        {isAdmin ? <h2>All Reviews</h2> : <h2>Your Reviews</h2>}
      </div>
      <div className="pt-4 pb-12 flex flex-wrap">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="w-full pb-2 md:w-1/2 md:px-2 md:pb-4"
            >
              <Card className="h-full">
                <CardContent className="pt-4 h-full flex flex-col">
                  {review.building_name && (
                    <Link
                      className="font-semibold hover:underline"
                      href={`/building/${formatBuildingID(
                        review.building_name
                      )}`}
                    >
                      {review.building_name}
                    </Link>
                  )}
                  <div className="pt-4 pb-6">
                    <Separator />
                  </div>
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
                    <div className="pt-4 pb-6">
                      <Separator />
                    </div>
                    {review.additional_notes && (
                      <>
                        <div className="flex flex-col pb-1 text-left">
                          <span className="font-semibold text-sm">
                            Additional Notes
                          </span>
                          <span className="text-sm">
                            {review.additional_notes}
                          </span>
                        </div>
                        <div className="pt-4 pb-6">
                          <Separator />
                        </div>
                      </>
                    )}
                    {review.user_email && (
                      <>
                        <div className="flex justify-between">
                          <span className="font-semibold text-sm">Email</span>
                          <span className="text-sm">{review.user_email}</span>
                        </div>
                        <div className="pt-4 pb-6">
                          <Separator />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-auto">
                    <div>
                      {review.ejari_contract_number && (
                        <div className="flex justify-between pb-1">
                          <span className="font-semibold text-sm">
                            Ejari Contract Number
                          </span>
                          <span className="text-sm">
                            {review.ejari_contract_number}
                          </span>
                        </div>
                      )}
                      {review.dewa_premise_number && (
                        <div className="flex justify-between pb-1">
                          <span className="font-semibold text-sm">
                            DEWA Premise Number
                          </span>
                          <span className="text-sm">
                            {review.dewa_premise_number}
                          </span>
                        </div>
                      )}
                      <div className="text-sm flex text-left">
                        <a
                          href="https://dubailand.gov.ae/en/eservices/download-ejari-certificate/"
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-blue-600"
                        >
                          Verify Ejari
                        </a>
                      </div>
                    </div>
                    <div className="pt-4 pb-6">
                      <Separator />
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-sm">Status</span>
                      <div className="text-sm flex items-center justify-center">
                        {review.is_approved ? (
                          <>
                            <span className="text-green-700 font-semibold">
                              Approved
                            </span>
                            <BadgeCheck className="text-green-700 pl-1 w-6" />
                          </>
                        ) : (
                          <span className="font-semibold text-orange-700">
                            Not Approved
                          </span>
                        )}
                      </div>
                    </div>
                    {isAdmin && (
                      <>
                        <div className="pt-4 pb-2">
                          <Separator />
                        </div>
                        <ApproveToggleButton
                          reviewId={review.id}
                          isApproved={review.is_approved}
                        />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            <p>You have not submitted any reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { DashboardSummary };
