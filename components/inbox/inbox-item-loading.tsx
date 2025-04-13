import React from "react";

import { Skeleton } from "../ui/skeleton";

const InboxItemLoading = () => {
  return (
    <div className="flex-1 space-y-2 overflow-y-scroll px-4 pt-4 pb-24">
      {[1, 2, 3, 4, 5, 6, 7].map((item) => {
        return (
          <div
            key={item}
            className="p-4 bg-curelean-10 flex items-center justify-between"
          >
            <div className="flex items-center justify-start space-x-5">
              <Skeleton className="rounded-full w-14 h-10 bg-neutral-30" />
              <div className="w-full space-y-2">
                <Skeleton className="rounded w-[200px] h-4 bg-neutral-30" />
                <Skeleton className="rounded w-[200px] h-4 bg-neutral-30" />
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-razmatazz-50" />
          </div>
        );
      })}
    </div>
  );
};

export default InboxItemLoading;
