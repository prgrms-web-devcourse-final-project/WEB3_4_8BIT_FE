"use client";

import { useEffect, useState } from "react";
import { toggleLike } from "@/lib/api/likeAPI";
import { MapPin, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ShipPostData } from "@/types/boatPostType";
import { toast } from "sonner";

export default function BoatCard({ boatData }: { boatData: ShipPostData }) {
  const [shipPost, setShipPost] = useState<ShipPostData | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 메인페이지에서 오류 발생
  if (!boatData) {
    return <div>데이터가 없습니다.</div>;
  }

  useEffect(() => {
    // 초기 데이터 설정
    setShipPost(boatData);
    setIsLiked(boatData.isLiked);
  }, [boatData]);

  console.log(boatData);
  console.log(boatData.isLiked);
  console.log(isLiked);

  // 좋아요 토글 함수 (낙관적 업데이트)
  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // 링크 이벤트 전파 방지
    e.stopPropagation();

    try {
      console.log("좋아요 토글 요청 시작:", {
        shipFishingPostId: boatData.shipFishingPostId,
        currentIsLiked: isLiked,
        currentLikeCount: likeCount,
      });

      // 이전 상태 저장 (실패 시 롤백용)
      const previousIsLiked = isLiked;
      const previousLikeCount = likeCount;
      const newIsLiked = !previousIsLiked;

      // 낙관적 업데이트: 좋아요 상태에 따라 카운트 업데이트
      const optimisticLikeCount = newIsLiked
        ? previousLikeCount + 1
        : Math.max(0, previousLikeCount - 1);

      setIsAnimating(true);
      setIsLiked(newIsLiked);
      setLikeCount(optimisticLikeCount);
      setShipPost((prevPost) =>
        prevPost
          ? { ...prevPost, isLiked: newIsLiked, likeCount: optimisticLikeCount }
          : prevPost
      );

      // API 호출: 좋아요 토글
      const response = await toggleLike({
        targetType: "SHIP_FISHING_POST",
        targetId: boatData.shipFishingPostId,
      });

      console.log("서버 응답:", response);

      if (!response.success) {
        // API 요청 실패 시, 이전 상태로 롤백
        setIsLiked(previousIsLiked);
        setLikeCount(previousLikeCount);
        setShipPost((prevPost) =>
          prevPost
            ? {
                ...prevPost,
                isLiked: previousIsLiked,
                likeCount: previousLikeCount,
              }
            : prevPost
        );
        toast.error(response.message || "좋아요 처리 중 오류가 발생했습니다.");
      }

      // 애니메이션 효과 0.5초 후 해제
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
      setIsAnimating(false);
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow pt-0">
      <div className="h-48 overflow-hidden">
        <Image
          src={
            boatData.fileUrlList && boatData.fileUrlList.length > 0
              ? boatData.fileUrlList[0]
              : "/images/fishing-point-dummy.png"
          }
          alt={boatData.subject}
          className="w-full h-full object-cover"
          height={195}
          width={440}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex gap-1.5 items-center">
              {boatData.subject}
              <div className="relative">
                <Heart
                  className={`h-5 w-5 cursor-pointer transition-all duration-300 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                  } ${isAnimating ? "scale-125" : ""}`}
                  onClick={handleLikeToggle}
                />
              </div>
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1"/> {boatData.location}
            </CardDescription>
          </div>
          <div className="flex items-center bg-cyan-50 text-gray-20 px-2 py-1 rounded">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1"/>
            <span className="font-medium">
              {boatData.reviewEverRate.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({boatData.reviewCount})
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {boatData.fishNameList && boatData.fishNameList.length > 0 ? (
            boatData.fishNameList.map((fish, index) => (
              <span
                key={index}
                className="bg-gray-80 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {fish}
              </span>
            ))
          ) : (
            <span className="text-gray-500">정보가 없습니다.</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">1인 기준</span>
            <p className="text-xl font-bold text-primary-color">
              {boatData.price.toLocaleString()}원
            </p>
          </div>
          <Link href={`/boat-reservation/${boatData.shipFishingPostId}`}>
            <Button className="bg-primary hover:bg-sub-1 cursor-pointer">
              예약하기
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}