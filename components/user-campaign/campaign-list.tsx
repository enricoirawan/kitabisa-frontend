"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "next/navigation";

import CampaignItem from "../campaign-item";

import CampaignLoading from "./campaign-loading";

import { useGetUserCampaigns } from "@/hooks/useGetUserCampaigns";
import { showErrorToast } from "@/common/utils";

const CampaignList = () => {
  const { username }: { username: string } = useParams();

  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  const {
    data: paginationData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useGetUserCampaigns(username);

  if (inView && hasNextPage) {
    fetchNextPage();
  }

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  const generateCampaignList = () => {
    if (paginationData) {
      return paginationData.pages.map((page, index) => {
        return (
          <div key={index} className="space-y-3">
            {page.data.items.map((campaign) => {
              return (
                <CampaignItem
                  key={campaign.slug}
                  campaign={campaign}
                  direction="vertical"
                />
              );
            })}
          </div>
        );
      });
    }

    return <></>;
  };

  return (
    <section className="flex-1 space-y-2 overflow-y-scroll px-4 pt-4 pb-24">
      {isPending ? <CampaignLoading /> : generateCampaignList()}

      <div ref={ref} className="text-center py-4">
        <p className="italic text-xs text-curelean-50">
          {isFetchingNextPage
            ? "Sedang mengambil data..."
            : hasNextPage
              ? "Scroll untuk mengambil data..."
              : "Sudah tidak ada data lagi"}
        </p>
      </div>
    </section>
  );
};

export default CampaignList;
