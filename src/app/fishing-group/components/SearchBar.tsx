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
  onRegionChange,
}: {
  handleSearch: (searchTerm: string) => void;
  onRegionChange: (regionId: string) => void;
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

  const handleRegionChange = (value: string) => {
    console.log("=== 지역 선택 변경 ===");
    console.log("선택된 지역 ID:", value);
    console.log(
      "선택된 지역 이름:",
      regions.find((region) => region.regionId === value)?.regionName ||
        "전체 지역"
    );
    setSelectedRegion(value);
    // 지역 선택 시 부모 컴포넌트에 알림
    onRegionChange(value);
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 flex-1">
            <Select value={selectedRegion} onValueChange={handleRegionChange}>
              <SelectTrigger className="w-full md:w-[220px] h-12 bg-white border-gray-200 text-base font-medium shadow-sm cursor-pointer">
                <SelectValue placeholder="지역을 선택하세요" />
              </SelectTrigger>
              <SelectContent
                position="item-aligned"
                side="bottom"
                align="start"
                className="w-[220px] z-50"
                sideOffset={4}
                avoidCollisions={false}
              >
                <SelectItem value="all" className="text-base py-3">
                  전체 지역
                </SelectItem>
                {regions.map((region) => (
                  <SelectItem
                    key={region.regionId}
                    value={region.regionId}
                    className="text-base py-2.5"
                  >
                    {region.regionName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <input
                type="search"
                placeholder="제목을 검색하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchTerm);
                  }
                }}
                className="w-full h-11 pl-12 pr-4 border border-gray-200 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
              />
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => handleSearch(searchTerm)}
              className="flex-1 md:flex-none px-8 h-11 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-base font-medium transition-colors duration-200 flex items-center justify-center shadow-sm"
            >
              검색
            </button>
            <Link
              href="/fishing-group/write"
              className="flex-1 md:flex-none px-8 h-11 cursor-pointer bg-white text-blue-600 border-2 border-blue-500 rounded-lg hover:bg-blue-50 text-base font-medium transition-colors duration-200 flex items-center justify-center shadow-sm"
            >
              + 글쓰기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
