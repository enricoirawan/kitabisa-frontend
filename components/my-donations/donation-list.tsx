"use client";

import { useEffect } from "react";

import DonationItemLoading from "../donation-item-loading";
import DonationItem from "../donation-item";

import { showErrorToast } from "@/common/utils";
import { useGetUserDonations } from "@/hooks/useGetUserDonations";

const DonationList = () => {
  const { data, isPending, isError, error, isSuccess } = useGetUserDonations();

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  if (isPending) {
    return <DonationItemLoading />;
  }

  if (isSuccess)
    return data.donations.map((donation) => {
      return (
        <DonationItem
          key={donation.id}
          direction="vertical"
          donation={donation}
        />
      );
    });
};

export default DonationList;
