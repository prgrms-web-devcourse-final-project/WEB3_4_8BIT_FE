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

export default function Page() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxPeople, setMaxPeople] = useState(2);
  const [selectedShip, setSelectedShip] = useState("");
  const [departureRegion, setDepartureRegion] = useState("");
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [selectedFishSpecies, setSelectedFishSpecies] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    const currentCount = selectedFiles.length;
    const totalCount = currentCount + newFiles.length;
    if (totalCount > 10) {
      const allowedCount = 10 - currentCount;
      alert("최대 10장까지 업로드 가능합니다.");
      newFiles.splice(allowedCount);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("예약 게시글이 등록되었습니다.");
  };

  const removeDate = (idx: number) => {
    setUnavailableDates((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleFishSelect = (value: string) => {
    if (!selectedFishSpecies.includes(value)) {
      setSelectedFishSpecies((prev) => [...prev, value]);
    }
  };

  const removeFishSpecies = (value: string) => {
    setSelectedFishSpecies((prev) =>
      prev.filter((species) => species !== value)
    );
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="placeholder:text-base"
              />
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
                value={price === 0 ? "" : price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="placeholder:text-base"
              />
            </div>
            {/* 총 소요 시간 */}
            <div className="col-span-2">
              <label className="block mb-2 text-base font-medium text-gray-700">
                총 소요 시간
              </label>
              <div className="flex items-center gap-3">
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue
                      placeholder="시작 시간"
                      className="placeholder:text-base"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {halfHourOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-gray-700">~</span>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue
                      placeholder="종료 시간"
                      className="placeholder:text-base"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {halfHourOptions
                      .filter((time) => (startTime ? time > startTime : true))
                      .map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
                  onClick={() => setMaxPeople(Math.max(1, maxPeople - 1))}
                >
                  -
                </Button>
                <span className="text-lg">{maxPeople}</span>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setMaxPeople(maxPeople + 1)}
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
              <Select value={selectedShip} onValueChange={setSelectedShip}>
                <SelectTrigger className="w-full cursor-pointer">
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
                value={departureRegion}
                onChange={(e) => setDepartureRegion(e.target.value)}
                className="placeholder:text-base"
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] placeholder:text-base"
            />
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
              className="mt-4 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              파일 선택
            </Button>
          </div>
          {previewUrls.length > 0 && (
            <div className="mt-4 flex gap-4 overflow-x-auto">
              {previewUrls.map((url, index) => (
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
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue
                  placeholder="어종 선택"
                  className="placeholder:text-base"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="고등어">고등어</SelectItem>
                <SelectItem value="참치">참치</SelectItem>
                <SelectItem value="연어">연어</SelectItem>
                <SelectItem value="광어">광어</SelectItem>
                <SelectItem value="우럭">우럭</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedFishSpecies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedFishSpecies.map((species) => (
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
                selected={unavailableDates}
                onSelect={setUnavailableDates}
                className="w-full"
              />
            </div>
            <div>
              <p className="mb-2 text-gray-700 font-medium">선택된 날짜</p>
              {unavailableDates.length === 0 ? (
                <p className="text-gray-500 text-base">
                  선택된 날짜가 없습니다.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {unavailableDates.map((date, idx) => (
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
