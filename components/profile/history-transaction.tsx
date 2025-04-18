import Image from "next/image";
import Link from "next/link";

import history_outline from "@/public/icons/history_outline.svg";
import chevron_right_gray from "@/public/icons/chevron_right_gray.svg";

const HistoryTransactionButton = () => {
  return (
    <Link legacyBehavior passHref href={"/profile/history-transaction"}>
      <button className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="flex items-center justify-start">
          <Image alt="edit" src={history_outline} />
          <p className="text-sm ml-5">Riwayat Transaksi</p>
        </div>
        <Image
          alt="chevron_right_inactive"
          className="w-5 h-5"
          src={chevron_right_gray}
        />
      </button>
    </Link>
  );
};

export default HistoryTransactionButton;
