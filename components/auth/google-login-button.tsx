"use client";

import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

import google from "@/public/icons/google.svg";

const GoogleLoginButton = () => {
  return (
    <button
      className="w-full px-6 py-2 flex items-center justify-between border border-davy rounded-md"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <Image alt="google" src={google} />
      <p className="text-sm">Masuk/Daftar dengan Google</p>
      <div />
    </button>
  );
};

export default GoogleLoginButton;
