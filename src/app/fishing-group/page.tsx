"use client";

import { useState } from "react";
import Image from "next/image";
import { HotPost } from "./components/HotPost";
import { TabSection } from "./components/TabSection";
import { SearchBar } from "./components/SearchBar";
import { PostList } from "./components/PostList";
import { PostFilter } from "./components/TabSection";

// 테스트용 데이터
const hotPosts = [
  {
    fishingTripPostId: 1,
    subject: "제주도 서귀포시에서 참돔 낚시하실 분",
    content:
      "제주도 서귀포시에서 참돔 낚시하실 분 구합니다. 함께 즐거운 낚시 여행을 떠나요!",
    fishingDate: "2024-07-15",
    fishPointName: "서귀포시",
    fishPointDetailName: "제주시 서귀포시",
    currentCount: 2,
    recruitmentCount: 4,
    fileUrlList: ["/images/test.png"],
    postStatus: "모집중",
    views: 120,
    likes: 15,
    comments: 8,
  },
  {
    fishingTripPostId: 2,
    subject: "부산 기장 감성돔 낚시 동출 구해요",
    content:
      "부산 기장에서 감성돔 낚시 동출 구합니다. 함께 즐거운 낚시 여행을 떠나요!",
    fishingDate: "2024-07-20",
    fishPointName: "기장군",
    fishPointDetailName: "부산시 기장군",
    currentCount: 3,
    recruitmentCount: 5,
    fileUrlList: ["/images/test.png"],
    postStatus: "모집중",
    views: 98,
    likes: 12,
    comments: 5,
  },
  {
    fishingTripPostId: 3,
    subject: "여수 방파제 갑오징어 낚시 함께해요",
    content:
      "여수 방파제에서 갑오징어 낚시 함께해요. 함께 즐거운 낚시 여행을 떠나요!",
    fishingDate: "2024-06-10",
    fishPointName: "여수시",
    fishPointDetailName: "전라남도 여수시",
    currentCount: 4,
    recruitmentCount: 4,
    fileUrlList: ["/images/test.png"],
    postStatus: "모집완료",
    views: 150,
    likes: 20,
    comments: 10,
  },
  {
    fishingTripPostId: 4,
    subject: "강원도 속초 방어 낚시 동출 모집",
    content:
      "강원도 속초에서 방어 낚시 동출 모집합니다. 함께 즐거운 낚시 여행을 떠나요!",
    fishingDate: "2024-08-05",
    fishPointName: "속초시",
    fishPointDetailName: "강원도 속초시",
    currentCount: 1,
    recruitmentCount: 3,
    fileUrlList: ["/images/test.png"],
    postStatus: "모집중",
    views: 85,
    likes: 8,
    comments: 3,
  },
  {
    fishingTripPostId: 5,
    subject: "인천 영종도 우럭 낚시 동출 구합니다",
    content:
      "인천 영종도에서 우럭 낚시 동출 구합니다. 함께 즐거운 낚시 여행을 떠나요!",
    fishingDate: "2024-07-25",
    fishPointName: "중구",
    fishPointDetailName: "인천시 중구",
    currentCount: 2,
    recruitmentCount: 4,
    fileUrlList: ["/images/test.png"],
    postStatus: "모집중",
    views: 110,
    likes: 14,
    comments: 6,
  },
];

export default function FishingGroupPage() {
  const [activeFilter, setActiveFilter] = useState<PostFilter>("all");

  return (
    <>
      <div className="w-full h-[350px] relative">
        <Image
          src="/images/banner.jpg"
          alt="낚시 배너"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <HotPost />
        <SearchBar />
        <TabSection onFilterChange={setActiveFilter} />
        <PostList filter={activeFilter} />
      </div>
    </>
  );
}
