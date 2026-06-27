import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

/**
 * Middleware uses the Edge-compatible auth config (no Prisma/pg).
 * Route protection logic is handled in authConfig.callbacks.authorized
 */
export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (they handle their own auth)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
