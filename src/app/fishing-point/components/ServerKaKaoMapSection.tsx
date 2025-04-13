import { cookies } from "next/headers";
import KakaoMapSection from "./KakaoMapSection";
import { FishingPointLocation } from "@/types/fishingPointLocationType";

async function getLocation(): Promise<FishingPointLocation[]> {
  try {
    const token = process.env.NEXT_PUBLIC_API_TOKEN || "기본_토큰_값";
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch("https://api.mikki.kr/api/v1/regions", {
      cache: "no-store",
      headers: {
        Cookie: cookieHeader,
        Authorization: token,
      },
    });
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
