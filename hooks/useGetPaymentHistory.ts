import { useQuery } from "@tanstack/react-query";

import { PAYMENT_HISTORY_KEY } from "@/common/contants";
import { getPaymentHistory } from "@/lib/api";

export function useGetPaymentHistory() {
  return useQuery({
    queryKey: [PAYMENT_HISTORY_KEY],
    queryFn: getPaymentHistory,
    select: (response) => response.data,
  });
}
