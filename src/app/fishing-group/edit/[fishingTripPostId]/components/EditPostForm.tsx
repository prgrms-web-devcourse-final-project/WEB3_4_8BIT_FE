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
  AlertCircle,
  Search,
  MapPin,
  Clock,
  Upload,
  X,
} from "lucide-react";

import { format, isBefore, startOfDay, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { uploadImagesToS3 } from "@/lib/api/uploadImageAPI";
import { getFishingPost, updateFishingPost } from "@/lib/api/fishingPostAPI";
import { useRouter } from "next/navigation";

// 낚시 포인트 임시 데이터
const fishingPoints = [
  { id: 1, name: "인천 송도" },
  { id: 2, name: "인천 영종도" },
  { id: 3, name: "인천 강화도" },
  { id: 4, name: "인천 옹진군" },
  { id: 5, name: "서울 여의도" },
  { id: 6, name: "경기 안산" },
  { id: 7, name: "경기 시흥" },
  { id: 8, name: "경기 화성" },
  { id: 9, name: "경기 평택" },
  { id: 10, name: "경기 부천" },
];

// 지역 임시 데이터
const regions = [
  { id: 1, name: "서울" },
  { id: 2, name: "인천" },
  { id: 3, name: "경기" },
  { id: 4, name: "강원" },
  { id: 5, name: "충북" },
  { id: 6, name: "충남" },
  { id: 7, name: "전북" },
  { id: 8, name: "전남" },
  { id: 9, name: "경북" },
  { id: 10, name: "경남" },
];

interface EditPostFormProps {
  postId: number;
}

export default function EditPostForm({ postId }: EditPostFormProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [selectedHour, setSelectedHour] = useState("09");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [memberCount, setMemberCount] = useState(2);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingFileUrls, setExistingFileUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isBoatFishing, setIsBoatFishing] = useState(false);
  const [selectedFishingPoint, setSelectedFishingPoint] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 게시글 데이터 불러오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setIsLoading(true);
        const response = await getFishingPost(postId);
        if (response.success) {
          const postData = response.data;

          // 폼 필드 초기화
          setTitle(postData.subject);
          setContent(postData.content);

          // 날짜 및 시간 설정
          const fishingDate = new Date(postData.fishingDate);
          setDate(fishingDate);
          setSelectedHour(String(fishingDate.getHours()).padStart(2, "0"));
          setSelectedMinute(String(fishingDate.getMinutes()).padStart(2, "0"));

          // 모집 인원 설정
          setMemberCount(postData.recruitmentCount);

          // 낚시 포인트 및 지역 설정
          // postData에 fishingPointId 또는 regionId가 존재한다고 가정
          if (postData.fishingPointId) {
            setSelectedFishingPoint(String(postData.fishingPointId));
          }
          if (postData.regionId) {
            setSelectedRegion(String(postData.regionId));
          }

          // 선상낚시 여부 설정
          if (postData.isShipFish !== undefined) {
            setIsBoatFishing(postData.isShipFish);
          }

          // 기존 이미지 URL 설정
          if (postData.fileUrlList && postData.fileUrlList.length > 0) {
            setExistingFileUrls(postData.fileUrlList);
          }
        } else {
          alert("게시글을 불러오는데 실패했습니다.");
          router.push("/fishing-group");
        }
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
        alert("게시글을 불러오는데 실패했습니다.");
        router.push("/fishing-group");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [postId, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    const totalCount =
      selectedFiles.length + newFiles.length + existingFileUrls.length;

    if (totalCount > 10) {
      alert("최대 10장까지 업로드 가능합니다.");
      newFiles.splice(10 - selectedFiles.length - existingFileUrls.length);
    }

    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
    const urls = updatedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeImage = (index: number, isExisting: boolean = false) => {
    if (isExisting) {
      // 기존 이미지 제거
      const updatedExistingUrls = existingFileUrls.filter(
        (_, i) => i !== index
      );
      setExistingFileUrls(updatedExistingUrls);
    } else {
      // 새로 추가한 이미지 제거
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updatedFiles);
      const updatedUrls = updatedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(updatedUrls);
    }

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
        fishingTripPostId: postId,
        subject: title,
        fishingDate: fishingDateTime.toISOString(),
        fishingPointId: parseInt(selectedFishingPoint),
        regionId: parseInt(selectedRegion),
        recruitmentCount: memberCount,
        isShipFish: isBoatFishing,
        content: content,
        fileIdList: imageFileIds,
        // 기존 파일 URL을 유지하는 정보가 필요할 수 있음
      };

      console.log("✅ 최종 전송 데이터:", requestBody);
      await updateFishingPost(requestBody);

      alert("게시글이 수정되었습니다!");
      router.push(`/fishing-group/post/${postId}`);
    } catch (err) {
      console.error("게시글 수정 중 오류:", err);
      alert("게시글 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 오늘 이전 날짜를 비활성화하는 함수
  const disablePastDates = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                        "w-full justify-start text-left font-normal h-12",
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
                      disabled={disablePastDates}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2 items-center relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className="h-12 rounded-md border border-input bg-background pl-10 pr-3"
                >
                  {Array.from({ length: 24 }, (_, i) =>
                    String(i).padStart(2, "0")
                  ).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}시
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <select
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(e.target.value)}
                  className="h-12 rounded-md border border-input bg-background px-3"
                >
                  {["00", "10", "20", "30", "40", "50"].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}분
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="region" className="block font-medium">
                지역
              </label>
              <div className="relative">
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-md border-gray-60 bg-white text-base cursor-pointer"
                  required
                >
                  <option value="">지역을 선택하세요</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="fishingPoint" className="block font-medium">
                낚시 포인트
              </label>
              <div className="relative">
                <select
                  id="fishingPoint"
                  value={selectedFishingPoint}
                  onChange={(e) => setSelectedFishingPoint(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-md border-gray-60 bg-white text-base cursor-pointer"
                  required
                >
                  <option value="">낚시 포인트를 선택하세요</option>
                  {fishingPoints.map((point) => (
                    <option key={point.id} value={point.id}>
                      {point.name}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
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
                  className="h-12 w-12 rounded-md border-gray-60 bg-white"
                  onClick={() => setMemberCount(Math.max(1, memberCount - 1))}
                >
                  <MinusCircle className="h-5 w-5 text-gray-600" />
                </Button>
                <div className="h-12 w-16 flex items-center justify-center text-center text-lg">
                  {memberCount}명
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-md border-gray-60 bg-white"
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
              className="h-60 rounded-md border-gray-60 bg-white text-base"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-medium">이미지 업로드</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">최대 10장</span>
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

            {/* 기존 이미지 미리보기 */}
            {existingFileUrls.length > 0 && (
              <div className="grid grid-cols-5 gap-4 mt-4">
                {existingFileUrls.map((url, index) => (
                  <div
                    key={`existing-${index}`}
                    className="relative aspect-square"
                  >
                    <Image
                      src={url}
                      alt={`existing-${index}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      onClick={() => removeImage(index, true)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 새로 추가된 이미지 미리보기 */}
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
