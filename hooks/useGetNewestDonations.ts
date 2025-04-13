import { useQuery } from "@tanstack/react-query";

import { NEWEST_DONATION_KEY } from "@/common/contants";
import { getNewestDonations } from "@/lib/api";

export function useGetNewestDonations() {
  return useQuery({
    queryKey: [NEWEST_DONATION_KEY],
    queryFn: getNewestDonations,
    select: (response) => response.data,
    staleTime: 1000 * 60 * 30, // 30 menit
  });
}
