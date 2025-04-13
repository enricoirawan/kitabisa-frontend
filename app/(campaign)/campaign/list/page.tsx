import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

import HeaderWithBack from "@/components/header-with-back-button";
import { getQueryClient } from "@/app/query-provider";
import { getCampaigns } from "@/lib/api";
import { CAMPAIGNS_KEY } from "@/common/contants";
import CampaignList from "@/components/campaigns/campaign-list";
import CategoryFilter from "@/components/campaigns/category-filter";
import SortBy from "@/components/campaigns/sort-by";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Kampanye",
    description: "Donasi kapanpun dan dimanapun. Kita Bisa Kok!",
  };
}

export default async function Campaigns() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [CAMPAIGNS_KEY],
    queryFn: () =>
      getCampaigns({ pageParam: 1, sort: "desc", categoryId: undefined }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full flex flex-col h-screen">
        {/* Header */}
        <HeaderWithBack backTo="previous" title="Kampanye Donasi" />
        {/* Header */}

        {/* Filter & Sort */}
        <div className="flex items-center justify-between">
          <CategoryFilter />
          <SortBy />
        </div>
        {/* Filter & Sort */}

        {/* Campaign List */}
        <CampaignList />
        {/* Campaign List */}
      </div>
    </HydrationBoundary>
  );
}
