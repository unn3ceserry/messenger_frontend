import { routing } from "@/shared";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  const isAuth = request.cookies.get("session");
  const pathname = request.nextUrl.pathname;

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] || "en";
  const path = "/" + segments.slice(1).join("/");

  const publicRoutes = ["/", "/auth", "/register"];
  const privateRoutes = ["/c"];

  const redirectUrl = request.nextUrl.clone();

  if (publicRoutes.includes(path) && isAuth) {
    redirectUrl.pathname = `/${locale}/c`;
    return NextResponse.redirect(redirectUrl);
  }

  if (privateRoutes.includes(path) && !isAuth) {
    redirectUrl.pathname = `/${locale}`;
    return NextResponse.redirect(redirectUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};