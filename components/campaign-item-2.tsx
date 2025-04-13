import Image from "next/image";
import Link from "next/link";

import verified_active from "@/public/icons/verified_active.svg";
import { Progress } from "@/components/ui/progress";
import { Campaign } from "@/common/interfaces";
import { formatRupiah, getRemainDaysFrom } from "@/common/utils";

interface CampaignItem2Props {
  campaign: Campaign;
}

const CampaignItem2 = ({ campaign }: CampaignItem2Props) => {
  return (
    <Link legacyBehavior passHref href={`/campaign/${campaign.slug}`}>
      <div className="rounded-md border border-neutral-10 p-3 flex items-center justify-start space-x-5 hover:cursor-pointer">
        {/* Campaign Banner */}
        <Image
          alt="banner"
          className="w-24 h-24 rounded-lg brightness-75"
          height={0}
          src={campaign.banner}
          unoptimized={true}
          width={0}
        />
        {/* Campaign Banner */}

        {/* Info */}
        <div className="w-full flex flex-col items-start justify-start space-y-2.5">
          <div className="flex items-center justify-center space-x-2">
            <p className="font-semibold text-sm capitalize">
              {campaign.user.username}
            </p>
            <Image alt="verif" className="h-5 w-5" src={verified_active} />
          </div>

          <p className="text-sm line-clamp-1">{campaign.headline}</p>

          <Progress
            className="bg-neutral-20 h-1 w-full"
            max={100}
            value={(campaign.currentFunding / campaign.targetFunding) * 100}
          />

          <div className="w-full flex items-center justify-between text-sm">
            <p className="font-semibold">
              {formatRupiah(campaign.targetFunding)}
            </p>
            <p className="text-neutral-50">
              {getRemainDaysFrom(campaign.dueTo)} hari lagi
            </p>
          </div>
        </div>
        {/* Info */}
      </div>
    </Link>
  );
};

export default CampaignItem2;
