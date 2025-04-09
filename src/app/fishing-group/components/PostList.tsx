"use client";

import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import { getFishingPosts } from "@/lib/api/fishingPostAPI";
import { PostFilter } from "./TabSection";

interface Post {
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
}

interface PostResponse {
  timestamp: string;
  data: Post;
  success: boolean;
}

interface PostListProps {
  filter: PostFilter;
}

export function PostList({ filter }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // 초기 파라미터 설정
        const initialParams = {
          order: "desc",
          sort: "createdAt",
          type: "next",
          fieldValue: new Date().toISOString(), // 현재 시간 ISO 문자열
          id: 0, // 초기 ID (혹은 null, API 명세 확인 필요)
          size: 10,
        };
        const response = await getFishingPosts(initialParams);

        // API 응답 구조에 맞게 데이터 처리 (중요: 실제 응답 구조 확인 필요)
        if (response.success && Array.isArray(response.data.content)) {
          setPosts(response.data.content);
        } else {
          setError("게시글을 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("게시글 로딩 중 오류:", err);
        setError("게시글을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

  // 필터링된 게시글 목록
  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "recruiting") return post.postStatus === "모집중";
    if (filter === "completed") return post.postStatus === "모집완료";
    return true;
  });

  if (filteredPosts.length === 0) {
    return <div className="text-center py-8">게시글이 없습니다.</div>;
  }

  return (
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
          isRecruiting={post.postStatus === "모집중"}
          currentCount={post.currentCount}
          recruitmentCount={post.recruitmentCount}
          fishPointName={post.fishPointName}
          fileUrlList={post.fileUrlList}
          postStatus={post.postStatus}
        />
      ))}
    </div>
  );
}
