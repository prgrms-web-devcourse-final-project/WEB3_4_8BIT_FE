import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import stations1 from "@/constants/stations1.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Station {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

// 두 좌표 간의 거리를 계산하는 함수 (Haversine 공식 사용)
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // 지구의 반경 (km)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

export const findNearestStation = (lat: number, lng: number): string => {
  let minDistance = Infinity;
  let nearestStationId = "";

  stations1.forEach((station: Station) => {
    const distance = calculateDistance(
      lat,
      lng,
      station.latitude,
      station.longitude
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearestStationId = station.id;
    }
  });

  return nearestStationId;
};
