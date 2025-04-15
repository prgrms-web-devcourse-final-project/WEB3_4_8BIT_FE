"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, MapPin, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import React, { useEffect, useState } from "react";
import { ShipFishingPostDetailData } from "@/types/boatPostType";
import dayjs from "dayjs";
import {
  getReservationRemain,
  postReservation,
  ReservationRemainData,
} from "@/lib/api/reservationAPI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useDebouncedRequest from "@/hooks/useDebouncedReques";
import { useCheckAuth } from "@/hooks/useCheckAuth";

export default function ReservationInfo({
  detailShip,
  reservationUnavailableDate,
}: {
  detailShip: ShipFishingPostDetailData;
  reservationUnavailableDate: string[];
}) {
  const checkAuth = useCheckAuth();

  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [reservationData, setReservationData] =
    useState<ReservationRemainData | null>(null);
  const [selectedPeople, setSelectedPeople] = useState(1);

  const handleReservationPeopleCount = (type: "plus" | "minus") => {
    if (type === "plus") {
      setSelectedPeople(
        Math.min(reservationData!.remainCount, selectedPeople + 1)
      );
    } else {
      setSelectedPeople(Math.max(1, selectedPeople - 1));
    }
  };

  useEffect(() => {
    if (date) {
      const fetchReservationRemain = async () => {
        const response = await getReservationRemain(
          detailShip.shipFishingPostId,
          date as Date
        );
        setReservationData(response.data);
      };
      fetchReservationRemain();
    }
  }, [date, detailShip.shipFishingPostId]);

  const { trigger: handleReservation } = useDebouncedRequest(async () => {
    if (!checkAuth()) return;

    const response = await postReservation(
      detailShip.shipFishingPostId,
      selectedPeople,
      detailShip.price,
      selectedPeople * detailShip.price,
      date as Date
    );

    if (response) {
      toast.success(
        `${detailShip.subject}에 총 ${selectedPeople}명으로 예약이 완료되었습니다. 마이페이지에서 상세 내용을 확인해주세요.`
      );
      router.push("/");
    } else {
      toast.error("예약에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{detailShip.subject}</CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" /> {detailShip.detailShip.portName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
            <span className="font-medium">
              {detailShip.reviewEverRate.toFixed(1)}
            </span>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">날짜 선택</h3>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full cursor-pointer justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date
                  ? format(date, "PPP", { locale: ko })
                  : "날짜를 선택하세요"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  setIsCalendarOpen(false);
                }}
                initialFocus
                locale={ko}
                disabled={(date) => {
                  // 오늘 날짜의 시작 시간으로 설정
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  // 과거 날짜 체크
                  if (date < today) {
                    return true;
                  }

                  // 예약 불가능한 날짜 체크
                  if (reservationUnavailableDate.length === 0) {
                    return false;
                  }
                  const formattedDate = dayjs(date).format("YYYY-MM-DD");
                  return reservationUnavailableDate.includes(formattedDate);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {date && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">예약 가능 인원</h3>
              <span>{reservationData?.remainCount}명</span>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">인원 선택</h3>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => handleReservationPeopleCount("minus")}
                >
                  -
                </Button>
                <span className="text-lg font-medium">{selectedPeople}명</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => handleReservationPeopleCount("plus")}
                >
                  +
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>기본 요금 (1인)</span>
                <span>₩{detailShip.price.toLocaleString()}</span>
              </div>
              {selectedPeople > 1 && (
                <div className="flex justify-between text-gray-600">
                  <span>추가 인원 ({selectedPeople - 1}명)</span>
                  <span>
                    ₩
                    {((selectedPeople - 1) * detailShip.price).toLocaleString()}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>총 금액</span>
                <span>
                  ₩{(selectedPeople * detailShip.price).toLocaleString()}
                </span>
              </div>
            </div>
          </>
        )}

        <Button
          className="w-full bg-primary hover:bg-cyan-700 text-lg py-6"
          disabled={!date}
          onClick={() => handleReservation()}
        >
          {date && !reservationData?.isBan ? "예약하기" : "날짜를 선택해주세요"}
          {reservationData?.isBan && (
            <span className="text-red-500">예약 마감</span>
          )}
        </Button>

        <div className="text-center text-sm text-gray-500">
          지금 바로 예약하고 선상 낚시를 즐겨보세요.
        </div>
      </CardContent>
    </Card>
  );
}
