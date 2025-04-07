"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "@/lib/api/weatherDataAPI";
import { ThermometerSun, Wind, Sun, MapPin, Droplets } from "lucide-react";
import { formatRoundOne, getUVIText } from "@/utils/weatherStatusFormater";
import { WeatherResponse } from "@/types/weatherTypes";
import WeatherCard from "./WeatherCard";

const DEFAULT_COORDS = { lat: 37.5665, lng: 126.978 };

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

    const address = data.address;
    if (address) {
      const city = address.city || address.town || address.county || "";
      const district = address.city_district || address.district || "";
      const dong =
        address.suburb || address.neighbourhood || address.quarter || "";

      const locationParts = [city, district, dong].filter(Boolean);
      return locationParts.join(" ");
    }
    return "위치 정보 없음";
  } catch (error) {
    console.error("주소 변환 실패:", error);
    return "위치 정보 없음";
  }
};

export default function CurrentLocationWeather() {
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [address, setAddress] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  const updateDateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    setCurrentTime(`${hours}:${minutes}`);
    setCurrentDate(`${month}/${day}`);
  };

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

  const { data: weatherData, isLoading } = useQuery<WeatherResponse>({
    queryKey: ["weather", coords.lat, coords.lng],
    queryFn: () => getWeatherData(coords.lat, coords.lng),
    enabled: !!coords,
  });

  if (isLoading || !weatherData?.current) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  const current = weatherData.current;

  return (
    <section className="w-full bg-white py-5 mb-2 mt-6">
      <div className="max-w-7xl w-full mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">실시간 날씨 정보</h2>
          <div className="flex items-center gap-1 text-base text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{address}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <WeatherCard
            title="기온"
            value={formatRoundOne(current.temp)}
            unit="°"
            icon={<ThermometerSun className="w-10 h-10" />}
            iconColor="text-red-500"
            currentTime={currentTime}
            currentDate={currentDate}
          />
          <WeatherCard
            title="습도"
            value={current.humidity}
            unit="%"
            icon={<Droplets className="w-10 h-10" />}
            iconColor="text-blue-500"
            currentTime={currentTime}
            currentDate={currentDate}
          />
          <WeatherCard
            title="풍속"
            value={current.wind_speed}
            unit="m/s"
            icon={<Wind className="w-10 h-10" />}
            iconColor="text-emerald-500"
            currentTime={currentTime}
            currentDate={currentDate}
          />
          <WeatherCard
            title="자외선"
            value={getUVIText(current.uvi)}
            icon={<Sun className="w-10 h-10" />}
            iconColor="text-yellow-500"
            currentTime={currentTime}
            currentDate={currentDate}
          />
        </div>
      </div>
    </section>
  );
}
