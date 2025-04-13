"use client";

import { useState } from "react";
import Image from "next/image";
import { HotPost } from "./components/HotPost";
import { TabSection } from "./components/TabSection";
import { SearchBar } from "./components/SearchBar";
import { PostList } from "./components/PostList";
import { PostFilter } from "./components/TabSection";
import Link from "next/link";

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
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const handleSearch = (searchTerm: string) => {
    console.log("검색어:", searchTerm);
    setSearchKeyword(searchTerm);
  };

  const handleRegionChange = (regionId: string) => {
    console.log("선택된 지역:", regionId);
    setSelectedRegion(regionId);
  };

  return (
    <>
      {/* Hero Section with Overlay */}
      <div className="w-full h-[500px] relative overflow-hidden">
        <Image
          src="/images/banner.jpg"
          alt="낚시 배너"
          fill
          className="object-cover brightness-75 scale-105 transition-transform duration-10000 hover:scale-110"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-[#bdd4fe] to-[#4a7ede] rounded-full"></div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 pl-8 tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                <span className="inline-block animate-fade-in-up">
                  함께하는
                </span>{" "}
                <span className="text-[#bdd4fe] drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] inline-block animate-fade-in-up animation-delay-200">
                  낚시 동출
                </span>
              </h1>
            </div>
            <div className="relative pl-8">
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-loose drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                <span className="inline-block animate-fade-in-up animation-delay-300">
                  전국 어디든 낚시 메이트를 찾아 떠나는 여정!
                </span>{" "}
                <br />
                <span className="text-[#9abbf9] font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] inline-block animate-fade-in-up animation-delay-400">
                  오늘의 출조
                </span>
                <span className="italic drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] inline-block animate-fade-in-up animation-delay-500">
                  , 혼자가 아닌 우리의 시간으로.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2"></div>
          <HotPost />
        </div>

        <div className="bg-white rounded-2xl p-5">
          <TabSection onFilterChange={setActiveFilter} />
          <SearchBar
            handleSearch={handleSearch}
            onRegionChange={handleRegionChange}
          />
        </div>

        <div className="bg-white rounded-2xl p-6">
          <PostList
            filter={activeFilter}
            searchKeyword={searchKeyword}
            selectedRegion={selectedRegion}
          />
        </div>
      </div>
    </>
  );
}
