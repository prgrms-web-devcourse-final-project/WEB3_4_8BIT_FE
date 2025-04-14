"use client";

import { useEffect, useState } from "react";
import {
  getFishingPost,
  getPostParticipation,
  PostParticipationInfo,
  deleteFishingPost,
} from "@/lib/api/fishingPostAPI";
import { toggleLike } from "@/lib/api/likeAPI";
import PostImages from "../components/PostImage";
import PostContent from "../components/PostContent";
import JoinInfoCard from "../components/JoinInfoCard";
import MapCard from "../components/MapCard";
import CommentSection from "../components/CommentSection";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  Edit,
  Trash,
  Heart,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PostDetailContentProps, PostData } from "@/types/PostDetailType";

export default function PostDetailContent({ postId }: PostDetailContentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostData | null>(null);
  const [participation, setParticipation] =
    useState<PostParticipationInfo | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 참여 정보를 다시 불러오는 함수
  const fetchParticipationInfo = async () => {
    try {
      console.log("참여 정보 조회 시작: postId=", postId);
      const participationResponse = await getPostParticipation(postId);
      if (participationResponse.success) {
        setParticipation(participationResponse.data);
        setIsOwner(participationResponse.data.isCurrentUserOwner);
      } else {
        console.error("참여 정보 조회 실패:", participationResponse);
      }
    } catch (participationError) {
      console.error("참여 정보 조회 오류:", participationError);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const postResponse = await getFishingPost(postId);
        if (postResponse.success) {
          setPost(postResponse.data);
          // 좋아요 상태 초기화
          setIsLiked(postResponse.data.isLiked);
          setLikeCount(postResponse.data.likeCount || 0);
          await fetchParticipationInfo(); // 참여 정보 초기 로딩
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

    fetchPostData();
  }, [postId]);

  // 좋아요 토글 함수 (낙관적 업데이트, 로깅 추가)
  const handleLikeToggle = async () => {
    try {
      // 이전 상태 저장 (실패 시 롤백용)
      const previousIsLiked = isLiked;
      const previousLikeCount = likeCount;
      const newIsLiked = !previousIsLiked;

      // 낙관적 업데이트: 좋아요 상태에 따라 카운트 업데이트
      const optimisticLikeCount = newIsLiked
        ? previousLikeCount + 1
        : Math.max(0, previousLikeCount - 1);
      setIsAnimating(true);
      setIsLiked(newIsLiked);
      setLikeCount(optimisticLikeCount);
      setPost((prevPost) =>
        prevPost
          ? { ...prevPost, isLiked: newIsLiked, likeCount: optimisticLikeCount }
          : prevPost
      );

      // API 호출: 좋아요 토글
      const response = await toggleLike({
        targetType: "FISHING_TRIP_POST",
        targetId: postId,
      });

      if (!response.success) {
        // API 요청 실패 시, 이전 상태로 롤백
        setIsLiked(previousIsLiked);
        setLikeCount(previousLikeCount);
        setPost((prevPost) =>
          prevPost
            ? {
                ...prevPost,
                isLiked: previousIsLiked,
                likeCount: previousLikeCount,
              }
            : prevPost
        );
        toast.error(response.message || "좋아요 처리 중 오류가 발생했습니다.");
      } else {
        // 토글 성공 후 게시글 데이터를 새로 불러와서 최신 상태 반영
        // 약간의 지연을 주어 서버에서 데이터가 갱신될 시간을 줍니다
        setTimeout(async () => {
          try {
            const updatedPostResponse = await getFishingPost(postId);
            if (updatedPostResponse.success) {
              const updatedPost = updatedPostResponse.data;

              // 서버에서 받은 최신 데이터로 상태 업데이트
              setIsLiked(updatedPost.isLiked);
              setLikeCount(updatedPost.likeCount);
              setPost((prevPost) =>
                prevPost
                  ? {
                      ...prevPost,
                      isLiked: updatedPost.isLiked,
                      likeCount: updatedPost.likeCount,
                    }
                  : prevPost
              );

              // 서버 데이터와 낙관적 업데이트 값이 다른 경우 로그 출력
              if (updatedPost.likeCount !== optimisticLikeCount) {
                console.log("서버 데이터와 낙관적 업데이트 값이 다릅니다:", {
                  optimistic: optimisticLikeCount,
                  server: updatedPost.likeCount,
                });
              }
            } else {
              console.error(
                "게시글 데이터 갱신 실패:",
                updatedPostResponse.message
              );
            }
          } catch (error) {
            console.error("게시글 데이터 갱신 중 오류:", error);
          }
        }, 500); // 0.5초 지연
      }

      // 애니메이션 효과 0.5초 후 해제
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
      setIsAnimating(false);
    }
  };

  // 게시글 삭제 처리 함수
  const handleDeletePost = async () => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }
    try {
      const response = await deleteFishingPost(postId);
      if (response.success) {
        toast.success("게시글이 삭제되었습니다.");
        router.push("/fishing-group");
      } else {
        toast.error(response.message || "게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
      toast.error("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div>게시글을 불러오는 중...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const isRecruiting = post.postStatus === "RECRUITING";

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-[50px]">
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-base text-gray-500">
          <Link
            href="/fishing-group"
            className="inline-flex items-center hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>목록으로</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">상세보기</span>
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{post.fishPointName}</h2>
            <p className="text-blue-100 text-lg">{post.fishPointDetailName}</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 mr-2 text-blue-200" />
              <span className="font-medium">
                {new Date(post.fishingDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5 mr-2 text-blue-200" />
              <span className="font-medium">
                {post.currentCount}/{post.recruitmentCount}명
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-8">
          <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-md">
            <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
              <span
                className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                  isRecruiting
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-70 text-gray-600"
                }`}
              >
                {isRecruiting ? "모집중" : "모집완료"}
              </span>
              <h1 className="text-xl md:text-2xl font-bold">{post.subject}</h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">이미지</span>
                </div>
                <span>{participation?.ownerNickname || post.name}</span>
                <span>·</span>
                <span>{new Date(post.createDate).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                {isOwner && (
                  <>
                    <Link
                      href={`/fishing-group/edit/${post.fishingTripPostId}`}
                      className="text-blue-500 hover:underline inline-flex items-center"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1" />
                      수정
                    </Link>
                    <button
                      className="text-red-500 hover:underline inline-flex items-center"
                      onClick={handleDeletePost}
                    >
                      <Trash className="w-3.5 h-3.5 mr-1" />
                      삭제
                    </button>
                  </>
                )}

                <div className="relative">
                  <button
                    className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md border cursor-pointer transition-all duration-300 ease-in-out ${
                      isLiked
                        ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                        : "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                    } hover:scale-105 active:scale-95`}
                    onClick={handleLikeToggle}
                  >
                    <span className="text-sm mr-1">좋아요</span>
                    <Heart
                      className={`w-4 h-4 cursor-pointer transition-all duration-300 ${
                        isLiked ? "fill-current" : ""
                      } ${isAnimating ? "animate-pulse" : ""}`}
                    />
                  </button>
                  {isAnimating && (
                    <div className="absolute inset-0 rounded-md bg-red-200 opacity-50 animate-ping"></div>
                  )}
                </div>
              </div>
            </div>

            {post.fileUrlList && post.fileUrlList.length > 0 ? (
              <PostImages images={post.fileUrlList} />
            ) : (
              <div className="bg-gray-200 h-48 md:h-64 flex items-center justify-center">
                <span className="text-gray-500">낚시 이미지 Placeholder</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 md:my-6 bg-gray-70 rounded-lg p-3 md:p-4">
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
        <div className="col-span-1 md:col-span-4 mt-4 md:mt-0">
          <JoinInfoCard
            recruitmentCount={post.recruitmentCount}
            currentCount={participation?.currentCount ?? post.currentCount}
            author={post.name}
            fishingTripPostId={post.fishingTripPostId}
            isApplicant={participation?.isApplicant || false}
            participants={participation?.participants || []}
            onApplicationSuccess={() => {
              setTimeout(fetchParticipationInfo, 300);
            }}
          />

          <div className="mt-4">
            <MapCard
              fishPointName={post.fishPointName}
              latitude={post.latitude}
              longitude={post.longitude}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CommentSection postId={postId.toString()} />
      </div>
    </div>
  );
}
