"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import search_light_inactive from "@/public/icons/search_light_inactive.svg";

const SearchBar = () => {
  const router = useRouter();

  return (
    <button
      className="w-full flex items-center gap-x-2 px-3 py-2 rounded-full bg-neutral-0 h-7"
      onClick={() => router.push("/campaign/list")}
    >
      <Image alt="Search" src={search_light_inactive} />
      <span className="text-xs text-mineshaft-30">
        Yuk terusin #Kebaikan tanpa putus!
      </span>
    </button>
  );
};

export default SearchBar;
