import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FishingPoint,
  FishingPointLocation,
} from "@/types/fishingPointLocationType";

declare global {
  interface Window {
    kakao: any;
  }
}

// 오버레이 컴포넌트
const CustomOverlay = ({
  location,
  onClose,
}: {
  location: FishingPoint;
  onClose: () => void;
}) => {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/fishing-point/${id}`);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        border: "1px solid #e5e7eb",
        minWidth: "240px",
        maxWidth: "300px",
        position: "relative",
        transform: "translate(-50%, -180px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          color: "#888",
          width: "14px",
          height: "14px",
          backgroundImage:
            "url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png')",
          backgroundSize: "cover",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={onClose}
        title="닫기"
      />
      <div
        style={{
          position: "absolute",
          bottom: "-8px",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: "16px",
          height: "16px",
          backgroundColor: "white",
          borderRight: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div>
          <h5
            style={{
              fontSize: "18px",
              fontWeight: "700",
              fontFamily: "paperlogy-7bold",
              marginBottom: "4px",
              paddingRight: "20px",
              wordBreak: "break-word",
            }}
          >
            {location.fishPointName}
          </h5>
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginBottom: "8px",
              wordBreak: "break-word",
            }}
          >
            {location.fishPointDetailName}
          </p>
        </div>
        <button
          onClick={() => handleNavigate(location.fishPointId)}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            width: "100%",
            textAlign: "center",
          }}
        >
          상세 정보 보기
        </button>
      </div>
    </div>
  );
};

export default function KaKaoMap({
  fishingPoints,
  locationData,
  handleClickRegionMarker,
  selectedLocationProps,
}: {
  fishingPoints: FishingPoint[];
  locationData: FishingPointLocation[];
  handleClickRegionMarker: (location: FishingPointLocation) => void;
  selectedLocationProps: FishingPointLocation | null;
}) {
  const mapRef = useRef<any>(null);
  const overlayRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const clustererRef = useRef<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<FishingPoint | null>(
    null
  );
  const overlayContainerRef = useRef<HTMLDivElement>(null);

  // 선택된 지역이 변경될 때 지도 중심 이동
  useEffect(() => {
    if (!mapRef.current || !selectedLocationProps) return;

    // 기존 마커 제거
    removeAllMarkers();

    const position = new window.kakao.maps.LatLng(
      selectedLocationProps.latitude,
      selectedLocationProps.longitude
    );

    mapRef.current.setCenter(position);
    mapRef.current.setLevel(10);
  }, [selectedLocationProps]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao) return;

    window.kakao.maps.load(() => {
      if (!mapRef.current) {
        mapRef.current = initializeMap();
      }

      // 기존 마커 제거
      removeAllMarkers();

      if (
        fishingPoints &&
        fishingPoints.length > 0 &&
        selectedLocationProps !== null
      ) {
        const markers = fishingPoints.map((location) => createMarker(location));
        markersRef.current = markers;
        applyClusterer(markers);
      } else if (locationData && locationData.length > 0) {
        const markers = locationData?.map((location) => {
          const marker = createRegionMarker(location);
          marker.setMap(mapRef.current);
          return marker;
        });
        markersRef.current = markers;
      }
    });

    return () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
      }
    };
  }, [fishingPoints, locationData, selectedLocationProps]);

  // 오버레이 표시/숨김 처리
  useEffect(() => {
    if (!mapRef.current || !selectedLocation || !overlayContainerRef.current)
      return;

    if (overlayRef.current) {
      overlayRef.current.setMap(null);
    }

    // 오버레이 컨테이너의 display 스타일을 block으로 변경
    overlayContainerRef.current.style.display = "block";

    overlayRef.current = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(
        selectedLocation.latitude,
        selectedLocation.longitude
      ),
      content: overlayContainerRef.current,
      map: mapRef.current,
      yAnchor: 1,
      zIndex: 3,
    });

    return () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
      }
    };
  }, [selectedLocation]);

  const initializeMap = () => {
    const container = document.getElementById("map");
    if (!container) return null;

    const map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(36.3504, 127.3845),
      level: 13,
    });

    // 줌 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    return map;
  };

  const createRegionMarker = (location: FishingPointLocation) => {
    const position = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );
    const marker = new window.kakao.maps.Marker({
      position: position,
      image: new window.kakao.maps.MarkerImage(
        "/images/kakaoLocationPin.png",
        new window.kakao.maps.Size(28, 28)
      ),
    });

    window.kakao.maps.event.addListener(marker, "click", () => {
      // 마커 클릭 시 해당 위치로 이동하고 줌 레벨 변경
      mapRef.current.setCenter(position);
      mapRef.current.setLevel(12);

      // 기존 클릭 이벤트 핸들러 호출
      handleClickRegionMarker(location);
    });

    return marker;
  };

  const createMarker = (location: FishingPoint) => {
    const position = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );
    const marker = new window.kakao.maps.Marker({
      position: position,
      image: new window.kakao.maps.MarkerImage(
        "/images/kakaoFishingPointPin.png",
        new window.kakao.maps.Size(32, 32),
        {
          offset: new window.kakao.maps.Point(16, 32),
        }
      ),
    });

    window.kakao.maps.event.addListener(marker, "click", () => {
      setSelectedLocation(location);
    });

    return marker;
  };

  const applyClusterer = (markers: any[]) => {
    if (!mapRef.current) return;

    // 기존 클러스터러 제거
    if (clustererRef.current) {
      clustererRef.current.clear();
    }

    clustererRef.current = new window.kakao.maps.MarkerClusterer({
      map: mapRef.current,
      averageCenter: true,
      minLevel: 5,
      gridSize: 60,
      markers: markers,
    });
  };

  // 모든 마커 제거 함수
  const removeAllMarkers = () => {
    if (!mapRef.current) return;

    // 클러스터러가 있으면 제거
    if (clustererRef.current) {
      clustererRef.current.clear();
      clustererRef.current = null;
    }

    // 저장된 모든 마커 제거
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });

    // 마커 배열 초기화
    markersRef.current = [];
  };

  return (
    <>
      <div
        id="map"
        className="w-full h-[520px] md:h-[640px] rounded-lg shadow-lg"
      />
      <div
        ref={overlayContainerRef}
        style={{
          display: "none",
          position: "absolute",
          zIndex: 1000,
        }}
      >
        {selectedLocation && (
          <CustomOverlay
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        )}
      </div>
    </>
  );
}
