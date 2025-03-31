"use client";

import { HotPostsSection } from "./components/HotPostsSection";

// 테스트용 데이터
const hotPosts = [
  {
    id: 1,
    image: "/images/test.png",
    title: "제주도 서귀포시에서 참돔 낚시하실 분",
    status: "모집중",
    location: "제주시 서귀포시",
  },
  {
    id: 2,
    image: "/images/test.png",
    title: "부산 기장 감성돔 낚시 동출 구해요",
    status: "모집중",
    location: "부산시 기장군",
  },
  {
    id: 3,
    image: "/images/test.png",
    title: "여수 방파제 갑오징어 낚시 함께해요",
    status: "모집완료",
    location: "전라남도 여수시",
  },
  {
    id: 4,
    image: "/images/test.png",
    title: "강원도 속초 방어 낚시 동출 모집",
    status: "모집중",
    location: "강원도 속초시",
  },
  {
    id: 5,
    image: "/images/test.png",
    title: "인천 영종도 우럭 낚시 동출 구합니다",
    status: "모집중",
    location: "인천시 중구",
  },
];

export default function FishingGroupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HotPostsSection posts={hotPosts} />
    </div>
  );
}
