import { Skeleton } from "@/components/ui/skeleton";

const CampaignLoading = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="flex flex-col items-start justify-between w-full rounded-md h-[260px] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]"
        >
          <Skeleton className="w-full h-[150px] bg-gray-200" />
          <Skeleton className="mx-2 w-[150px] h-[10px] bg-gray-200" />
          <div className="w-full px-2">
            <Skeleton className="w-full h-[10px] bg-gray-200" />
          </div>
          <div className="w-full flex items-center justify-between px-2 mb-2">
            <Skeleton className="px-2 w-[150px] h-[10px] bg-gray-200" />
            <Skeleton className="px-2 w-[150px] h-[10px] bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignLoading;
