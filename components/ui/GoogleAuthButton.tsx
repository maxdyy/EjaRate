import { GoogleIcon } from "@/components/ui/icons/GoogleIcon";

interface ButtonProps {
  action: () => void;
}

const GoogleAuthButton = ({ action }: ButtonProps) => {
  return (
    <form action={action}>
      <button className="w-full flex items-center justify-center p-2 border rounded-md">
        <GoogleIcon className="w-[30px] h-[30px]" />
        <span className="pl-2">Continue with Google</span>
      </button>
    </form>
  );
};

export { GoogleAuthButton };
