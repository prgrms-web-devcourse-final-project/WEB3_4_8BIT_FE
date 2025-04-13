import type React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhoneInfo from "@/app/boat-reservation/[id]/components/PhoneInfo";
import ReservationInfo from "@/app/boat-reservation/[id]/components/ReservationInfo";
import TabDetail from "@/app/boat-reservation/[id]/components/TabDetail";
import TabFish from "@/app/boat-reservation/[id]/components/TabFish";
import TabWater from "@/app/boat-reservation/[id]/components/TabWater";
import ImageGallery from "@/app/boat-reservation/[id]/components/ImageGallery";
import {
  ReservationUnavailableDateAPIResponse,
  ShipFishingPostDetailAPIResponse,
} from "@/types/boatPostType";
import dayjs from "dayjs";
import ReviewSection from "./components/ReviewSection";

// 배 상세 정보 조회
async function getBoatPostDetail(
  id: string
): Promise<ShipFishingPostDetailAPIResponse> {
  const token = process.env.NEXT_PUBLIC_API_TOKEN || "기본_토큰_값";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ship-fishing-posts/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: token,
      },
    }
  );
  const data = await response.json();
  return data;
}

// 예약 불가능 날짜 조회
async function getReservationUnavailableDate(
  id: string
): Promise<ReservationUnavailableDateAPIResponse> {
  const token = process.env.NEXT_PUBLIC_API_TOKEN || "기본_토큰_값";
  const date = dayjs().format("YYYY-MM-DD");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservation-dates/${id}/dates?reservationDate=${date}`,
    {
      cache: "no-store",
      headers: {
        Authorization: token,
      },
    }
  );
  const data = await response.json();
  return data;
}

export default async function BoatReservationDetail({
  params,
}: {
  params: { id: string };
}) {
  const boatPostDetail = await getBoatPostDetail(params.id);
  const reservationUnavailableDate = await getReservationUnavailableDate(
    params.id
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/boat-reservation"
            className="text-cyan-600 hover:text-cyan-800 flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> 목록으로 돌아가기
          </Link>
        </div>

        <div className="mb-6 font-bold text-4xl">
          {boatPostDetail.data.subject}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 이미지 갤러리 */}
            <ImageGallery />

            {/* 상세 정보 탭 */}
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info" className="cursor-pointer">
                  상세 정보
                </TabsTrigger>
                <TabsTrigger value="fish" className="cursor-pointer">
                  어종 정보
                </TabsTrigger>
                <TabsTrigger value="tide" className="cursor-pointer">
                  물때 정보
                </TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="mt-6">
                <TabDetail detailShip={boatPostDetail.data} />
              </TabsContent>
              <TabsContent value="fish" className="mt-6">
                <TabFish fishNameList={boatPostDetail.data.detailFish} />
              </TabsContent>
              <TabsContent value="tide" className="mt-6">
                <TabWater
                  departurePort={boatPostDetail.data.detailShip.departurePort}
                />
              </TabsContent>
            </Tabs>

            <ReviewSection
              reviewEverRate={boatPostDetail.data.reviewEverRate}
              shipFishingPostId={boatPostDetail.data.shipFishingPostId}
            />
          </div>

          {/* 예약 관련 정보 */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] space-y-6">
              <ReservationInfo
                detailShip={boatPostDetail.data}
                reservationUnavailableDate={
                  reservationUnavailableDate.data.unAvailableDateList
                }
              />
              <PhoneInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
