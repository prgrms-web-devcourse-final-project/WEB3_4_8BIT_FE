"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Anchor,
  Clock,
  Droplets,
  MapPin,
  Ship,
  Users,
  Utensils,
  Shield,
  Fish,
  Car,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type React from "react";
import { PostDetailPost, PostDetailShip } from "@/types/boatPostType";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function TabDetail({
  detailShipFishingPost,
  detailShip,
}: {
  detailShipFishingPost: PostDetailPost;
  detailShip: PostDetailShip;
}) {
  // 편의시설 정보
  const amenityConfig = {
    publicRestroom: {
      icon: <Droplets className="h-5 w-5" />,
      name: "화장실",
      description: "깨끗한 화장실 구비",
    },
    loungeArea: {
      icon: <Ship className="h-5 w-5" />,
      name: "휴게실",
      description: "쾌적한 실내 공간",
    },
    kitchenFacility: {
      icon: <Utensils className="h-5 w-5" />,
      name: "주방 시설",
      description: "간단한 조리 가능",
    },
    fishingChair: {
      icon: <Anchor className="h-5 w-5" />,
      name: "낚시 의자",
      description: "편안한 낚시 의자 제공",
    },
    passengerInsurance: {
      icon: <Shield className="h-5 w-5" />,
      name: "여행자 보험",
      description: "안전한 여행 보장",
    },
    fishingGearRental: {
      icon: <Fish className="h-5 w-5" />,
      name: "낚시 장비 대여",
      description: "장비 대여 가능",
    },
    mealProvided: {
      icon: <Utensils className="h-5 w-5" />,
      name: "식사 제공",
      description: "점심 도시락 포함",
    },
    parkingAvailable: {
      icon: <Car className="h-5 w-5" />,
      name: "주차 가능",
      description: "무료 주차 제공",
    },
  };

  const availableAmenities = Object.entries(detailShip)
    .filter(
      ([key, value]) =>
        amenityConfig[key as keyof typeof amenityConfig] && value === true
    )
    .map(([key]) => amenityConfig[key as keyof typeof amenityConfig]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao) return;

    kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (!container) return;

      const options = {
        center: new kakao.maps.LatLng(37.566295, 126.977945), // 서울시청 좌표
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.566295, 126.977945),
      });

      // 마커를 지도에 표시
      marker.setMap(map);
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>상세 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">출항 정보</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">출항지</p>
                <p className="text-gray-600">{detailShip.departurePort}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">출-입항 시간</p>
                <p className="text-gray-600">
                  출항: {detailShipFishingPost.startTime}
                </p>
                <p className="text-gray-600">
                  입항: {detailShipFishingPost.durationTime}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Anchor className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">선박 정보</p>
                <p className="text-gray-600">
                  {detailShip.shipName} (정원{" "}
                  {detailShipFishingPost.maxGuestCount}명)
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">최소 인원</p>
                <p className="text-gray-600">
                  10명 (미달 시 출항 취소될 수 있음)
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">낚시 정보</h3>
          <p className="text-gray-700">{detailShipFishingPost.content}</p>
        </div>

        <Separator />

        <div className="mt-8">
          <div className="flex flex-col gap-2 mb-2">
            <h3 className="font-medium">위치</h3>
            <p className="text-gray-700">
              부산광역시 기장군 기장읍 연화리 어촌계 선착장
            </p>
          </div>
          <div id="map" className="w-full h-[400px] rounded-lg"></div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableAmenities.map((amenity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-sub-2 text-primary p-3 rounded-full">
                {amenity.icon}
              </div>
              <div>
                <h4 className="font-medium">{amenity.name}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">취소 및 환불 규정</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>7일 전 취소: 100% 환불</li>
            <li>5일 전 취소: 70% 환불</li>
            <li>3일 전 취소: 50% 환불</li>
            <li>2일 전 취소: 30% 환불</li>
            <li>1일 전 취소: 환불 불가</li>
            <li>기상 악화로 인한 출항 취소 시: 100% 환불 또는 일정 변경</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
