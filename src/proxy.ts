import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes require ADMIN role
    if (path.startsWith("/admin") && path !== "/admin/login") {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const path = req.nextUrl.pathname;
        // Allow /admin/login without token
        if (path === "/admin/login") return true;
        // /cuenta/* and /admin/* require token
        if (path.startsWith("/cuenta") || path.startsWith("/admin")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/cuenta/:path*", "/admin/:path*"],
};
