import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import getAuthCookie from "./actions/get-auth-cookie";
import { getQueryClient } from "./query-provider";

import {
  BaseResponse,
  Campaign,
  SocketCampaignUpdated,
} from "@/common/interfaces";
import { CAMPAIGN_DETAIL_KEY, NOTIFICATION_KEY } from "@/common/contants";

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [authCookie, setAuthCookie] = useState<RequestCookie | undefined>();

  useEffect(() => {
    getAuthCookie()
      .then((jwt) => {
        setAuthCookie(jwt);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      auth: { Authentication: authCookie },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [authCookie]);

  useEffect(() => {
    socket?.on("campaign-updated", async (data: SocketCampaignUpdated) => {
      queryClient.setQueryData<BaseResponse<Campaign>>(
        [CAMPAIGN_DETAIL_KEY, data.campaignSlug],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              currentFunding: oldData.data.currentFunding + data.amount,
            },
          };
        },
      );
    });

    socket?.on("notification", (message: string) => {
      // showSuccessToast(message);
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATION_KEY],
      });
    });

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
