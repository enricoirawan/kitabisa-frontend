"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Skeleton } from "../ui/skeleton";

import chevron_right_inactive from "@/public/icons/chevron_right_inactive.svg";
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
    return <Skeleton className="w-[200px] h-3 rounded-md bg-neutral-20" />;
  }

  if (isSuccess)
    return (
      <>
        <p className="text-neutral-0 text-sm">
          <span className="font-bold">{data.donationsCount} Donasimu</span>{" "}
          telah membantu banyak orang
        </p>
        <Link legacyBehavior passHref href="/my-donations">
          <div className="flex items-center justify-start text-sm text-neutral-0 hover:cursor-pointer">
            <p className="mr-1">Lihat Dampak donasi Mu</p>
            <Image alt="chevron" src={chevron_right_inactive} />
          </div>
        </Link>
      </>
    );
};

export default DonationCount;
