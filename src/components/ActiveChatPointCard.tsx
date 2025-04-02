"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

// 임시 데이터 구조
interface ChatPointData {
  title: string;
  status: string;
  participants: number;
}

const ActiveChatPointCard = () => {
  // 상태를 이용하여 API에서 가져온 데이터를 저장
  const [chatPoints, setChatPoints] = useState<ChatPointData[]>([]);

  // 임시 목 데이터 (나중에 API로 대체)
  const mockChatPoints: ChatPointData[] = [
    {
      title: "부산 다대포 방파제",
      status: "활성",
      participants: 28,
    },
    {
      title: "포항 호미곶 방파제",
      status: "활성",
      participants: 15,
    },
    {
      title: "강릉 주문진항",
      status: "활성",
      participants: 12,
    },
  ];

  // 목 데이터 세팅
  const fetchChatPoints = () => {
    setChatPoints(mockChatPoints); // 목 데이터로 상태 설정
  };

  // 컴포넌트 마운트 시 목 데이터 호출
  useEffect(() => {
    fetchChatPoints();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {chatPoints.length > 0 && (
        <Card className="shadow-xl border border-gray-200 hover:shadow-xl transition-shadow p-5">
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center text-xl font-semibold text-primary">
              <MessageCircle className="h-6 w-6 text-primary mr-2" />활발한 채팅
              포인트
            </CardTitle>
            <CardDescription className="text-base text-gray-30">
              실시간 정보 교환이 활발한 곳
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* 포인트 리스트 */}
            <ul className="space-y-4">
              {chatPoints.map((point, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-10">
                      {point.title}
                    </span>
                    <Badge className="ml-2 bg-green-100 text-green-800">
                      {point.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>{point.participants}명 접속중</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="pt-1">
            <Link
              href="/chat-spot"
              className="text-primary hover:text-cyan-800 text-sm font-medium"
            >
              채팅방 참여하기 <ChevronRight className="h-4 w-4 inline ml-1" />
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ActiveChatPointCard;
