import "@/styles/globals.css";
import Head from "next/head";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";

import { Provider } from "./provider";

import { fontSans } from "@/common/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="bg-neutral-0" lang="en">
      <Head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1"
          name="viewport"
        />
      </Head>

      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="max-w-[450px] mx-auto">
          <Provider>{children}</Provider>
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
