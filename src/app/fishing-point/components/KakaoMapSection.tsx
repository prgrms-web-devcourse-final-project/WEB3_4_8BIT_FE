"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import KaKaoMap from "./KaKaoMap";
import {
  FishingPoint,
  FishingPointLocation,
} from "@/types/fishingPointLocationType";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFishingRegion } from "@/lib/api/fishingPointAPI";

export default function KakaoMapSection({
  locationData,
}: {
  locationData: FishingPointLocation[];
}) {
  const [selectedLocation, setSelectedLocation] =
    useState<FishingPointLocation | null>(null);

  const { data: fishingPoints } = useQuery<FishingPoint[]>({
    queryKey: ["fishingPoints", selectedLocation?.regionId],
    queryFn: async () => {
      if (!selectedLocation) return [];

      const response = await getFishingRegion(selectedLocation.regionId);
      return response;
    },
    enabled: !!selectedLocation,
  });

  return (
    <section className="w-full mt-[34px]">
      <div className="xl:w-[1280px] w-[calc(100%-20px)] mx-auto">
        <div className="flex items-center justify-between mb-[16px]">
          <Select
            onValueChange={(value) => {
              const selectedLocation = locationData.find(
                (location) => location.regionId === value
              );
              setSelectedLocation(selectedLocation as FishingPointLocation);
            }}
          >
            <SelectTrigger className="w-[180px] cursor-pointer">
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
        </div>
        <KaKaoMap
          fishingPoints={fishingPoints || []}
          locationData={locationData}
          selectedLocationProps={selectedLocation}
          handleClickRegionMarker={setSelectedLocation}
        />
      </div>
    </section>
  );
}
