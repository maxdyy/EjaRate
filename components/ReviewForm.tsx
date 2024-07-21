"use client";
import { useState, useCallback, useMemo } from "react";

import { ReviewActionProps } from "@/app/review/actions";
import { SearchBuilding } from "@/components/SearchBuilding";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ReviewToggle } from "@/components/ui/ReviewToggle";
import { StateFullLabel } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

import { useToast } from "@/lib/hooks";

interface ReviewFormProps {
  action: (data: ReviewActionProps) => void;
  preselectedBuilding?: string;
  preselectedBuildingAddress?: string;
}

const ReviewForm = ({
  action,
  preselectedBuilding,
  preselectedBuildingAddress,
}: ReviewFormProps) => {
  const { toast } = useToast();

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

  // Form Values
  const [apartmentNumber, setApartmentNumber] = useState<string | null>(null);
  const [apartmentNumberError, setApartmentNumberError] =
    useState<boolean>(true);
  const onApartmentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApartmentNumber(e.target.value);
    if (e.target.value === "") {
      setApartmentNumberError(true);
    } else {
      setApartmentNumberError(false);
    }
  };
  const [rentAmount, setRentAmount] = useState<string | null>(null);
  const [buildingQuality, setBuildingQuality] = useState<string | null>(null);
  const [buildingQualityError, setBuildingQualityError] =
    useState<boolean>(true);
  const onBuildingQualityChange = (value: string) => {
    setBuildingQuality(value);
    if (!value) {
      setBuildingQualityError(true);
    } else {
      setBuildingQualityError(false);
    }
  };
  const [apartmentQuality, setApartmentQuality] = useState<string | null>(null);
  const [apartmentQualityError, setApartmentQualityError] =
    useState<boolean>(true);
  const onApartmentQualityChange = (value: string) => {
    setApartmentQuality(value);
    if (!value) {
      setApartmentQualityError(true);
    } else {
      setApartmentQualityError(false);
    }
  };
  const [agencyName, setAgencyName] = useState<string | null>(null);
  const [agencyExperience, setAgencyExperience] = useState<string | null>(null);
  const [ejariContractNumber, setEjariContractNumber] = useState<string | null>(
    null
  );
  const onEjariContractNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEjariContractNumber(e.target.value);
    if (e.target.value === "") {
      setEjariContractNumberError(true);
    } else {
      setEjariContractNumberError(false);
    }
  };
  const [ejariContractNumberError, setEjariContractNumberError] =
    useState<boolean>(true);
  const [dewaPremiseNumber, setDewaPremiseNumber] = useState<string | null>(
    null
  );
  const [dewaPremiseNumberError, setDewaPremiseNumberError] =
    useState<boolean>(true);
  const onDewaPremiseNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDewaPremiseNumber(e.target.value);
    if (e.target.value === "") {
      setDewaPremiseNumberError(true);
    } else {
      setDewaPremiseNumberError(false);
    }
  };
  const [additionalNotes, setAdditionalNotes] = useState<string | null>(null);

  const isFormValid = useMemo(() => {
    return (
      !apartmentNumberError &&
      !buildingQualityError &&
      !apartmentQualityError &&
      !ejariContractNumberError &&
      !dewaPremiseNumberError
    );
  }, [
    apartmentNumberError,
    buildingQualityError,
    apartmentQualityError,
    ejariContractNumberError,
    dewaPremiseNumberError,
  ]);

  const generateErrorToast = (message: string) => {
    toast({
      title: "Form Error",
      description: message,
      variant: "destructive",
    });
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      action({
        selectedBuilding,
        apartmentNumber,
        rentAmount,
        buildingQuality,
        apartmentQuality,
        agencyName,
        agencyExperience,
        ejariContractNumber,
        dewaPremiseNumber,
        additionalNotes,
      });
    } else {
      generateErrorToast("Please fill out all required fields");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col justify-center items-center px-4"
    >
      {selectedBuilding && selectedBuildingAddress ? (
        <div className="pt-20 max-w-[750px] w-full">
          <h1 className="text-2xl font-semibold text-center">
            {selectedBuilding}
          </h1>
          <p className="text-center">{selectedBuildingAddress}</p>
          <div className="flex w-full pt-6">
            <div className="w-1/2 pr-6">
              <StateFullLabel hasError={apartmentNumberError}>
                Apartment Number*
              </StateFullLabel>
              <Input
                placeholder="Apartment Number"
                onChange={onApartmentNumberChange}
              />
            </div>
            <div className="w-1/2 pl-6">
              <StateFullLabel>Rent Amount</StateFullLabel>
              <Input
                type="number"
                placeholder="Rent Amount AED/Year (Optional)"
                onChange={(e) => setRentAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="pt-6 flex">
            <div className="w-1/2 pr-6">
              <ReviewToggle
                label="Building Quality*"
                subtitle="Overall quality of the building"
                onValueChange={onBuildingQualityChange}
                hasError={buildingQualityError}
              />
            </div>
            <div className="w-1/2 pl-6">
              <ReviewToggle
                label="Apartment Quality*"
                subtitle="Overall quality of the apartment"
                onValueChange={onApartmentQualityChange}
                hasError={apartmentQualityError}
              />
            </div>
          </div>
          <div className="pt-6 flex items-end">
            <div className="w-1/2 pr-6">
              <StateFullLabel>Agency Name</StateFullLabel>
              <Input
                placeholder="Agency Name (Optional)"
                onChange={(e) => setAgencyName(e.target.value)}
              />
            </div>
            <div className="w-1/2 pl-6">
              <ReviewToggle
                label="Agency Experience"
                subtitle="Real estate agency services (Optional)"
                onValueChange={(val) => setAgencyExperience(val)}
              />
            </div>
          </div>
          <div className="flex w-full pt-6">
            <div className="w-1/2 pr-6">
              <StateFullLabel hasError={ejariContractNumberError}>
                Ejari Contract Number*
              </StateFullLabel>
              <Input
                placeholder="Ejari Contract Number"
                onChange={onEjariContractNumberChange}
              />
            </div>
            <div className="w-1/2 pl-6">
              <StateFullLabel hasError={dewaPremiseNumberError}>
                DEWA Premise Number*
              </StateFullLabel>
              <Input
                placeholder="DEWA Premise Number"
                onChange={onDewaPremiseNumberChange}
              />
            </div>
          </div>
          <p className="pt-2 text-sm text-gray-700">
            To approve your Review, we need to verify your Ejari
          </p>
          <div className="w-full pt-6">
            <StateFullLabel>Additional Notes</StateFullLabel>
            <Textarea
              placeholder="Additional Notes (Optional)"
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
          </div>
          <div className="pt-6">
            <Button
              className="w-full mt-6 cursor-pointer"
              disabled={!isFormValid}
            >
              Submit Review
            </Button>
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
