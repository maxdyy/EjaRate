import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const intToAED = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AED",
});
