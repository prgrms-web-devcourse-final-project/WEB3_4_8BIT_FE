import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/user/mypage"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;
  console.log("🔒 middleware 실행됨");
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginURL = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/mypage", "/user/mypage/:path*"],
};
