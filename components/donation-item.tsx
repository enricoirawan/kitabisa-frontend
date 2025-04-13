import Image from "next/image";

import { formatRupiah, getDistanceToNowFrom } from "@/common/utils";
import { Donation } from "@/common/interfaces";

interface DonationItemProps {
  isFirstItem?: boolean;
  isLastItem?: boolean;
  direction?: "vertical" | "horizontal";
  donation: Donation;
}

const DonationItem = ({
  isFirstItem,
  isLastItem,
  direction = "horizontal",
  donation,
}: DonationItemProps) => {
  return (
    <div
      className={`${direction === "horizontal" ? "w-72" : "w-full"} p-3 gap-y-3 overflow-clip flex flex-col flex-shrink-0 rounded-lg shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] ${isFirstItem ? "ml-2" : isLastItem ? "mr-2" : ""}`}
    >
      <div className="flex flex-row items-center justify-between gap-x-2">
        <div className="flex items-center justify-between space-x-2">
          <Image
            alt="photo"
            className="w-6 h-6 rounded-full"
            height={0}
            src={donation.user.photoProfileUrl}
            unoptimized={true}
            width={0}
          />
          <div className="">
            <p className="text-neutral-100 text-xs capitalize">
              {donation.user.username}
            </p>
            <p className="text-xs text-curelean-50 text-xs font-semibold">
              {formatRupiah(donation.nominal)}
            </p>
          </div>
        </div>
        <p className="text-xs text-curelean-50">
          &#8226; {getDistanceToNowFrom(donation.createdAt)}
        </p>
      </div>
      <p className="text-xs text-curelean-50 line-clamp-1 font-medium">
        {donation.campaign.headline}
      </p>
      <div className="flex flex-col items-start justify-start">
        <p
          className={`text-sm text-neutral-90 ${direction === "horizontal" && "line-clamp-1"}`}
        >
          {donation.message ? donation.message : "-"}
        </p>
      </div>
    </div>
  );
};

export default DonationItem;
