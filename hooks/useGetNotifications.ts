import { useQuery } from "@tanstack/react-query";

import { NOTIFICATION_KEY } from "@/common/contants";
import { getNotification } from "@/lib/api";

export function useGetNotifications() {
  return useQuery({
    queryKey: [NOTIFICATION_KEY],
    queryFn: getNotification,
    select: (response) => response.data,
  });
}
