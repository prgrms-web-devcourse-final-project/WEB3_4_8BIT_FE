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
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  MinusCircle,
  PlusCircle,
  X,
  AlertCircle,
  Upload,
} from "lucide-react";

import { format, isBefore, startOfDay } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { uploadImagesToS3 } from "@/lib/api/uploadImageAPI";
import {
  getFishingPost,
  updateFishingPost,
  getRegions,
  getFishingPoints,
} from "@/lib/api/fishingPostAPI";
import { useRouter } from "next/navigation";
import {
  FileInfo,
  EditPostFormProps,
  PostData,
} from "@/types/EditPostFormType";
import axiosInstance from "@/lib/api/axiosInstance";
import {
  FishingPointLocation,
  FishingPoint,
} from "@/types/fishingPointLocationType";
import { getFishingRegion } from "@/lib/api/fishingPointAPI";

export default function EditPostForm({ postId }: EditPostFormProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [selectedHour, setSelectedHour] = useState("09");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [memberCount, setMemberCount] = useState(2);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingFiles, setExistingFiles] = useState<FileInfo[]>([]);
  const [existingFileUrls, setExistingFileUrls] = useState<string[]>([]);
  const [existingFileIds, setExistingFileIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isBoatFishing, setIsBoatFishing] = useState(false);
  const [selectedFishingPoint, setSelectedFishingPoint] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regions, setRegions] = useState<FishingPointLocation[]>([]);
  const [fishingPoints, setFishingPoints] = useState<FishingPoint[]>([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);
  const [isLoadingFishingPoints, setIsLoadingFishingPoints] = useState(false);
  const [regionName, setRegionName] = useState("");
  const [fishingPointName, setFishingPointName] = useState("");
  const [fishingPointDetailName, setFishingPointDetailName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState([]);
  const [postData, setPostData] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setIsLoading(true);
        const response = await getFishingPost(postId);
        console.log("📄 게시글 데이터 응답:", response);

        if (response.success) {
          const data = response.data as PostData;
          console.log("📄 게시글 데이터 상세:", data);
          setPostData(data);

          setTitle(data.subject);
          setContent(data.content);

          const fishingDate = new Date(data.fishingDate);
          setDate(fishingDate);
          setSelectedHour(String(fishingDate.getHours()).padStart(2, "0"));
          setSelectedMinute(String(fishingDate.getMinutes()).padStart(2, "0"));

          setMemberCount(data.recruitmentCount);

          // 지역과 낚시 포인트 ID 설정
          if (data.regionId) {
            console.log("지역 ID 설정:", data.regionId);
            setSelectedRegion(String(data.regionId));
          }

          if (data.fishingPointId) {
            console.log("낚시 포인트 ID 설정:", data.fishingPointId);
            setSelectedFishingPoint(String(data.fishingPointId));
          }

          if (data.isShipFish !== undefined) {
            setIsBoatFishing(data.isShipFish);
          }

          let fileIds: number[] = [];
          let fileUrls: string[] = [];
          let fileInfos: FileInfo[] = [];

          if (data.fileList && data.fileList.length > 0) {
            fileInfos = data.fileList;
            fileIds = data.fileList.map((f: FileInfo) => f.fileId);
            fileUrls = data.fileList.map((f: FileInfo) => f.fileUrl);
          } else if (data.files && data.files.length > 0) {
            fileInfos = data.files;
            fileIds = data.files.map((f: FileInfo) => f.fileId);
            fileUrls = data.files.map((f: FileInfo) => f.fileUrl);
          } else if (data.fileUrlList && data.fileUrlList.length > 0) {
            fileUrls = data.fileUrlList;
            fileIds = [];
            fileInfos = [];
          }

          setExistingFiles(fileInfos);
          setExistingFileUrls(fileUrls);
          setExistingFileIds(fileIds);
        } else {
          alert("게시글을 불러오는데 실패했습니다.");
          router.push("/fishing-group");
        }
      } catch (error) {
        console.error("❌ 게시글 불러오기 오류:", error);
        alert("게시글을 불러오는데 실패했습니다.");
        router.push("/fishing-group");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [postId, router]);

  // 지역 데이터 가져오기
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setIsLoadingRegions(true);
        const response = await getRegions();
        console.log("지역 데이터:", response);
        if (response.success && Array.isArray(response.data)) {
          setRegions(response.data);
        } else {
          console.error("지역 데이터가 올바르지 않습니다:", response);
          setRegions([]);
        }
      } catch (error) {
        console.error("지역 데이터 가져오기 실패:", error);
        setRegions([]);
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

        // 낚시 포인트 데이터가 로드된 후, 기존 게시글의 낚시 포인트 ID가 있는지 확인
        if (selectedFishingPoint && points.length > 0) {
          const pointExists = points.some(
            (point) => String(point.fishPointId) === selectedFishingPoint
          );
          if (!pointExists) {
            console.log(
              "기존 낚시 포인트가 현재 지역에 없습니다. 초기화합니다."
            );
            setSelectedFishingPoint("");
          }
        }
      } catch (error) {
        console.error("낚시 포인트 가져오기 실패:", error);
        setFishingPoints([]);
      } finally {
        setIsLoadingFishingPoints(false);
      }
    };

    fetchFishingPoints();
  }, [selectedRegion, selectedFishingPoint]);

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
      if (existingFiles.length > 0) {
        const updatedFiles = existingFiles.filter((_, i) => i !== index);
        setExistingFiles(updatedFiles);
        setExistingFileUrls(updatedFiles.map((f: FileInfo) => f.fileUrl));
        setExistingFileIds(updatedFiles.map((f: FileInfo) => f.fileId));
      } else {
        const updatedExistingUrls = existingFileUrls.filter(
          (_, i) => i !== index
        );
        setExistingFileUrls(updatedExistingUrls);
        const updatedExistingIds = existingFileIds.filter(
          (_, i) => i !== index
        );

        setExistingFileIds(updatedExistingIds);
      }
    } else {
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updatedFiles);
      const updatedUrls = updatedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(updatedUrls);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!date) {
        alert("날짜를 선택해주세요.");
        setIsSubmitting(false);
        return;
      }

      if (!selectedRegion || !selectedFishingPoint) {
        alert("지역과 낚시 포인트를 모두 선택해주세요.");
        setIsSubmitting(false);
        return;
      }

      const requestBody = {
        fishingTripPostId: Number(postId),
        subject: title,
        content: content,
        recruitmentCount: memberCount,
        isShipFish: isBoatFishing,
        fishingDate: date,
        fileIdList: [
          ...existingFileIds,
          ...selectedFiles.map((file) => file.fileId),
        ],
        regionId: Number(selectedRegion),
        fishingPointId: Number(selectedFishingPoint),
      };

      await updateFishingPost(requestBody);
      router.push("/fishing-group");
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error);
      alert("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const disablePastDates = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(
        `/fishing-trip-post/${postId}/comment`,
        {
          params: {
            size: 10,
            parentId: 1, // 필요한 경우 변경
            cursorRequestDto: {
              order: "desc",
              sort: "createdAt",
              type: "next",
              fieldValue: "2025-04-08T07:24:17.138851Z",
              id: 1,
              size: 10,
            },
          },
        }
      );
      if (response.data) {
        setComments(response.data.content);
      }
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
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
        <h1 className="text-2xl font-semibold mb-2">낚시 동출 모집 글 수정</h1>
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
              <div className="flex gap-2 items-center relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
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
              <label className="block font-medium">지역</label>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setSelectedFishingPoint("");
                  }}
                  className="w-full h-12 pl-10 pr-8 rounded-md border border-gray-200 bg-white text-base appearance-none cursor-pointer"
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
            </div>

            <div className="space-y-2">
              <label className="block font-medium">낚시 포인트</label>
              <div className="relative">
                <select
                  value={selectedFishingPoint}
                  onChange={(e) => setSelectedFishingPoint(e.target.value)}
                  className="w-full h-12 pl-10 pr-8 rounded-md border border-gray-200 bg-white text-base appearance-none cursor-pointer"
                  disabled={!selectedRegion}
                >
                  <option value="">낚시 포인트를 선택하세요</option>
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
            {(existingFileUrls.length > 0 || previewUrls.length > 0) && (
              <div className="grid grid-cols-5 gap-4 mt-4">
                {/* 기존 이미지 */}
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

                {/* 새로 추가된 이미지 */}
                {previewUrls.map((url, index) => (
                  <div key={`new-${index}`} className="relative aspect-square">
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

                {/* 이미지 추가 버튼 */}
                {existingFileUrls.length + previewUrls.length < 10 && (
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
              {isSubmitting ? "수정 중..." : "수정하기"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
