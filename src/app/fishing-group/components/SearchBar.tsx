"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchBar() {
  return (
    <div className="flex gap-2 mt-8 mb-8 items-center max-w-4xl mx-auto">
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px] bg-white border-gray-200 text-base h-12">
          <SelectValue placeholder="지역 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-base">
            지역 선택하세요
          </SelectItem>
          <SelectItem value="seoul" className="text-base">
            서울
          </SelectItem>
          <SelectItem value="gyeonggi" className="text-base">
            경기
          </SelectItem>
          <SelectItem value="incheon" className="text-base">
            인천
          </SelectItem>
          <SelectItem value="busan" className="text-base">
            부산
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex-1 relative max-w-lg">
        <Input
          type="search"
          placeholder="검색어를 입력하세요"
          className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-md text-base h-12"
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
      <button className="px-6 py-2 bg-[#3795FF] text-white rounded-md hover:bg-blue-600 text-base h-12">
        검색
      </button>
      <button className="px-6 py-2 bg-[#3795FF] text-white rounded-md hover:bg-blue-600 text-base h-12">
        + 글쓰기
      </button>
    </div>
  );
}
