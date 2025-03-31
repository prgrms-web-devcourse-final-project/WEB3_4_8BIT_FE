"use client";

import { MapPin } from "lucide-react";

interface HotPostCardProps {
  post: {
    id: number;
    title: string;
    status: string;
    location: string;
    image: string;
  };
}

export function HotPostCard({ post }: HotPostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={post.image} alt="" className="w-full h-40 object-cover" />
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${
            post.status === "모집중"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {post.status}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span>{post.location}</span>
        </div>
        <h3 className="text-sm font-medium line-clamp-2">{post.title}</h3>
      </div>
    </div>
  );
}
