"use client";

import PostImages from "../components/PostImage";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  // 예시용 데이터
  const post = {
    id: params.id,
    title: "낚시 동출 예시 게시글",
    images: ["/images/test.png", "/images/test.png"],
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <PostImages images={post.images} />
      </div>
    </div>
  );
}
