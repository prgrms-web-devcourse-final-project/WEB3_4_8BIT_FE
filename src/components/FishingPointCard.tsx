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
  visits: number;
}

const FishingPointCard = () => {
  // 상태를 이용하여 API에서 가져온 데이터를 저장
  const [fishingPoints, setFishingPoints] = useState<FishingPointData[]>([]);

  // 임시 목 데이터 (나중에 API로 대체)
  const mockFishingPoints: FishingPointData[] = [
    {
      title: "기장 학리 방파제",
      species: "감성돔",
      visits: 156,
    },
    {
      title: "속초 영랑호 방파제",
      species: "광어",
      visits: 124,
    },
    {
      title: "제주 서귀포 형제섬",
      species: "참돔",
      visits: 98,
    },
    {
      title: "강릉 동해 방파제",
      species: "농어",
      visits: 77,
    },
    {
      title: "울산 울주 방파제",
      species: "낙지",
      visits: 68,
    },
    {
      title: "여수 안도 방파제",
      species: "광어",
      visits: 45,
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
              <MapPin className="h-6 w-6 text-primary mr-2" />
              인기 낚시 포인트
            </CardTitle>
            <CardDescription className="text-base text-gray-30">
              동출 모집이 가장 많은 낚시 포인트
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* 포인트 리스트 */}
            <ul className="space-y-4">
              {fishingPoints.slice(0, 3).map((point, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-10">
                      {point.title}
                    </span>
                    <Badge className="ml-2 bg-cyan-100 text-cyan-800">
                      {point.species}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-50">
                    방문 {point.visits}+
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="pt-1">
            <Link
              href="/fishing-spot"
              className="text-primary hover:text-cyan-800 text-sm font-medium"
            >
              모든 포인트 보기 <ChevronRight className="h-4 w-4 inline ml-1" />
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default FishingPointCard;
