import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  FishSymbol,
  MapPin,
  Star,
  Trash2,
  Users,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";
import ReviewModal from "@/app/user/mypage/reservation/components/ReviewModal";
import Link from "next/link";

export default function ReservationCard({
  postId,
  reservationId,
  title,
  date,
  time,
  location,
  people,
  price,
  status,
  image,
  cancellationReason,
  handleCancel,
}: {
  postId: number;
  reservationId: number;
  title: string;
  date: string;
  time: string;
  location: string;
  people: number;
  price: number;
  status: "confirmed" | "completed" | "cancelled";
  image: string;
  cancellationReason?: string;
  handleCancel: (id: number) => void;
}) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusText = {
    confirmed: "예약 확정",
    completed: "이용 완료",
    cancelled: "예약 취소",
  };

  return (
    <Card className="py-0">
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover rounded-xl md:rounded-l-xl md:rounded-r-none"
            height={300}
            width={300}
          />
        </div>
        <div className="relative p-6 md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{date}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{time}</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>{people}명</span>
                <span className="mx-2">•</span>
                <span>{price.toLocaleString()}원</span>
              </div>

              {cancellationReason && (
                <div className="mt-3 text-sm text-red-600">
                  취소 사유: {cancellationReason}
                </div>
              )}
            </div>
            <Badge className={statusColors[status]}>{statusText[status]}</Badge>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href={`/boat-reservation/${postId}`}>
              <Button variant="outline" className="gap-2 cursor-pointer">
                <Eye className="h-4 w-4" /> 낚시 상세 보기
              </Button>
            </Link>

            {status === "confirmed" && (
              <Button
                variant="outline"
                onClick={() => handleCancel(reservationId)}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" /> 취소
              </Button>
            )}

            {status === "completed" && (
              <>
                <Button
                  variant="outline"
                  className="gap-2 cursor-pointer"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  <Star className="h-4 w-4 text-amber-500" /> 리뷰 작성
                </Button>
                <Button className="gap-2 cursor-pointer">
                  <FishSymbol className="h-4 w-4" />
                  다시 예약하기
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {isReviewModalOpen && (
        <ReviewModal
          reservationId={reservationId}
          postId={postId}
          setIsReviewModalOpen={setIsReviewModalOpen}
        />
      )}
    </Card>
  );
}
