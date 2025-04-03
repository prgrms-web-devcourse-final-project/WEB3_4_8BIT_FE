"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// 임시 데이터 구조
interface FishingPointData {
  title: string;
  species: string;
  visits: number;
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

const FishingPointCard = () => {
  // 상태를 이용하여 API에서 가져온 데이터를 저장
  const [fishingPoints, setFishingPoints] = useState<FishingPointData[]>([]);

  // 임시 목 데이터 (나중에 API로 대체)
  const mockFishingPoints: FishingPointData[] = [
    {
      title: "기장 학리 방파제",
      species: "광어",
      visits: 123,
    },
    {
      title: "속초 영랑호 방파제",
      species: "도미",
      visits: 89,
    },
    {
      title: "제주 서귀포 방파제",
      species: "고등어",
      visits: 43,
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
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
        <h3 className="text-base font-medium text-primary">인기 낚시 포인트</h3>
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
            <span className="text-sm text-gray-500">
              동출 모집 {point.visits}+
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/fishing-spot"
        className="mt-4 text-sm text-blue-500 hover:text-blue-600 flex items-center"
      >
        모든 포인트 보기
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};

export default FishingPointCard;
