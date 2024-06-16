import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@radix-ui/react-avatar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Logo />
        <div></div>
      </div>
    </header>
  );
};

export { Header };
