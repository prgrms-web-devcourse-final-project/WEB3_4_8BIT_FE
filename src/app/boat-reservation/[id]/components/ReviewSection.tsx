"use client";

import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import {
  getFishingReviewAPI,
  FishingReviewAPIResponse,
} from "@/lib/api/getFishingReviewAPI";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function ReviewSection({
  reviewEverRate,
  shipFishingPostId,
}: {
  reviewEverRate: number;
  shipFishingPostId: number;
}) {
  const [isInfiniteMode, setIsInfiniteMode] = useState(false);

  // 초기 리뷰 데이터 로드 (10개)
  const {
    data: initialReviews,
    isLoading: isInitialLoading,
    error: initialError,
  } = useQuery<FishingReviewAPIResponse>({
    queryKey: ["reviews", shipFishingPostId, "initial"],
    queryFn: () =>
      getFishingReviewAPI(shipFishingPostId, {
        size: 10,
      }),
    enabled: !isInfiniteMode, // 무한 스크롤 모드가 아닐 때만 실행
  });

  // 무한 스크롤을 위한 쿼리
  const {
    data: infiniteReviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<FishingReviewAPIResponse>({
    queryKey: ["reviews", shipFishingPostId, "infinite"],
    enabled: isInfiniteMode, // 무한 스크롤 모드일 때만 실행
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getFishingReviewAPI(shipFishingPostId, {
        order: "desc",
        sort: "createdAt",
        size: 10,
        type: "next",
        fieldValue: pageParam as string | undefined,
        id: shipFishingPostId,
      }),
    getNextPageParam: (lastPage) => {
      const lastItem = lastPage.data.content.at(-1);
      return lastPage.data.isLast ? undefined : lastItem?.createdAt;
    },
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const onScroll = () => {
      const scrollBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (scrollBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    if (isInfiniteMode) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [isInfiniteMode, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isInitialLoading && !isInfiniteMode) {
    return <div>리뷰를 불러오는 중입니다...</div>;
  }

  if (initialError && !isInfiniteMode) {
    return <div>리뷰를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 현재 표시할 리뷰 데이터 결정
  const reviews = isInfiniteMode
    ? infiniteReviews?.pages.flatMap((page) => page.data.content) || []
    : initialReviews?.data.content || [];

  const totalReviews = isInfiniteMode
    ? infiniteReviews?.pages[0]?.data.numberOfElements || 0
    : initialReviews?.data.numberOfElements || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">리뷰 및 평점</h2>
        <div className="flex items-center bg-sub-2 text-gray-30 px-3 py-1 rounded-full">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
          <span className="font-semibold">{reviewEverRate.toFixed(1)}</span>
          <span className="text-sm font-medium text-gray-500 ml-1">
            ({totalReviews})
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">
            아직 작성된 리뷰가 없어요.
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.reviewId}
              id={review.reviewId}
              user={"" + review.memberId}
              date={review.createdAt}
              content={review.content}
              images={review.fileUrlList}
              rating={review.rating}
            />
          ))
        )}
      </div>

      {!isInfiniteMode && totalReviews > 0 && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setIsInfiniteMode(true)}>
            모든 리뷰 보기
          </Button>
        </div>
      )}

      {isInfiniteMode && isFetchingNextPage && (
        <div className="text-center py-4">추가 리뷰 로딩 중...</div>
      )}
    </div>
  );
}
