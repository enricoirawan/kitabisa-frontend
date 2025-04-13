import { Skeleton } from "./ui/skeleton";

const CampaignItem2Loading = () => {
  return (
    <div className="space-y-5">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="rounded-md border border-neutral-10 p-3 flex items-center justify-start space-x-5"
        >
          <Skeleton className="w-24 h-24 bg-neutral-20 rounded-lg" />

          <div className="w-full space-y-3">
            <Skeleton className="w-full h-5 rounded-lg bg-neutral-20" />
            <Skeleton className="w-full h-5 rounded-lg bg-neutral-20" />
            <Skeleton className="w-full h-5 rounded-lg bg-neutral-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignItem2Loading;
