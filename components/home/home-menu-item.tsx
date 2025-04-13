"use client";

import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/navigation";

interface HomeMenuItemProps {
  src: string | StaticImport;
  label: string;
}

const HomeMenuItem = ({ src, label }: HomeMenuItemProps) => {
  const router = useRouter();

  return (
    <button
      className="flex flex-col items-center justify-center gap-y-2"
      onClick={() => router.push("/campaign/list")}
    >
      <Image alt={label} src={src} />
      <p className="text-neutral-100 text-sm">{label}</p>
    </button>
  );
};

export default HomeMenuItem;
