"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface EmailAuthProps {
  action: (formData: FormData) => void;
}

const EmailAuth = ({ action }: EmailAuthProps) => {
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (emailSent && countdown > 0) {
      interval = setInterval(() => {
        if (countdown === 1) {
          setEmailSent(false);
        }
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [emailSent, countdown]);

  const submitForm = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    action(formData);
    setEmailSent(true);
    setCountdown(30);
  };

  return (
    <form action={action} ref={formRef}>
      <Input id="email" name="email" type="email" placeholder="Email" />
      <div className="w-full pt-3">
        <Button className="w-full" disabled={emailSent} onClick={submitForm}>
          {emailSent ? `Resend in ${countdown} seconds` : "Send Email"}
        </Button>
      </div>
      {emailSent && countdown > 0 && (
        <div className="pt-2 text-sm flex">
          <span>Please check your email.</span>
        </div>
      )}
    </form>
  );
};

export { EmailAuth };
