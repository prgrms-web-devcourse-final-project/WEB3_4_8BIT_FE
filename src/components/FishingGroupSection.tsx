"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightCircle, Users } from "lucide-react";
import Image from "next/image";

export default function FishingGroupSection() {
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
          <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-[408px] transition-transform duration-300 transform hover:scale-105">
            <div className="relative w-full h-full">
              <Image
                src="/images/test.png"
                alt="갓잡은 광어"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">갓잡은 광어</h3>
              <p className="text-sm">드시러 갈 분 구함</p>
            </div>
            <div className="absolute right-4 bottom-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                <ArrowRightCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          {/* 오른쪽 카드 */}
          <div className="flex flex-col gap-6">
            {/* 상단 카드 */}
            <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-[192px] transition-transform duration-300 transform hover:scale-105">
              <div className="relative w-full h-full">
                <Image
                  src="/images/test.png"
                  alt="갓잡은 광어"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">갓잡은 광어</h3>
                <p className="text-sm">드시러 갈 분 구함</p>
              </div>
              <div className="absolute right-4 bottom-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                  <ArrowRightCircle className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            {/* 하단 카드 */}
            <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-[192px] transition-transform duration-300 transform hover:scale-105">
              <div className="relative w-full h-full">
                <Image
                  src="/images/test.png"
                  alt="갓잡은 광어"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">갓잡은 광어</h3>
                <p className="text-sm">
                  함께 출조할 낚시 동출을 찾아 더욱 즐거운 낚시를 즐겨보세요!
                </p>
              </div>
              <div className="absolute right-4 bottom-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                  <ArrowRightCircle className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
