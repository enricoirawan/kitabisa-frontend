"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import arrow_circle_left_active from "@/public/icons/arrow_circle_left_active.svg";

const CampaignBackButton = () => {
  const router = useRouter();

  return (
    <button
      className="rounded-full p-2 bg-curelean-50 absolute top-5 left-3"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
    >
      <Image alt="arrow" src={arrow_circle_left_active} />
    </button>
  );
};

export default CampaignBackButton;
