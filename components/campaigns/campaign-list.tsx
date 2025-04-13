"use client";

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import CampaignItem2 from "../campaign-item-2";
import CampaignItem2Loading from "../campaign-item-2-loading";

import { useGetCampaigns } from "@/hooks/useGetCampaigns";
import { showErrorToast } from "@/common/utils";
import { useSortStore } from "@/store/useSortStore";
import { useFilterCategoryStore } from "@/store/useCategoryFilterStore";

const CampaignList = () => {
  const { sort } = useSortStore();
  const { category } = useFilterCategoryStore();

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
    refetch,
  } = useGetCampaigns({ categoryId: category?.id ?? undefined, sort });

  if (inView && hasNextPage) {
    fetchNextPage();
  }

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  useEffect(() => {
    refetch();
  }, [sort, category]);

  const generateCampaignList = () => {
    if (paginationData) {
      return paginationData.pages.map((page, index) => {
        return (
          <div key={index} className="space-y-3">
            {page.data.items.map((campaign) => {
              return <CampaignItem2 key={campaign.slug} campaign={campaign} />;
            })}
          </div>
        );
      });
    }
  };

  return (
    <div className="flex-1 space-y-2 overflow-y-scroll px-4 pt-4 pb-24">
      {isPending ? <CampaignItem2Loading /> : generateCampaignList()}

      <div ref={ref} className="text-center py-4">
        <p className="italic text-xs text-curelean-50">
          {isFetchingNextPage
            ? "Sedang mengambil data..."
            : hasNextPage
              ? "Scroll untuk mengambil data..."
              : "Sudah tidak ada data lagi"}
        </p>
      </div>
    </div>
  );
};

export default CampaignList;
