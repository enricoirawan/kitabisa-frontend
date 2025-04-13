"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface GoToLoginButtonProps {
  label: string;
}

const GoToLoginButton = ({ label }: GoToLoginButtonProps) => {
  const router = useRouter();

  return (
    <Button
      className="bg-razmatazz-50 text-white hover:bg-razmatazz-60"
      onClick={() => router.push("/login")}
    >
      {label}
    </Button>
  );
};

export default GoToLoginButton;
