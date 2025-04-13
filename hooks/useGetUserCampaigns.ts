import { useInfiniteQuery } from "@tanstack/react-query";

import { CAMPAIGN_DETAIL_KEY, USER_CAMPAIGNS_KEY } from "@/common/contants";
import { getUserCampaigns } from "@/lib/api";
import { getQueryClient } from "@/app/query-provider";

export function useGetUserCampaigns(username: string) {
  const queryClient = getQueryClient();

  return useInfiniteQuery({
    queryKey: [USER_CAMPAIGNS_KEY, username],
    queryFn: ({ pageParam = 1 }) => {
      return getUserCampaigns({ pageParam, username });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.meta.currentPage < lastPage.data.meta.totalPages
        ? lastPage.data.meta.currentPage + 1
        : undefined;
    },
    select: (response) => {
      response.pages.forEach((page) => {
        page.data.items.forEach((item) => {
          queryClient.setQueryData([CAMPAIGN_DETAIL_KEY, item.slug], {
            status: 200,
            message: "",
            data: item,
          });
        });
      });

      return response;
    },
    enabled: !!username,
  });
}
