import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Edge-compatible auth config (NO database, NO Node.js modules).
 * Used by middleware which runs in Vercel Edge runtime.
 */
export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        isSignup: { label: "Is Signup", type: "text" },
      },
      async authorize(credentials) {
        // Demo mode: accept any credentials
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const email = credentials.email as string;
        const name = (credentials.name as string) || email.split("@")[0];
        return {
          id: `user_${Buffer.from(email).toString("base64").slice(0, 12)}`,
          name,
          email,
          image: null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const protectedRoutes = [
        "/projects",
        "/upload",
        "/processing",
        "/preview",
        "/settings",
        "/brand-kit",
        "/templates",
        "/analytics",
        "/admin",
      ];

      const authRoutes = ["/login", "/signup"];

      const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );
      const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (isProtected && !isLoggedIn) {
        return false;
      }

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/projects", nextUrl));
      }

      return true;
    },
  },
};
