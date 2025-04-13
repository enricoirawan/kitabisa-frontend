import { useQuery } from "@tanstack/react-query";

import { CAMPAIGN_DETAIL_KEY } from "@/common/contants";
import { getCampaignDetail } from "@/lib/api";
import { BaseResponse, Campaign } from "@/common/interfaces";
import { getQueryClient } from "@/app/query-provider";

export function useGetCampaignDetail(
  slug: string,
  campaignResponse: BaseResponse<Campaign>,
) {
  const queryClient = getQueryClient();

  return useQuery({
    queryKey: [CAMPAIGN_DETAIL_KEY, slug],
    queryFn: () => getCampaignDetail(slug),
    select: (response) => response.data,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    initialData: () => {
      const data = queryClient.getQueryData<BaseResponse<Campaign>>([
        CAMPAIGN_DETAIL_KEY,
        slug,
      ]);

      if (data) {
        return data;
      }

      return campaignResponse;
    },
    staleTime: 0,
  });
}
