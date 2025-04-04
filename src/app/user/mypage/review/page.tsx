import type React from "react";
import ReviewCard from "@/components/ReviewCard";

export default function Review() {
  // 리뷰 데이터
  const reviews = [
    {
      id : 'a',
      user: "바다사랑",
      date: "2023.10.15",
      rating: 5,
      content:
        "정말 좋은 경험이었습니다. 선장님이 친절하시고 물고기도 많이 잡았어요. 특히 참돔 대물을 낚아서 기분이 좋았습니다. 다음에도 꼭 이용할 예정입니다.",
      images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    },
    {
      id : 'b',
      user: "낚시초보",
      date: "2023.10.08",
      rating: 4,
      content:
        "처음 선상 낚시를 해봤는데 선장님이 친절하게 알려주셔서 즐겁게 낚시했습니다. 다만 배가 좀 흔들려서 멀미가 살짝 있었네요.",
      images: [],
    },
    {
      id : 'c',
      user: "물고기헌터",
      date: "2023.09.25",
      rating: 5,
      content:
        "여러 선상 낚시를 다녀봤지만 이곳이 가장 좋았습니다. 시설도 깨끗하고 물고기도 많이 잡혔어요. 특히 도시락이 맛있었습니다!",
      images: ["/placeholder.svg?height=100&width=100"],
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">내 리뷰</h1>
      <div className="text-gray-30">나의 선상 낚시 리뷰를 확인해보세요.</div>
      <div className="grid gap-5">
        {reviews.map((review, index) => (
          <ReviewCard
            id={review.id}
            key={index}
            user={review.user}
            date={review.date}
            content={review.content}
            images={review.images}
            rating={review.rating}
            enableDelete={true}
          />
        ))}
      </div>
    </div>
  )
}