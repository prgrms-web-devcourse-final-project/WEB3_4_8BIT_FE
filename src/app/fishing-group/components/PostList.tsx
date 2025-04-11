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
  const [regions, setRegions] = useState<FishingPointLocation[]>([]);
  const [fishingPoints, setFishingPoints] = useState<{
    [key: string]: number[];
  }>({});

  // 지역 정보 가져오기
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regionsData = await getRegions();
        setRegions(regionsData);

        // 각 지역의 낚시 포인트 정보 미리 가져오기
        const pointsMap: { [key: string]: number[] } = {};
        for (const region of regionsData) {
          try {
            const points = await getFishingRegion(region.regionId);
            pointsMap[region.regionId] = points.map(
              (point) => point.fishPointId
            );
          } catch (error) {
            console.error(
              `지역 ${region.regionId}의 낚시 포인트를 가져오는데 실패했습니다:`,
              error
            );
            pointsMap[region.regionId] = [];
          }
        }
        setFishingPoints(pointsMap);
      } catch (error) {
        console.error("지역 정보를 불러오는데 실패했습니다:", error);
      }
    };

    fetchRegions();
  }, []);

  const loadAllPosts = async () => {
    console.log("=== loadAllPosts 함수 실행 ===");
    console.log("API 요청 파라미터:", {
      filter,
      searchKeyword,
      selectedRegion,
    });
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

      console.log("=== 게시물 로드 시작 ===");
      console.log("선택된 지역 ID:", selectedRegion);
      console.log("API 요청 파라미터:", JSON.stringify(params, null, 2));

      const response = await getFishingPostsByCursor(params);
      console.log("API 응답:", JSON.stringify(response, null, 2));

      if (response.success) {
        const allPosts = response.data.content;
        console.log("필터링된 게시물 수:", allPosts?.length || 0);
        console.log("=== 게시물 로드 완료 ===");

        if (allPosts && allPosts.length > 0) {
          setPosts(allPosts);
        } else {
          console.log("게시물이 없습니다.");
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
    console.log("=== PostList useEffect 트리거 ===");
    console.log("현재 필터:", filter);
    console.log("현재 검색어:", searchKeyword);
    console.log("현재 선택된 지역:", selectedRegion);
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
