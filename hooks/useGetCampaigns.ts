import { useInfiniteQuery } from "@tanstack/react-query";

import { CAMPAIGN_DETAIL_KEY, CAMPAIGNS_KEY } from "@/common/contants";
import { getCampaigns } from "@/lib/api";
import { getQueryClient } from "@/app/query-provider";

export function useGetCampaigns({
  categoryId,
  sort,
}: {
  categoryId: number | undefined;
  sort: "asc" | "desc";
}) {
  const queryClient = getQueryClient();

  return useInfiniteQuery({
    queryKey: [CAMPAIGNS_KEY, categoryId, sort],
    queryFn: ({ pageParam = 1 }) => {
      return getCampaigns({ pageParam, categoryId, sort });
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
    staleTime: 1000 * 60 * 30, // 30 menit dalam milidetik
  });
}
