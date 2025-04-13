"use client";

import Link from "next/link";
import BoatCard from "@/components/BoatCard";
import { ShipPostListAPIResponse } from "@/types/boatPostType";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
// import { useState } from "react";

export default function BoatList({
  shipPostsData,
}: {
  shipPostsData: ShipPostListAPIResponse;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoadMore = () => {
    const currentScroll = window.scrollY;
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });
    params.set("size", (Number(searchParams.get("size") || 4) + 4).toString());

    router.push(`/boat-reservation?${params.toString()}`, { scroll: false });
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScroll);
    });
  };

  // const [postData, setPostData] =
  //   useState<ShipPostListAPIResponse>(shipPostsData);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shipPostsData.data.content.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 rounded-lg border border-gray-100 shadow-sm">
            <div className="text-gray-400 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-3">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              다른 검색 조건으로 다시 시도해보세요. 필터를 조정하거나 검색어를
              변경해보세요.
            </p>
            <Link
              href="/boat-reservation"
              className="px-5 py-2.5 bg-primary text-white rounded-md hover:bg-sub-1 transition-colors shadow-sm"
            >
              필터 초기화
            </Link>
          </div>
        ) : (
          shipPostsData.data.content.map((post) => (
            <BoatCard key={post.shipFishingPostId} boatData={post} />
          ))
        )}
      </div>

      {shipPostsData.data.content.length > 0 && !shipPostsData.data.isLast && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleLoadMore}
          >
            <span>더보기</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
