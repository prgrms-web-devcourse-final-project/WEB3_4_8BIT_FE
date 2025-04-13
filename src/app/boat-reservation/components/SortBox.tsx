"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShipPostListAPIResponse } from "@/types/boatPostType";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SortBox({
  shipPostsData,
}: {
  shipPostsData: ShipPostListAPIResponse;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortValue, setSortValue] = useState("recommended");

  // URL 파라미터에서 초기 정렬 값 설정
  useEffect(() => {
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");

    if (sort && order) {
      if (sort === "createdAt" && order === "desc") {
        setSortValue("createdAt");
      } else if (sort === "price" && order === "asc") {
        setSortValue("price-high");
      } else if (sort === "price" && order === "desc") {
        setSortValue("price-low");
      } else if (sort === "reviewEverRate" && order === "desc") {
        setSortValue("reviewEverRate-high");
      } else if (sort === "reviewEverRate" && order === "asc") {
        setSortValue("reviewEverRate-low");
      }
    }
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    setSortValue(value);

    const params = new URLSearchParams();

    // 현재 URL의 모든 파라미터를 복사하되, _rsc 파라미터는 제외
    searchParams.forEach((value, key) => {
      if (key !== "_rsc") {
        params.set(key, value);
      }
    });

    // 정렬 파라미터 설정
    if (value === "createdAt") {
      params.set("sort", "createdAt");
      params.set("order", "desc");
    } else if (value === "price-high") {
      params.set("sort", "price");
      params.set("order", "asc");
    } else if (value === "price-low") {
      params.set("sort", "price");
      params.set("order", "desc");
    } else if (value === "reviewEverRate-high") {
      params.set("sort", "reviewEverRate");
      params.set("order", "desc");
    } else if (value === "reviewEverRate-low") {
      params.set("sort", "reviewEverRate");
      params.set("order", "asc");
    }

    // 페이지네이션 파라미터 초기화
    params.delete("id");
    params.delete("fieldValue");

    // URL 업데이트
    router.push(`/boat-reservation?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">
        검색 결과 ({shipPostsData.data.numberOfElements})
      </h2>
      <Select value={sortValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] cursor-pointer">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">최신순</SelectItem>
          <SelectItem value="price-high">가격 낮은순</SelectItem>
          <SelectItem value="price-low">가격 높은순</SelectItem>
          <SelectItem value="reviewEverRate-high">평점 높은순</SelectItem>
          <SelectItem value="reviewEverRate-low">평점 낮은순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
