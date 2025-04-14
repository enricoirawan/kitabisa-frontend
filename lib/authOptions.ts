import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { userLogin, getMe, userGoogleLogin } from "./api";

import { AUTH_COOKIE } from "@/common/contants";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 10 * 60 * 60, // 10 hours
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const result = await userLogin(
          credentials!.email,
          credentials!.password,
        );

        const token = result.cookie?.split(";")[0].split("=")[1];

        if (token) {
          (await cookies()).set({
            name: AUTH_COOKIE,
            value: token,
            secure: process.env.NODE_ENV === "production" ? true : false,
            httpOnly: true,
            expires: new Date(jwtDecode(token!).exp! * 1000),
            sameSite: "lax",
            domain: process.env.DOMAIN_COOKIE,
            path: "/",
          });
        }

        if (result.response) {
          const user = await getMe(result.cookie!);

          return {
            email: user.data.email,
            id: user.data.id.toString(),
            image: user.data.photoProfileUrl,
            name: user.data.username,
            createdAt: user.data.createdAt,
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user, trigger, session }) {
      if (account?.provider == "google") {
        const result = await userGoogleLogin(account.id_token!);

        const cookieToken = result.cookie?.split(";")[0].split("=")[1];

        // set backend jwt to cookies
        if (cookieToken) {
          (await cookies()).set({
            name: AUTH_COOKIE,
            value: cookieToken,
            secure: true,
            httpOnly: true,
            expires: new Date(jwtDecode(cookieToken!).exp! * 1000),
            sameSite: "lax",
            domain: ".ricoenn.com",
            path: "/",
          });
        }

        if (result.response) {
          const user = await getMe(result.cookie!);

          token.email = user.data.email;
          token.id = user.data.id.toString();
          token.image = user.data.photoProfileUrl;
          token.name = user.data.username;
          token.createdAt = user.data.createdAt;
        }
      } else if (account?.provider === "credentials") {
        //login with credentials
        token.email = user.email!;
        token.id = user.id!;
        token.image = user.image!;
        token.name = user.name!;
        token.createdAt = user.createdAt!;
      }

      if (trigger === "update") {
        token.image = session.image!;
        token.name = session.name!;
      }

      return token;
    },
    async session({ session, token, trigger }) {
      if (session && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.createdAt = token.createdAt;
      }

      if (trigger === "update") {
        session.user.name = token.name;
        session.user.image = token.image;
      }

      return session;
    },
  },
};
