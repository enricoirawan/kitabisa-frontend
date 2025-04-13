"use client";

import { Skeleton } from "./ui/skeleton";

interface DonationItemLoadingProps {
  isFirstItem?: boolean;
  isLastItem?: boolean;
  direction?: "vertical" | "horizontal";
}

const DonationItemLoading = ({
  isFirstItem,
  isLastItem,
  direction,
}: DonationItemLoadingProps) => {
  return [1, 2, 3, 4, 5, 6, 7].map((item) => {
    return (
      <div
        key={item}
        className={`${direction === "horizontal" ? "w-72" : "w-full"} p-3 gap-y-3 overflow-clip flex flex-col flex-shrink-0 rounded-lg shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] ${isFirstItem ? "ml-2" : isLastItem ? "mr-2" : ""}`}
      >
        <div className="flex flex-row items-center justify-between gap-x-2">
          <div className="flex items-center justify-between space-x-2">
            <Skeleton className="w-10 h-10 rounded-full bg-neutral-30" />
            <div className="w-[100px] space-y-2">
              <Skeleton className="w-full h-3 rounded-full bg-neutral-30" />
              <Skeleton className="w-full h-3 rounded-full bg-neutral-30" />
            </div>
          </div>
          <Skeleton className="w-10 h-3 rounded-full bg-neutral-30" />
        </div>
        <Skeleton className="w-full h-3 rounded-full bg-neutral-30" />
        <Skeleton className="w-full h-14 rounded-md bg-neutral-30" />
      </div>
    );
  });
};

export default DonationItemLoading;
