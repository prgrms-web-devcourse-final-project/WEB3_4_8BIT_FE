import React from "react";
import {
  Cloud,
  Cloudy,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
} from "lucide-react";

export const getWeatherText = (main: string | undefined): string => {
  if (!main) return "--";

  switch (main) {
    case "Clear":
      return "맑음";
    case "Clouds":
      return "흐림";
    case "Rain":
      return "비";
    case "Snow":
      return "눈";
    case "Thunderstorm":
      return "천둥번개";
    case "Drizzle":
      return "이슬비";
    case "Mist":
    case "Fog":
      return "안개";
    default:
      return "--";
  }
};

export const getUVIColor = (uvi: number): string => {
  if (uvi <= 2) return "text-green-500";
  if (uvi <= 5) return "text-yellow-500";
  if (uvi <= 7) return "text-orange-500";
  if (uvi <= 10) return "text-red-500";
  return "text-purple-500";
};

export const getUVIText = (uvi: number): string => {
  if (uvi <= 2) return "낮음";
  if (uvi <= 5) return "보통";
  if (uvi <= 7) return "주의";
  if (uvi <= 10) return "위험";
  return "매우 위험";
};

export const getWeatherIcon = (main: string | undefined): React.ReactNode => {
  if (!main) return <Cloudy className="w-[24px] h-[24px] text-gray-40" />;

  switch (main) {
    case "Clear":
      return <Sun className="w-[24px] h-[24px] text-[#F59E0B]" />;
    case "Clouds":
      return <Cloud className="w-[24px] h-[24px] text-gray-40" />;
    case "Rain":
      return <CloudRain className="w-[24px] h-[24px] text-gray-40" />;
    case "Snow":
      return <CloudSnow className="w-[24px] h-[24px] text-gray-40" />;
    case "Thunderstorm":
      return <CloudLightning className="w-[24px] h-[24px] text-gray-40" />;
    case "Drizzle":
      return <CloudDrizzle className="w-[24px] h-[24px] text-gray-40" />;
    case "Mist":
    case "Fog":
      return <CloudFog className="w-[24px] h-[24px] text-gray-40" />;
    default:
      return <Cloudy className="w-[24px] h-[24px] text-gray-40" />;
  }
};

export const formatTemperature = (temp: number): number => {
  return Math.round(temp * 10) / 10;
};
