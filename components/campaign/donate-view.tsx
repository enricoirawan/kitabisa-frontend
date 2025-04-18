"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { Button } from "../ui/button";

import NominalOptionItem from "./nominal-option-item";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  formatRupiahInput,
  getRemainDaysFrom,
  showErrorToast,
} from "@/common/utils";
import { useGetCampaignDetail } from "@/hooks/useGetCampaignDetail";
import { payment } from "@/lib/api";
import { BaseResponse, Campaign } from "@/common/interfaces";

interface DonateViewProps {
  initialData: BaseResponse<Campaign>;
}

const DonateView = ({ initialData }: DonateViewProps) => {
  const session = useSession();

  const { slug }: { slug: string } = useParams();
  const { data, isPending, isSuccess } = useGetCampaignDetail(
    slug,
    initialData,
  );

  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [customNominal, setCustomNominal] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<
    "request_payment" | "loading_redirect" | ""
  >("");

  useEffect(() => {
    if (isSuccess) {
      const dueDate = data.dueTo;
      const remainDays = getRemainDaysFrom(dueDate);

      if (remainDays < 0) setDisabledButton(true);
    }
  }, [isSuccess]);

  const doPayment = async () => {
    try {
      setStatus("request_payment");

      if (!data) {
        showErrorToast(
          "terjadi kesalahan, silahkan coba lagi dalam beberapa saat",
        );

        return;
      }

      const response = await payment({
        campaignId: Number(data.id),
        slug: data.slug,
        message: message,
        nominal: Number(customNominal.replace(/\./g, "")),
      });

      if (response.status === 201) {
        const paymentResult = response.data;

        setStatus("loading_redirect");
        window.location.href = paymentResult.redirectURL;
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      setStatus("");
    }
  };

  const generateButtonLabelByStatus = () => {
    if (isPending) {
      return "Loading...";
    } else if (status === "request_payment") {
      return "Memroses pembayaran...";
    } else if (status === "loading_redirect") {
      return "Mengarahkan ke halaman pembayaran...";
    } else {
      return "Lanjut Pembayaran";
    }
  };

  return (
    <div className="w-full md:w-[450px] md:mx-auto bg-neutral-0 absolute bottom-0 right-0 left-0 z-10 px-4 pb-4">
      <Button
        className={`rounded-md ${isPending || disabledButton ? "bg-neutral-30" : "bg-razmatazz-50 hover:bg-razmatazz-60"} text-neutral-0 w-full flex p-4 font-semibold h-11`}
        disabled={isPending && disabledButton}
        onClick={() => {
          if (session.status === "unauthenticated") {
            signIn(undefined, {
              callbackUrl: `/campaign/${slug}`,
              redirect: true,
            });
          } else {
            setOpen(true);
          }
        }}
      >
        {isPending ? "Loading..." : "Donasi Sekarang!"}
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          className="w-full md:w-[450px] mx-auto rounded-t-md bg-neutral-0 px-4 space-y-3 pb-4 overflow-y-scroll max-h-screen"
          side="bottom"
        >
          <SheetTitle className="text-center">
            <p>Pilih Nominal Donasi</p>
          </SheetTitle>
          {/* Drawer Body */}
          {/* Nominal Options */}
          {[10000, 20000, 50000, 100000].map((nominal: number, index) => {
            return (
              <NominalOptionItem
                key={index}
                nominal={nominal}
                setCustomNominal={setCustomNominal}
              />
            );
          })}
          {/* Nominal Options */}
          {/* Nominal Input */}
          <div className="text-neutral-100 p-4 border border-solid border-gray-300 rounded-md space-y-3">
            <p className="text-neutral-100">Nominal Donasi Lainnya</p>
            <div className="border border-solid border-gray-300 rounded-md p-4 flex items-center justify-between">
              <p className="text-2xl font-semibold text-neutral-100">Rp</p>
              <input
                className="bg-neutral-0 text-2xl font-semibold w-full text-end focus:outline-none focus:ring-0"
                placeholder="0"
                type="text"
                value={customNominal}
                onChange={(e) => {
                  const rawValue = e.target.value;

                  setCustomNominal(formatRupiahInput(rawValue));
                }}
              />
            </div>
            <p className="text-xs text-neutral-40">
              Minimal donasi sebesar Rp1.000
            </p>
          </div>
          {/* Nominal Input */}
          {/* Input Pesan */}
          <div className="text-neutral-100 p-4 border border-solid border-gray-300 rounded-md space-y-3">
            <p>
              Pesan{" "}
              <span className="text-neutral-40 text-xs italic">(opsional)</span>
            </p>
            <input
              className="w-full border border-solid border-gray-300 rounded-md p-4 focus:outline-none focus:ring-0"
              placeholder="Sampaikan doa baik kamu..."
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {/* Input Pesan */}
          {/* Drawer Body */}
          <Button
            className="bg-razmatazz-50 hover:bg-razmatazz-80 w-full text-neutral-0 rounded-md h-11 mb-10"
            disabled={
              isPending ||
              status === "request_payment" ||
              status === "loading_redirect"
            }
            onClick={() => {
              if (customNominal.length > 0) {
                doPayment();
              } else {
                setOpen(false);
              }
            }}
          >
            {generateButtonLabelByStatus()}
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DonateView;
