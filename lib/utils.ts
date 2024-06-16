import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BuildingReviewData } from "./interfaces";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatBuildingID = (name: string) =>
  name.toLowerCase().split(" ").join("-");

export const formatBuildingName = (id: string) =>
  id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const generateBuildingAverageRating = (reviews: BuildingReviewData[]) => {
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  return total / reviews.length;
}