import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("accessToken", "", {
    path: "/",
    domain: ".mikki.kr", // 배포 도메인과 일치하게!
    secure: true, // HTTPS에서만 전송
    sameSite: "none", // cross-site 허용
    expires: new Date(0), // 즉시 만료
  });

  return response;
}
