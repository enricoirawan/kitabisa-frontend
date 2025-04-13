import "@/styles/globals.css";
import { Metadata } from "next";

import { siteConfig } from "@/common/site";
import GoogleLoginButton from "@/components/auth/google-login-button";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      <div className="w-full mt-5 px-4">
        <p className="text-neutral-100 text-center font-semibold mb-3">
          Atau Lebih Cepat
        </p>
        <GoogleLoginButton />
      </div>
    </>
  );
}
