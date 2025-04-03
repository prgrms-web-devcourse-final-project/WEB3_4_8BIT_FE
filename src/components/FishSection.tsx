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

export default function FishSection() {
  return (
    <div className="mx-auto w-full px-4 py-8">
      <div className="flex items-center mb-4">
        <Fish className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">어류 도감</h2>
      </div>

      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">인기 어종</CardTitle>
          <CardDescription className="text-gray-500">
            낚시인들이 자주 찾는 인기 어종을 확인해 보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FishCard name="참돔" season="봄-가을" />
            <FishCard name="광어" season="봄-여름" />
            <FishCard name="감성돔" season="봄-가을" />
            <FishCard name="방어" season="봄-겨울" />
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/mypage"
            className=" text-blue-500 hover:text-blue-600 flex items-center text-sm font-medium"
          >
            어류 도감 보기
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
