import React from "react";

import { Skeleton } from "../ui/skeleton";

interface HomeCampaignLoadingProps {
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

const HomeCampaignLoading = ({
  isFirstItem,
  isLastItem,
}: HomeCampaignLoadingProps) => {
  return (
    <div
      className={`h-[200px] w-[400px] overflow-clip flex flex-col justify-between flex-shrink-0 rounded-lg shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] cursor-pointer ${isFirstItem ? "ml-2" : isLastItem ? "mr-2" : ""}`}
    >
      <Skeleton className="bg-gray-300 w-full h-28" />
      <div className="px-2">
        <Skeleton className="bg-gray-300 w-full h-3" />
      </div>
      <div className="w-full flex items-center justify-between px-2 mb-2">
        <Skeleton className="bg-gray-300 w-14 h-3" />
        <Skeleton className="bg-gray-300 w-14 h-3" />
      </div>
    </div>
  );
};

export default HomeCampaignLoading;
