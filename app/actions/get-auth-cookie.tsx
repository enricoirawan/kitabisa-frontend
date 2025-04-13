"use server";

import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@/common/contants";

export default async function getAuthCookie() {
  return (await cookies()).get(AUTH_COOKIE);
}
