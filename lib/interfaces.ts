export interface GooglePlace {
  formattedAddress: string;
  displayName: {
    languageCode: string;
    text: string;
  };
}

export interface BuildingReviewsData {
  additional_notes?: string | null;
  agency_experience?: number | null;
  agency_name?: string | null;
  apartment_number?: number | null;
  apartment_quality?: number | null;
  building_id?: string | null;
  building_name?: string | null;
  building_quality?: number | null;
  dewa_premise_number?: string | null;
  ejari_contract_number?: string | null;
  rent_amount?: number | null;
}
