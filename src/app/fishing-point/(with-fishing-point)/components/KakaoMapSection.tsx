"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import fishLocations from "@/constants/fish-location.json";

interface FishLocation {
  value: number;
  name: string;
  title: string;
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMapSection() {
  const infowindowRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  const overlayRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao) return;

    // 전역 closeOverlay 함수 등록
    (window as any).closeOverlay = () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
      }
    };

    kakao.maps.load(() => {
      mapRef.current = initializeMap();
      infowindowRef.current = new kakao.maps.InfoWindow({
        removable: true,
        zIndex: 1,
      });

      const markers = fishLocations.map((location) => createMarker(location));
      applyClusterer(markers);
    });

    return () => {
      // cleanup 함수에서 전역 함수 제거
      delete (window as any).closeOverlay;
      infowindowRef.current?.close();
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
      }
    };
  }, []);
  // 지도 초기화
  const initializeMap = () => {
    const container = document.getElementById("map");
    if (!container) return null;

    return new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(36.3504, 127.3845), // 우리나라 정중앙 좌표
      level: 13,
    });
  };

  const createCustomOverlay = (location: FishLocation, marker: any) => {
    const content = `
      <div style="
        background-color: white;
        padding: 12px 16px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;
        min-width: 200px;
        position: relative;
      ">
      <div style="position: absolute;top: 10px;right: 10px;color: #888;width: 12px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png'); background-size: cover;cursor: pointer;" onclick="closeOverlay()" title="닫기"></div>
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          background-color: white;
          border-right: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          transform: translateX(-50%) rotate(45deg);
        "></div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <h5 style="
              font-size: 24px;
              font-weight: 700;
              font-family: "paperlogy-7bold";
            ">${location.title}</h5>
            <p style="
              font-size: 12px;
              color: #6b7280;
            ">${location.name}</p>
          </div>
          <button 
            onclick="window.location.href='/fishing-point/${location.value}?pointId=${location.value}'"
            style="
              background-color: #3b82f6;
              color: white;
              padding: 8px 16px;
              border-radius: 6px;
              border: none;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: background-color 0.2s;
            "
            onmouseover="this.style.backgroundColor='#2563eb'"
            onmouseout="this.style.backgroundColor='#3b82f6'"
          >
            상세 정보 보기
          </button>
        </div>
      </div>
    `;

    return new kakao.maps.CustomOverlay({
      position: marker.getPosition(),
      content: content,
      map: mapRef.current,
      yAnchor: 1,
      zIndex: 3,
    });
  };

  // 마커 생성
  const createMarker = (location: FishLocation) => {
    const position = new kakao.maps.LatLng(location.lat, location.lng);
    const marker = new kakao.maps.Marker({
      position: position,
      image: new kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
        new kakao.maps.Size(32, 32),
        {
          offset: new kakao.maps.Point(16, 32),
        }
      ),
    });

    // 마커 클릭 이벤트
    kakao.maps.event.addListener(marker, "click", () =>
      handleMarkerClick(marker, location, position)
    );

    return marker;
  };

  // 마커 클릭 시 인포윈도우 열기
  const handleMarkerClick = (marker: any, location: FishLocation) => {
    if (!mapRef.current) return;

    if (overlayRef.current) {
      overlayRef.current.setMap(null);
    }

    // 새로운 오버레이 생성
    overlayRef.current = createCustomOverlay(location, marker);
  };

  // 클러스터 적용
  const applyClusterer = (markers: any[]) => {
    if (!mapRef.current) return;

    new kakao.maps.MarkerClusterer({
      map: mapRef.current,
      markers,
      averageCenter: true,
      minLevel: 5,
      gridSize: 60,
      icons: [
        {
          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
          size: new kakao.maps.Size(56, 56),
          offset: new kakao.maps.Point(28, 28),
        },
      ],
    });
  };

  return (
    <section className="w-full mt-[34px]">
      <div className="w-[1280px] mx-auto">
        <div className="flex items-center justify-between mb-[16px]">
          <div>서치바</div>
          <Button className="text-body-3 text-white">
            낚시 포인트 제보하기
          </Button>
        </div>
        <div id="map" className="w-full h-[640px] rounded-lg shadow-lg"></div>
      </div>
    </section>
  );
}
