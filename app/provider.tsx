"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import QueryProviders from "./query-provider";
import { SocketProvider } from "./socket-provider";

interface Props {
  children: ReactNode;
}

export function Provider(props: Props) {
  return (
    <SessionProvider>
      <SocketProvider>
        <QueryProviders>{props.children}</QueryProviders>
      </SocketProvider>
    </SessionProvider>
  );
}
