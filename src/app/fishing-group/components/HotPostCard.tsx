"use client";

import { MapPin } from "lucide-react";
import Link from "next/link";

interface HotPostCardProps {
  post: {
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
    views: number;
    likes: number;
    comments: number;
  };
}

export function HotPostCard({ post }: HotPostCardProps) {
  return (
    <Link
      href={`/fishing-group/post/${post.fishingTripPostId}`}
      className="block"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            src={post.fileUrlList[0] || "/images/default-fishing.jpg"}
            alt=""
            className="w-full h-40 object-cover"
          />
          <span
            className={`absolute top-2 right-2 px-2 py-1 text-sm rounded-full ${
              post.postStatus === "모집중"
                ? "bg-[#2CD5D7] text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {post.postStatus}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{post.fishPointDetailName}</span>
          </div>
          <h3 className="text-base font-medium line-clamp-2">{post.subject}</h3>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            <span>조회 {post.views}</span>
            <span>좋아요 {post.likes}</span>
            <span>댓글 {post.comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
