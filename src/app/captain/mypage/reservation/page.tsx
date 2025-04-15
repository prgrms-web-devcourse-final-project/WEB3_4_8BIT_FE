"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  User as UserIcon,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  getCaptainPostList,
  getCaptainReservationDetail,
  getCaptainReservationList,
} from "@/lib/api/getCaptainInfo";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface Reservation {
  reservationId: number;
  shipFishingPostId: number;
  memberId: number;
  name: string;
  phone: string;
  reservationNumber: string;
  guestCount: number;
  price: number;
  totalPrice: number;
  reservationDate: string;
  reservationStatus: string;
  createdAt: string;
  modifiedAt: string;
}

export default function CaptainReservationPage() {
  const [tab, setTab] = useState("upcoming");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

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
        if (!postIdList) return null;

        // 모든 선박의 예약 목록을 병렬로 가져옵니다
        const reservationPromises = postIdList?.map((shipId) =>
          getCaptainReservationList(shipId, true, 20)
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

  // 지난 예약 목록 가져오기
  const {
    data: prevReservationListData,
    isLoading: isPrevReservationListLoading,
  } = useQuery({
    queryKey: ["prevReservationList"],
    queryFn: async () => {
      if (!postIdList) return null;

      // 모든 선박의 예약 목록을 병렬로 가져옵니다
      const reservationPromises = postIdList?.map((shipId) =>
        getCaptainReservationList(shipId, false, 20)
      );

      const results = await Promise.all(reservationPromises!);

      // 모든 결과를 하나의 배열로 합칩니다
      return {
        timestamp: new Date().toISOString(),
        data: results.flatMap((result) => result.data),
        success: true,
      };
    },
    enabled: !!postIdList,
  });

  if (
    isPostListLoading ||
    isReservationListLoading ||
    isPrevReservationListLoading
  ) {
    return <div>Loading...</div>;
  }

  const nextReservations =
    reservationListData?.data.flatMap((item) => item.content) || [];

  const prevReservations =
    prevReservationListData?.data.flatMap((item) => item.content) || [];

  // 날짜별로 예약 그룹화
  const groupReservationsByDate = (reservations: Reservation[]) => {
    const grouped = reservations.reduce((acc, reservation) => {
      const date = dayjs(reservation.reservationDate).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(reservation);
      return acc;
    }, {} as Record<string, Reservation[]>);

    // 날짜순으로 정렬
    return Object.entries(grouped)
      .sort(([dateA], [dateB]) => dayjs(dateA).diff(dayjs(dateB)))
      .map(([date, reservations]) => ({
        date,
        reservations,
      }));
  };

  const groupedNextReservations = groupReservationsByDate(nextReservations);
  const groupedPrevReservations = groupReservationsByDate(prevReservations);

  const showReservationDetail = async (reservationId: number) => {
    const response = await getCaptainReservationDetail(reservationId);
    setSelectedReservation(response.data);
  };

  return (
    <>
      <div className="md:col-span-3 space-y-6">
        <h1 className="text-2xl font-bold">예약 관리</h1>

        <Tabs
          value={tab}
          onValueChange={setTab}
          className="w-full cursor-pointer"
        >
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="upcoming" className="cursor-pointer">
              예약 확정 ({nextReservations.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="cursor-pointer">
              지난 예약 ({prevReservations.length})
            </TabsTrigger>
          </TabsList>

          {/* 예약 확정 탭 */}
          <TabsContent value="upcoming">
            <div className="mt-6 space-y-6">
              <h2 className="text-xl font-bold mb-3">예약 신청 목록</h2>
              <p className="text-sm text-gray-500">
                고객이 신청한 예약을 확인하고 수락 또는 거절하세요.
              </p>

              {groupedNextReservations.length === 0 ? (
                <div className="text-center text-gray-500 py-5">
                  예약 신청이 없습니다.
                </div>
              ) : (
                groupedNextReservations.map((group) => (
                  <div key={group.date} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {dayjs(group.date).format("YYYY년 MM월 DD일")}
                    </h3>
                    {group.reservations.map((item) => (
                      <Card
                        key={item.reservationId}
                        onClick={() => {
                          showReservationDetail(item.reservationId);
                        }}
                        className="border p-4 hover:bg-gray-80 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-md">
                              <Users className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold text-base">
                                {item.name}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {dayjs(item.reservationDate).format(
                                    "YYYY-MM-DD"
                                  )}
                                </span>
                                <span>· 인원 {item.guestCount}명</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="default"
                            size="sm"
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              showReservationDetail(item.reservationId);
                            }}
                          >
                            상세보기
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* 지난 예약 탭 */}
          <TabsContent value="past">
            <div className="mt-6 space-y-6">
              <h2 className="text-xl font-bold mb-3">지난 예약 목록</h2>
              <p className="text-sm text-gray-500">
                이미 완료된 예약 목록입니다.
              </p>

              {groupedPrevReservations.length === 0 ? (
                <div className="text-center text-gray-500 py-5">
                  예약 신청이 없습니다.
                </div>
              ) : (
                groupedPrevReservations.map((group) => (
                  <div key={group.date} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {dayjs(group.date).format("YYYY년 MM월 DD일")}
                    </h3>
                    {group.reservations.map((item) => (
                      <Card
                        key={item.reservationId}
                        onClick={() => {
                          showReservationDetail(item.reservationId);
                        }}
                        className="border p-4 hover:bg-gray-80 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-md">
                              <Users className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold text-base">
                                {item.name}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>{item.reservationDate}</span>
                                <span>· 인원 {item.guestCount}명</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              showReservationDetail(item.reservationId);
                            }}
                          >
                            상세보기
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 예약 상세 정보 모달 */}
      {selectedReservation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={() => setSelectedReservation(null)}
          />
          {/* 모달 콘텐츠 */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full z-10">
            {/* 헤더 영역 (그라데이션 배경) */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-3xl p-6 text-white">
              <h3 className="text-2xl font-bold">예약 상세 정보</h3>
              <p className="text-sm text-blue-50">예약 정보를 확인하세요.</p>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedReservation(null)}
              className="absolute top-4 right-4 text-gray-80 hover:text-gray-30 text-3xl font-bold cursor-pointer"
            >
              ×
            </button>

            {/* 상세 정보 내용 */}
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 text-base">
                <UserIcon className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="font-semibold text-gray-800 w-20">예약자</span>
                <span className="text-gray-600">
                  {selectedReservation.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-base">
                <Phone className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="font-semibold text-gray-800 w-20">연락처</span>
                <span className="text-gray-600">
                  {selectedReservation.phone}
                </span>
              </div>

              <div className="flex items-center gap-2 text-base">
                <Calendar className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="font-semibold text-gray-800 w-20">날짜</span>
                <span className="text-gray-600">
                  {dayjs(selectedReservation.reservationDate).format(
                    "YYYY-MM-DD"
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 text-base">
                <Users className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="font-semibold text-gray-800 w-20">인원</span>
                <span className="text-gray-600">
                  {selectedReservation.guestCount}명
                </span>
              </div>

              <div className="flex items-center gap-2 text-base">
                <DollarSign className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="font-semibold text-gray-800 w-20">
                  총 가격
                </span>
                <span className="text-gray-600">
                  {selectedReservation.totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
