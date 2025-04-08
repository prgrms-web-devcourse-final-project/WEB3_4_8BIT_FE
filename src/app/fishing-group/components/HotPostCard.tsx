"use client";

import { MapPin, Users } from "lucide-react";
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
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>
              {post.currentCount}/{post.recruitmentCount}명
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
