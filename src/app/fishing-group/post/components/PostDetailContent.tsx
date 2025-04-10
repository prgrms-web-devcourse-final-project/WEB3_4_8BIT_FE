"use client";

import { useEffect, useState } from "react";
import { getFishingPost } from "@/lib/api/fishingPostAPI";
import PostImages from "../components/PostImage";
import PostContent from "../components/PostContent";
import JoinInfoCard from "../components/JoinInfoCard";
import MapCard from "../components/MapCard";
import CommentSection from "../components/CommentSection";
import { MapPin, Calendar, Clock, Users, ArrowLeft } from "lucide-react";
import React from "react";
import Link from "next/link";

interface PostDetailContentProps {
  postId: number;
}

interface PostData {
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

export default function PostDetailContent({ postId }: PostDetailContentProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getFishingPost(postId);
        if (response.success) {
          setPost(response.data);
          setError(null);
        } else {
          setError("게시글을 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("게시글을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div>게시글을 불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const isRecruiting = new Date(post.fishingDate) > new Date();

  // 임시 댓글 데이터
  const mockComments = [
    {
      id: "1",
      author: post.name,
      content: "안녕하세요! 낚시 경험이 있으신가요?",
      date: "2024-03-20",
      isAuthor: true,
    },
    {
      id: "2",
      author: "참가자1",
      content: "처음이라 걱정이 되네요. 장비는 모두 대여 가능한가요?",
      date: "2024-03-20",
      isAuthor: false,
    },
    {
      id: "3",
      author: post.name,
      content: "네, 걱정마세요! 모든 장비 대여 가능합니다.",
      date: "2024-03-20",
      isAuthor: true,
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-[90px]">
      <div className="mb-4">
        <Link
          href="/fishing-group"
          className="inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          목록으로 돌아가기
        </Link>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                  isRecruiting
                    ? "bg-blue-50 text-blue-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {isRecruiting ? "모집중" : "모집완료"}
              </span>
              <h1 className="text-2xl font-bold">{post.subject}</h1>
            </div>

            <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">이미지</span>
                </div>
                <span>{post.name}</span>
                <span>·</span>
                <span>{new Date(post.createDate).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:underline">수정</button>
                <button className="text-red-500 hover:underline">삭제</button>
              </div>
            </div>

            {post.fileUrlList && post.fileUrlList.length > 0 ? (
              <PostImages images={post.fileUrlList} />
            ) : (
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <span className="text-gray-500">낚시 이미지 Placeholder</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 my-6 bg-gray-70 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-gray-500 text-sm">장소</div>
                  <div className="font-medium">{post.fishPointDetailName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-gray-500 text-sm">날짜</div>
                  <div className="font-medium">
                    {new Date(post.fishingDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-gray-500 text-sm">시간</div>
                  <div className="font-medium">
                    {new Date(post.fishingDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-gray-500 text-sm">참여 현황</div>
                  <div className="font-medium">
                    <span className="text-primary">{post.currentCount}</span>
                    <span className="font-medium">
                      /{post.recruitmentCount}명
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <PostContent content={post.content} />
          </div>
        </div>
        <div className="col-span-4">
          <JoinInfoCard
            currentCount={post.currentCount}
            recruitmentCount={post.recruitmentCount}
            fishingDate={post.fishingDate}
            fishPointName={post.fishPointName}
            fishPointDetailName={post.fishPointDetailName}
            postStatus={isRecruiting ? "RECRUITING" : "CLOSED"}
            longitude={post.longitude}
            latitude={post.latitude}
            author={post.name}
            fishingTripPostId={post.fishingTripPostId}
          />

          <MapCard
            fishPointName={post.fishPointName}
            latitude={post.latitude}
            longitude={post.longitude}
          />
        </div>
      </div>
      <div className="mt-6">
        <CommentSection comments={mockComments} />
      </div>
    </div>
  );
}
