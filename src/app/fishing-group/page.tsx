"use client";

import { HotPostCard } from "./components/HotPostCard";

// 테스트용 데이터
const testPost = {
  id: 1,
  image:
    "https://images.unsplash.com/photo-1593811167562-9cef47bfc2b7?q=80&w=1000&auto=format&fit=crop",
  title: "주말 낚시 같이 가실 분 구합니다",
  status: "모집중",
  location: "서울시 강남구",
};

export default function FishingGroupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-[300px]">
        <HotPostCard post={testPost} />
      </div>
    </div>
  );
}
