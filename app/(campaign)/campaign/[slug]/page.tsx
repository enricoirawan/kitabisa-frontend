import { Metadata } from "next";

import { getCampaignDetail } from "@/lib/api";
import { showErrorToast } from "@/common/utils";
import CampaignDetail from "@/components/campaign/campaign-detail";
import ErrorLayout from "@/components/error-layout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: campaign } = await getCampaignDetail(slug ?? "");

  return {
    title: campaign.headline || "Detail Kampanye",
    description: campaign.description || "Deskripsi kampanye tidak tersedia",
  };
}

export default async function Campaign({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug } = await params;
  const campaignResponse = await getCampaignDetail(slug ?? "");

  if (campaignResponse.status !== 200) {
    showErrorToast(campaignResponse.message);

    return <ErrorLayout />;
  }

  return <CampaignDetail initialData={campaignResponse} slug={slug ?? ""} />;
}
