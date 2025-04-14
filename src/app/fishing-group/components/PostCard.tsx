"use client";

import {
  Calendar,
  MapPin,
  UserRound,
  Heart,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getRegions, getFishingRegion } from "@/lib/api/fishingPointAPI";
import { PostCardProps } from "@/lib/api/fishingPostAPI";
import { convertRegionTypeToKorean } from "@/lib/utils/regionUtils";
import {
  FishingPoint,
  FishingPointLocation,
} from "@/types/fishingPointLocationType";

export function PostCard({
  fishingTripPostId,
  title,
  content,
  date,
  location,
  recruitmentCount,
  fishPointName,
  fileUrlList = [],
  imageUrl,
  postStatus,
  latitude,
  longitude,
  regionType,
  likeCount = 0,
  isLiked = false,
  commentCount = 0,
}: PostCardProps) {
  // 썸네일 이미지 URL 결정
  const thumbnailUrl =
    imageUrl ||
    (fileUrlList.length > 0 ? fileUrlList[0] : "/images/default.png");

  // 표시될 텍스트 변환
  const displayStatusText = postStatus === "RECRUITING" ? "모집중" : "모집완료";

  // 지도 표시 여부 상태
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // 지역 정보 상태
  const [regionData, setRegionData] = useState<{
    regions: FishingPointLocation[];
    fishingRegion: FishingPoint[];
  } | null>(null);

  // 지역 정보 가져오기
  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        if (latitude && longitude) {
          const regions = await getRegions();
          // 위도/경도로 가장 가까운 지역을 찾아서 해당 지역 ID로 낚시 포인트를 조회
          const nearestRegion = regions.find(
            (region) =>
              Math.abs(region.latitude - latitude) < 0.1 &&
              Math.abs(region.longitude - longitude) < 0.1
          );

          if (nearestRegion) {
            const fishingRegion = await getFishingRegion(
              nearestRegion.regionId
            );
            setRegionData({ regions, fishingRegion });
          }
        }
      } catch (error) {
        console.error("지역 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchRegionData();
  }, [latitude, longitude]);

  // 지도 초기화 함수
  useEffect(() => {
    if (!showMap || !mapRef.current || !latitude || !longitude) return;

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

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;text-align:center;">${fishPointName}</div>`,
        removable: true,
      });

      // 인포윈도우를 마커에 표시
      infowindow.open(map, marker);
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
  }, [showMap, latitude, longitude, fishPointName]);

  // 지도 클릭 시 새 창에서 해당 위치의 카카오맵 링크로 이동
  const handleMapClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!latitude || !longitude) return;

    const url = `https://map.kakao.com/link/map/${encodeURIComponent(
      fishPointName
    )},${latitude},${longitude}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // 위치 정보 클릭 시 지도 표시 토글
  const handleLocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (latitude && longitude) {
      setShowMap(!showMap);
    }
  };

  return (
    <Link href={`/fishing-group/post/${fishingTripPostId}`} className="block">
      <div className="w-full mb-4 border border-gray-300 rounded-lg hover:bg-gray-80 px-4 md:px-6 py-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-200">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
          {/* 썸네일 이미지 */}
          <div className="w-full md:w-[180px] h-[120px] rounded-md overflow-hidden flex-shrink-0">
            <img
              src={thumbnailUrl}
              alt={`${title} - 낚시 모임 게시글 썸네일`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/default.png";
              }}
            />
          </div>

          {/* 게시글 정보 */}
          <div className="flex-1 min-w-0">
            <div className="space-y-3">
              {/* 모집 상태 & 제목 */}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <div className="flex items-center gap-1">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      postStatus === "RECRUITING"
                        ? "bg-[#2CD5D7] text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {displayStatusText}
                  </span>
                  {regionType && regionType !== "null" && (
                    <span className="text-blue-500 text-lg">
                      [{convertRegionTypeToKorean(regionType)}]
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 md:ml-1">
                  {title}
                </h3>
              </div>

              <p className="text-base text-gray-600 line-clamp-2">{content}</p>
            </div>

            {/* 하단 정보 영역 */}
            <div className="mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 gap-2 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} className="text-blue-500" />
                    동출날짜: {date}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserRound size={16} className="text-green-500" />
                    모집인원: {recruitmentCount}명
                  </span>
                  <span
                    className={`flex items-center gap-1 ${
                      latitude && longitude ? "cursor-pointer" : ""
                    }`}
                    onClick={handleLocationClick}
                  >
                    <MapPin size={16} className="text-purple-500" />
                    <span className="flex items-center gap-1">장소:</span>{" "}
                    {location}
                    {regionType && regionType !== "null" && (
                      <span className="text-gray-500 ml-0.5">
                        {convertRegionTypeToKorean(regionType)}
                      </span>
                    )}
                    {regionData?.fishingRegion &&
                      regionData.fishingRegion.length > 0 && (
                        <span className="text-blue-500 ml-0.5">
                          (지역:{" "}
                          {regionType && regionType !== "null"
                            ? convertRegionTypeToKorean(regionType)
                            : "알 수 없음"}
                          )
                        </span>
                      )}
                  </span>
                </div>

                {/* 좋아요 및 댓글 카운트 */}
                <div className="flex items-center gap-x-4 mt-2 sm:mt-0">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50">
                    <Heart
                      size={16}
                      className={
                        isLiked ? "fill-current text-red-500" : "text-red-500"
                      }
                    />
                    <span className="font-medium">{likeCount}</span>
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50">
                    <MessageSquare size={16} className="text-blue-500" />
                    <span className="font-medium">{commentCount}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 지도 영역 */}
        {showMap && (
          <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
            <div className="p-2 bg-gray-50 flex justify-between items-center">
              <span className="text-sm font-medium">위치 지도</span>
              <button
                className="text-xs text-blue-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMap(false);
                }}
              >
                닫기
              </button>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "150px",
              }}
            >
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
        )}
      </div>
    </Link>
  );
}
