"use client";
import { useState, useEffect } from "react";

import { LinkButton } from "@/components/ui/LinkButton";

export default function SuccessPage() {
  // In the URL there can be such info returned by Supabase
  // /success#success_description=Review+submitted+successfully.+We+will+review+it+and+publish+it+soon.+You+can+check+it+your+dashboard.

  // I am getting the success_description and show it to the user
  // Note that this are not Search Params, but URL hash

  const [successDescription, setSuccessDescription] = useState<string | null>(
    null
  );
  useEffect(() => {
    const hash = location.hash;
    const successDescription = hash.split("success_description=")[1];
    setSuccessDescription(successDescription);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center pt-32 lg:pt-64 px-4">
      <div className="w-full max-w-[400px] text-center">
        <h1 className="text pb-5 lg:text-xl font-semibold ">Success!</h1>
        {successDescription && (
          <p>{decodeURIComponent(successDescription).replaceAll("+", " ")}</p>
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
