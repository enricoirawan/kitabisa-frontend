"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import DonationItem from "../donation-item";
import DonationItemLoading from "../donation-item-loading";

import { showErrorToast } from "@/common/utils";
import { useGetCampaignDonations } from "@/hooks/useGetCampaignDonations";

const DonationList = () => {
  const { slug }: { slug: string } = useParams();

  const { data, isPending, isError, error, isSuccess } =
    useGetCampaignDonations(slug);

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  return (
    <div className="w-full space-y-2 px-4 pt-4">
      {isPending && <DonationItemLoading />}
      {isSuccess && data.length === 0 && (
        <p className="text-sm text-curelean-50">Belum ada donasi...</p>
      )}
      {isSuccess &&
        data.length > 0 &&
        data?.map((donation) => (
          <DonationItem
            key={donation.id}
            direction="vertical"
            donation={donation}
          />
        ))}
    </div>
  );
};

export default DonationList;
