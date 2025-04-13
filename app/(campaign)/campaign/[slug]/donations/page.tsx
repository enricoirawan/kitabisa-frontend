import { Metadata } from "next";
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { getCampaignDetail, getCampaignDonations } from "@/lib/api";
import HeaderWithBack from "@/components/header-with-back-button";
import DonationList from "@/components/campaign-donations/donation-list";
import { getQueryClient } from "@/app/query-provider";
import { CAMPAIGN_DONATIONS_KEY } from "@/common/contants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: campaign } = await getCampaignDetail(slug ?? "");

  return {
    title: `Donasi ${campaign.headline}`,
    description: campaign.description,
  };
}

const CampaignDonationsPage = async ({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) => {
  const { slug } = await params;
  const { data: campaign } = await getCampaignDetail(slug ?? "");

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [CAMPAIGN_DONATIONS_KEY, slug],
    queryFn: () => getCampaignDonations({ slug: slug ?? "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full flex flex-col h-screen">
        <HeaderWithBack
          backTo="previous"
          title={`Donasi ${campaign.headline}`}
        />

        <div className="flex-1 w-full overflow-y-scroll pb-5">
          <DonationList />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CampaignDonationsPage;
