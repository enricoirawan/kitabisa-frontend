"use server";

import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@/common/contants";

export async function deleteAuthCookie() {
  // Hapus cookie AUTH_COOKIE
  (await cookies()).delete(AUTH_COOKIE);
}
