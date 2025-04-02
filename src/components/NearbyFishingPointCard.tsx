"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";

// 임시 데이터 구조
interface FishingPointData {
  title: string;
  species: string;
  distance: string;
}

const NearbyFishingPointCard = () => {
  // 상태를 이용하여 API에서 가져온 데이터를 저장
  const [fishingPoints, setFishingPoints] = useState<FishingPointData[]>([]);

  // 임시 목 데이터 (나중에 API로 대체)
  const mockFishingPoints: FishingPointData[] = [
    {
      title: "해운대 미포 갯바위",
      species: "볼락",
      distance: "5km",
    },
    {
      title: "기장 이동항 방파제",
      species: "감성돔",
      distance: "8km",
    },
    {
      title: "기장 월내 갯바위",
      species: "우럭",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {fishingPoints.length > 0 && (
        <Card className="shadow-xl border border-gray-200 hover:shadow-xl transition-shadow p-5">
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center text-xl font-semibold text-primary">
              <MapPin className="h-6 w-6 text-primary mr-2" />내 주변 낚시
              포인트
            </CardTitle>
            <CardDescription className="text-base text-gray-30">
              현재 위치 기준 가까운 낚시 포인트
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* 포인트 리스트 */}
            <ul className="space-y-4">
              {fishingPoints.map((point, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-10">
                      {point.title}
                    </span>
                    <Badge className="ml-2 bg-cyan-100 text-cyan-800">
                      {point.species}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>{point.distance}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="pt-1">
            <Link
              href="/fishing-spot"
              className="text-primary hover:text-cyan-800 text-sm font-medium"
            >
              지도에서 보기 <ChevronRight className="h-4 w-4 inline ml-1" />
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default NearbyFishingPointCard;
