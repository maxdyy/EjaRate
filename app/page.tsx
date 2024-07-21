"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { LinkButton } from "@/components/ui/LinkButton";
import { SearchBuilding } from "@/components/SearchBuilding";
import { Separator } from "@/components/ui/Separator";
import { formatBuildingID } from "@/lib/utils";

export default function Home() {
  const { push } = useRouter();

  const handleRedirectToBuildingPage = useCallback(
    (buildingName: string) => {
      const buildingID = formatBuildingID(buildingName);
      push(`/building/${buildingID}`);
    },
    [push]
  );

  return (
    <div className="flex flex-col justify-center items-center pt-32 lg:pt-64 px-4">
      <span className="text-xl lg:text-2xl font-bold">EjaRate</span>
      <h1 className="text pb-5 lg:text-xl text-center">
        Search for <span className="font-semibold">Rent Reviews</span> in your{" "}
        <span className="font-semibold">Building</span>
      </h1>
      <SearchBuilding onResultSelect={handleRedirectToBuildingPage} />
      <div className="py-6 flex items-center w-full max-w-[580px]">
        <Separator className="shrink grow" />
        <span className="shrink-0 px-2 text-sm text-gray-700">
          Or write a review
        </span>
        <Separator className="shrink grow" />
      </div>
      <div>
        <LinkButton href="/submit-review" className="underline">
          New Review
        </LinkButton>
      </div>
    </div>
  );
}
