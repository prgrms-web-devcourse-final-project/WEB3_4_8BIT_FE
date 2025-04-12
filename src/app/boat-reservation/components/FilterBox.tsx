"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCw, Star, Check } from "lucide-react";
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

export default function FilterBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minRating, setMinRating] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [fishId, setFishId] = useState<string>("all");
  const [pendingChanges, setPendingChanges] = useState<boolean>(false);
  const [duration, setDuration] = useState<string>("all");

  useEffect(() => {
    const rating = searchParams.get("minRating");
    const price = searchParams.get("maxPrice");
    const fish = searchParams.get("fishId");
    const duration = searchParams.get("duration");
    if (rating) {
      setMinRating(rating);
    }
    if (price) {
      setMaxPrice(parseInt(price));
    }
    if (fish) {
      setFishId(fish);
    }
    if (duration) {
      setDuration(duration);
    }
  }, [searchParams]);

  const handleRatingChange = (value: string) => {
    setMinRating(value);
    setPendingChanges(true);
  };

  const handlePriceChange = (value: number[]) => {
    setMaxPrice(value[0]);
    setPendingChanges(true);
  };

  const handleFishChange = (value: string) => {
    setFishId(value);
    setPendingChanges(true);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    setPendingChanges(true);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    // 현재 URL의 모든 파라미터를 복사하되, _rsc 파라미터는 제외
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });

    // 필터 값 설정
    if (minRating !== "all") {
      params.set("minRating", minRating);
    } else {
      params.delete("minRating");
    }

    params.set("maxPrice", maxPrice.toString());

    if (fishId !== "all") {
      params.set("fishId", fishId);
    } else {
      params.delete("fishId");
    }

    // size 파라미터가 없으면 기본값 10을 추가
    if (!params.has("size")) {
      params.set("size", "10");
    }

    if (duration !== "all") {
      params.set("duration", duration);
    } else {
      params.delete("duration");
    }

    router.push(`/boat-reservation?${params.toString()}`);
    setPendingChanges(false);
  };

  const handleReset = () => {
    setMinRating("all");
    setMaxPrice(200000);
    setFishId("all");
    setPendingChanges(false);
    setDuration("all");
    // 초기화 시에도 size 파라미터를 포함하고 _rsc 파라미터는 제외
    router.push("/boat-reservation?size=10");
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
            {pendingChanges && (
              <Button
                size="sm"
                className="bg-primary hover:bg-sub-1 text-white h-7 px-2 text-sm"
                onClick={handleApplyFilters}
              >
                <Check className="h-3 w-3 mr-1" /> 확인
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 py-3">
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
