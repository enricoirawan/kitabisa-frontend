import "@/styles/globals.css";
import { Metadata } from "next";
import { ReactElement } from "react";

import { siteConfig } from "@/common/site";

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

export default async function Layout({ children }: { children: ReactElement }) {
  return <div>{children}</div>;
}
