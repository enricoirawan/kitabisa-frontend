"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import InboxItemLoading from "./inbox-item-loading";

import promote_active from "@/public/icons/promote_active.svg";
import { getDistanceToNowFrom, showErrorToast } from "@/common/utils";
import { useGetNotifications } from "@/hooks/useGetNotifications";
import { useUpdateNotificationStatus } from "@/hooks/useUpdateNotificationStatus";
import { getQueryClient } from "@/app/query-provider";
import { NOTIFICATION_KEY } from "@/common/contants";

const InboxItem = () => {
  const router = useRouter();
  const { data, isPending, isError, error, isSuccess } = useGetNotifications();

  const { mutate, isSuccess: isUpdateNotificationStatusSuccess } =
    useUpdateNotificationStatus();

  useEffect(() => {
    if (isUpdateNotificationStatusSuccess) {
      getQueryClient().invalidateQueries({ queryKey: [NOTIFICATION_KEY] });
    }
  }, [isUpdateNotificationStatusSuccess]);

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  if (isPending) {
    return <InboxItemLoading />;
  }

  if (isSuccess && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image alt="notification" height={40} src={promote_active} />
          <p className="text-lg text-curelean-50 font-medium">
            Duh, belum ada notifikasi nih, ditunggu aja ya!
          </p>
        </div>
      </div>
    );
  }

  if (isSuccess && data.length > 0)
    return (
      <section className="flex-1 space-y-2 overflow-y-scroll px-4 pt-4 pb-24">
        {data.map((notification) => {
          return (
            <button
              key={notification.id}
              className={`w-full ${!notification.isAlreadyRead && "bg-curelean-10"} p-4 flex items-center justify-between hover:cursor-pointer rounded-md shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]`}
              onClick={() => {
                mutate(notification.id);
                router.push(`/campaign/${notification.campaign.slug}`);
              }}
            >
              <div className="flex items-center justify-start space-x-5">
                <Image
                  alt="photo"
                  className="rounded-full w-8 h-8"
                  height={0}
                  src={notification.campaign.Donation[0].user.photoProfileUrl}
                  unoptimized={true}
                  width={0}
                />
                <div className="flex flex-col items-start justify-start">
                  <p className="text-neutral-100 text-sm text-start capitalize">
                    {notification.message}
                  </p>
                  <p className="text-xs text-neutral-50">
                    {getDistanceToNowFrom(notification.createdAt)}
                  </p>
                </div>
              </div>
              {!notification.isAlreadyRead && (
                <div className="w-2 h-2 rounded-full bg-razmatazz-50" />
              )}
            </button>
          );
        })}
      </section>
    );
};

export default InboxItem;
