import Image from "next/image";
import Link from "next/link";

import { Progress } from "./ui/progress";

import { Campaign } from "@/common/interfaces";
import { getRemainDaysFrom, formatRupiah } from "@/common/utils";

interface CampaignItemProps {
  isFirstItem?: boolean;
  isLastItem?: boolean;
  direction?: "vertical" | "horizontal";
  campaign: Campaign;
}

const CampaignItem = ({
  isFirstItem,
  isLastItem,
  direction = "horizontal",
  campaign,
}: CampaignItemProps) => {
  return (
    <Link legacyBehavior passHref href={`/campaign/${campaign.slug}`}>
      <div
        className={`${direction === "horizontal" ? "w-72" : "w-100"} h-[270px] overflow-clip flex flex-col justify-between flex-shrink-0 rounded-lg shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] cursor-pointer ${isFirstItem ? "ml-2" : isLastItem ? "mr-2" : ""}`}
      >
        <div className="relative">
          <Image
            alt="image"
            className="brightness-75 w-full h-44"
            height={0}
            src={campaign.banner}
            unoptimized={true}
            width={0}
          />
          <p className="absolute bottom-2 left-3 text-sm font-semibold text-neutral-0">
            {campaign.user.username}
          </p>
        </div>
        <div className="p-3 bg-neutral-0 flex flex-col items-start justify-start gap-y-2">
          <p className="text-neutral-100 font-semibold line-clamp-1">
            {campaign.headline}
          </p>
          <Progress
            className="bg-neutral-20 w-full h-1"
            max={100}
            value={(campaign.currentFunding / campaign.targetFunding) * 100}
          />
          <div className="w-full flex items-center justify-between">
            <p className="text-neutral-100 text-sm">
              {formatRupiah(campaign.targetFunding)}
            </p>
            <p className="text-neutral-50 text-sm">
              {getRemainDaysFrom(campaign.dueTo)} hari lagi
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignItem;
