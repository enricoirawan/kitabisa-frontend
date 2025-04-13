import { useMutation } from "@tanstack/react-query";

import { updateNotification } from "@/lib/api";
import { UPDATE_NOTIFICATION_KEY } from "@/common/contants";

export function useUpdateNotificationStatus() {
  return useMutation({
    mutationKey: [UPDATE_NOTIFICATION_KEY],
    mutationFn: updateNotification,
  });
}
