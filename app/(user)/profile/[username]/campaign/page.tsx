import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getServerSession } from "next-auth";

import { getQueryClient } from "@/app/query-provider";
import { USER_CAMPAIGNS_KEY } from "@/common/contants";
import HeaderWithBack from "@/components/header-with-back-button";
import CampaignList from "@/components/user-campaign/campaign-list";
import { getUserCampaigns } from "@/lib/api";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserCampaigns({
  params,
}: {
  params: Promise<{ username?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const currentSessionUsername = session?.user.name;

  const { username } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [USER_CAMPAIGNS_KEY],
    queryFn: () => getUserCampaigns({ username: username ?? "", pageParam: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full flex flex-col h-screen">
        <HeaderWithBack
          backTo="previous"
          title={`Kampanye ${username === currentSessionUsername ? "Kamu" : username}`}
        />
        <CampaignList />
      </div>
    </HydrationBoundary>
  );
}
