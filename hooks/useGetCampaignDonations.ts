import { useQuery } from "@tanstack/react-query";

import { CAMPAIGN_DONATIONS_KEY } from "@/common/contants";
import { getCampaignDonations } from "@/lib/api";

export function useGetCampaignDonations(slug: string) {
  return useQuery({
    queryKey: [CAMPAIGN_DONATIONS_KEY, slug],
    queryFn: () => getCampaignDonations({ slug }),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 15, // 15 menit
  });
}
