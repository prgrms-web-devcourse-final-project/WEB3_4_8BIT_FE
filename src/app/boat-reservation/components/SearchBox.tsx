"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams();

    // 현재 URL의 모든 파라미터를 복사하되, _rsc 파라미터는 제외
    searchParams.forEach((value: string, key: string) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });

    // 새로운 검색 파라미터 설정
    if (keyword) {
      params.set("keyword", keyword);
    }
    if (guestCount) {
      params.set("guestCount", guestCount);
    }
    if (searchDate) {
      params.set("searchDate", searchDate);
    }

    // size 파라미터가 없으면 기본값 10을 추가
    if (!params.has("size")) {
      params.set("size", "10");
    }

    router.push(`/boat-reservation?${params.toString()}`);
  };

  return (
    <div className="bg-white border-[1px] rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="date" className="mb-2 block">
            날짜
          </Label>
          <div className="relative">
            <Input
              id="date"
              type="date"
              className="pl-10"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        <div>
          <Label htmlFor="search" className="mb-2 block">
            검색어
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="search"
              type="search"
              className="pl-10"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="fish-type" className="mb-2 block">
            인원수
          </Label>
          <Select value={guestCount} onValueChange={setGuestCount}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="인원 수 선택" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 8 }, (_, i) => (
                <SelectItem key={i} value={String(i + 1)}>
                  {i + 1}명 이상
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button
            className="w-full bg-primary hover:bg-sub-1 cursor-pointer"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4 mr-2" /> 검색
          </Button>
        </div>
      </div>
    </div>
  );
}
