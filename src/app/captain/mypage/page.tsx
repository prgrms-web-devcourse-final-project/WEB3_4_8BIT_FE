"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Calendar,
  ClipboardList,
  Users,
  Ship,
} from "lucide-react";
import Link from "next/link";
import ActivityCard from "./components/ActivityCard";
import ActivityItem from "./components/ActivityItem";
import { CaptainSidebar } from "./components/SideBar";

export default function CaptainMyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <CaptainSidebar />
      </div>

      <div className="md:col-span-3 space-y-6">
        <h1 className="text-2xl font-bold">대시보드</h1>

        {/* 상단 카드 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActivityCard
            title="예약 신청"
            value="3"
            description="최근 신청된 예약"
            icon={<Calendar className="h-5 w-5 text-blue-500" />}
          />
          <ActivityCard
            title="운영 선박"
            value="2"
            description="등록된 선박 수"
            icon={<Ship className="h-5 w-5 text-cyan-600" />}
          />
          <ActivityCard
            title="작성 게시글"
            value="5"
            description="선상 낚시 커뮤니티"
            icon={<ClipboardList className="h-5 w-5 text-green-500" />}
          />
        </div>

        {/* 최근 예약 신청 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>최근 예약 신청</CardTitle>
              <CardDescription>최근 예약 신청 내역입니다.</CardDescription>
            </div>
            <Link href="/captain/mypage/reservation">
              <Button variant="ghost" size="sm" className="gap-1">
                전체보기 <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            <ActivityItem
              icon={<Calendar className="h-5 w-5 text-cyan-600" />}
              title="홍길동"
              description="2023-12-25 오전 5:00 / 3명"
              time="1일 전"
              type="reservation"
            />
            <ActivityItem
              icon={<Calendar className="h-5 w-5 text-cyan-600" />}
              title="김철수"
              description="2023-12-30 오전 6:00 / 2명"
              time="3일 전"
              type="reservation"
            />
            <ActivityItem
              icon={<Calendar className="h-5 w-5 text-cyan-600" />}
              title="이영희"
              description="2024-01-10 오전 7:00 / 1명"
              time="5일 전"
              type="reservation"
            />
          </CardContent>
        </Card>

        {/* 최근 게시글 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>최근 선상 낚시 게시글</CardTitle>
              <CardDescription>나의 최신 게시글 목록입니다.</CardDescription>
            </div>
            <Link href="/captain/posts">
              <Button variant="ghost" size="sm" className="gap-1">
                전체보기 <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            <ActivityItem
              icon={<Users className="h-5 w-5 text-indigo-500" />}
              title="11월 방어 대물 출조 모집합니다!"
              description="11월 25일 (토) 새벽 5시 / 방어진항 출항, 장비 대여 가능"
              time="2일 전"
              type="post"
            />
            <ActivityItem
              icon={<Users className="h-5 w-5 text-indigo-500" />}
              title="주말 감성돔 공략 같이 가실 분"
              description="기장 동암항 오전 출항, 초보자 환영합니다."
              time="6일 전"
              type="post"
            />
            <ActivityItem
              icon={<Users className="h-5 w-5 text-indigo-500" />}
              title="조황 공유용 선상 낚시"
              description="이번 주 출조 결과 공유합니다."
              time="1주일 전"
              type="post"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
