"use client";

import { useState, useEffect } from "react";
import { getHotFishingPosts } from "@/lib/api/fishingPostAPI";
import { HotPostCard } from "./HotPostCard";

interface HotPost {
  fishingTripPostId: number;
  name: string;
  subject: string;
  content: string;
  currentCount: number;
  recruitmentCount: number;
  createDate: string;
  fishingDate: string;
  fishPointDetailName: string;
  fishPointName: string;
  longitude: number;
  latitude: number;
  fileUrlList: string[];
  postStatus: string;
  views: number;
  likes: number;
  comments: number;
}

interface MockResponse {
  timestamp: string;
  data: {
    fishingTripPostId: number;
    name: string;
    subject: string;
    content: string;
    currentCount: number;
    recruitmentCount: number;
    createDate: string;
    fishingDate: string;
    fishPointDetailName: string;
    fishPointName: string;
    longitude: number;
    latitude: number;
    fileUrlList: string[];
    postStatus: string;
  };
  success: boolean;
}

export function HotPost() {
  const [hotPosts, setHotPosts] = useState<HotPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getHotFishingPosts();

        // API 응답 처리
        if (response && Array.isArray(response)) {
          // 응답이 배열인 경우 (목업 데이터 구조)
          const posts = response.map((item: MockResponse) => ({
            ...item.data,
            views: 0,
            likes: 0,
            comments: 0,
          }));
          setHotPosts(posts);
        } else {
          setError("핫포스트를 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("핫포스트 로딩 중 오류:", err);
        setError("핫포스트를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">핫포스트를 불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">{error}</div>
        <div className="text-sm text-gray-500">
          오류가 발생했습니다. 페이지를 새로고침해주세요.
        </div>
      </div>
    );
  }

  if (hotPosts.length === 0) {
    return <div className="text-center py-8">핫포스트가 없습니다.</div>;
  }

  return (
    <div className="mb-12 relative">
      {/* 섹션 헤더 */}
      <div className="relative py-8 mb-8">
        {/* 배경 그라데이션 효과 - 제목 섹션에만 적용 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-50 opacity-50" />
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-3" />

        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="space-y-1 text-center">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <div className="relative">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-600 animate-pulse"
                >
                  <path
                    d="M12 2L14.5 8.5L21 10L16.5 15L17.5 22L12 19L6.5 22L7.5 15L3 10L9.5 8.5L12 2Z"
                    fill="currentColor"
                  />
                </svg>
                <div className="absolute -inset-1 bg-blue-100 rounded-full blur-sm opacity-50" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                지금 뜨는 동출 모집
              </span>
            </h2>
            <p className="text-sm text-gray-500">
              가장 많은 관심을 받고 있는 낚시 모임을 확인해보세요
            </p>
          </div>
        </div>
      </div>

      {/* 카드 그리드 - HotPostCard 컴포넌트 사용 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {hotPosts.map((post) => (
          <HotPostCard key={post.fishingTripPostId} post={post} />
        ))}
      </div>
    </div>
  );
}
