"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import KaKaoMap from "./KaKaoMap";
import { FishingPointLocation } from "@/types/fishingPointLocationType";

export default function KakaoMapSection({
  locationData,
}: {
  locationData: FishingPointLocation[];
}) {
  return (
    <section className="w-full mt-[34px]">
      <div className="xl:w-[1280px] w-[calc(100%-20px)] mx-auto">
        <div className="flex items-center justify-between mb-[16px]">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="지역을 선택해주세요" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              sideOffset={4}
              align="start"
              avoidCollisions={false}
            >
              {locationData.map((location) => (
                <SelectItem key={location.regionId} value={location.regionId}>
                  {location.regionName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="text-body-3 text-white">
            낚시 포인트 제보하기
          </Button>
        </div>
        <KaKaoMap />
      </div>
    </section>
  );
}
