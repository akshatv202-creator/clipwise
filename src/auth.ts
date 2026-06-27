import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

/**
 * Auth config — DEMO MODE (no database required).
 * Any email/password combination will work.
 * User data is stored entirely in the JWT token.
 * 
 * To enable database mode later, uncomment PrismaAdapter
 * and add DATABASE_URL to your environment.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  // No adapter = no database needed. Everything lives in JWT.
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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const name = (credentials.name as string) || email.split("@")[0];

        // DEMO MODE: Accept any email/password combination
        // In production, replace this with database lookup + bcrypt
        return {
          id: `user_${Buffer.from(email).toString("base64").slice(0, 12)}`,
          name: name,
          email: email,
          image: null,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.plan = "pro"; // Demo: everyone gets pro
        token.credits = 2340;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        (session.user as unknown as Record<string, unknown>).plan = token.plan;
        (session.user as unknown as Record<string, unknown>).credits = token.credits;
      }
      return session;
    },
  },
});
