import "@/styles/globals.css";

import Head from "next/head";

import CreateCampaignButton from "@/components/create-campaign/create-campaign-button";
import { siteConfig } from "@/common/site";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Buat Kampanye - {siteConfig.name}</title>
        <meta content={siteConfig.description} name="description" />
      </Head>

      <div className="relative">
        {children}
        <CreateCampaignButton />
      </div>
    </>
  );
}
