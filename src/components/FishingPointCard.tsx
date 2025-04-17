"use client";

import React from "react";
import {ChevronRight, Medal} from "lucide-react";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {PopularFishingPoint} from "@/types/fishingPointLocationType";
import {getPopularFishingPoints} from "@/lib/api/fishingPointAPI";

const FishingPointCard = () => {
  const { data, isSuccess } = useQuery<PopularFishingPoint[]>({
    queryKey: ['popularFishingPoint'],
    queryFn: getPopularFishingPoints,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="bg-white grid p-4 w-full shadow-lg rounded-lg h-[203px] border-1">
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
      <div className="space-y-3 h-[95px]">
        {isSuccess && data?.length > 0 && (
          data.map((item, index) => {
            const medalColors = [
              "text-yellow-500", // 금
              "text-gray-400",   // 은
              "text-orange-500", // 동
            ];
            return (
              <div  key={item.fishPointId} className="flex rounded-sm items-center justify-between">
                <div className="flex items-center gap-2">
                  <Medal className={medalColors[index]} />
                  <Link className="font-medium text-base hover:text-gray-40" href={`/fishing-point/${item.fishPointId}`}>
                    {item.fishPointDetailName}
                  </Link>
                </div>
                <span className="text-sm text-gray-500">
                  동출 모집 {item.recruitmentCount}+
                </span>
              </div>
            );
          })
        )}
      </div>
      <Link
        href="/fishing-point"
        className="flex w-28 mt-4 text-sm text-blue-500 hover:text-blue-600 items-center"
      >
        모든 포인트 보기
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};

export default FishingPointCard;
