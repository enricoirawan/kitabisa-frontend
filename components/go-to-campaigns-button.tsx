"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import arrow_circle_right_active from "@/public/icons/arrow_circle_right_active.svg";

const GoToCampaignsButton = () => {
  const router = useRouter();

  return (
    <Image
      alt="arrow_circle_right_active"
      className="hover:cursor-pointer"
      src={arrow_circle_right_active}
      onClick={() => router.push("/campaign/list")}
    />
  );
};

export default GoToCampaignsButton;
