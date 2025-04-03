"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaptainSidebar } from "../components/SideBar";

interface Reservation {
  date: string;
  name: string;
  time: string;
  count: number;
}

export default function CaptainReservationPage() {
  const [tab, setTab] = useState("upcoming");

  const reservations: Reservation[] = [
    {
      date: "2023-11-27",
      name: "홍길동",
      time: "2023-11-27",
      count: 3,
    },
    {
      date: "2023-11-26",
      name: "김철수",
      time: "2023-11-26",
      count: 2,
    },
    {
      date: "2023-11-26",
      name: "이영희",
      time: "2023-11-26",
      count: 4,
    },
    {
      date: "2023-11-23",
      name: "김철수",
      time: "2023-11-23",
      count: 2,
    },
    {
      date: "2023-11-23",
      name: "이영희",
      time: "2023-11-23",
      count: 3,
    },
    {
      date: "2025-05-23",
      name: "김영희",
      time: "2025-04-01",
      count: 3,
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
            <TabsTrigger value="upcoming" className="cursor-pointer ">
              예약 확정 ({upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="cursor-pointer">
              지난 예약 ({past.length})
            </TabsTrigger>
          </TabsList>

          {/* ✅ 예약 확정 */}
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
                      className="border p-4 hover:bg-gray-80 transition-colors duration-200"
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
                        <Button variant="default" size="sm">
                          상세보기
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ✅ 지난 예약 */}
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
                      className="border p-4 hover:bg-gray-80 transition-colors duration-200"
                    >
                      {" "}
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
                        <Button variant="outline" size="sm">
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
    </div>
  );
}
