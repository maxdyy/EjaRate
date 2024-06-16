export interface GooglePlace {
  formattedAddress: string;
  displayName: {
    languageCode: string;
    text: string;
  };
}

export interface BuildingReviewData {
  id: string;
  rating: number;
  review: string;
}

export interface BuildingData {
  id: string;
  name: string;
  address: string;
  reviews: BuildingReviewData[];
}