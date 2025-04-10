"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  MinusCircle,
  PlusCircle,
  AlertCircle,
  Search,
  MapPin,
} from "lucide-react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function WritePostForm() {
  const [date, setDate] = useState<Date>();
  const [memberCount, setMemberCount] = useState(2);

  return (
    <>
      {/* 돌아가기 버튼 */}
    <div className="mb-4">
  <Link
    href="/fishing-group"
  className="text-[#3795FF] hover:text-[#2773CC] font-medium"
    >
          ← 목록으로 돌아가기
  </Link>
  </div>
  <div className="bg-white rounded-lg p-8 border border-gray-600">
    {/* 라벨 */}
    <h1 className="text-2xl font-semibold mb-2">낚시 동출 모집 글쓰기</h1>
  <p className="text-gray-500 mb-8">
    함께 낚시를 즐길 동료를 모집하세요.
  </p>

  {/* 폼 */}
  <form className="space-y-6">
    {/* 제목 */}
    <div className="space-y-2">
  <label htmlFor="title" className="block font-medium">
    제목
    </label>
    <Input
  id="title"
  required
  placeholder="제목을 입력하세요"
  className="w-full h-12 text-base"
    />
    </div>

  {/* 동출 모집 날짜 */}
  <div className="space-y-2">
  <label htmlFor="date" className="block font-medium">
    낚시 날짜
  </label>
  <Popover>
  <PopoverTrigger asChild>
  <Button
    variant="outline"
  className={cn(
    "w-full justify-start text-left font-normal h-12 text-base",
  !date && "text-muted-foreground"
)}
>
  <CalendarIcon className="mr-2 h-4 w-4" />
  {date
    ? format(date, "PPP", { locale: ko })
    : "날짜를 선택하세요"}
  </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0 bg-white" align="start">
  <Calendar
    mode="single"
  selected={date}
  onSelect={setDate}
  initialFocus
  locale={ko}
  className="rounded-md border"
    />
    </PopoverContent>
    </Popover>
    </div>

  {/* 낚시 장소 */}
  <div className="space-y-2">
  <label htmlFor="fishingSpot" className="block font-medium">
    낚시 포인트
  </label>
  <div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
  <Input
    id="fishingSpot"
  required
  placeholder="낚시 포인트를 검색하세요"
  className="w-full h-12 text-base pl-10"
    />
    </div>
    </div>

  {/* 상세 위치 */}
  <div className="space-y-2">
  <label htmlFor="location" className="block font-medium">
    상세 위치
  </label>
  <div className="relative">
  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
  <Input
    id="location"
  required
  placeholder="상세 위치를 입력하세요"
  className="w-full h-12 text-base pl-10"
    />
    </div>
    </div>

  {/* 모집인원 */}
  <div className="space-y-2">
  <label htmlFor="memberCount" className="block font-medium">
    모집 인원
  </label>
  <div className="flex items-center space-x-2">
  <Button
    type="button"
  variant="outline"
  size="icon"
  className="h-12 w-12"
  onClick={() => setMemberCount(Math.max(2, memberCount - 1))}
>
  <MinusCircle className="h-5 w-5" />
    </Button>
    <Input
  id="memberCount"
  required
  type="number"
  value={memberCount}
  onChange={(e) => setMemberCount(Number(e.target.value))}
  min={2}
  className="w-20 h-12 text-base text-center
    [appearance:textfield]
  [&::-webkit-inner-spin-button]:appearance-none
    [&::-webkit-outer-spin-button]:appearance-none"
  />
  <Button
    type="button"
  variant="outline"
  size="icon"
  className="h-12 w-12"
  onClick={() => setMemberCount(memberCount + 1)}
>
  <PlusCircle className="h-5 w-5" />
    </Button>
    </div>
    </div>

  {/* 선상 낚시 여부 */}
  <div className="flex items-center space-x-2">
  <Checkbox id="isBoatFishing" required />
  <label
    htmlFor="isBoatFishing"
  className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
    선상 낚시 여부
  </label>
  </div>

  {/* 내용 */}
  <div className="space-y-2">
  <label htmlFor="content" className="block font-medium">
    내용
    </label>
    <Textarea
  id="content"
  required
  placeholder="동출 모집에 대한 상세 내용을 입력하세요. 준비물, 교통편, 경험 요구사항 등을 포함하면 좋습니다."
  className="min-h-[200px] text-base"
    />
    </div>

  {/* 안내사항 */}
  <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm text-blue-600">
  <div className="flex items-center space-x-2">
  <AlertCircle className="h-4 w-4" />
    <p>동출 모집 시 안내사항</p>
  </div>
  <ul className="list-disc pl-5 space-y-1">
    <li>· 모든 인원이 모집되면 채팅방이 개설됩니다.</li>
  <li>· 허위 정보 작성 시 이용이 제한될 수 있습니다.</li>
  <li>· 동출 관련 대화는 채팅방에서 진행해주세요.</li>
  <li>· 게시글 작성자는 책임감을 가지고 작성해주세요.</li>
  </ul>
  </div>

  {/* 이미지 업로드 */}
  <div className="space-y-2">
  <p className="font-medium">이미지 첨부 (선택사항)</p>
  <div className="border border-dashed border-gray-500 rounded-lg p-6 text-center">
  <p className="text-gray-500">
    이미지를 드래그하여 업로드하거나 클릭하여 파일을 선택하세요.
  </p>
  <Button variant="outline" className="mt-4">
    파일 선택
  </Button>
  </div>
  </div>

  {/* 등록버튼 */}
  <div className="flex justify-end gap-2 pt-4">
  <Button variant="outline" className="hover:bg-gray-100">
    취소
    </Button>
    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
    등록하기
    </Button>
    </div>
    </form>
    </div>
    </>
);
}