import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("accessToken", "", {
    path: "/",
    domain: ".mikki.kr",
    expires: new Date(0),
  });

  return response;
}
