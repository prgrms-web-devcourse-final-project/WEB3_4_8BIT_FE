"use client";

import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import {
  getFishingPostsByCursor,
  Post as ApiPost,
} from "@/lib/api/fishingPostAPI";
import { PostFilter } from "./TabSection";

interface PostListProps {
  filter: PostFilter;
  searchKeyword?: string;
}

const PAGE_SIZE = 10;

export function PostList({ filter, searchKeyword = "" }: PostListProps) {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadAllPosts = async () => {
    try {
      setIsLoading(true);
      setLoading(true);

      // 모든 게시물을 가져오기 위한 파라미터 설정
      const params = {
        order: "desc",
        sort: "createdAt",
        type: "all", // 'all'로 설정하여 모든 게시물을 가져옵니다
        fieldValue: null,
        id: null,
        size: 100, // 더 큰 크기로 설정하여 한 번에 더 많은 게시물을 가져옵니다
        status:
          filter === "recruiting"
            ? "RECRUITING"
            : filter === "completed"
            ? "COMPLETED"
            : undefined,
        keyword: searchKeyword || undefined,
      };

      console.log("모든 게시물 로드 파라미터:", params);
      const response = await getFishingPostsByCursor(params);
      console.log("모든 게시물 로드 응답:", response);

      if (response.success) {
        const allPosts = response.data.content;
        console.log("모든 게시물:", allPosts);

        if (allPosts && allPosts.length > 0) {
          // 게시물 상태 업데이트
          setPosts(allPosts);
        } else {
          console.log("게시물이 없습니다.");
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
  }, [filter, searchKeyword]);

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

    // 검색어 조건 확인 (제목에 검색어가 포함되어 있는지)
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
            currentCount={post.currentCount}
            recruitmentCount={post.recruitmentCount}
            fishPointName={post.fishPointName}
            fileUrlList={post.fileUrlList}
            imageUrl={post.imageUrl}
            postStatus={post.postStatus}
          />
        ))}
      </div>
    </div>
  );
}
