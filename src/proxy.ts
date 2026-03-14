import { routing } from "@/shared";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  const isAuth = request.cookies.get("session");
  const pathname = request.nextUrl.pathname;

  const publicRoutes = ["/", "/auth", "/register"];
  const privateRoutes = ["/c"];

  const isPrivate = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (publicRoutes.includes(pathname) && isAuth) {
    return NextResponse.redirect(new URL("/c", request.url));
  }

  if (isPrivate && !isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};