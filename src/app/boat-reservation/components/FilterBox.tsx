"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCw, Star, Check, Calendar, Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FilterBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minRating, setMinRating] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [fishId, setFishId] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");
  const [keyword, setKeyword] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [hasKeywordChange, setHasKeywordChange] = useState(false);

  useEffect(() => {
    const rating = searchParams.get("minRating");
    const price = searchParams.get("maxPrice");
    const fish = searchParams.get("fishId");
    const duration = searchParams.get("duration");
    const keyword = searchParams.get("keyword");
    const guestCount = searchParams.get("guestCount");
    const searchDate = searchParams.get("searchDate");

    if (rating) setMinRating(rating);
    if (price) setMaxPrice(parseInt(price));
    if (fish) setFishId(fish);
    if (duration) setDuration(duration);
    if (keyword) setKeyword(keyword);
    if (guestCount) setGuestCount(guestCount);
    if (searchDate) setSearchDate(searchDate);
  }, [searchParams]);

  const updateSearchParams = (params: URLSearchParams) => {
    if (!params.has("size")) {
      params.set("size", "4");
    }

    // 현재 스크롤 위치 저장
    const scrollPosition = window.scrollY;

    // URL 업데이트
    router.push(`/boat-reservation?${params.toString()}`, { scroll: false });

    // 스크롤 위치 복원
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  const handleRatingChange = (value: string) => {
    setMinRating(value);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });
    if (value !== "all") {
      params.set("minRating", value);
    } else {
      params.delete("minRating");
    }
    updateSearchParams(params);
  };

  const handlePriceChange = (value: number[]) => {
    setMaxPrice(value[0]);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });
    params.set("maxPrice", value[0].toString());
    updateSearchParams(params);
  };

  const handleFishChange = (value: string) => {
    setFishId(value);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });
    if (value !== "all") {
      params.set("fishId", value);
    } else {
      params.delete("fishId");
    }
    updateSearchParams(params);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });
    if (value !== "all") {
      params.set("duration", value);
    } else {
      params.delete("duration");
    }
    updateSearchParams(params);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setHasKeywordChange(true);
  };

  const handleGuestCountChange = (value: string) => {
    setGuestCount(value);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });
    if (value) {
      params.set("guestCount", value);
    } else {
      params.delete("guestCount");
    }
    updateSearchParams(params);
  };

  const handleSearchDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(e.target.value);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });
    if (e.target.value) {
      params.set("searchDate", e.target.value);
    } else {
      params.delete("searchDate");
    }
    updateSearchParams(params);
  };

  const handleApplyKeyword = () => {
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });
    if (keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }
    updateSearchParams(params);
    setHasKeywordChange(false);
  };

  const handleReset = () => {
    setMinRating("all");
    setMaxPrice(200000);
    setFishId("all");
    setDuration("all");
    setKeyword("");
    setGuestCount("");
    setSearchDate("");
    setHasKeywordChange(false);
    router.push("/boat-reservation?size=4", { scroll: false });
  };

  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader className="flex justify-between py-3">
          <CardTitle className="text-lg">필터</CardTitle>
          <div className="flex gap-2">
            <div
              className="flex gap-1 items-center cursor-pointer text-gray-400 hover:text-gray-600 text-sm"
              onClick={handleReset}
            >
              <RotateCw size={14} />
              초기화
            </div>
            {hasKeywordChange && (
              <Button
                size="sm"
                className="bg-primary hover:bg-sub-1 text-white h-7 px-2 text-sm"
                onClick={handleApplyKeyword}
              >
                <Check className="h-3 w-3 mr-1" /> 확인
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 py-3">
          <div>
            <h4 className="font-medium mb-2 text-sm">검색</h4>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="검색어를 입력하세요"
                  className="pl-9 h-8 text-sm"
                  value={keyword}
                  onChange={handleKeywordChange}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="date"
                  className="pl-9 h-8 text-sm"
                  value={searchDate}
                  onChange={handleSearchDateChange}
                />
              </div>
              <Select value={guestCount} onValueChange={handleGuestCountChange}>
                <SelectTrigger className="h-8 text-sm">
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
          </div>

          <div>
            <h4 className="font-medium mb-2 text-sm">가격 범위</h4>
            <Slider
              value={[maxPrice]}
              max={200000}
              step={10000}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0원</span>
              <span>{maxPrice.toLocaleString()}원</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-sm">평점</h4>
            <RadioGroup value={minRating} onValueChange={handleRatingChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="all"
                  id="all"
                  className="cursor-pointer"
                />
                <Label htmlFor="all" className="cursor-pointer text-sm">
                  전체
                </Label>
              </div>
              {[
                { value: "4", label: "4.0 이상" },
                { value: "3", label: "3.0 이상" },
                { value: "2", label: "2.0 이상" },
                { value: "1", label: "1.0 이상" },
              ].map((item) => (
                <div key={item.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={item.value}
                    id={item.value}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={item.value}
                    className="flex items-center cursor-pointer text-sm"
                  >
                    {item.label}
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400 ml-1" />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-sm">소요 시간</h4>
            <RadioGroup value={duration} onValueChange={handleDurationChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="all"
                  id="all"
                  className="cursor-pointer"
                />
                <Label htmlFor="all" className="text-sm">
                  전체
                </Label>
              </div>
              {[
                { value: "02:00", label: "2시간 이하" },
                { value: "04:00", label: "4시간 이하" },
                { value: "06:00", label: "6시간 이하" },
                { value: "12:00", label: "12시간 이하" },
              ].map((item) => (
                <div key={item.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={item.value}
                    id={item.value}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={item.value}
                    className="flex items-center text-sm"
                  >
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-sm">대상 어종</h4>
            <Select value={fishId} onValueChange={handleFishChange}>
              <SelectTrigger
                id="fish-type"
                className="cursor-pointer h-8 text-sm"
              >
                <SelectValue placeholder="어종 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="0">참돔</SelectItem>
                <SelectItem value="1">농어</SelectItem>
                <SelectItem value="2">광어</SelectItem>
                <SelectItem value="3">갑오징어</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
