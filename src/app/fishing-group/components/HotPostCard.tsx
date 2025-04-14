"use client";

import { MapPin, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";

interface HotPostCardProps {
  post: {
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
    likeCount: number;
    commentCount: number;
  };
}

export function HotPostCard({ post }: HotPostCardProps) {
  return (
    <Link
      href={`/fishing-group/post/${post.fishingTripPostId}`}
      className="block group"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
        <div className="relative h-44">
          <img
            src={
              post.fileUrlList && post.fileUrlList.length > 0
                ? post.fileUrlList[0]
                : "/images/default-fishing.jpg"
            }
            alt={post.subject}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span
            className={`absolute top-2 right-2 px-2 py-1 text-sm font-medium rounded-full shadow-sm ${
              post.postStatus === "RECRUITING"
                ? "bg-blue-600 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {post.postStatus === "RECRUITING" ? "모집중" : "모집완료"}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {post.subject}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{post.fishPointName}</span>
          </div>
          <div className="flex items-center justify-end gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{post.likeCount || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{post.commentCount || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
