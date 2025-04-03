"use client";

import React from "react";
import Link from "next/link";
import { Fish, ChevronRight } from "lucide-react";
import FishCard from "@/components/FishCard";

export default function FishSection() {
  return (
    <section className="py-8">
      <div className="mx-auto w-1/2 px-4">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Fish className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold">어류 도감</h2>
          </div>
          <h3 className="text-lg font-semibold mb-1">인기 어종</h3>
          <p className="text-gray-500 mb-6">
            낚시인들이 자주 찾는 인기 어종을 확인해 보세요.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <FishCard name="참돔" season="봄-가을" />
            <FishCard name="광어" season="봄-여름" />
            <FishCard name="감성돔" season="봄-가을" />
            <FishCard name="방어" season="봄-겨울" />
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/mypage"
              className="text-sm text-blue-500 hover:text-blue-600 flex items-center justify-center"
            >
              물고기도감 보기
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
