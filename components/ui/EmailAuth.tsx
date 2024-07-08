import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface EmailAuthProps {
  action: () => void;
}

const EmailAuth = ({ action }: EmailAuthProps) => {
  return (
    <form action={action}>
      <Input type="email" placeholder="Email" />
      <div className="w-full pt-3">
        <Button className="w-full">Continue</Button>
      </div>
    </form>
  );
};

export { EmailAuth };
