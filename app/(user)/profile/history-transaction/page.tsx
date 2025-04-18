"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import HeaderWithBack from "@/components/header-with-back-button";
import { useGetPaymentHistory } from "@/hooks/useGetPaymentHistory";
import { formatRupiah, showErrorToast } from "@/common/utils";

const HistoryTransaction = () => {
  const { data, isPending, isError, error, isSuccess } = useGetPaymentHistory();

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  const generateColorStatus = (paymentStatus: string) => {
    if (paymentStatus === "SUCCESS") {
      return "bg-curelean-20 text-curelean-50 border-curelean-50";
    } else if (paymentStatus === "PENDING") {
      return "bg-orange-100 border-orange-500 text-orange-500";
    } else {
      return "text-zinc-400";
    }
  };

  const generatePaymentStatus = (paymentStatus: string) => {
    if (paymentStatus === "SUCCESS") {
      return "Berhasil";
    } else if (paymentStatus === "PENDING") {
      return "Pending";
    } else {
      return "Dibatalkan";
    }
  };

  return (
    <div className="w-full flex flex-col h-screen">
      <HeaderWithBack backTo="previous" title="Riwayat Transaksi" />

      {isPending && (
        <section className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <p>Memuat data...</p>
          </div>
        </section>
      )}

      {isSuccess && !data.length && (
        <section className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <p>Duh belum ada transaksi nih, ayo donasi!</p>
          </div>
        </section>
      )}

      {isSuccess && data.length && (
        <section className="flex-1 space-y-1 overflow-y-scroll">
          {data.map((payment) => {
            return (
              <>
                <button
                  key={payment.id}
                  className="w-full flex items-start justify-between p-5 gap-x-5"
                  onClick={() => {
                    if (payment.paymentStatus === "PENDING") {
                      window.location.href = payment.redirectURL;
                    }
                  }}
                >
                  <div className="w-full flex flex-row items-start justify-start gap-x-3">
                    <Image
                      alt="banner"
                      className="h-14 w-14 rounded-md"
                      height={0}
                      src={payment.campaign.banner}
                      unoptimized={true}
                      width={0}
                    />
                    <div className="flex flex-col items-start justify-start">
                      <p className="text-sm text-start">
                        {payment.campaign.headline}
                      </p>
                      <p className="text-sm font-semibold">
                        {formatRupiah(payment.nominal)}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-xs px-3.5 py-2 rounded-lg border ${generateColorStatus(payment.paymentStatus)}`}
                  >
                    {generatePaymentStatus(payment.paymentStatus)}
                  </p>
                </button>
                <div className="w-full h-[1px] bg-gray-200" />
              </>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default HistoryTransaction;
