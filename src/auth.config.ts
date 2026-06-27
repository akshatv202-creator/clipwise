import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

/**
 * Edge-compatible auth config (NO Prisma, NO Node.js modules).
 * Used by middleware which runs in Edge runtime.
 * The full auth.ts adds the PrismaAdapter for API routes.
 */
export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Credentials provider must be re-declared in auth.ts with actual DB lookup
    // Here we just define it so middleware knows it exists
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // This won't actually be called from middleware
      // The real authorize function is in auth.ts
      async authorize() {
        return null;
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
    // This is used by middleware to check auth
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

      // Redirect unauthenticated users to login
      if (isProtected && !isLoggedIn) {
        return false; // NextAuth will redirect to signIn page
      }

      // Redirect authenticated users away from auth pages
      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/projects", nextUrl));
      }

      return true;
    },
  },
};
