"use client";

import PostImages from "../components/PostImage";
import PostInfo from "../components/PostInfo";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  // 이미지 예시 데이터
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
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <PostImages images={post.images} />
        <div className="mt-6">
          <PostInfo {...postInfoData} />
        </div>
      </div>
    </div>
  );
}
