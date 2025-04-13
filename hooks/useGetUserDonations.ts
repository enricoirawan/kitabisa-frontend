import { useQuery } from "@tanstack/react-query";

import { USER_DONATIONS_KEY } from "@/common/contants";
import { getUserDonations } from "@/lib/api";

export function useGetUserDonations() {
  return useQuery({
    queryKey: [USER_DONATIONS_KEY],
    queryFn: getUserDonations,
    select: (response) => response.data,
  });
}
