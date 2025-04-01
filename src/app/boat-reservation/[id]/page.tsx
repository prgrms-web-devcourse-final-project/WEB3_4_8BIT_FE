"use client"

import type React from "react"

import Link from "next/link"
import {
  ChevronLeft,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PlaceInfo from "@/app/boat-reservation/[id]/components/PlaceInfo";
import PhoneInfo from "@/app/boat-reservation/[id]/components/PhoneInfo";
import ReservationInfo from "@/app/boat-reservation/[id]/components/ReservationInfo";
import TabDetail from "@/app/boat-reservation/[id]/components/TabDetail";
import TabFish from "@/app/boat-reservation/[id]/components/TabFish";
import TabWater from "@/app/boat-reservation/[id]/components/TabWater";
import ReviewCard from "@/components/ReviewCard";
import ImageGallery from "@/app/boat-reservation/[id]/components/ImageGallery";

export default function BoatReservationDetail({ params }: { params: { id: string } }) {
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
    <div className="min-h-screen">
      <div className="max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/boat-reservation" className="text-cyan-600 hover:text-cyan-800 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" /> 목록으로 돌아가기
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 이미지 갤러리 */}
            <ImageGallery />

            {/* 상세 정보 탭 */}
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">상세 정보</TabsTrigger>
                <TabsTrigger value="fish">어종 정보</TabsTrigger>
                <TabsTrigger value="tide">물때 정보</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="mt-6">
                <TabDetail />
              </TabsContent>
              <TabsContent value="fish" className="mt-6">
                <TabFish />
              </TabsContent>
              <TabsContent value="tide" className="mt-6">
                <TabWater />
              </TabsContent>
            </Tabs>

            {/* 리뷰 */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">리뷰 및 평점</h2>
                <div className="flex items-center bg-cyan-50 text-cyan-800 px-3 py-1 rounded-full">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-medium">3.8</span>
                  <span className="text-sm text-gray-500 ml-1">({reviews.length})</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    user={review.user}
                    date={review.date}
                    content={review.content}
                    images={review.images}
                    rating={review.rating}
                  />
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline">모든 리뷰 보기</Button>
              </div>
            </div>
          </div>

          {/* 예약 관련 정보 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ReservationInfo/>
              <PhoneInfo/>
              <PlaceInfo/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}