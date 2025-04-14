"use client";

import { useState, useEffect } from "react";
import { getHotFishingPosts } from "@/lib/api/fishingPostAPI";
import { HotPostCard } from "./HotPostCard";
import { convertRegionTypeToKorean } from "@/lib/utils/regionUtils";

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
  likeCount: number;
  commentCount: number;
  regionType?: string;
}

// API 응답 인터페이스
interface HotPostResponse {
  fishingTripPostId: number;
  subject: string;
  regionId: number;
  regionType: string;
  imageUrl: string | null;
  hotScore: number;
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
        if (Array.isArray(response)) {
          // API 응답을 HotPost 형식으로 변환
          const transformedPosts: HotPost[] = response.map(
            (post: HotPostResponse) => {
              // 지역 이름은 regionType에서 직접 변환
              const regionName = convertRegionTypeToKorean(post.regionType);

              return {
                fishingTripPostId: post.fishingTripPostId,
                name: "", // 기본값 설정
                subject: post.subject,
                content: "", // 기본값 설정
                currentCount: 0, // 기본값 설정
                recruitmentCount: 0, // 기본값 설정
                createDate: new Date().toISOString(), // 기본값 설정
                fishingDate: new Date().toISOString(), // 기본값 설정
                fishPointDetailName: "", // 기본값 설정
                fishPointName: regionName, // 지역 이름 사용
                longitude: 0, // 기본값 설정
                latitude: 0, // 기본값 설정
                fileUrlList: post.imageUrl ? [post.imageUrl] : [], // 이미지 URL을 fileUrlList로 변환
                postStatus: "RECRUITING", // 기본값 설정
                likeCount: post.hotScore, // hotScore를 likeCount로 사용
                commentCount: 0, // 기본값 설정
                regionType: post.regionType, // regionType 추가
              };
            }
          );

          setHotPosts(transformedPosts);
        } else {
          setError("데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("핫 포스트를 가져오는 중 오류 발생:", error);
        setError("핫 포스트를 불러오는데 실패했습니다.");
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
      <div className="relative py-4 mb-8">
        {/* 배경 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-50 opacity-50" />
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-3" />

        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="space-y-2 text-center">
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
            </h2>
            <p className="text-sm text-gray-500">
              가장 많은 관심을 받고 있는 낚시 모임을 확인해보세요
            </p>
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {hotPosts.map((post) => (
          <HotPostCard key={post.fishingTripPostId} post={post} />
        ))}
      </div>
    </div>
  );
}
