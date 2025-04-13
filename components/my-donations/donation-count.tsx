"use client";

import { useEffect } from "react";
import Image from "next/image";

import { Skeleton } from "../ui/skeleton";

import donation_rp from "@/public/icons/donation_rp.svg";
import { showErrorToast } from "@/common/utils";
import { useGetUserDonations } from "@/hooks/useGetUserDonations";

const DonationCount = () => {
  const { data, isPending, isError, error, isSuccess } = useGetUserDonations();

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  if (isPending) {
    return <Skeleton className="w-[250px] h-3 rounded-md bg-neutral-20" />;
  }

  if (isSuccess)
    return (
      <div className="flex items-center justify-start space-x-2">
        <Image alt="" className="" src={donation_rp} />
        <p className="text-sm text-neutral-100">
          <span className="font-semibold">{data.donationsCount}x</span>{" "}
          Berdonasi
        </p>
      </div>
    );
};

export default DonationCount;
