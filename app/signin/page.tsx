import { redirect } from "next/navigation";

import { Card, CardContent } from "@/components/ui/Card";
import { GoogleAuthButton } from "@/components/ui/GoogleAuthButton";
import { Separator } from "@/components/ui/Separator";
import { EmailAuth } from "@/components/ui/EmailAuth";

import { createClientServer } from "@/lib/supabase/server";
import { googleAuthAction, emailAuthAction } from "@/app/signin/actions";

export default async function SignInPage() {
  const supabase = createClientServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center pt-32 lg:pt-64 px-4">
      <div className="w-full max-w-[380px]">
        <h1 className="text pb-5 lg:text-xl font-semibold text-center">
          Welcome Back!
        </h1>
        <Card>
          <CardContent>
            <div className="pt-6">
              <GoogleAuthButton action={googleAuthAction} />
            </div>
            <div className="py-6 flex items-center">
              <Separator className="shrink grow" />
              <span className="shrink-0 px-2 text-sm text-gray-700">
                Or continue with email
              </span>
              <Separator className="shrink grow" />
            </div>
            <EmailAuth action={emailAuthAction} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
