import Link from "next/link";
import { CircleUserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover";
import { createClientServer } from "@/lib/supabase";

const SignInButton = async () => {
  const supabase = createClientServer();
  const { data } = await supabase.auth.getUser();
  const nameArr = data.user?.user_metadata.name.split(" ") || ["N", "S"];

  return (
    <>
      {data.user ? (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={data.user.user_metadata.picture} />
              <AvatarFallback>{`${nameArr[0][0]}${nameArr[1][0]}`}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-center justify-center">
            <span className="pb-1 font-semibold">
              {data.user.user_metadata.name}
            </span>
            <span className="pb-3">{data.user.email}</span>
            <a
              className="pl-1 underline hover:text-slate-900"
              href="/api/signout"
            >
              Sign Out
            </a>
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

export { SignInButton };
