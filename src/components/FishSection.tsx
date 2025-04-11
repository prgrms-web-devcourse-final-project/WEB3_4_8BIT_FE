"use client";

import React from "react";
import Link from "next/link";
import { Fish, ChevronRight } from "lucide-react";
import FishCard from "@/components/FishCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {useQuery} from "@tanstack/react-query";
import {FishAPI} from "@/lib/api/fishAPI";
import {FishDictionaryInfo} from "@/types/fish.interface";

export default function FishSection() {
  const { data, isSuccess } = useQuery<FishDictionaryInfo[]>({
    queryKey: ['popularFishAmongUsers'],
    queryFn: FishAPI.getPopularFish,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="mx-auto w-full px-4 py-8">
      <div className="flex items-center mb-4">
        <Fish className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">어류 도감</h2>
      </div>

      <Card className="shadow-xl h-[382px]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">인기 어종</CardTitle>
          <CardDescription className="text-gray-500">
            낚시인들이 자주 찾는 인기 어종을 확인해 보세요
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-4">
            {isSuccess && data.length > 0 && (
              data.map(item => {
                return (
                  <FishCard
                    key={item.fishId}
                    name={item.name}
                    imageUrl={item.fileUrl}
                    season={`${item.spawnSeasonList[0]}월 ~ ${item.spawnSeasonList[item.spawnSeasonList.length - 1]}월`}
                  />
                )
              })
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/user/mypage/fish-encyclopedia"
            className=" text-blue-500 hover:text-blue-600 flex items-center text-sm font-medium mt-3"
          >
            어류 도감 보기
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
