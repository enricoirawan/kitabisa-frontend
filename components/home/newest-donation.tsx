"use client";

import { useEffect } from "react";

import DonationItemLoading from "../donation-item-loading";
import DonationItem from "../donation-item";

import { showErrorToast } from "@/common/utils";
import { useGetNewestDonations } from "@/hooks/useGetNewestDonations";

const NewestDonation = () => {
  const { data, isPending, isSuccess, isError, error } =
    useGetNewestDonations();

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  if (isPending) {
    return <DonationItemLoading />;
  }

  if (isSuccess) {
    return data.map((donation, index) => {
      const length = data.length;

      return (
        <DonationItem
          key={donation.id}
          donation={donation}
          isFirstItem={index === 0}
          isLastItem={index === length - 1}
        />
      );
    });
  }
};

export default NewestDonation;
