"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import donasi_active from "@/public/icons/donasi_active.svg";
import donasi_inactive from "@/public/icons/donasi_inactive.svg";
import profile_active from "@/public/icons/profile_active.svg";
import profile_inactive from "@/public/icons/profile_inactive.svg";
import inbox_active from "@/public/icons/inbox_active.svg";
import inbox_inactive from "@/public/icons/inbox_inactive.svg";
import donasi_saya_active from "@/public/icons/donasi_saya_active.svg";
import donasi_saya_inactive from "@/public/icons/donasi_saya_inactive.svg";
import { useGetNotifications } from "@/hooks/useGetNotifications";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isSuccess } = useGetNotifications();

  return (
    <div className="py-4 px-6 w-full bg-neutral-0 absolute bottom-0 right-0 left-0 z-10 flex items-center justify-between rounded-t-lg border-t-1">
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image
          alt="donasi"
          src={pathname === "/" ? donasi_active : donasi_inactive}
        />
        <p
          className={`${pathname === "/" ? "text-neutral-90" : "text-neutral-50"} text-sm mt-1`}
        >
          Donasi
        </p>
      </button>
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => {
          router.push("/my-donations");
        }}
      >
        <Image
          alt="donasi_saya"
          src={
            pathname === "/my-donations"
              ? donasi_saya_active
              : donasi_saya_inactive
          }
        />
        <p
          className={`${pathname === "/my-donations" ? "text-neutral-90" : "text-neutral-50"} text-sm mt-1`}
        >
          Donasi Saya
        </p>
      </button>
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => {
          router.push("/inbox");
        }}
      >
        <div className="relative">
          <Image
            alt="inbox"
            src={pathname === "/inbox" ? inbox_active : inbox_inactive}
          />
          {isSuccess &&
            data.some(
              (notification) => notification.isAlreadyRead === false,
            ) && (
              <div className="w-3 h-3 rounded-full bg-razmatazz-50 absolute top-0 right-0" />
            )}
        </div>
        <p
          className={`${pathname === "/inbox" ? "text-neutral-90" : "text-neutral-50"} text-sm mt-1`}
        >
          Inbox
        </p>
      </button>
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => {
          router.push("/profile");
        }}
      >
        <Image
          alt="profile"
          src={pathname === "/profile" ? profile_active : profile_inactive}
        />
        <p
          className={`${pathname === "/profile" ? "text-neutral-90" : "text-neutral-50"} text-sm mt-1`}
        >
          Profile
        </p>
      </button>
    </div>
  );
};

export default Navbar;
