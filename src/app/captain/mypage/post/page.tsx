"use client";

import Link from "next/link";
import { CaptainSidebar } from "../components/SideBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, PlusCircle } from "lucide-react";
import Image from "next/image";

interface PostItem {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  imageUrls: string[];
}

const posts: PostItem[] = [
  {
    id: 1,
    title: "즐거운 선박 낚시",
    location: "부산 기장군",
    rating: 4.7,
    reviewCount: 13,
    price: 80000,
    imageUrls: ["/images/test.png", "/images/test.png", "/images/test.png"],
  },
];

export default function CaptainPostsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <CaptainSidebar />

      <div className="md:col-span-3 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">게시글 관리</h1>
          <Link href="/fishing-registration">
            <Button className="cursor-pointer flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              선상 낚시 게시글 작성하기
            </Button>
          </Link>
        </div>

        {posts.map((post) => (
          <Card key={post.id} className="p-4 transition-colors space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-bold flex items-center gap-1">
                  {post.title}
                  <span className="flex items-center text-sm text-yellow-500 ml-2">
                    <Star className="h-4 w-4 fill-yellow-500" />
                    {post.rating.toFixed(1)} ({post.reviewCount})
                  </span>
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {post.location}
                  <span className="ml-4 text-sm font-medium text-blue-600">
                    1인 기준 {post.price.toLocaleString()}원
                  </span>
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-80"
                >
                  상세보기
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-500 border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                  수정
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 border-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
                >
                  삭제
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {post.imageUrls.slice(0, 3).map((url, idx) => (
                <div
                  key={idx}
                  className="w-full h-40 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center"
                >
                  <Image
                    src={url}
                    alt={`post-image-${idx}`}
                    width={300}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
