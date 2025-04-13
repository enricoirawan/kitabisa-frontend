"use client";

import { useEffect } from "react";

import CampaignItem from "../campaign-item";

import HomeCampaignLoading from "./home-campaign-loading";

import { Campaign } from "@/common/interfaces";
import { showErrorToast } from "@/common/utils";
import { useGetNewestCampaigns } from "@/hooks/useGetNewestCampaigns";

const HomeCampaignList = () => {
  const { data, isPending, isError, error } = useGetNewestCampaigns();

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  if (isPending) {
    return [1, 2, 3, 4, 5].map((item, index) => {
      const length = 5;

      return (
        <HomeCampaignLoading
          key={item}
          isFirstItem={index === 0}
          isLastItem={index === length - 1}
        />
      );
    });
  }

  return data?.map((campaign: Campaign, index: number) => {
    const length = data.length;

    return (
      <CampaignItem
        key={campaign.slug}
        campaign={campaign}
        isFirstItem={index === 0}
        isLastItem={index === length - 1}
      />
    );
  });
};

export default HomeCampaignList;
