"use server";
import { redirect } from "next/navigation";
import { formatBuildingID } from "@/lib/utils";

export interface ReviewActionProps {
  selectedBuilding: string | null;
  apartmentNumber: string | null;
  rentAmount: string | null;
  buildingQuality: string | null;
  apartmentQuality: string | null;
  agencyName: string | null;
  agencyExperience: string | null;
  ejariContractNumber: string | null;
  dewaPremiseNumber: string | null;
  additionalNotes: string | null;
}

export const submitReviewAction = async ({
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
}: ReviewActionProps) => {
  // Check if the form has all the data
  if (
    !selectedBuilding ||
    !apartmentNumber ||
    !buildingQuality ||
    !apartmentQuality ||
    !ejariContractNumber ||
    !dewaPremiseNumber
  ) {
    console.error("Missing form data");
    const errorMessage =
      "#error_description=Error+submitting+review.+Please+try+again.";
    return redirect(`/error$${errorMessage}`);
  }
  console.log({
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
};
