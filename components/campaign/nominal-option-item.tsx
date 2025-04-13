"use client";

import Image from "next/image";

import chevron_right_active from "@/public/icons/chevron_right_active.svg";
import { formatRupiah, formatRupiahInput } from "@/common/utils";

interface NominalOptionItemProps {
  nominal: number;
  setCustomNominal: React.Dispatch<React.SetStateAction<string>>;
}

const NominalOptionItem = ({
  nominal,
  setCustomNominal,
}: NominalOptionItemProps) => {
  return (
    <button
      className="w-full cursor-pointer text-neutral-100 p-4 border border-solid border-gray-300 rounded-md font-semibold flex items-center justify-between"
      onClick={() => {
        setCustomNominal(formatRupiahInput(nominal.toString()));
      }}
    >
      <p>{formatRupiah(nominal)}</p>
      <Image
        alt="chevron_right"
        className="h-5 w-6"
        src={chevron_right_active}
      />
    </button>
  );
};

export default NominalOptionItem;
