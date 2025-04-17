export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import KakaoMapSection from "./KakaoMapSection";
import { FishingPointLocation } from "@/types/fishingPointLocationType";

async function getLocation(): Promise<FishingPointLocation[]> {
  try {
    const token = process.env.NEXT_PUBLIC_API_TOKEN || "default_token";

    const cookieStore = await cookies();
    const cookieEntries = cookieStore.getAll();
    const cookieHeader = cookieEntries
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const response = await fetch("https://api.mikki.kr/api/v1/regions", {
      cache: "force-cache",
      headers: {
        Cookie: cookieHeader,
        Authorization: token,
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("API 호출 에러:", error);
    return [];
  }
}

export default async function ServerKaKaoMapSection() {
  const location = await getLocation();

  return <KakaoMapSection locationData={location} />;
}
