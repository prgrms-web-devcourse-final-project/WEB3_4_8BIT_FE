"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  DollarSign,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaptainSidebar } from "../components/SideBar";

interface Reservation {
  date: string;
  name: string;
  time: string;
  count: number;
  price: number;
}

export default function CaptainReservationPage() {
  const [tab, setTab] = useState("upcoming");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const reservations: Reservation[] = [
    {
      date: "2023-11-27",
      name: "홍길동",
      time: "15:00",
      count: 3,
      price: 30000,
    },
    {
      date: "2023-11-26",
      name: "김철수",
      time: "14:00",
      count: 2,
      price: 25000,
    },
    {
      date: "2023-11-26",
      name: "이영희",
      time: "13:00",
      count: 4,
      price: 40000,
    },
    {
      date: "2023-11-23",
      name: "김철수",
      time: "16:00",
      count: 2,
      price: 22000,
    },
    {
      date: "2023-11-23",
      name: "이영희",
      time: "11:00",
      count: 3,
      price: 35000,
    },
    {
      date: "2025-05-23",
      name: "김영희",
      time: "18:00",
      count: 3,
      price: 38000,
    },
  ];

  const today = new Date();

  const upcoming = reservations.filter((r) => new Date(r.date) >= today);
  const past = reservations.filter((r) => new Date(r.date) < today);

  const groupByDate = (data: Reservation[]) =>
    data.reduce((acc, curr) => {
      if (!acc[curr.date]) acc[curr.date] = [];
      acc[curr.date].push(curr);
      return acc;
    }, {} as Record<string, Reservation[]>);

  const groupedUpcoming = groupByDate(upcoming);
  const groupedPast = groupByDate(past);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <CaptainSidebar />

      <div className="md:col-span-3 space-y-6">
        <h1 className="text-2xl font-bold">예약 관리</h1>

        <Tabs
          value={tab}
          onValueChange={setTab}
          className="w-full cursor-pointer"
        >
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="upcoming" className="cursor-pointer">
              예약 확정 ({upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="cursor-pointer">
              지난 예약 ({past.length})
            </TabsTrigger>
          </TabsList>

          {/* 예약 확정 탭 */}
          <TabsContent value="upcoming">
            <div className="mt-6 space-y-6">
              <h2 className="text-xl font-bold mb-3">예약 신청 목록</h2>
              <p className="text-sm text-gray-500">
                고객이 신청한 예약을 확인하고 수락 또는 거절하세요.
              </p>

              {Object.entries(groupedUpcoming).map(([date, items]) => (
                <div key={date} className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {date}
                  </h3>
                  {items.map((item, index) => (
                    <Card
                      key={index}
                      onClick={() => setSelectedReservation(item)}
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
                              <span>{item.time}</span>
                              <span>· 인원 {item.count}명</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="default"
                          size="sm"
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReservation(item);
                          }}
                        >
                          상세보기
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 지난 예약 탭 */}
          <TabsContent value="past">
            <div className="mt-6 space-y-6">
              <h2 className="text-xl font-bold mb-3">지난 예약 목록</h2>
              <p className="text-sm text-gray-500">
                이미 완료된 예약 목록입니다.
              </p>

              {Object.entries(groupedPast).map(([date, items]) => (
                <div key={date} className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {date}
                  </h3>
                  {items.map((item, index) => (
                    <Card
                      key={index}
                      onClick={() => setSelectedReservation(item)}
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
                              <span>{item.time}</span>
                              <span>· 인원 {item.count}명</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReservation(item);
                          }}
                        >
                          상세보기
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
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
                <span className="text-gray-600">010-1234-5678</span>
              </div>

              <div className="flex items-center gap-2 text-base">
                <Calendar className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="font-semibold text-gray-800 w-20">날짜</span>
                <span className="text-gray-600">
                  {selectedReservation.date}
                </span>
              </div>

              <div className="flex items-center gap-2 text-base">
                <Users className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="font-semibold text-gray-800 w-20">인원</span>
                <span className="text-gray-600">
                  {selectedReservation.count}명
                </span>
              </div>

              <div className="flex items-center gap-2 text-base">
                <DollarSign className="h-5 w-5 text-gray-600 shrink-0" />
                <span className="font-semibold text-gray-800 w-20">금액</span>
                <span className="text-gray-600">
                  {selectedReservation.price.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
