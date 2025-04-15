"use client";

import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import {
  CursorRequestParams,
  getFishingPostsByCursor,
  Post as ApiPost,
} from "@/lib/api/fishingPostAPI";
import { PostFilter } from "./TabSection";
import { getRegions, getFishingRegion } from "@/lib/api/fishingPointAPI";
import { FishingPointLocation } from "@/types/fishingPointLocationType";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [cursorId, setCursorId] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState<string | null>(null);

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

  const loadPosts = async (resetPosts = true) => {
    try {
      setLoading(true);

      const params = {
        order: "desc",
        sort: sortType,
        type: "next",
        fieldValue: fieldValue,
        id: cursorId,
        size: pageSize,
        status:
          filter === "recruiting"
            ? "RECRUITING"
            : filter === "completed"
            ? "COMPLETED"
            : undefined,
        keyword: searchKeyword || undefined,
        regionId: selectedRegion !== "all" ? selectedRegion : undefined,
      } as CursorRequestParams;

      const response = await getFishingPostsByCursor(params);

      if (response.success) {
        const newPosts = response.data.content;
        console.log(
          `게시물 ${
            newPosts?.length || 0
          }개를 불러왔습니다. (필터: ${filter}, 검색어: ${
            searchKeyword || "없음"
          }, 지역: ${selectedRegion})`
        );

        if (newPosts && newPosts.length > 0) {
          if (resetPosts) {
            setPosts(newPosts);
          } else {
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          }

          // 커서 업데이트 (마지막 아이템 기준)
          if (newPosts.length > 0) {
            const lastPost = newPosts[newPosts.length - 1];
            console.log('왜 안들어와?');
            console.log(lastPost);
            if (sortType === 'createdAt') {
              setFieldValue(lastPost.createdAt);
              console.log(fieldValue);
            } else {
              setFieldValue(lastPost.popularityScore.toString());
              console.log(fieldValue);
            }
            setCursorId(lastPost.fishingTripPostId.toString());
          }

          // 더 불러올 데이터가 있는지 확인
          setHasMore(!response.data.isLast);
        } else {
          if (resetPosts) {
            setPosts([]);
          }
          setHasMore(false);
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
    setCursorId(null);
    setHasMore(true);
    loadPosts();
  }, [filter, searchKeyword, selectedRegion, sortType]);

  const handleSortChange = (newSortType: SortType) => {
    if (sortType === 'createdAt' && newSortType !== 'createdAt') {
      setFieldValue(null);
    } else {
      setFieldValue(null);
    }
    setSortType(newSortType);
  };

  const handleLoadMore = () => {
    loadPosts(false);
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

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleLoadMore}
            disabled={loading}
          >
            <span>{loading ? "불러오는 중..." : "더보기"}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}