import type React from "react";
import ReviewCard from "@/components/ReviewCard";
import { cookies } from "next/headers";
import { UserReview } from "@/types/user.interface";

export default async function Review() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(
    "https://api.mikki.kr/api/v1/members/reviews?size=999",
    {
      headers: {
        Cookie: cookieHeader,
        // TODO 추후 쿠키로 통일해야함
        Authorization: `${process.env.NEXT_ACCESS_TOKEN}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      cache: "no-cache",
      next: { revalidate: 0 },
    }
  );
  const responseData = await response.json();
  const reviews: UserReview[] = responseData.data.content;
  console.log(reviews);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">내 리뷰</h1>
      <div className="text-gray-30">나의 선상 낚시 리뷰를 확인해보세요.</div>
      <div className="grid gap-5">
        {reviews.map((review, index) => (
          <ReviewCard
            id={review.reviewId}
            key={index}
            user={review.nickname}
            date={new Date(review.createdAt).toLocaleString()}
            content={review.content}
            images={review.fileUrlList}
            rating={review.rating}
            enableDelete={review.isAuthor}
          />
        ))}
      </div>
    </div>
  );
}
