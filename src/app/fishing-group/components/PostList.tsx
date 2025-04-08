"use client";

import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import { getFishingPosts } from "@/lib/api/fishingPostAPI";
import { PostFilter } from "./TabSection";

interface Post {
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
        setError(null);

        console.log("게시글 목록 요청 시작");

        // API 함수를 사용하여 게시글 목록 가져오기
        const data = await getFishingPosts();

        console.log("게시글 목록 응답:", data);
        setPosts(Array.isArray(data) ? data : [data]); // 응답이 배열이 아닐 경우 배열로 변환
      } catch (err) {
        console.error("게시글 로딩 중 오류:", err);
        setError(
          err instanceof Error
            ? `오류: ${err.message}`
            : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 필터링된 게시글 목록
  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "recruiting") return post.postStatus === "모집중";
    if (filter === "completed") return post.postStatus === "모집완료";
    return true;
  });

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

  if (filteredPosts.length === 0) {
    return <div className="text-center py-8">게시글이 없습니다.</div>;
  }

  return (
    <div className="w-full bg-white">
      {filteredPosts.map((post) => (
        <PostCard
          key={post.fishingTripPostId}
          id={post.fishingTripPostId}
          title={post.subject}
          content={post.content}
          date={new Date(post.fishingDate).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          location={post.fishPointDetailName}
          views={0}
          likes={0}
          comments={0}
          isRecruiting={post.postStatus === "모집중"}
          memberCount={post.recruitmentCount}
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
