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
} from "lucide-react";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { uploadImagesToS3 } from "@/lib/api/uploadImageAPI";
import { createFishingPost } from "@/lib/api/createFishingPostAPI";
import { useRouter } from "next/navigation";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageFileIds: number[] = [];
      if (selectedFiles.length > 0) {
        console.log("✅ 선택된 이미지 수:", selectedFiles.length);
        imageFileIds = await uploadImagesToS3(selectedFiles, "post");
      }

      if (!date) {
        alert("날짜를 선택해주세요.");
        setIsSubmitting(false);
        return;
      }

      // 선택된 날짜와 시간을 합쳐서 fishingDate 생성
      const fishingDateTime = new Date(date);
      fishingDateTime.setHours(parseInt(selectedHour, 10));
      fishingDateTime.setMinutes(parseInt(selectedMinute, 10));

      const requestBody = {
        subject: title,
        fishingDate: fishingDateTime.toISOString(),
        fishingPointId: 1,
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
                <select
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(e.target.value)}
                  className="h-12 rounded-md border border-input bg-background px-3"
                >
                  {Array.from({ length: 12 }, (_, i) =>
                    String(i * 5).padStart(2, "0")
                  ).map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}분
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="fishingSpot" className="block font-medium">
              낚시 포인트
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="fishingSpot"
                required
                placeholder="낚시 포인트를 입력하세요"
                className="pl-10"
              />
            </div>
          </div>

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
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="memberCount" className="block font-medium">
              모집 인원
            </label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setMemberCount(Math.max(2, memberCount - 1))}
              >
                <MinusCircle className="h-5 w-5" />
              </Button>
              <Input
                id="memberCount"
                type="number"
                value={memberCount}
                min={2}
                onChange={(e) => setMemberCount(Number(e.target.value))}
                className="w-20 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setMemberCount(memberCount + 1)}
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isBoatFishing"
              checked={isBoatFishing}
              onCheckedChange={(checked) =>
                setIsBoatFishing(checked as boolean)
              }
            />
            <label
              htmlFor="isBoatFishing"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              선상 낚시
            </label>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="block font-medium">
              내용
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="내용을 입력하세요"
              className="min-h-[200px]"
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
              <p className="text-gray-500">
                최대 10장의 이미지를 업로드할 수 있습니다.
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
                className="mt-4"
                onClick={() => fileInputRef.current?.click()}
              >
                파일 선택
              </Button>
            </div>
            {previewUrls.length > 0 && (
              <div className="flex gap-4 mt-4 overflow-x-auto">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={url}
                      alt={`preview-${index}`}
                      fill
                      className="object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline">
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white"
            >
              {isSubmitting ? "등록 중..." : "등록하기"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
