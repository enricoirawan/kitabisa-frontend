"use client";

import Image from "next/image";

import sortby_desc from "@/public/icons/sortby_desc.svg";
import sortby_asc from "@/public/icons/sortby_asc.svg";
import { useSortStore } from "@/store/useSortStore";

const SortBy = () => {
  const { sort, setSort } = useSortStore();

  return (
    <button
      className="w-full flex items-center justify-center space-x-2  p-2 border-b-2 border-neutral-20"
      onClick={() => setSort()}
    >
      {sort === "asc" ? (
        <Image alt="sort" src={sortby_asc} />
      ) : (
        <Image alt="sort" src={sortby_desc} />
      )}
      <p className="text-sm font-semibold text-neutral-100">Urutkan</p>
    </button>
  );
};

export default SortBy;
