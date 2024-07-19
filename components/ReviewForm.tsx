"use client";
import { useState, useCallback } from "react";

import { SearchBuilding } from "@/components/SearchBuilding";
import { Input } from "@/components/ui/Input";
import { ReviewToggle } from "@/components/ui/ReviewToggle";

interface ReviewFormProps {
  action: (formData: FormData) => void;
  preselectedBuilding?: string;
  preselectedBuildingAddress?: string;
}

const ReviewForm = ({
  action,
  preselectedBuilding,
  preselectedBuildingAddress,
}: ReviewFormProps) => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedBuildingAddress, setSelectedBuildingAddress] = useState<
    string | null
  >(null);

  const handleSelectBuilding = useCallback(
    (building: string, address: string) => {
      setSelectedBuilding(building);
      setSelectedBuildingAddress(address);
    },
    []
  );

  return (
    <form
      action={action}
      className="flex flex-col justify-center items-center px-4"
    >
      {selectedBuilding && selectedBuildingAddress ? (
        <div className="pt-20 max-w-[600px] w-full">
          <h1 className="text-2xl font-semibold text-center">
            {selectedBuilding}
          </h1>
          <p className="text-center">{selectedBuildingAddress}</p>
          {/* <p className="pt-4 text-gray-600 text-sm">
            Please make sure all the information matches your Ejari contract.
          </p> */}
          <p className="pt-8 pb-2 text-sm text-gray-700 font-semibold">
            Please fill in the review details
          </p>
          <div className="flex w-full">
            <div className="w-1/2 pr-2">
              <Input
                id="apartment-number"
                placeholder="Apartment Number"
              />
            </div>
            <div className="w-1/2 pl-2">
              <Input
                id="rent-amount"
                type="number"
                placeholder="Rent Amount AED/Year (Optional)"
              />
            </div>
          </div>
          <div className="pt-6 flex">
            <div className="w-1/2 pr-2">
              <ReviewToggle
                label="Building Quality"
                subtitle="Overall quality of the building"
                onValueChange={(value) => console.log(value)}
              />
            </div>
            <div className="w-1/2 pl-2">
              <ReviewToggle
                label="Apartment Quality"
                subtitle="Overall quality of the apartment"
                onValueChange={(value) => console.log(value)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-32 lg:pt-64 w-full max-w-[580px]">
          <h1 className="text pb-5 lg:text-xl text-center">
            Search for a Building to Review
          </h1>
          <SearchBuilding onResultSelect={handleSelectBuilding} />
        </div>
      )}
    </form>
  );
};

export { ReviewForm };
