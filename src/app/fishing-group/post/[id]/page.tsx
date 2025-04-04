"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import PostImages from "../components/PostImage";
import PostInfo from "../components/PostInfo";
import PostContent from "../components/PostContent";
import JoinInfoCard from "../components/JoinInfoCard";
import CommentSection, { Comment } from "../components/CommentSection";
import Image from "next/image";
import Link from "next/link";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  // PostImage 예시 데이터
  const post = {
    id: params.id,
    images: ["/images/test.png", "/images/test.png"],
  };

  // PostInfo 예시 데이터
  const postInfoData = {
    placeName: "부산 기장군 기장읍 연화리 방파제",
    date: "2025.11.18",
    time: "05:00",
    currentMembers: 3,
    maxMembers: 6,
    title: "기장 3월 30일 제주도 아쿠아마린호 동출하실 5분 구합니다.",
    isRecruiting: true,
  };

  // PostContent 예시 데이터
  const postContentData = `이번 주말(11월 18일) 기장 방파제에서 감성돔 낚시 계획 중입니다. 함께 하실 분 모집합니다. 

초보자분들은 장비가 없으시면 말씀해주세요. 제가 여분 장비를 가져갈 수 있습니다. 
차량은 제가 운전해서 가며, 기장역에서 픽업 가능합니다. 
식사는 현장에서 각자 해결하거나 근처 식당에서 함께 할 예정입니다.  
날씨가 좋지 않을 경우 일정이 변경될 수 있으니 참고해주세요.`;

  // 좋아요 버튼 클릭 시 상태 변경
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  // JoinInfoCard 예시 데이터
  const joinMembers = [
    {
      id: "1",
      name: "바다사랑",
      profileImageUrl: "/images/test.png",
      isAuthor: true,
    },
    { id: "2", name: "낚시초보", profileImageUrl: "/images/test.png" },
    { id: "3", name: "물고기사냥꾼", profileImageUrl: "/images/test.png" },
  ];
  const joinAuthor = {
    name: "바다사랑",
    profileImageUrl: "/images/test.png",
  };

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
      author: "바다사랑",
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
            <div className="lg:col-span-2 shadow border border-gray-70 p-4 rounded-lg space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  {/* 모집 상태 */}
                  <span
                    className={`px-3 py-2 text-base rounded-lg ${
                      postInfoData.isRecruiting
                        ? "bg-[#2CD5D7] text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {postInfoData.isRecruiting ? "모집중" : "모집완료"}
                  </span>
                  {/* 게시글 제목 */}
                  <h2 className="text-xl font-bold w-96 whitespace-nowrap">
                    {postInfoData.title}
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
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={joinAuthor.profileImageUrl}
                    alt={joinAuthor.name}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-lg">{joinAuthor.name}</p>
                  <p className="text-xs text-gray-400">{postInfoData.date}</p>
                </div>
              </div>

              <PostImages images={post.images} />
              <PostInfo {...postInfoData} />
              <PostContent content={postContentData} />
            </div>

            {/* 오른쪽 섹션*/}
            <div className="lg:col-span-1 space-y-6">
              <JoinInfoCard
                currentMembers={postInfoData.currentMembers}
                maxMembers={postInfoData.maxMembers}
                members={joinMembers}
                author={joinAuthor}
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
