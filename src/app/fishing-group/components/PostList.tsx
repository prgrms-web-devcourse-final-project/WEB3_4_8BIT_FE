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

  const [nextFieldValue, setNextFieldValue] = useState<string | null>(null);
  const [nextId, setNextId] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = useCallback(
    async (isInitialLoad = false) => {
      console.log("loadPosts called", {
        isInitialLoad,
        loadingMore,
        hasNextPage,
      });
      if (loadingMore || (!isInitialLoad && !hasNextPage)) {
        console.log("loadPosts early return", { loadingMore, hasNextPage });
        return;
      }

      if (isInitialLoad) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      try {
        let statusParam: string | undefined = undefined;
        if (filter === "recruiting") {
          statusParam = "RECRUITING";
        } else if (filter === "completed") {
          statusParam = "COMPLETED";
        }

        const params = {
          order: "desc",
          sort: "createdAt",
          type: "next",
          fieldValue: isInitialLoad ? null : nextFieldValue,
          id: isInitialLoad ? null : nextId,
          size: PAGE_SIZE,
          status: statusParam,
        };

        console.log("API request params:", params);

        const filteredParams: CursorRequestParams = {
          order: params.order,
          sort: params.sort,
          type: params.type,
          fieldValue: params.fieldValue,
          id: params.id,
          size: params.size,
          status: params.status,
        };

        const requestParams = Object.fromEntries(
          Object.entries(filteredParams).filter(([, v]) => v != null)
        ) as Partial<CursorRequestParams>;

        console.log("Filtered request params:", requestParams);

        const response = await getFishingPostsByCursor(
          requestParams as CursorRequestParams
        );

        console.log("API response:", response);

        if (response.success) {
          const newPosts: ApiPost[] = response.data.content;
          const isLastPage = response.data.last ?? false;

          console.log("New posts:", newPosts);
          console.log("Is last page:", isLastPage);

          if (newPosts.length > 0) {
            setPosts((prevPosts: ApiPost[]) =>
              isInitialLoad ? newPosts : [...prevPosts, ...newPosts]
            );

            const lastPost = newPosts[newPosts.length - 1];
            setNextFieldValue(lastPost.createdAt);
            setNextId(lastPost.fishingTripPostId);
          } else {
            setHasNextPage(false);
          }

          if (isLastPage) {
            setHasNextPage(false);
          }
        } else {
          setError("게시글을 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("게시글 로딩 중 오류:", err);
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("인증 오류가 발생했습니다. 다시 로그인해주세요.");
        } else {
          setError("게시글을 불러오는데 실패했습니다.");
        }
      } finally {
        if (isInitialLoad) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
      }
    },
    [loadingMore, hasNextPage, nextFieldValue, nextId, filter]
  );

  const loadAllPosts = async () => {
    try {
      setIsLoading(true);
      let allPosts: ApiPost[] = [];
      let currentParams: CursorRequestParams = {
        order: "desc",
        sort: "createdAt",
        type: "next",
        fieldValue: null,
        id: null,
        size: PAGE_SIZE,
      };

      while (true) {
        const response = await getFishingPostsByCursor(currentParams);
        const newPosts = response.data.content;

        if (!newPosts || newPosts.length === 0) {
          break;
        }

        allPosts = [...allPosts, ...newPosts];

        // Update cursor for next request
        currentParams = {
          ...currentParams,
          fieldValue: newPosts[newPosts.length - 1].createdAt,
          id: newPosts[newPosts.length - 1].fishingTripPostId,
        };

        // If this is the last page, break
        if (response.data.isLast) {
          break;
        }
      }

      // Update state with all posts
      setPosts(allPosts);
      setHasNextPage(false);
    } catch (error) {
      console.error("Error loading all posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setNextFieldValue(null);
    setNextId(null);
    setHasNextPage(true);
    loadPosts(true);
  }, [filter]);

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

  if (filteredPosts.length === 0 && !hasNextPage) {
    return <div className="text-center py-8">게시글이 없습니다.</div>;
  }

  const renderLoadAllButton = () => {
    if (isLoading) return null;

    return (
      <button
        onClick={loadAllPosts}
        className="w-full py-2 text-sm text-gray-600 hover:text-gray-900"
      >
        전체 게시글 불러오기
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {renderLoadAllButton()}
      <div className="w-full bg-white">
        {filteredPosts.map((post) => (
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
            currentCount={post.currentCount}
            recruitmentCount={post.recruitmentCount}
            fishPointName={post.fishPointName}
            fileUrlList={post.fileUrlList}
            imageUrl={post.imageUrl}
            postStatus={post.postStatus}
          />
        ))}
      </div>
      {hasNextPage && (
        <div className="text-center py-4">
          <button
            onClick={() => loadPosts(false)}
            disabled={loadingMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loadingMore ? "로딩 중..." : "더 보기"}
          </button>
        </div>
      )}
    </div>
  );
}
