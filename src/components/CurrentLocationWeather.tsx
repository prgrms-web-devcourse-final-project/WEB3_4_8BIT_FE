"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "@/lib/api/weatherDataAPI";
import { ThermometerSun, Wind, Sun, MapPin, Droplets } from "lucide-react";
import { formatRoundOne } from "@/utils/weatherStatusFormater";
import { WeatherResponse } from "@/types/weatherTypes";

const DEFAULT_COORDS = { lat: 37.5665, lng: 126.978 };

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

// 날씨 상태 한글 변환
const getWeatherKorean = (condition: string): string => {
  const weatherMap: { [key: string]: string } = {
    Clear: "맑음",
    Clouds: "흐림",
    Rain: "비",
    Snow: "눈",
    Drizzle: "이슬비",
    Thunderstorm: "천둥번개",
    Mist: "옅은 안개",
    Smoke: "연기",
    Haze: "실안개",
    Dust: "먼지",
    Fog: "안개",
    Sand: "모래",
    Ash: "화산재",
    Squall: "돌풍",
    Tornado: "토네이도",
  };
  return weatherMap[condition] || condition;
};

// 좌표를 주소로 변환하는 함수
const getAddressFromCoords = async (
  lat: number,
  lng: number
): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();

    // 주소 데이터에서 필요한 부분만 추출
    const address = data.address;
    if (address) {
      // 시/도 정보
      const state = address.state || "";
      // 시/군/구 정보
      const city = address.city || address.town || address.county || "";
      // 구/군 정보
      const district = address.city_district || address.district || "";
      // 동/읍/면 정보
      const dong =
        address.suburb || address.neighbourhood || address.quarter || "";

      // 주소 조합 (시/군/구 + 동/읍/면)
      const locationParts = [city, district, dong].filter(Boolean);
      return locationParts.join(" ");
    }
    return "위치 정보 없음";
  } catch (error) {
    console.error("주소 변환 실패:", error);
    return "위치 정보 없음";
  }
};

// 자외선 지수 단계 판단 함수
const getUVLevel = (uv: number): { level: string; color: string } => {
  if (uv >= 11) return { level: "위험", color: "text-red-600" };
  if (uv >= 8) return { level: "매우 높음", color: "text-red-500" };
  if (uv >= 6) return { level: "높음", color: "text-orange-500" };
  if (uv >= 3) return { level: "보통", color: "text-yellow-500" };
  return { level: "낮음", color: "text-green-500" };
};

export default function CurrentLocationWeather() {
  const [coords, setCoords] = useState<{ lat: number; lng: number }>(
    DEFAULT_COORDS
  );
  const [address, setAddress] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 현재 시간과 날짜 상태 추가
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  // 시간 업데이트 함수
  const updateDateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    setCurrentTime(`${hours}:${minutes}`);
    setCurrentDate(`${month}/${day}`);
  };

  // 컴포넌트 마운트 시 시간 설정 및 1분마다 업데이트
  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(current);
        const addr = await getAddressFromCoords(current.lat, current.lng);
        setAddress(addr);
      },
      async (error) => {
        console.warn("위치 권한 거부, 기본 위치 사용");
        setCoords(DEFAULT_COORDS);
        const addr = await getAddressFromCoords(
          DEFAULT_COORDS.lat,
          DEFAULT_COORDS.lng
        );
        setAddress(addr);
      }
    );
  }, []);

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery<WeatherResponse>({
    queryKey: ["weather", coords.lat, coords.lng],
    queryFn: () => getWeatherData(coords.lat, coords.lng),
    enabled: !!coords,
  });

  useEffect(() => {
    if (data?.current) {
      setWeather({
        location: address,
        temperature: data.current.temp,
        condition: getWeatherKorean(data.current.weather[0].main),
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
      });
      setLoading(false);
    }
  }, [data, address]);

  if (loading || isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error || queryError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-red-500">
        날씨 정보를 불러오는데 실패했습니다.
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <section className="w-full bg-white py-5 mb-2 mt-6">
      <div className="max-w-7xl w-full mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          실시간 날씨 정보
        </h2>

        {/* 주소 출력 */}
        <div className="flex items-center gap-1 mb-4 text-base text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{address}</span>
        </div>

        {/* 날씨 카드 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-2xl shadow-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium text-gray-700">기온</h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <span>{currentTime}</span>
                  <span>•</span>
                  <span>{currentDate}</span>
                </div>
              </div>
              <ThermometerSun className="w-10 h-10 text-red-500" />
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-2xl font-bold text-gray-900 paperlogy-6semibold">
                {formatRoundOne(weather.temperature)}
              </span>
              <span className="text-xl text-gray-700">°</span>
            </div>
          </div>
          <div className="rounded-2xl shadow-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium text-gray-700">습도</h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <span>{currentTime}</span>
                  <span>•</span>
                  <span>{currentDate}</span>
                </div>
              </div>
              <Droplets className="w-10 h-10 text-blue-500" />
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-2xl font-bold text-gray-900 paperlogy-6semibold">
                {weather.humidity}
              </span>
              <span className="text-xl text-gray-700">%</span>
            </div>
          </div>
          <div className="rounded-2xl shadow-lg border p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium text-gray-700">풍속</h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <span>{currentTime}</span>
                  <span>•</span>
                  <span>{currentDate}</span>
                </div>
              </div>
              <Wind className="w-10 h-10 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-2xl font-bold text-gray-900 paperlogy-6semibold">
                {weather.windSpeed}
              </span>
              <span className="text-xl text-gray-700">m/s</span>
            </div>
          </div>
          {/* 자외선 카드 */}
          {(() => {
            const uvValue = 3.2; // API에서 받아올 값
            const { level, color } = getUVLevel(uvValue);
            return (
              <div className="rounded-2xl shadow-lg border p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium text-gray-700">
                      자외선
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <span>{currentTime}</span>
                      <span>•</span>
                      <span>{currentDate}</span>
                    </div>
                  </div>
                  <Sun className={`w-10 h-10 ${color}`} />
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span
                    className={`text-2xl font-bold ${color} paperlogy-6semibold`}
                  >
                    {level}
                  </span>
                  <span className="text-base text-gray-500">{uvValue} UV</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
