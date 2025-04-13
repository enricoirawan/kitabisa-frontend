"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import success_icon from "@/public/icons/success_icon.svg";
import { formatRupiah } from "@/common/utils";
import { Button } from "@/components/ui/button";
import {
  CAMPAIGN_DETAIL_KEY,
  NEWEST_DONATION_KEY,
  USER_DONATIONS_KEY,
} from "@/common/contants";
import { getQueryClient } from "@/app/query-provider";

const SuccessClientPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nominal = searchParams.get("nominal");
  const slug = searchParams.get("slug");

  useEffect(() => {
    getQueryClient().invalidateQueries({
      queryKey: [
        NEWEST_DONATION_KEY,
        slug,
        USER_DONATIONS_KEY,
        CAMPAIGN_DETAIL_KEY,
      ],
    });
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-curelean-50 px-4">
      <p className="text-2xl text-neutral-0 font-extrabold mb-10">
        Donasi Sukses
      </p>
      <Image alt="success" className="mb-5" src={success_icon} />
      <p className="font-bold text-2xl text-neutral-0 mb-10">
        {formatRupiah(Number(nominal))}
      </p>
      <p className="text-xl font-semibold text-neutral-0 text-center mb-4">
        Terima kasih atas donasimu{" "}
        <span className="text-xl font-extrabold text-neutral-0">
          #OrangBaik
        </span>
      </p>
      <Button
        className="w-full text-curelean-50 p-5 bg-neutral-0 hover:bg-neutral-0 hover:text-neutral-100"
        onClick={() => router.replace("/")}
      >
        Yuk, donasi lagi!
      </Button>
    </div>
  );
};

export default SuccessClientPage;
