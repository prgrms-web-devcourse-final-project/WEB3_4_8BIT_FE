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
import { useQuery } from "@tanstack/react-query";
import {
  getCaptainDashboard,
  getCaptainInfo,
  getCaptainReservationList,
  getCaptainPostList,
} from "@/lib/api/getCaptainInfo";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function CaptainMyPage() {
  const { data: captainData, isLoading: isCaptainLoading } = useQuery({
    queryKey: ["captain"],
    queryFn: () => getCaptainInfo(),
  });

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getCaptainDashboard(),
  });

  const { data: postListData, isLoading: isPostListLoading } = useQuery({
    queryKey: ["postList"],
    queryFn: () => getCaptainPostList(),
  });

  // 선박 게시글 아이디 리스트
  const postIdList = postListData?.data.map((post) => post.shipFishingPostId);

  // 예약 목록 가져오기
  const { data: reservationListData, isLoading: isReservationListLoading } =
    useQuery({
      queryKey: ["reservationList"],
      queryFn: async () => {
        if (!captainData?.data.shipList) return null;

        // 모든 선박의 예약 목록을 병렬로 가져옵니다
        const reservationPromises = postIdList?.map((shipId) =>
          getCaptainReservationList(shipId, true, 3)
        );

        const results = await Promise.all(reservationPromises!);

        // 모든 결과를 하나의 배열로 합칩니다
        return {
          data: results.flatMap((result) => result.data),
          timestamp: new Date().toISOString(),
          success: true,
        };
      },
      enabled: !!postIdList,
    });
  const nextReservations =
    reservationListData?.data.flatMap((item) => item.content) || [];

  if (
    isCaptainLoading ||
    isDashboardLoading ||
    isReservationListLoading ||
    isPostListLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:col-span-3 space-y-6">
      <h1 className="text-2xl font-bold">대시보드</h1>

      {/* 상단 카드 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActivityCard
          title="예약 신청"
          value={"" + dashboardData?.data.todayReservationCount}
          description="최근 신청된 예약"
          icon={<Calendar className="h-5 w-5 text-blue-500" />}
        />
        <ActivityCard
          title="운영 선박"
          value={"" + captainData?.data.shipList?.length}
          description="등록된 선박 수"
          icon={<Ship className="h-5 w-5 text-cyan-600" />}
        />
        <ActivityCard
          title="작성 게시글"
          value={"" + dashboardData?.data.writtenPostCount}
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
          {nextReservations.length > 0 ? (
            nextReservations.map((reservation) => (
              <ActivityItem
                key={reservation.reservationId}
                icon={<Calendar className="h-5 w-5 text-cyan-600" />}
                title={"예약자 이름: " + reservation.name}
                description={
                  dayjs(reservation.reservationDate).format(
                    "YYYY-MM-DD 오전 HH:mm"
                  ) +
                  " / " +
                  reservation.guestCount +
                  "명"
                }
                time={dayjs(reservation.createdAt).fromNow()}
                type="reservation"
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-5">
              예약 신청이 없습니다.
            </div>
          )}
        </CardContent>
      </Card>

      {/* 최근 게시글 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>작성한 선상 낚시 게시글</CardTitle>
            <CardDescription>
              작성한 선상 낚시 게시글 목록입니다.
            </CardDescription>
          </div>
          <Link href="/captain/posts">
            <Button variant="ghost" size="sm" className="gap-1">
              전체보기 <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          {postListData?.data.map((post) => (
            <ActivityItem
              key={post.shipFishingPostId}
              icon={<Users className="h-5 w-5 text-indigo-500" />}
              title={post.subject}
              description={post.location}
              time={post.createdAt}
              type="post"
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
