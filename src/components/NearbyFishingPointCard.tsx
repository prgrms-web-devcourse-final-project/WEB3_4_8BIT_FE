"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import {ChevronRight, Medal} from "lucide-react";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {NearestFishingPoint} from "@/types/fishingPointLocationType";
import {getNearFishingPoints} from "@/lib/api/fishingPointAPI";

const getIndexColor = (num: number) => {
  switch (num) {
    case 0:
      return "bg-red-50 text-red-700 border-red-200";
    case 1:
      return "bg-blue-50 text-blue-700 border-blue-200";
    case 2:
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const NearbyFishingPointCard = () => {
  const { data, isSuccess } = useQuery<NearestFishingPoint[]>({
    queryKey: ['nearbyFishingPoint'],
    queryFn: () => getNearFishingPoints(35.8714,128.6014),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="bg-white p-4 w-full shadow-lg rounded-lg h-[203px] border-1">
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
      <div className="space-y-3 h-[95px]">
        {isSuccess && data?.length > 0 && (
          data.map((item, index) => {
            return (
              <div key={item.fishPointId} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link className="font-medium text-base hover:text-gray-40" href={`/fishing-point/${item.fishPointId}`}>
                    {item.fishPointDetailName}
                  </Link>
                  <Badge
                    variant="outline"
                    className={`text-sm px-2 py-0 h-5 ${getIndexColor(index)}`}
                  >
                    {index+1}번째
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">{item.distance.toFixed(1)}km</span>
              </div>
            );
          })
        )}
      </div>
      <Link
        href="/fishing-point"
        className="w-25 mt-4 text-sm text-blue-500 hover:text-blue-600 flex items-center"
      >
        지도에서 보기
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};

export default NearbyFishingPointCard;
