"use client";

import React, { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// 임시 데이터 구조
interface FishingPointData {
  title: string;
  species: string;
  distance: string;
}

const getSpeciesColor = (species: string) => {
  switch (species) {
    case "광어":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "도미":
      return "bg-red-50 text-red-700 border-red-200";
    case "고등어":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const NearbyFishingPointCard = () => {
  // 상태를 이용하여 API에서 가져온 데이터를 저장
  const [fishingPoints, setFishingPoints] = useState<FishingPointData[]>([]);

  // 임시 목 데이터 (나중에 API로 대체)
  const mockFishingPoints: FishingPointData[] = [
    {
      title: "해운대 마린 갤러리",
      species: "광어",
      distance: "5km",
    },
    {
      title: "기장 이동항 방파제",
      species: "도미",
      distance: "8km",
    },
    {
      title: "기장 월대 갯바위",
      species: "고등어",
      distance: "12km",
    },
  ];

  // 목 데이터 세팅
  const fetchFishingPoints = () => {
    setFishingPoints(mockFishingPoints); // 목 데이터로 상태 설정
  };

  // 컴포넌트 마운트 시 목 데이터 호출
  useEffect(() => {
    fetchFishingPoints();
  }, []);

  return (
    <div className="bg-white p-4 w-full shadow-lg rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <h3 className="text-base font-medium text-primary">
          내 주변 낚시 포인트
        </h3>
      </div>
      <div className="space-y-3">
        {fishingPoints.map((point, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">{point.title}</span>
              <Badge
                variant="outline"
                className={`text-sm px-2 py-0 h-5 ${getSpeciesColor(
                  point.species
                )}`}
              >
                {point.species}
              </Badge>
            </div>
            <span className="text-sm text-gray-500">{point.distance}</span>
          </div>
        ))}
      </div>
      <Link
        href="/fishing-spot"
        className="mt-4 text-sm text-blue-500 hover:text-blue-600 flex items-center"
      >
        지도에서 보기
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};

export default NearbyFishingPointCard;
