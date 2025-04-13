"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Loading from "../loading";
import Divider from "../divider";
import ErrorLayout from "../error-layout";
import { Progress } from "../ui/progress";

import CampaignBackButton from "./back-button";
import DonateView from "./donate-view";

import share from "@/public/icons/share.svg";
import option_inactive from "@/public/icons/option_inactive.svg";
import love_inactive from "@/public/icons/love_inactive.svg";
import love_box from "@/public/icons/love_box.svg";
import kabar_terbaru from "@/public/icons/kabar_terbaru.svg";
import withdrawal_outline from "@/public/icons/withdrawal_outline.svg";
import verified_active from "@/public/icons/verified_active.svg";
import { useGetCampaignDetail } from "@/hooks/useGetCampaignDetail";
import {
  formatRupiah,
  getRemainDaysFrom,
  showErrorToast,
} from "@/common/utils";
import { BaseResponse, Campaign } from "@/common/interfaces";
import { useSocket } from "@/app/socket-provider";

interface CampaignDetailProps {
  initialData: BaseResponse<Campaign>;
  slug: string;
}

const CampaignDetail = ({ initialData, slug }: CampaignDetailProps) => {
  const socket = useSocket();

  const {
    data: campaign,
    isPending,
    isSuccess,
    isError,
    error,
  } = useGetCampaignDetail(slug, initialData);

  useEffect(() => {
    if (socket) {
      socket.emit("join-campaign", slug);
    }
  }, [socket, slug]);

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLayout />;
  }

  if (isSuccess) {
    return (
      <>
        <div className="text-neutral-100 w-full h-screen overflow-y-scroll scrollbar-hide">
          {/* Header */}
          <section className="relative h-56 mb-5">
            <Image
              alt="banner"
              className="w-full h-full"
              height={0}
              src={campaign.banner}
              unoptimized={true}
              width={0}
            />
            <CampaignBackButton />

            <div className="absolute top-5 right-5 flex items-center justify-center gap-x-3">
              <div className="rounded-full p-2 bg-curelean-50">
                <Image alt="share" src={share} />
              </div>
              <div className="rounded-full p-2 bg-curelean-50">
                <Image alt="option" src={option_inactive} />
              </div>
            </div>

            <div className="rounded-full p-2 bg-neutral-0 absolute -bottom-5 right-4 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
              <Image alt="love" className="" src={love_inactive} />
            </div>
          </section>
          {/* Header */}

          {/* Campaign Headline */}
          <section className="px-4 space-y-1.5 mb-4">
            <p className="font-semibold text-lg">{campaign.headline}</p>
            <p className="font-semibold text-curelean-50">
              {formatRupiah(campaign.targetFunding)}
            </p>
            <div className="flex flex-col items-start justify-start">
              <div className="w-full flex items-center justify-between mb-1">
                <p className="text-sm text-neutral-80">
                  Terkumpul{" "}
                  <span className="font-semibold">
                    {formatRupiah(campaign.currentFunding)}
                  </span>
                </p>
                {getRemainDaysFrom(campaign.dueTo) < 0 ? (
                  <p className="text-sm text-neutral-50">
                    Kampanye sudah berakhir
                  </p>
                ) : (
                  <p className="text-sm text-neutral-80">
                    {getRemainDaysFrom(campaign.dueTo)}{" "}
                    <span className="text-neutral-50">hari lagi</span>
                  </p>
                )}
              </div>
              <Progress
                className="bg-neutral-20 h-1 w-full"
                max={100}
                value={(campaign.currentFunding / campaign.targetFunding) * 100}
              />
            </div>
          </section>
          {/* Campaign Headline */}

          <div className="w-full flex items-center justify-between px-4 mb-3">
            <Link
              legacyBehavior
              passHref
              href={`/campaign/${campaign.slug}/donations`}
            >
              <div className="w-full flex flex-col items-center justify-center border-r border-neutral-30 hover:cursor-pointer">
                <Image alt="donasi" src={love_box} />
                <p className="text-sm">Donasi</p>
              </div>
            </Link>
            <div className="w-full flex flex-col items-center justify-center border-r border-neutral-30">
              <Image alt="kabar" src={kabar_terbaru} />
              <p className="text-sm">Kabar Terbaru</p>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <Image alt="pencairan" src={withdrawal_outline} />
              <p className="text-sm">Pencairan Dana</p>
            </div>
          </div>

          <Divider />

          <Link
            legacyBehavior
            passHref
            href={`/profile/${campaign.user.username}/campaign`}
          >
            <section className="mt-4 px-4 pb-24 hover:cursor-pointer">
              {/* User Info */}
              <section>
                <p className="text-neutral-100 font-semibold mb-2">
                  Informasi Penggalang Dana
                </p>
                <div className="rounded-md p-3 border border-solid border-neutral-10 flex flex-col items-start justify-start">
                  <p className="text-sm font-semibold text-neutral-80">
                    Penggalang Dana
                  </p>
                  <div className="flex flex-row items-start justify-start gap-x-3 mt-2">
                    <Image
                      unoptimized
                      alt="photo"
                      className="w-8 h-8 rounded-full"
                      height={0}
                      src={campaign.user.photoProfileUrl}
                      width={0}
                    />
                    <div>
                      <div className="flex items-center justify-start gap-x-1">
                        <p className="text-neutral-100 text-sm capitalize">
                          {campaign.user.username}
                        </p>
                        <Image
                          alt="verfied"
                          className="w-4 h-4"
                          src={verified_active}
                        />
                      </div>

                      <p className="text-neutral-50 text-xs">
                        Identitas Terverifikasi
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              {/* User Info */}

              <div className="w-full h-[1px] bg-neutral-100 mt-5 mb-3" />

              {/* Deskripsi Campaign */}
              <section>
                <p className="text-neutral-100 font-semibold mb-2">
                  Deskripsi Galang Dana
                </p>
                <p>{campaign.description}</p>
              </section>
              {/* Deskripsi Campaign */}
            </section>
          </Link>

          {/* User Info */}
        </div>
        <DonateView initialData={initialData} />
      </>
    );
  }
};

export default CampaignDetail;
