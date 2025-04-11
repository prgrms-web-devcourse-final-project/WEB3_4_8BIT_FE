"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface MapCardProps {
  fishPointName: string;
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapCard({
  fishPointName,
  latitude,
  longitude,
}: MapCardProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 지도 및 마커 초기화 함수
    const initMap = () => {
      if (!mapRef.current) return;
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 마커 생성
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    };

    // kakao.maps가 준비되어 있다면 바로 로드, 아니라면 스크립트 동적 로드
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        initMap();
      });
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        window.kakao.maps.load(() => {
          initMap();
        });
      };
    }
  }, [latitude, longitude]);

  // 지도 클릭 시 새 창에서 해당 위치의 카카오맵 링크로 이동
  const handleMapClick = () => {
    const url = `https://map.kakao.com/link/map/${encodeURIComponent(
      fishPointName
    )},${latitude},${longitude}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md mt-4">
      <div className="flex flex-col w-full">
        <div className="text-lg font-bold mb-2">지도</div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <div className="font-medium">{fishPointName}</div>
        </div>
        <div style={{ position: "relative", width: "100%", height: "200px" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
          <div
            onClick={handleMapClick}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </div>
    </div>
  );
}
