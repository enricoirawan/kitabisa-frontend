import { useMutation } from "@tanstack/react-query";

import { createCampaign } from "@/lib/api";
import { CREATE_CAMPAIGN_KEY } from "@/common/contants";

export function useCreateCampaign() {
  return useMutation({
    mutationKey: [CREATE_CAMPAIGN_KEY],
    mutationFn: createCampaign,
  });
}
