"use client";

import { useMutationState } from "@tanstack/react-query";

import { CREATE_CAMPAIGN_KEY } from "@/common/contants";

interface CreateCampaignButtonProps {}

const CreateCampaignButton = ({}: CreateCampaignButtonProps) => {
  const isPendingArray = useMutationState({
    filters: { mutationKey: [CREATE_CAMPAIGN_KEY] },
    select: (mutation) => mutation.state.status === "pending",
  });
  const isPending = isPendingArray.some((status) => status);

  return (
    <div className="absolute bottom-0 right-0 left-0 bg-neutral-0 w-full p-4">
      <button
        className="w-full text-center bg-razmatazz-50 rounded-md p-3 text-white shadow-[0px_-4px_27px_0px_rgba(0,_0,_0,_0.1)]"
        disabled={isPending}
        form="create-campaign-form"
        type="submit"
      >
        {isPending ? "Sedang memproses...." : "Buat Kampanye"}
      </button>
    </div>
  );
};

export default CreateCampaignButton;
