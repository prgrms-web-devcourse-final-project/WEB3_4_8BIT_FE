"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BoatCard from "@/components/BoatCard";
import SearchBox from "@/app/boat-reservation/components/SearchBox";
import FilterBox from "@/app/boat-reservation/components/FilterBox";
import { useEffect, useState } from "react";
import { PostType } from "@/types/boatPostType";

// 더미 데이터
const dummyBoats: PostType[] = [
  {
    subject: "빵빵이호 낚시 투어",
    price: 80000,
    location: "부산 기장군",
    startTime: "15:00",
    endTime: "17:30",
    durationTime: "02:30",
    shipFishingPostId: 1,
    imageList: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    fishList: [1, 2, 3],
    reviewEverRate: 5.0,
    reviewCount: 31,
  },
  {
    subject: "옥지호 바다 낚시",
    price: 120000,
    location: "제주 서귀포시",
    startTime: "09:00",
    endTime: "12:00",
    durationTime: "03:00",
    shipFishingPostId: 2,
    imageList: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    fishList: [2, 4, 5],
    reviewEverRate: 4.0,
    reviewCount: 36,
  },
  {
    subject: "김노엠호 낚시 투어",
    price: 60000,
    location: "인천 옹진군",
    startTime: "13:00",
    endTime: "16:00",
    durationTime: "03:00",
    shipFishingPostId: 3,
    imageList: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    fishList: [1, 3, 6],
    reviewEverRate: 4.5,
    reviewCount: 14,
  },
  {
    subject: "제갈제니호 낚시",
    price: 100000,
    location: "강원 속초시",
    startTime: "10:00",
    endTime: "14:00",
    durationTime: "04:00",
    shipFishingPostId: 4,
    imageList: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    fishList: [2, 5, 7],
    reviewEverRate: 2.5,
    reviewCount: 32,
  },
];

// 더미 API 함수
const fetchBoats = async (): Promise<PostType[]> => {
  // 실제 API 호출처럼 지연 시간 추가
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyBoats;
};

export default function BoatReservation() {
  const [boats, setBoats] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoats = async () => {
      try {
        const data = await fetchBoats();
        setBoats(data);
      } catch (err) {
        console.error("선박 정보를 불러오는데 실패했습니다.", err);
      } finally {
        setLoading(false);
      }
    };

    loadBoats();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-sky-700 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">선상 낚시 예약</h1>
          <p className="text-lg text-cyan-100 max-w-3xl">
            전국 각지의 선상 낚시를 검색하고 예약해보세요!
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SearchBox />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterBox />
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">검색 결과 ({boats.length})</h2>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">추천순</SelectItem>
                  <SelectItem value="price-low">가격 낮은순</SelectItem>
                  <SelectItem value="price-high">가격 높은순</SelectItem>
                  <SelectItem value="rating">평점 높은순</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="text-center py-8">로딩 중...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {boats.map((boat) => (
                  <BoatCard key={boat.shipFishingPostId} boatData={boat} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
