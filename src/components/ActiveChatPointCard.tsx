"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
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
      participants: 26,
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
    <div className="bg-white p-4 w-full shadow-lg rounded-lg border-1">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <h3 className="text-base font-medium text-primary">
          활발한 낚시 포인트
        </h3>
      </div>
      <div className="space-y-3">
        {chatPoints.map((point, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium text-base">{point.title}</span>
              <Badge
                variant="outline"
                className="text-sm px-2 py-0 h-5 bg-green-50 text-green-700 border-green-200"
              >
                {point.status}
              </Badge>
            </div>
            <span className="text-sm text-gray-500">
              {point.participants}명 참여중
            </span>
          </div>
        ))}
      </div>
      {/*TODO 추후 낚시 포인트 채팅 추가*/}
      {/*<Link*/}
      {/*  href="/chat-spot"*/}
      {/*  className="mt-4 text-sm text-blue-500 hover:text-blue-600 flex items-center"*/}
      {/*>*/}
      {/*  채팅방 참여하기*/}
      {/*  <ChevronRight className="h-4 w-4 ml-1" />*/}
      {/*</Link>*/}
    </div>
  );
};

export default ActiveChatPointCard;
