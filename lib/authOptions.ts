import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
  // ✅ Pengaturan Cookie Global (Aman & Konsisten)
  cookies: {
    sessionToken: {
      name: AUTH_COOKIE,
      options: {
        httpOnly: true, // Anti-XSS
        secure: process.env.NODE_ENV === "production", // HTTPS only
        sameSite: "lax", // Anti-CSRF
        domain: ".ricoenn.com", // Untuk semua subdomain
        path: "/",
        maxAge: 10 * 60 * 60, // 10 jam
      },
    },
  },
  providers: [
    // 🔑 Credentials Provider (Email & Password)
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const result = await userLogin(
            credentials!.email,
            credentials!.password,
          );

          if (!result.response) return null;

          const user = await getMe(result.cookie!);

          return {
            email: user.data.email,
            id: user.data.id.toString(),
            image: user.data.photoProfileUrl,
            name: user.data.username,
            createdAt: user.data.createdAt,
            // Simpan token di user object untuk digunakan di JWT callback
            accessToken: result.cookie?.split(";")[0].split("=")[1] ?? "",
          };
        } catch (error) {
          console.error("Login error:", error);

          return null;
        }
      },
    }),
    // 🌐 Google Provider
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
    // 🔄 JWT Callback (Simpan Token & Data User)
    async jwt({ token, user, account, trigger, session }) {
      // 1. Handle Google Login
      if (account?.provider === "google") {
        try {
          const result = await userGoogleLogin(account.id_token!);
          const accessToken = result.cookie?.split(";")[0].split("=")[1];

          if (result.response) {
            const userData = await getMe(result.cookie!);

            token.accessToken = accessToken ?? "";
            token.email = userData.data.email;
            token.id = userData.data.id.toString();
            token.image = userData.data.photoProfileUrl;
            token.name = userData.data.username;
            token.createdAt = userData.data.createdAt;
          }
        } catch (error) {
          console.error("Google login error:", error);
        }
      }
      // 2. Handle Credentials Login
      else if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.id = user.id;
        token.image = user.image;
        token.name = user.name;
        token.createdAt = user.createdAt;
      }

      // 3. Handle Session Update (jika diperlukan)
      if (trigger === "update") {
        token.name = session.user.name;
        token.image = session.user.image;
      }

      return token;
    },
    // 🏛️ Session Callback (Kirim Data ke Client)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.createdAt = token.createdAt;
        // (Opsional) Akses token untuk keperluan API calls
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
};
