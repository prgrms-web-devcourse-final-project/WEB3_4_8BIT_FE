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

// 00분/30분 단위 시간 배열 생성 (00:00 ~ 23:30)
const halfHourOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = String(Math.floor(i / 2)).padStart(2, "0");
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

// 폼 데이터 타입 정의
type FishingRegistrationForm = {
  title: string;
  price: number;
  startTime: string;
  endTime: string;
  maxPeople: number;
  selectedShip: string;
  departureRegion: string;
  content: string;
  selectedFiles: File[];
  previewUrls: string[];
  unavailableDates: Date[];
  selectedFishSpecies: string[];
};

// 유효성 검사 오류 타입 정의
type ValidationErrors = {
  [key in keyof FishingRegistrationForm]?: boolean;
};

export default function Page() {
  const [formData, setFormData] = useState<FishingRegistrationForm>({
    title: "",
    price: 0,
    startTime: "",
    endTime: "",
    maxPeople: 2,
    selectedShip: "",
    departureRegion: "",
    content: "",
    selectedFiles: [],
    previewUrls: [],
    unavailableDates: [],
    selectedFishSpecies: [],
  });

  // 유효성 검사 오류 상태 추가
  const [errors, setErrors] = useState<ValidationErrors>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (!formData.title.trim()) newErrors.title = true;
    if (formData.price <= 0) newErrors.price = true;
    if (!formData.startTime) newErrors.startTime = true;
    if (!formData.endTime) newErrors.endTime = true;
    if (!formData.selectedShip) newErrors.selectedShip = true;
    if (!formData.departureRegion.trim()) newErrors.departureRegion = true;
    if (!formData.content.trim()) newErrors.content = true;
    if (formData.selectedFiles.length === 0) newErrors.selectedFiles = true;
    if (formData.selectedFishSpecies.length === 0)
      newErrors.selectedFishSpecies = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const updatedFiles = [...formData.selectedFiles, ...newFiles];
    const urls = updatedFiles.map((file) => URL.createObjectURL(file));

    updateFormData("selectedFiles", updatedFiles);
    updateFormData("previewUrls", urls);
  };

  const removeImage = (index: number) => {
    const updatedFiles = formData.selectedFiles.filter((_, i) => i !== index);
    const updatedUrls = updatedFiles.map((file) => URL.createObjectURL(file));

    updateFormData("selectedFiles", updatedFiles);
    updateFormData("previewUrls", updatedUrls);
  };

  const removeDate = (idx: number) => {
    const updatedDates = formData.unavailableDates.filter((_, i) => i !== idx);
    updateFormData("unavailableDates", updatedDates);
  };

  const handleFishSelect = (value: string) => {
    if (!formData.selectedFishSpecies.includes(value)) {
      updateFormData("selectedFishSpecies", [
        ...formData.selectedFishSpecies,
        value,
      ]);
    }
  };

  const removeFishSpecies = (value: string) => {
    const updatedSpecies = formData.selectedFishSpecies.filter(
      (species) => species !== value
    );
    updateFormData("selectedFishSpecies", updatedSpecies);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사 실행
    if (!validateForm()) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const response = await fetch("http://localhost:3000/api/boatPostMock", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log(response);
      alert("예약 게시글이 등록되었습니다.");
    } else {
      alert("예약 게시글 등록에 실패했습니다.");
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
                htmlFor="title"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                제목
              </label>
              <Input
                id="title"
                placeholder="게시글 제목을 입력해주세요"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                className={`placeholder:text-base ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
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
                      "maxPeople",
                      Math.max(1, formData.maxPeople - 1)
                    )
                  }
                >
                  -
                </Button>
                <span className="text-lg">{formData.maxPeople}</span>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() =>
                    updateFormData("maxPeople", formData.maxPeople + 1)
                  }
                >
                  +
                </Button>
              </div>
            </div>
            {/* 선박 선택 */}
            <div>
              <label className="block mb-2 text-base font-medium text-gray-700">
                선박 선택
              </label>
              <Select
                value={formData.selectedShip}
                onValueChange={(value) => updateFormData("selectedShip", value)}
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
                  <SelectItem value="ship1">선박 1</SelectItem>
                  <SelectItem value="ship2">선박 2</SelectItem>
                  <SelectItem value="ship3">선박 3</SelectItem>
                </SelectContent>
              </Select>
              {errors.selectedShip && (
                <p className="text-red-500 text-sm mt-1">선박을 선택해주세요</p>
              )}
            </div>
            {/* 출항지역 */}
            <div>
              <label
                htmlFor="departureRegion"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                출항지역
              </label>
              <Input
                id="departureRegion"
                placeholder="출항지역을 입력해주세요"
                value={formData.departureRegion}
                onChange={(e) =>
                  updateFormData("departureRegion", e.target.value)
                }
                className={`placeholder:text-base ${
                  errors.departureRegion ? "border-red-500" : ""
                }`}
              />
              {errors.departureRegion && (
                <p className="text-red-500 text-sm mt-1">
                  출항지역을 입력해주세요
                </p>
              )}
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
                <SelectItem value="갑오징어">갑오징어</SelectItem>
                <SelectItem value="문어">문어</SelectItem>
                <SelectItem value="삼치">삼치</SelectItem>
                <SelectItem value="우럭">우럭</SelectItem>
                <SelectItem value="농어">농어</SelectItem>
                <SelectItem value="참돔">참돔</SelectItem>
                <SelectItem value="광어">광어</SelectItem>
                <SelectItem value="대구">대구</SelectItem>
                <SelectItem value="방어">방어</SelectItem>
                <SelectItem value="가자미">가자미</SelectItem>
                <SelectItem value="민어">민어</SelectItem>
                <SelectItem value="전갱이">전갱이</SelectItem>
                <SelectItem value="백조기">백조기</SelectItem>
                <SelectItem value="쭈꾸미">쭈꾸미</SelectItem>
              </SelectContent>
            </Select>
            {errors.selectedFishSpecies && (
              <p className="text-red-500 text-sm mt-1">어종을 선택해주세요</p>
            )}
          </div>
          {formData.selectedFishSpecies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.selectedFishSpecies.map((species) => (
                <div
                  key={species}
                  className="relative bg-green-100 text-green-800 px-4 py-2 rounded text-base"
                >
                  {species}
                  <XCircle
                    size={16}
                    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-red-500 cursor-pointer"
                    onClick={() => removeFishSpecies(species)}
                  />
                </div>
              ))}
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
                selected={formData.unavailableDates}
                onSelect={(days) =>
                  updateFormData("unavailableDates", days || [])
                }
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
                      <span>{date.toLocaleDateString()}</span>
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
