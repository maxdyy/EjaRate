import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";

test("renders a card element with default styles", () => {
  render(
    <Card>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Card content</CardContent>
      <CardFooter>Card footer</CardFooter>
    </Card>
  );
  const card = screen.getByRole("card");
  expect(card).toHaveClass(
    "rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
  );

  const cardHeader = screen.getByRole("card-header");
  expect(cardHeader).toHaveClass("flex flex-col space-y-1.5 p-6");

  const cardTitle = screen.getByRole("card-title");
  expect(cardTitle).toHaveClass(
    "text-2xl font-semibold leading-none tracking-tight"
  );

  const cardDescription = screen.getByRole("card-description");
  expect(cardDescription).toHaveClass("text-sm text-slate-500 dark:text-slate-400");

  const cardContent = screen.getByRole("card-content");
  expect(cardContent).toHaveClass("p-6 pt-0");

  const cardFooter = screen.getByRole("card-footer");
  expect(cardFooter).toHaveClass("flex items-center p-6 pt-0");
});