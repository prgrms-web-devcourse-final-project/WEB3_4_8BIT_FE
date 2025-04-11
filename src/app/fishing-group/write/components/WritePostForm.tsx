"use client";

import Link from "next/link";
import Image from "next/image";
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
  MapPin,
  Clock,
  X,
  AlertCircle,
  Upload,
} from "lucide-react";

import { format, isBefore, startOfDay } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { uploadImagesToS3 } from "@/lib/api/uploadImageAPI";
import { createFishingPost } from "@/lib/api/fishingPostAPI";
import { getRegions, getFishingRegion } from "@/lib/api/fishingPointAPI";
import { useRouter } from "next/navigation";
import {
  FishingPointLocation,
  FishingPoint,
} from "@/types/fishingPointLocationType";

export default function WritePostForm() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [selectedHour, setSelectedHour] = useState("09");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [memberCount, setMemberCount] = useState(2);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isBoatFishing, setIsBoatFishing] = useState(false);
  const [selectedFishingPoint, setSelectedFishingPoint] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regions, setRegions] = useState<FishingPointLocation[]>([]);
  const [fishingPoints, setFishingPoints] = useState<FishingPoint[]>([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);
  const [isLoadingFishingPoints, setIsLoadingFishingPoints] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 지역 데이터 가져오기
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setIsLoadingRegions(true);
        const regionsData = await getRegions();
        setRegions(regionsData);
      } catch (error) {
        console.error("지역 데이터 가져오기 실패:", error);
      } finally {
        setIsLoadingRegions(false);
      }
    };

    fetchRegions();
  }, []);

  // 지역 선택 시 해당 지역의 낚시 포인트 가져오기
  useEffect(() => {
    const fetchFishingPoints = async () => {
      if (!selectedRegion) {
        setFishingPoints([]);
        setSelectedFishingPoint("");
        return;
      }

      try {
        setIsLoadingFishingPoints(true);
        const points = await getFishingRegion(selectedRegion);
        setFishingPoints(points);
      } catch (error) {
        console.error("낚시 포인트 가져오기 실패:", error);
        setFishingPoints([]);
      } finally {
        setIsLoadingFishingPoints(false);
      }
    };

    fetchFishingPoints();
  }, [selectedRegion]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    const totalCount = selectedFiles.length + newFiles.length;

    if (totalCount > 10) {
      alert("최대 10장까지 업로드 가능합니다.");
      newFiles.splice(10 - selectedFiles.length);
    }

    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
    const urls = updatedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    const updatedUrls = updatedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(updatedUrls);

    // 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!date) {
      alert("날짜를 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    if (!selectedFishingPoint) {
      alert("낚시 포인트를 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    if (!selectedRegion) {
      alert("지역을 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    try {
      let imageFileIds: number[] = [];
      if (selectedFiles.length > 0) {
        console.log("✅ 선택된 이미지 수:", selectedFiles.length);
        imageFileIds = await uploadImagesToS3(selectedFiles, "post");
      }

      // 선택된 날짜와 시간을 합쳐서 fishingDate 생성
      const fishingDateTime = new Date(date);
      fishingDateTime.setHours(parseInt(selectedHour, 10));
      fishingDateTime.setMinutes(parseInt(selectedMinute, 10));

      const requestBody = {
        subject: title,
        fishingDate: fishingDateTime.toISOString(),
        fishingPointId: parseInt(selectedFishingPoint),
        regionId: parseInt(selectedRegion),
        recruitmentCount: memberCount,
        isShipFish: isBoatFishing,
        content: content,
        fileIdList: imageFileIds,
      };

      console.log("✅ 최종 전송 데이터:", requestBody);
      await createFishingPost(requestBody);

      alert("게시글이 등록되었습니다!");
      router.push("/fishing-group");
    } catch (err) {
      console.error("게시글 등록 중 오류:", err);
      alert("게시글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 오늘 이전 날짜를 비활성화하는 함수
  const disablePastDates = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };

  return (
    <>
      <div className="mb-4">
        <Link
          href="/fishing-group"
          className="text-primary hover:text-[#2773CC] font-medium"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>
      <div className="bg-white rounded-lg p-8 border border-gray-70 shadow">
        <h1 className="text-2xl font-semibold mb-2">낚시 동출 모집 글쓰기</h1>
        <p className="text-gray-500 mb-8">
          함께 낚시를 즐길 동료를 모집하세요.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium">
              제목
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="제목을 입력하세요"
              className="text-base"
              style={{ fontSize: "16px" }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="block font-medium">
              낚시 날짜/시간
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12 cursor-pointer text-base",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5" />
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
                      disabled={disablePastDates}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* 시간 선택 */}
              <div className="relative w-[120px]">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className="h-12 w-full rounded-md border border-input bg-background pl-10 pr-8 cursor-pointer text-base appearance-none"
                >
                  {Array.from({ length: 24 }, (_, i) =>
                    String(i).padStart(2, "0")
                  ).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}시
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* 분 선택 */}
              <div className="relative w-[120px]">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(e.target.value)}
                  className="h-12 w-full rounded-md border border-input bg-background pl-10 pr-8 cursor-pointer text-base appearance-none"
                >
                  {["00", "10", "20", "30", "40", "50"].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}분
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 지역 선택 */}
          <div className="space-y-2">
            <label htmlFor="region" className="block font-medium">
              지역
            </label>
            <div className="relative">
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full h-12 pl-10 pr-8 rounded-md border border-gray-200 bg-white text-base cursor-pointer appearance-none"
                required
                disabled={isLoadingRegions}
              >
                <option value="">지역을 선택하세요</option>
                {regions.map((region) => (
                  <option key={region.regionId} value={region.regionId}>
                    {region.regionName}
                  </option>
                ))}
              </select>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {isLoadingRegions && (
              <p className="text-sm text-gray-500">
                지역 데이터를 불러오는 중...
              </p>
            )}
          </div>

          {/* 낚시 포인트 선택 */}
          <div className="space-y-2">
            <label htmlFor="fishingPoint" className="block font-medium">
              낚시 포인트
            </label>
            <div className="relative">
              <select
                id="fishingPoint"
                value={selectedFishingPoint}
                onChange={(e) => setSelectedFishingPoint(e.target.value)}
                className="w-full h-12 pl-10 pr-8 rounded-md border border-gray-200 bg-white text-base cursor-pointer appearance-none"
                required
                disabled={
                  isLoadingFishingPoints ||
                  !selectedRegion ||
                  fishingPoints.length === 0
                }
              >
                <option value="">
                  {!selectedRegion
                    ? "먼저 지역을 선택하세요"
                    : isLoadingFishingPoints
                    ? "낚시 포인트를 불러오는 중..."
                    : fishingPoints.length === 0
                    ? "해당 지역에 낚시 포인트가 없습니다"
                    : "낚시 포인트를 선택하세요"}
                </option>
                {fishingPoints.map((point) => (
                  <option key={point.fishPointId} value={point.fishPointId}>
                    {point.fishPointName} - {point.fishPointDetailName}
                  </option>
                ))}
              </select>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {isLoadingFishingPoints && (
              <p className="text-sm text-gray-500">
                낚시 포인트를 불러오는 중...
              </p>
            )}
            {!isLoadingFishingPoints &&
              selectedRegion &&
              fishingPoints.length === 0 && (
                <p className="text-sm text-red-500">
                  해당 지역에 낚시 포인트가 없습니다. 다른 지역을 선택해주세요.
                </p>
              )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="memberCount" className="block font-medium">
                모집 인원
              </label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-md border-gray-200 bg-white cursor-pointer"
                  onClick={() => setMemberCount(Math.max(1, memberCount - 1))}
                >
                  <MinusCircle className="h-5 w-5 text-gray-600" />
                </Button>
                <div className="h-12 w-16 flex items-center justify-center text-center text-base">
                  {memberCount}명
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-md border-gray-200 bg-white cursor-pointer"
                  onClick={() => setMemberCount(Math.min(10, memberCount + 1))}
                >
                  <PlusCircle className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-medium">낚시 종류</label>
              <div className="flex items-center h-12 space-x-2">
                <Checkbox
                  id="isBoatFishing"
                  checked={isBoatFishing}
                  onCheckedChange={(checked) =>
                    setIsBoatFishing(checked as boolean)
                  }
                />
                <label
                  htmlFor="isBoatFishing"
                  className="text-base cursor-pointer"
                >
                  선상 낚시 여부
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="block font-medium">
              내용
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="게시글 내용을 입력하세요"
              required
              className="h-60 rounded-md border-gray-70 bg-white text-base"
              style={{ fontSize: "16px" }}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-sm text-primary">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-4 w-4" />
              <p>동출 모집 시 안내사항</p>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li>모든 인원이 모집되면 채팅방이 개설됩니다.</li>
              <li>허위 정보 작성 시 이용이 제한될 수 있습니다.</li>
              <li>게시글 작성자는 책임감을 가지고 작성해주세요.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-medium">이미지 첨부 (선택사항)</p>
            <div className="border border-dashed rounded-lg p-6 text-center">
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-500 mb-2">
                  이미지를 드래그하여 업로드하거나 클릭하여 파일을 선택하세요
                </p>
                <p className="text-gray-500 mb-4">
                  (최대 10장까지 업로드 가능)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  파일 선택
                </Button>
              </div>
            </div>

            {/* 이미지 미리보기 */}
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-5 gap-4 mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={url}
                      alt={`preview-${index}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {previewUrls.length < 10 && (
                  <div
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <PlusCircle className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => router.push("/fishing-group")}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white cursor-pointer"
            >
              {isSubmitting ? "등록 중..." : "등록하기"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
