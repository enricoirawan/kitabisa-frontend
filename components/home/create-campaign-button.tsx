"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

const CreateCampaignButton = () => {
  const router = useRouter();

  return (
    <Button
      className={`${cn("text-neutral-0 bg-curelean-50 hover:bg-curelean-70", "rounded-[4px]")}`}
      onClick={() => router.push("/create-campaign")}
    >
      Buat Kampanye Sekarang
    </Button>
  );
};

export default CreateCampaignButton;
