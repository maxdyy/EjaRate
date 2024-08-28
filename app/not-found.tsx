"use client";

import { LinkButton } from "@/components/ui/LinkButton";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center pt-32 lg:pt-64 px-4">
      <div className="w-full max-w-[380px] text-center">
        <div className="font-bold text-xl lg:text-2xl pb-2">404</div>
        <h1 className="pb-5 lg:text-xl font-semibold ">
          Ops, we couldn&apos;t find that page!
        </h1>
        <div className="pt-4">
          <LinkButton href="/" className="mt-5 hover:underline">
            Back to Home
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
