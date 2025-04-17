"use client";

import { MapPin } from "lucide-react";
import FishingConditionsTab from "./FishingConditionsTab";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFishingPointDetail } from "@/lib/api/fishingPointAPI";
import { FishingPointDetailAPIResponse } from "@/types/fishingPointLocationType";
import MainFishList from "./MainFishList ";

export default function FishingPointDetailInfo() {
  const { pointId } = useParams<{ pointId: string }>();

  const { data: pointDetailData, isLoading: isPointDetailDataLoading } =
    useQuery<FishingPointDetailAPIResponse>({
      queryKey: ["fishingPointDetail", pointId],
      queryFn: () => getFishingPointDetail(pointId),
      enabled: !!pointId,
    });

  if (isPointDetailDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* 낚시 포인트 이름, 위치*/}
      <div className="w-full p-[16px] text-white bg-primary mt-[73px]">
        <h5 className="text-title-4">
          {pointDetailData?.data.fishPointDetailName}
        </h5>
        <div className="flex items-center gap-[4px]">
          <MapPin className="w-[16px] h-[16px]" />
          <span className="text-body-4">
            {pointDetailData?.data.fishPointName}
          </span>
        </div>
      </div>

      {/* 대표 어종 */}
      <MainFishList fishList={pointDetailData?.data.fishList} />

      {/* 날씨 정보 */}
      <FishingConditionsTab pointDetailData={pointDetailData?.data} />
    </>
  );
}
