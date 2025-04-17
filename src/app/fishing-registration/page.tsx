"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Ship, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getShip, registerShip } from "@/lib/api/getShip";
import { uploadImagesToS3 } from "@/lib/api/uploadImageAPI";
import { useRouter } from "next/navigation";

// 00분/30분 단위 시간 배열 생성 (00:00 ~ 23:30)
const halfHourOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = String(Math.floor(i / 2)).padStart(2, "0");
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

// 날짜를 문자열로 변환하는 헬퍼 함수
const formatDateToString = (date) => {
  return date.toLocaleDateString('fr-CA'); // YYYY-MM-DD 형식 반환
};

// 폼 데이터 타입 정의
type FishingRegistrationForm = {
  subject: string;
  content: string;
  price: number;
  location: string;
  startTime: string;
  endTime: string;
  maxGuestCount: number;
  shipId: number;
  fileIdList: number[];
  fishIdList: number[];
  unavailableDates: string[];
  selectedFiles: File[];
  previewUrls: string[];
  selectedShip: string;
  selectedFishSpecies: number[];
};

// 유효성 검사 오류 타입 정의
type ValidationErrors = {
  [key in keyof FishingRegistrationForm]?: boolean;
};

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<FishingRegistrationForm>({
    subject: "",
    content: "",
    price: 0,
    location: "",
    startTime: "",
    endTime: "",
    maxGuestCount: 2,
    shipId: 0,
    fileIdList: [],
    fishIdList: [],
    unavailableDates: [],
    selectedFiles: [],
    previewUrls: [],
    selectedShip: "",
    selectedFishSpecies: [],
  });

  // 유효성 검사 오류 상태 추가
  const [errors, setErrors] = useState<ValidationErrors>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: getShipList } = useQuery({
    queryKey: ["getShipList"],
    queryFn: getShip,
  });

  // 상태 업데이트 함수
  const updateFormData = (
    field: keyof FishingRegistrationForm,
    value: FishingRegistrationForm[keyof FishingRegistrationForm]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 입력 시 해당 필드의 오류 상태를 초기화
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // 유효성 검사 함수
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // 필수 필드 검사
    if (!formData.subject.trim()) newErrors.subject = true;
    if (formData.price <= 0) newErrors.price = true;
    if (!formData.startTime) newErrors.startTime = true;
    if (!formData.endTime) newErrors.endTime = true;
    if (!formData.selectedShip) newErrors.selectedShip = true;
    if (!formData.content.trim()) newErrors.content = true;
    if (formData.selectedFiles.length === 0) newErrors.selectedFiles = true;
    if (formData.selectedFishSpecies.length === 0)
      newErrors.selectedFishSpecies = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    const currentCount = formData.selectedFiles.length;
    const totalCount = currentCount + newFiles.length;

    if (totalCount > 10) {
      const allowedCount = 10 - currentCount;
      alert("최대 10장까지 업로드 가능합니다.");
      newFiles.splice(allowedCount);
    }

    try {
      const uploadedFileIds = await uploadImagesToS3(newFiles, "fishing");
      const updatedFiles = [...formData.selectedFiles, ...newFiles];
      const urls = updatedFiles.map((file) => URL.createObjectURL(file));

      updateFormData("selectedFiles", updatedFiles);
      updateFormData("previewUrls", urls);
      updateFormData("fileIdList", [
        ...formData.fileIdList,
        ...uploadedFileIds,
      ]);
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = formData.selectedFiles.filter((_, i) => i !== index);
    const updatedUrls = updatedFiles.map((file) => URL.createObjectURL(file));

    updateFormData("selectedFiles", updatedFiles);
    updateFormData("previewUrls", updatedUrls);
  };

  const removeDate = (idx: number) => {
    const updatedDates = [...formData.unavailableDates];
    updatedDates.splice(idx, 1);
    updateFormData("unavailableDates", updatedDates);
  };

  const handleFishSelect = (value: string) => {
    const fishId = Number(value);
    if (!formData.selectedFishSpecies.includes(fishId)) {
      updateFormData("selectedFishSpecies", [
        ...formData.selectedFishSpecies,
        fishId,
      ]);
    }
  };

  const removeFishSpecies = (fishId: number) => {
    const updatedSpecies = formData.selectedFishSpecies.filter(
      (id) => id !== fishId
    );
    updateFormData("selectedFishSpecies", updatedSpecies);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (!formData.selectedShip || !getShipList?.data) {
      alert("선박을 선택해주세요.");
      return;
    }

    const selectedShipId =
      getShipList.data[Number(formData.selectedShip)].shipId;
    if (!selectedShipId) {
      alert("선박 정보가 올바르지 않습니다.");
      return;
    }

    const requestData = {
      subject: formData.subject,
      content: formData.content,
      price: formData.price,
      location: formData.location,
      startTime: formData.startTime,
      endTime: formData.endTime,
      maxGuestCount: formData.maxGuestCount,
      shipId: selectedShipId,
      fileIdList: formData.fileIdList,
      fishIdList: formData.selectedFishSpecies,
      unavailableDates: formData.unavailableDates, // 이미 올바른 형식으로 저장됨
    };

    try {
      const response = await registerShip(requestData);

      if (response.success) {
        alert("예약 게시글이 등록되었습니다.");
        router.push("/boat-reservation");
      } else {
        alert("예약 게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("예약 게시글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* 헤더 */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <div className="flex items-center justify-center gap-3">
          <Ship className="w-12 h-12 text-blue-500" />
          <h1 className="text-4xl font-bold text-gray-800">
            선상 낚시 예약 게시글 등록
          </h1>
        </div>
        <p className="mt-3 text-base text-gray-600">
          예약 게시글 작성 시 아래 정보를 참고하여 정확하게 입력해 주세요.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-10"
      >
        {/* 기본 정보 섹션 */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-700 border-b pb-2">
            기본 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 제목 */}
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                제목
              </label>
              <Input
                id="subject"
                placeholder="게시글 제목을 입력해주세요"
                value={formData.subject}
                onChange={(e) => updateFormData("subject", e.target.value)}
                className={`placeholder:text-base ${
                  errors.subject ? "border-red-500" : ""
                }`}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">제목을 입력해주세요</p>
              )}
            </div>
            {/* 가격 */}
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                가격 (원)
              </label>
              <Input
                id="price"
                type="number"
                placeholder="예: 50000"
                value={formData.price === 0 ? "" : formData.price}
                onChange={(e) =>
                  updateFormData("price", Number(e.target.value))
                }
                className={`placeholder:text-base ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">가격을 입력해주세요</p>
              )}
            </div>
            {/* 총 소요 시간 */}
            <div className="col-span-2">
              <label className="block mb-2 text-base font-medium text-gray-700">
                총 소요 시간
              </label>
              <div className="flex items-center gap-3 justify-between">
                <div className="flex flex-col gap-2 w-[48%]">
                  <Select
                    value={formData.startTime}
                    onValueChange={(value) =>
                      updateFormData("startTime", value)
                    }
                  >
                    <SelectTrigger
                      className={`w-full cursor-pointer ${
                        errors.startTime ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder="시작 시간"
                        className="placeholder:text-base"
                      />
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      sideOffset={4}
                      align="start"
                      avoidCollisions={false}
                    >
                      {halfHourOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.startTime && (
                    <p className="text-red-500 text-sm mt-1">
                      시작 시간을 선택해주세요
                    </p>
                  )}
                </div>
                <span className="text-gray-700">~</span>
                <div className="flex flex-col gap-2 w-[48%]">
                  <Select
                    value={formData.endTime}
                    onValueChange={(value) => updateFormData("endTime", value)}
                  >
                    <SelectTrigger
                      className={`w-full cursor-pointer ${
                        errors.endTime ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder="종료 시간"
                        className="placeholder:text-base"
                      />
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      sideOffset={4}
                      align="start"
                      avoidCollisions={false}
                    >
                      {halfHourOptions
                        .filter((time) =>
                          formData.startTime ? time > formData.startTime : true
                        )
                        .map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.endTime && (
                    <p className="text-red-500 text-sm mt-1">
                      종료 시간을 선택해주세요
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* 최대 인원 */}
            <div>
              <label className="block mb-2 text-base font-medium text-gray-700">
                최대 인원
              </label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() =>
                    updateFormData(
                      "maxGuestCount",
                      Math.max(1, formData.maxGuestCount - 1)
                    )
                  }
                >
                  -
                </Button>
                <span className="text-lg">{formData.maxGuestCount}</span>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() =>
                    updateFormData("maxGuestCount", formData.maxGuestCount + 1)
                  }
                >
                  +
                </Button>
              </div>
            </div>
            {/* 선박 선택 */}
            <div></div>
            <div>
              <label className="block mb-2 text-base font-medium text-gray-700">
                선박 선택
              </label>
              <Select
                value={formData.selectedShip}
                onValueChange={(value) => {
                  updateFormData("selectedShip", value);
                  if (value && getShipList?.data) {
                    const selectedShip = getShipList.data[Number(value)];
                    updateFormData("location", selectedShip.portName);
                  }
                }}
              >
                <SelectTrigger
                  className={`w-full cursor-pointer ${
                    errors.selectedShip ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue
                    placeholder="선박을 선택하세요"
                    className="placeholder:text-base"
                  />
                </SelectTrigger>
                <SelectContent>
                  {getShipList?.data.map((ship, index) => (
                    <SelectItem key={ship.shipId} value={index.toString()}>
                      {ship.shipName} ({ship.shipNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.selectedShip && (
                <p className="text-red-500 text-sm mt-1">선박을 선택해주세요</p>
              )}
            </div>
            {/* 출항지역 */}
            <div>
              <label
                htmlFor="location"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                출항지역
              </label>
              <Input
                id="location"
                value={
                  formData.selectedShip
                    ? getShipList?.data[Number(formData.selectedShip)]
                        .portName
                    : formData.location
                }
                className={`placeholder:text-base ${
                  errors.location ? "border-red-500" : ""
                }`}
                readOnly
              />
            </div>
          </div>
        </section>

        {/* 상세 정보 섹션 */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-700 border-b pb-2">
            상세 정보
          </h2>
          <div>
            <label
              htmlFor="content"
              className="block mb-2 text-base font-medium text-gray-700"
            >
              내용
            </label>
            <Textarea
              id="content"
              placeholder="서비스 이용 전 준비물, 교통편, 할인 정보 등 상세한 내용을 입력해주세요."
              value={formData.content}
              onChange={(e) => updateFormData("content", e.target.value)}
              className={`min-h-[200px] placeholder:text-base ${
                errors.content ? "border-red-500" : ""
              }`}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">내용을 입력해주세요</p>
            )}
          </div>
        </section>

        {/* 이미지 업로드 섹션 */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-700 border-b pb-2">
            이미지 첨부
          </h2>
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500 text-base">
              이미지를 업로드하세요. (최대 10장)
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
              className={`mt-4 cursor-pointer ${
                errors.selectedFiles ? "border-red-500" : ""
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              파일 선택
            </Button>
            {errors.selectedFiles && (
              <p className="text-red-500 text-sm mt-1">
                이미지를 업로드해주세요
              </p>
            )}
          </div>
          {formData.previewUrls.length > 0 && (
            <div className="mt-4 flex gap-4 overflow-x-auto">
              {formData.previewUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src={url}
                    alt={`preview ${index}`}
                    fill
                    className="object-cover"
                  />
                  <XCircle
                    size={12}
                    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 text-red-500 cursor-pointer"
                    onClick={() => removeImage(index)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 어종 선택 섹션 */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-700 border-b pb-2">
            잡을 수 있는 어종
          </h2>
          <div className="mb-4">
            <Select value="" onValueChange={handleFishSelect}>
              <SelectTrigger
                className={`w-full cursor-pointer ${
                  errors.selectedFishSpecies ? "border-red-500" : ""
                }`}
              >
                <SelectValue
                  placeholder="어종 선택"
                  className="placeholder:text-base"
                />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                sideOffset={4}
                align="start"
                avoidCollisions={false}
              >
                <SelectItem value="1">갑오징어</SelectItem>
                <SelectItem value="2">문어</SelectItem>
                <SelectItem value="3">삼치</SelectItem>
                <SelectItem value="4">우럭</SelectItem>
                <SelectItem value="5">농어</SelectItem>
                <SelectItem value="6">참돔</SelectItem>
                <SelectItem value="7">광어</SelectItem>
                <SelectItem value="8">전갱이</SelectItem>
                <SelectItem value="9">방어</SelectItem>
                <SelectItem value="10">대구</SelectItem>
                <SelectItem value="11">쭈꾸미</SelectItem>
                <SelectItem value="12">민어</SelectItem>
                <SelectItem value="13">가자미</SelectItem>
                <SelectItem value="14">백조기</SelectItem>
              </SelectContent>
            </Select>
            {errors.selectedFishSpecies && (
              <p className="text-red-500 text-sm mt-1">어종을 선택해주세요</p>
            )}
          </div>
          {formData.selectedFishSpecies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.selectedFishSpecies.map((fishId) => {
                const fishName = {
                  1: "갑오징어",
                  2: "문어",
                  3: "삼치",
                  4: "우럭",
                  5: "농어",
                  6: "참돔",
                  7: "광어",
                  8: "전갱이",
                  9: "방어",
                  10: "대구",
                  11: "쭈꾸미",
                  12: "민어",
                  13: "가자미",
                  14: "백조기",
                }[fishId];
                return (
                  <div
                    key={fishId}
                    className="relative bg-green-100 text-green-800 px-4 py-2 rounded text-base"
                  >
                    {fishName}
                    <XCircle
                      size={16}
                      className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-red-500 cursor-pointer"
                      onClick={() => removeFishSpecies(fishId)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 예약 불가능 날짜 섹션 */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-700 border-b pb-2">
            예약 불가능 날짜 선택
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="multiple"
                selected={formData.unavailableDates.map(dateStr => {
                  // 문자열을 Date 객체로 변환
                  const [year, month, day] = dateStr.split('-').map(Number);
                  return new Date(year, month - 1, day); // month는 0-based
                })}
                onSelect={(dates) => {
                  if (!dates || dates.length === 0) {
                    updateFormData("unavailableDates", []);
                    return;
                  }

                  // 새로 선택된 날짜들을 YYYY-MM-DD 형식으로 변환
                  const newDates = dates.map(date => formatDateToString(date));

                  // 중복 제거
                  const uniqueDates = [...new Set(newDates)];

                  updateFormData("unavailableDates", uniqueDates);
                }}
                className="w-full"
              />
            </div>
            <div>
              <p className="mb-2 text-gray-700 font-medium">선택된 날짜</p>
              {formData.unavailableDates.length === 0 ? (
                <p className="text-gray-500 text-base">
                  선택된 날짜가 없습니다.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.unavailableDates.map((date, idx) => (
                    <div
                      key={idx}
                      className="relative bg-blue-100 text-blue-800 px-3 py-2 rounded text-base"
                    >
                      <span>{date}</span>
                      <XCircle
                        size={16}
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-red-500 cursor-pointer"
                        onClick={() => removeDate(idx)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 안내사항 섹션 */}
        <section>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="mb-4 text-xl font-semibold text-blue-700">
              안내사항
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-blue-700 text-base">
              <li>
                예약 전에 선상낚시 서비스 제공 조건 및 준비물을 꼼꼼히 확인해
                주세요.
              </li>
              <li>
                허위 또는 부정확한 정보 제공 시 예약 취소 및 서비스 이용 제한이
                발생할 수 있습니다.
              </li>
              <li>
                예약 후 고객과의 상담을 통해 세부 사항을 정확히 조율해 주시기
                바랍니다.
              </li>
            </ul>
          </div>
        </section>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" className="cursor-pointer">
            취소
          </Button>
          <Button type="submit" className="cursor-pointer">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}