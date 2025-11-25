import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  const protectedPaths = ["/protected", "/users"];

  if (protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/users/:path*"],
};
