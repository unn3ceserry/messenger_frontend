import { routing } from "@/shared";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isAuth = request.cookies.get("session");
  const pathname = request.nextUrl.pathname;

  const locale = pathname.split("/")[1];
  const path = pathname.replace(`/${locale}`, "") || "/";

  const publicRoutes = ["/", "/auth", "/register"];
  const privateRoutes = ["/c"];

  if (publicRoutes.includes(path) && isAuth) {
    return NextResponse.redirect(new URL(`/${locale}/c`, request.url));
  }

  if (privateRoutes.includes(path) && !isAuth) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  return NextResponse.next();
}

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
