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

// Postgress timestamp to date
export const psTimeStampToDate = (timestamp: string) => {
  const date = new Date(timestamp.replace(" ", "T"));
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const average = (num: number, length: number) =>
  Number((num / length).toFixed(1));
