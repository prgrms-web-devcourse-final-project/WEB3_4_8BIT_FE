"use client";

import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import {
  getFishingPostsByCursor,
  Post as ApiPost,
} from "@/lib/api/fishingPostAPI";
import { PostFilter } from "./TabSection";
import { getRegions, getFishingRegion } from "@/lib/api/fishingPointAPI";
import { FishingPointLocation } from "@/types/fishingPointLocationType";
import { useQuery } from "@tanstack/react-query";

interface PostListProps {
  filter: PostFilter;
  searchKeyword?: string;
  selectedRegion?: string;
}

const PAGE_SIZE = 10;

export function PostList({
  filter,
  searchKeyword = "",
  selectedRegion = "all",
}: PostListProps) {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 지역 정보를 TanStack Query로 가져오기
  const { data: regionsData = [] } = useQuery<FishingPointLocation[]>({
    queryKey: ["regions"],
    queryFn: async () => {
      try {
        const regions = await getRegions();
        return regions;
      } catch (error) {
        console.error("지역 정보를 불러오는데 실패했습니다:", error);
        return [];
      }
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  useQuery<{ [key: string]: number[] }>({
    queryKey: ["fishingPoints", regionsData.map((region) => region.regionId)],
    queryFn: async () => {
      const pointsMap: { [key: string]: number[] } = {};

      for (const region of regionsData) {
        try {
          const points = await getFishingRegion(region.regionId);
          pointsMap[region.regionId] = points.map((point) => point.fishPointId);
        } catch (error) {
          console.error(
            `지역 ${region.regionId}의 낚시 포인트를 가져오는데 실패했습니다:`,
            error
          );
          pointsMap[region.regionId] = [];
        }
      }

      return pointsMap;
    },
    enabled: regionsData.length > 0,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  const loadAllPosts = async () => {
    try {
      setIsLoading(true);
      setLoading(true);

      // 모든 게시물을 가져오기 위한 파라미터 설정
      const params = {
        order: "desc",
        sort: "createdAt",
        type: "all",
        fieldValue: null,
        id: null,
        size: 100,
        status:
          filter === "recruiting"
            ? "RECRUITING"
            : filter === "completed"
            ? "COMPLETED"
            : undefined,
        keyword: searchKeyword || undefined,
        regionId: selectedRegion !== "all" ? selectedRegion : undefined,
      };

      const response = await getFishingPostsByCursor(params);

      if (response.success) {
        const allPosts = response.data.content;
        console.log(
          `게시물 ${
            allPosts?.length || 0
          }개를 불러왔습니다. (필터: ${filter}, 검색어: ${
            searchKeyword || "없음"
          }, 지역: ${selectedRegion})`
        );

        if (allPosts && allPosts.length > 0) {
          setPosts(allPosts);
        } else {
          setPosts([]);
        }
      }
    } catch (error) {
      console.error("모든 게시물 로드 중 오류 발생:", error);
      setError("게시물을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    loadAllPosts();
  }, [filter, searchKeyword, selectedRegion]);

  if (loading) {
    return <div className="text-center py-8">게시글을 불러오는 중...</div>;
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

  const filteredPosts = posts.filter((post) => {
    // 필터 조건 확인
    const filterMatch =
      filter === "all" ||
      (filter === "recruiting" && post.postStatus === "RECRUITING") ||
      (filter === "completed" && post.postStatus === "COMPLETED");

    // 검색어 조건 확인
    const searchMatch =
      !searchKeyword ||
      post.subject.toLowerCase().includes(searchKeyword.toLowerCase());

    return filterMatch && searchMatch;
  });

  if (filteredPosts.length === 0) {
    return <div className="text-center py-8">게시글이 없습니다.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="w-full bg-white">
        {filteredPosts.map((post, index) => (
          <PostCard
            key={`${post.fishingTripPostId}-${index}`}
            fishingTripPostId={post.fishingTripPostId}
            title={post.subject}
            content={post.content}
            date={new Date(post.fishingDate).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            location={post.fishPointDetailName}
            recruitmentCount={post.recruitmentCount}
            fishPointName={post.fishPointName}
            fileUrlList={post.fileUrlList}
            imageUrl={post.imageUrl}
            postStatus={post.postStatus}
            latitude={post.latitude}
            longitude={post.longitude}
            regionType={post.regionType}
          />
        ))}
      </div>
    </div>
  );
}
