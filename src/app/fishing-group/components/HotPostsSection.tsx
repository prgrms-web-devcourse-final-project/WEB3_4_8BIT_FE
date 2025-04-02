"use client";

import { HotPostCard } from "./HotPostCard";

interface Post {
  id: number;
  title: string;
  status: string;
  location: string;
  image: string;
}

interface HotPostsSectionProps {
  posts: Post[];
}

export function HotPostsSection({ posts }: HotPostsSectionProps) {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          지금 <span className="text-primary">HOT</span>한 동출 모집
        </h2>
        <p className="text-gray-600 text-base">
          조회수와 좋아요가 높은 인기 동출 모집글을 모아봤어요
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {posts.map((post) => (
          <HotPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
