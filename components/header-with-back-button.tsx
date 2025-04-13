"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

import arrow_circle_left_active from "@/public/icons/arrow_circle_left_active.svg";

interface HeaderWithBackProps {
  title: string;
  backTo: "previous" | "home";
}

const HeaderWithBack = ({
  title,
  backTo = "previous",
}: HeaderWithBackProps) => {
  const router = useRouter();

  return (
    <section className="h-16 bg-curelean-50 flex items-center justify-start px-4 space-x-4">
      <Image
        alt="back"
        className="hover:cursor-pointer"
        src={arrow_circle_left_active}
        onClick={() => {
          if (backTo === "previous") {
            router.back();
          } else {
            router.replace("/");
          }
        }}
      />
      <p className="py-5 text-neutral-0 font-bold">{title}</p>
    </section>
  );
};

export default HeaderWithBack;
