"use client";

import { LinkButton } from "@/components/ui/LinkButton";

export default function ErrorPage() {
  // In the URL there can be such info returned by Supabase
  // /error#error=access_denied&error_code=403&error_description=Email+link+is+invalid+or+has+expired

  // I am getting the error_description and show it to the user
  // Note that this are not Search Params, but URL hash

  const hash = location.hash;
  const errorDescription = hash.split("error_description=")[1];

  return (
    <div className="flex flex-col justify-center items-center pt-32 lg:pt-64 px-4">
      <div className="w-full max-w-[380px] text-center">
        <h1 className="text pb-5 lg:text-xl font-semibold ">
          Ops, something went wrong!
        </h1>
        {errorDescription && (
          <p>{decodeURIComponent(errorDescription).replaceAll("+", " ")}</p>
        )}
        <div className="pt-4">
          <LinkButton href="/" className="mt-5 hover:underline">
            Back to Home
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
