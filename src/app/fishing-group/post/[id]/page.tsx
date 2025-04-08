"use client";

import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import PostImages from "../components/PostImage";
import PostInfo from "../components/PostInfo";
import PostContent from "../components/PostContent";
import JoinInfoCard from "../components/JoinInfoCard";
import CommentSection, { Comment } from "../components/CommentSection";
import Image from "next/image";
import Link from "next/link";
import { getFishingPost } from "@/lib/api/fishingPostAPI";

interface PostDetail {
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
  author: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getFishingPost(parseInt(params.id));
        setPost(data);
      } catch (err) {
        console.error("게시글 로딩 중 오류:", err);
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  // 좋아요 버튼 클릭 시 상태 변경
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  if (loading) {
    return <div className="text-center py-8">게시글을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-8">게시글을 찾을 수 없습니다.</div>;
  }

  // CommentSection 예시 데이터
  const comments: Comment[] = [
    {
      id: "1",
      author: "낚시초보",
      content: "참가하고 싶습니다!",
      date: "2025-11-01",
      isAuthor: false,
    },
    {
      id: "2",
      author: post.author.nickname,
      content: "환영합니다. 준비물 꼭 확인해주세요.",
      date: "2025-11-02",
      isAuthor: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 배너 추가 */}
      <div className="w-full h-[350px] relative mb-8">
        <Image
          src="/images/banner.jpg"
          alt="낚시 배너"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="mb-5">
            <Link
              href="/fishing-group"
              className="text-primary hover:text-[#2773CC] font-medium"
            >
              ← 목록으로 돌아가기
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 왼쪽 섹션: 게시글 내용 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  {/* 모집 상태 */}
                  <span
                    className={`px-3 py-2 text-base rounded-lg ${
                      post.postStatus === "모집중"
                        ? "bg-[#2CD5D7] text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {post.postStatus}
                  </span>
                  {/* 게시글 제목 */}
                  <h2 className="text-xl font-bold w-96 whitespace-nowrap">
                    {post.subject}
                  </h2>
                </div>
                <div className="flex items-center gap-3 mt-2 lg:mt-0">
                  {/* 좋아요 */}
                  <button
                    onClick={handleLikeClick}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
                      isLiked ? "bg-sub-1 text-white" : "bg-gray-200"
                    }`}
                  >
                    <ThumbsUp size={20} />
                    <span>{likes}</span>
                  </button>
                </div>
              </div>

              {/* 작성자 프로필 이미지, 이름, 작성일 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={post.author.profileImageUrl}
                    alt={post.author.nickname}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-lg">{post.author.nickname}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(post.fishingDate).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <PostImages images={post.fileUrlList} />
              <PostInfo
                placeName={post.fishPointDetailName}
                date={new Date(post.fishingDate).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                time="05:00" // TODO: API에서 시간 정보 추가 필요
                currentMembers={post.currentCount}
                maxMembers={post.recruitmentCount}
              />
              <PostContent content={post.content} />
            </div>

            {/* 오른쪽 섹션*/}
            <div className="lg:col-span-1 space-y-6">
              <JoinInfoCard
                currentMembers={post.currentCount}
                maxMembers={post.recruitmentCount}
                members={[
                  {
                    id: post.author.id.toString(),
                    name: post.author.nickname,
                    profileImageUrl: post.author.profileImageUrl,
                    isAuthor: true,
                  },
                ]}
                author={{
                  name: post.author.nickname,
                  profileImageUrl: post.author.profileImageUrl,
                }}
              />
              <div className="bg-white rounded-lg shadow border border-gray-70 p-4">
                <h3 className="text-lg font-bold mb-2">지도</h3>
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-500">
                  지도 정보가 여기에 표시됩니다.
                </div>
              </div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <CommentSection comments={comments} />
        </div>
      </div>
    </div>
  );
}
