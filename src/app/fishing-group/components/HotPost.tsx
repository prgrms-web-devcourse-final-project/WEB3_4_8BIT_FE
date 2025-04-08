"use client";

import { useState, useEffect } from "react";
import { getHotFishingPosts } from "@/lib/api/fishingPostAPI";
import { HotPostCard } from "./HotPostCard";

interface HotPost {
  fishingTripPostId: number;
  subject: string;
  content: string;
  fishingDate: string;
  fishPointName: string;
  fishPointDetailName: string;
  currentCount: number;
  recruitmentCount: number;
  fileUrlList: string[];
  postStatus: string;
  views: number;
  likes: number;
  comments: number;
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

        console.log("핫포스트 목록 요청 시작");

        const data = await getHotFishingPosts();
        console.log("핫포스트 목록 응답:", data);
        setHotPosts(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("핫포스트 로딩 중 오류:", err);
        setError(
          err instanceof Error
            ? `오류: ${err.message}`
            : "알 수 없는 오류가 발생했습니다."
        );
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
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          지금 <span className="text-primary">HOT</span>한 동출 모집
        </h2>
        <p className="text-gray-600 text-base">
          조회수와 좋아요가 높은 인기 동출 모집글을 모아봤어요
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {hotPosts.map((post) => (
          <HotPostCard key={post.fishingTripPostId} post={post} />
        ))}
      </div>
    </section>
  );
}
