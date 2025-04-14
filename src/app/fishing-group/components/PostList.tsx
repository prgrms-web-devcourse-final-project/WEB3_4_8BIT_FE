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
import { Button } from "@/components/ui/button";

interface PostListProps {
  filter: PostFilter;
  searchKeyword?: string;
  selectedRegion?: string;
}

type SortType = "createdAt" | "popularity";

export function PostList({
  filter,
  searchKeyword = "",
  selectedRegion = "all",
}: PostListProps) {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>("createdAt");

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

  const loadPosts = async () => {
    try {
      setLoading(true);

      const params = {
        order: "desc",
        sort: sortType,
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
      console.error("게시물 로드 중 오류 발생:", error);
      setError("게시물을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    loadPosts();
  }, [filter, searchKeyword, selectedRegion, sortType]);

  const handleSortChange = (newSortType: SortType) => {
    setSortType(newSortType);
  };

  if (loading && posts.length === 0) {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-2 mb-4">
        <Button
          className="cursor-pointer"
          variant={sortType === "createdAt" ? "default" : "outline"}
          onClick={() => handleSortChange("createdAt")}
        >
          최신순
        </Button>
        <Button
          className="cursor-pointer"
          variant={sortType === "popularity" ? "default" : "outline"}
          onClick={() => handleSortChange("popularity")}
        >
          인기순
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.fishingTripPostId}
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
            regionType={post.regionType || undefined}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            commentCount={post.commentCount}
          />
        ))}
      </div>
    </div>
  );
}
