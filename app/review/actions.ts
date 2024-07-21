"use server";
import { redirect } from "next/navigation";
import { formatBuildingID } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

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
    // If the form is missing data, and the Front End validation
    // somehow failed, we will log an error and redirect to the error page
    console.error("Missing form data");
    const errorMessage =
      "#error_description=Error+submitting+review.+Please+try+again.";
    return redirect(`/error$${errorMessage}`);
  }

  // Format the building ID, this ID is also used in the URL of the
  // Building details page, and it is same ID in our database
  // I also clean up the data and convert it to the right data type
  /*
    additional_notes?: string | null
    agency_experience?: number | null
    agency_name?: string | null
    apartment_number?: number | null
    apartment_quality?: number | null
    building_id?: string | null
    building_name?: string | null
    building_quality?: number | null
    dewa_premise_number?: string | null
    ejari_contract_number?: string | null
    rent_amount?: number | null
  */
  const additional_notes = additionalNotes || null;
  const agency_experience = parseInt(agencyExperience || "0") || null;
  const agency_name = agencyName || null;
  const apartment_number = parseInt(apartmentNumber) || null;
  const apartment_quality = parseInt(apartmentQuality) || null;
  const building_id = formatBuildingID(selectedBuilding) || null;
  const building_name = selectedBuilding || null;
  const building_quality = parseInt(buildingQuality) || null;
  const dewa_premise_number = dewaPremiseNumber || null;
  const ejari_contract_number = ejariContractNumber || null;
  const rent_amount = parseInt(rentAmount || "0") || null;

  // Now we will insert the review data into the database
  const { error } = await supabase.from("reviews").insert({
    building_id,
    building_name,
    building_quality,
    apartment_number,
    apartment_quality,
    rent_amount,
    agency_name,
    agency_experience,
    ejari_contract_number,
    dewa_premise_number,
    additional_notes,
  });

  // If there is an error, we will log the error and redirect to the error page
  if (error) {
    console.error("Error inserting review", error);
    const errorMessage =
      "#error_description=Error+submitting+review.+Please+try+again.";
    return redirect(`/error$${errorMessage}`);
  } else {
    // If the review was inserted successfully, we will redirect to the
    // success page with the success message
    const successMessage =
      "#success_description=Review+submitted+successfully.+We+will+review+it+and+publish+it+soon.+You+can+check+it+on+your+dashboard.";
    return redirect(`/success${successMessage}`);
  }
};
