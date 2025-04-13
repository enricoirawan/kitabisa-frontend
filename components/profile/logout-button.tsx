"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

import logout_outline from "@/public/icons/logout_outline.svg";
import { deleteAuthCookie } from "@/app/actions/delete-auth-cookie";

const LogoutButton = () => {
  return (
    <button
      className="flex items-center justify-start px-3 pt-3 pb-2"
      onClick={async () => {
        deleteAuthCookie();
        signOut({ callbackUrl: "/login" });
      }}
    >
      <Image alt="logout" src={logout_outline} />
      <p className="text-sm ml-5">Keluar</p>
    </button>
  );
};

export default LogoutButton;
