import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/coming-soon") || pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/coming-soon", req.url));
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
