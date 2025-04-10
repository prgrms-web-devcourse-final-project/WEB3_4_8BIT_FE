"use client";

import { PostCard } from "./PostCard";
import { useState, useEffect, useCallback } from "react";
import {
  getFishingPostsByCursor,
  CursorRequestParams,
  Post as ApiPost,
} from "@/lib/api/fishingPostAPI";
import { PostFilter } from "./TabSection";
import axios from "axios";
import { SearchBar } from "./SearchBar";

// interface Post extends ApiPost {
//   // 로컬에서만 사용하는 추가 속성 (필요한 경우)
// }

// interface ApiResponseData {
//   content: Post[];
//   last: boolean;
// }

interface PostListProps {
  filter: PostFilter;
}

const PAGE_SIZE = 10;

export function PostList({ filter }: PostListProps) {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [keyword, setKeyword] = useState<string>("");

  const [nextFieldValue, setNextFieldValue] = useState<string | null>(null);
  const [nextId, setNextId] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setKeyword(searchTerm);
    setPosts([]);
    setNextFieldValue(null);
    setNextId(null);
    setHasNextPage(true);
    loadAllPosts();
  };

  const loadPosts = async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      // 마지막 게시물의 정보를 가져옵니다
      const lastPost = posts.length > 0 ? posts[posts.length - 1] : null;

      // API 호출 파라미터 설정
      const params = {
        order: "desc",
        sort: "createdAt",
        type: "next",
        fieldValue: isInitialLoad ? null : lastPost?.createDate || null,
        id: isInitialLoad ? null : lastPost?.fishingTripPostId || null,
        size: PAGE_SIZE,
        status:
          filter === "recruiting"
            ? "RECRUITING"
            : filter === "completed"
            ? "COMPLETED"
            : undefined,
        keyword: keyword || undefined,
      };

      console.log("API 호출 파라미터:", params);
      const response = await getFishingPostsByCursor(params);
      console.log("API 응답:", response);

      if (response.success) {
        const newPosts = response.data.content;
        console.log("새로 받은 게시물:", newPosts);

        if (newPosts && newPosts.length > 0) {
          // 게시물 상태 업데이트 - 중복 체크 없이 바로 추가
          setPosts((prevPosts) =>
            isInitialLoad ? newPosts : [...prevPosts, ...newPosts]
          );

          // 다음 페이지 존재 여부 확인
          setHasNextPage(!response.data.last);
        } else {
          console.log("새로운 게시물이 없습니다.");
          setHasNextPage(false);
        }
      }
    } catch (error) {
      console.error("게시물 로드 중 오류 발생:", error);
      setError("게시물을 불러오는데 실패했습니다.");
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

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
        keyword: keyword || undefined,
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
          setHasNextPage(false); // 모든 게시물을 가져왔으므로 더보기 버튼 숨김
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
    setNextFieldValue(null);
    setNextId(null);
    setHasNextPage(true);
    loadAllPosts();
  }, [filter, keyword]);

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
    if (filter === "all") return true;
    if (filter === "recruiting" && post.postStatus === "RECRUITING")
      return true;
    if (filter === "completed" && post.postStatus === "COMPLETED") return true;
    return false;
  });

  if (filteredPosts.length === 0) {
    return <div className="text-center py-8">게시글이 없습니다.</div>;
  }

  return (
    <div className="space-y-4">
      <SearchBar handleSearch={handleSearch} />
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
