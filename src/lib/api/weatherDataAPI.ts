import { WeatherResponse } from "@/types/weatherTypes";

/**
 * 날씨 정보를 가져오는 api
 * @param lat 위도
 * @param lng 경도
 * @returns current: 현재 날씨 정보, hourly: 시간별 날씨 정보, daily: 일별 날씨 정보
 */
export const getWeatherData = async (
  lat: number,
  lng: number
): Promise<WeatherResponse> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("날씨 정보 api 호출에 실패했습니다.");
  }

  const responseData = await response.json();
  return responseData;
};
