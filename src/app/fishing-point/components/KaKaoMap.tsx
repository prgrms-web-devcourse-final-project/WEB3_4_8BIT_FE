import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FishingPoint } from "@/types/fishingPointLocationType";

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
        padding: "12px 16px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        minWidth: "200px",
        position: "relative",
        transform: "translate(-51%, -180px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "#888",
          width: "12px",
          height: "12px",
          background:
            "url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png')",
          backgroundSize: "cover",
          cursor: "pointer",
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
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <h5
            style={{
              fontSize: "24px",
              fontWeight: "700",
              fontFamily: "paperlogy-7bold",
            }}
          >
            {location.fishPointName}
          </h5>
          <p style={{ fontSize: "12px", color: "#6b7280" }}>
            {location.fishPointDetailName}
          </p>
        </div>
        <button
          onClick={() => handleNavigate(location.fishPointId)}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#3b82f6")
          }
        >
          상세 정보 보기
        </button>
      </div>
    </div>
  );
};

export default function KaKaoMap({
  fishingPoints,
}: {
  fishingPoints: FishingPoint[];
}) {
  const mapRef = useRef<any>(null);
  const overlayRef = useRef<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<FishingPoint | null>(
    null
  );
  const overlayContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao) return;

    window.kakao.maps.load(() => {
      mapRef.current = initializeMap();
      if (fishingPoints && fishingPoints.length > 0) {
        const markers = fishingPoints.map((location) => createMarker(location));
        applyClusterer(markers);
      }
    });

    return () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
      }
    };
  }, [fishingPoints]);

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

    // 줌 레벨 변경 이벤트 감지
    window.kakao.maps.event.addListener(map, "zoom_changed", function () {
      // 현재 줌 레벨 확인
      const level = map.getLevel();

      if (level > 13) {
        map.setLevel(13);
      }
    });

    return map;
  };

  const createMarker = (location: FishingPoint) => {
    const position = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );
    const marker = new window.kakao.maps.Marker({
      position: position,
      image: new window.kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
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

    new window.kakao.maps.MarkerClusterer({
      map: mapRef.current,
      markers,
      averageCenter: true,
      minLevel: 5,
      gridSize: 60,
      icons: [
        {
          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
          size: new window.kakao.maps.Size(56, 56),
          offset: new window.kakao.maps.Point(28, 28),
        },
      ],
    });
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
