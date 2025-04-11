"use client";

import React from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import MainFishGroupCard from "@/components/MainFishGroupCard";
import {getNearFishingPoints, GroupFishPost} from "@/lib/api/groupFishingAPI";
import {useQuery} from "@tanstack/react-query";

export default function FishingGroupSection() {
  const { data, isSuccess } = useQuery<GroupFishPost[]>({
    queryKey: ['fishGroupMainPage'],
    queryFn: getNearFishingPoints,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* 상단 타이틀/버튼 영역 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">동출 모집하기</h2>
          </div>
          <Link
            href="/fishing-group"
            className="inline-block px-4 py-2 bg-gray-80 text-gray-20 text-sm font-medium rounded-full hover:bg-gray-60 transition-colors"
          >
            더보기
          </Link>
        </div>
        <div className="flex items-center mb-6">
          <p className="text-gray-600">
            함께 출조할 낚시 동출을 찾아, 더 즐거운 낚시를 즐겨보세요!
          </p>
        </div>
        {/* 카드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 첫 번째 카드 */}
          {isSuccess && data[0] && (
            <MainFishGroupCard height={408} postData={data[0]} />
          )}
          {/* 오른쪽 카드 */}
          <div className="flex flex-col gap-6">
            {isSuccess && data[1] && <MainFishGroupCard height={192} postData={data[1]} />}
            {isSuccess && data[2] && <MainFishGroupCard height={192} postData={data[2]} />}
          </div>
        </div>
      </div>
    </section>
  );
}
