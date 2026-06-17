import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") || "";
  if (pathname.startsWith("/coming-soon") || pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }
  if (host.includes("seehratransport.com")) {
    return NextResponse.redirect(new URL("/coming-soon", req.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
