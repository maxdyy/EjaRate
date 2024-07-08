import Link from "next/link";
import { Logo } from "@/components/ui/icons/Logo";
import { SignInButton } from "./ui/SignInButton";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-14 max-w-screen-2xl items-center">
        <Link href="/">
          <Logo />
        </Link>
        <div>
          <SignInButton />
        </div>
      </div>
    </header>
  );
};

export { Header };
