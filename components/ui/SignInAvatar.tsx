import Link from "next/link";
import { CircleUserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover";
import { createClientBrowser } from "@/lib/supabase/client";

const SignInAvatar = async () => {
  const supabase = createClientBrowser();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const email = user?.user_metadata?.email;
  const hasName = user?.user_metadata?.name;
  const nameArr = hasName ? user?.user_metadata?.name?.split(" ") : [];

  return (
    <>
      {user ? (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.user_metadata.picture} />
              <AvatarFallback>
                {hasName
                  ? `${nameArr[0][0]}${nameArr[1][0]}`
                  : `${email[0]}${email[1]}`.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-center justify-center">
            <span className="pb-1 font-semibold">
              {user.user_metadata.name}
            </span>
            <span className="pb-3">{user.email}</span>
            <div className="flex justify-evenly w-full">
              <Link
                className="underline hover:text-slate-900"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <a
                className="pl-1 underline text-red-800 hover:text-red-500"
                href="/api/signout"
              >
                Sign Out
              </a>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href="/signin">
          <CircleUserRound />
        </Link>
      )}
    </>
  );
};

export { SignInAvatar };
