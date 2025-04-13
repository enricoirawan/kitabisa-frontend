import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE } from "./common/contants";

export function middleware(req: NextRequest) {
  const authCookie = req.cookies.get(AUTH_COOKIE);

  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-donations", "/inbox", "/profile/:path*"],
};
