"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserAPI } from "@/lib/api/userAPI";
import { usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function ReviewCard({
  id,
  nickname,
  date,
  content,
  images,
  profileImg,
  rating,
  enableDelete,
}: {
  id: number;
  nickname: string;
  date: string;
  content: string;
  images: string[];
  profileImg: string;
  rating: number;
  enableDelete?: boolean;
}) {
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isShipReservation = pathname.includes("/boat-reservation");

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      const response = await UserAPI.deleteUserReview(id);
      console.log(response);
      if (response.success) {
        setIsDeleted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    if (!isShipReservation) {
      router.push(`/boat-reservation/${id}`);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      router.refresh();
    }
  }, [isDeleted, router]);

  return (
    <Card
      className={`cursor-pointer ${isShipReservation ? "cursor-default" : ""}`}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
              <Image
                src={profileImg || "/images/default.png"}
                alt="프로필 이미지"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="ml-3">
              <div className="flex">
                <p className="font-medium mr-3">{nickname}</p>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {dayjs(date).format("YYYY-MM-DD")}
              </p>
            </div>
          </div>
          {enableDelete && (
            <Button
              onClick={(event) => handleDelete(event)}
              variant="outline"
              className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" /> 삭제
            </Button>
          )}
        </div>

        <p className="mt-4 text-gray-700">{content}</p>

        {images.length > 0 && (
          <div className="mt-4 flex space-x-2">
            {images.map((image, i) => (
              <Image
                key={i}
                src={image || "/placeholder.svg"}
                alt={`리뷰 이미지 ${i + 1}`}
                width={80}
                height={80}
                className="rounded-md object-cover w-auto"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
