"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getRegions } from "@/lib/api/fishingPointAPI";
import { FishingPointLocation } from "@/types/fishingPointLocationType";

export function SearchBar({
  handleSearch,
  handleRegionChange,
}: {
  handleSearch: (searchTerm: string) => void;
  handleRegionChange: (regionId: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [regions, setRegions] = useState<FishingPointLocation[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("all");

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regionsData = await getRegions();
        setRegions(regionsData);
      } catch (error) {
        console.error("지역 정보를 불러오는데 실패했습니다:", error);
      }
    };

    fetchRegions();
  }, []);

  const onRegionChange = (value: string) => {
    console.log("선택된 지역 ID:", value);
    console.log(
      "선택된 지역 이름:",
      regions.find((region) => region.regionId === value)?.regionName
    );
    setSelectedRegion(value);
    handleRegionChange(value);
  };

  return (
    <div className="flex gap-2 mt-10 mb-10 items-center max-w-4xl mx-auto">
      <Select
        value={selectedRegion}
        onValueChange={(value) => {
          console.log("=== 지역 선택 이벤트 발생 ===");
          console.log("이전 선택 지역:", selectedRegion);
          console.log("새로 선택된 지역:", value);
          onRegionChange(value);
        }}
      >
        <SelectTrigger className="w-[180px] bg-white border-gray-60 text-base h-full cursor-pointer">
          <SelectValue placeholder="지역을 선택하세요" />
        </SelectTrigger>
        <SelectContent
          side="bottom"
          align="start"
          className="w-[180px] z-50"
          sideOffset={4}
        >
          <SelectItem value="all" className="text-base">
            전체 지역
          </SelectItem>
          {regions.map((region) => (
            <SelectItem
              key={region.regionId}
              value={region.regionId}
              className="text-base"
            >
              {region.regionName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative flex-1">
        <Input
          type="search"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchTerm);
            }
          }}
          className="w-full pl-10 pr-4 py-2 border-gray-60 rounded-md text-base h-full"
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
              stroke="#94A3B8"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <button
        onClick={() => handleSearch(searchTerm)}
        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-500 text-base cursor-pointer"
      >
        검색
      </button>
      <Link
        href="/fishing-group/write"
        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-500 text-base cursor-pointer"
      >
        + 글쓰기
      </Link>
    </div>
  );
}
