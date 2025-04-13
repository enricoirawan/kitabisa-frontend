import { useQuery } from "@tanstack/react-query";

import { CAMPAIGN_DETAIL_KEY, NEWEST_CAMPAIGNS_KEY } from "@/common/contants";
import { getNewestCampaigns } from "@/lib/api";
import { getQueryClient } from "@/app/query-provider";

export function useGetNewestCampaigns() {
  const queryClient = getQueryClient();

  return useQuery({
    queryKey: [NEWEST_CAMPAIGNS_KEY],
    queryFn: getNewestCampaigns,
    select: (response) => {
      response.data.forEach((campaign) => {
        queryClient.setQueryData([CAMPAIGN_DETAIL_KEY, campaign.slug], {
          status: 200,
          message: "",
          data: campaign,
        });
      });

      return response.data;
    },
    staleTime: 1000 * 60 * 30, // 30 menit dalam milidetik
  });
}
