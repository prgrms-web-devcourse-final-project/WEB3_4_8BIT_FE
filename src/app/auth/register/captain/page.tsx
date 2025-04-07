"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Upload, ChevronUp } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface CaptainInfo {
  email: string;
  phone: string;
  name: string;
  nickname: string;
  license: string;
  intro?: string;
  profileImage?: File;
  ship?: ShipInfo;
}

interface ShipInfo {
  name: string;
  registration: string;
  location: string;
  capacity: string;
  toilet: string;
  facilities: string[];
}

export default function CaptainRegisterPage() {
  const [showShipForm, setShowShipForm] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Card className="p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-xl font-bold">선장 회원 등록</h1>
          <p className="text-gray-500 text-sm mt-1">
            선장님의 정보를 입력해주세요
          </p>
        </div>

        {/* 기본 정보 */}
        <section className="space-y-6">
          <h2 className="text-base font-semibold">기본 정보</h2>

          <div className="flex flex-col items-center gap-3">
            <label className="w-30 h-30 rounded-full bg-gray-100 border overflow-hidden flex items-center justify-center text-sm text-gray-400 cursor-pointer relative">
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="w-6 h-6" />
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfileChange}
              />
            </label>
            <p className="text-xs text-gray-400 mb-4">프로필 사진 업로드</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block mb-2 text-sm font-medium cursor-pointer">
                이메일 *
              </Label>
              <Input placeholder="ex) user@example.com" />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium cursor-pointer">
                전화번호 *
              </Label>
              <Input placeholder="ex) 010-1234-5678" />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium cursor-pointer">
                이름 *
              </Label>
              <Input placeholder="이름을 입력하세요" />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium cursor-pointer">
                닉네임 *
              </Label>
              <Input placeholder="닉네임을 입력하세요" />
            </div>
          </div>
        </section>

        <Separator />

        {/* 선장 정보 */}
        <section className="space-y-6">
          <h2 className="text-base font-semibold">선장 정보</h2>

          <div>
            <Label className="block mb-2 text-sm font-medium cursor-pointer">
              선장 면허 번호 *
            </Label>
            <Input placeholder="면허 번호를 입력해주세요" />
          </div>

          <div>
            <Label className="block mb-2 text-sm font-medium cursor-pointer">
              자기 소개
            </Label>
            <Textarea placeholder="선장님 소개글이나 낚시에 대해 알려주세요" />
          </div>
        </section>

        <Separator />

        {/* 선박 정보 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">선박 정보 *</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowShipForm(!showShipForm)}
              className="cursor-pointer"
            >
              {showShipForm ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" /> 접기
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" /> 선박 추가
                </>
              )}
            </Button>
          </div>

          {showShipForm && (
            <Card className="p-4 space-y-6">
              <h3 className="font-semibold">선박 1</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block mb-2 text-sm font-medium cursor-pointer">
                    선박 이름 *
                  </Label>
                  <Input placeholder="예: 해양호" />
                </div>
                <div>
                  <Label className="block mb-2 text-sm font-medium cursor-pointer">
                    선박 등록번호 *
                  </Label>
                  <Input placeholder="예: 123456-789" />
                </div>
                <div>
                  <Label className="block mb-2 text-sm font-medium cursor-pointer">
                    출항 위치 *
                  </Label>
                  <Input placeholder="예: 부산 기장군 기장읍 인근" />
                  <div className="mt-2 h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    (카카오 지도 들어갈 영역)
                  </div>
                </div>
                <div>
                  <Label className="block mb-2 text-sm font-medium cursor-pointer">
                    정원 *
                  </Label>
                  <Input placeholder="예: 20명" />
                </div>
              </div>

              {/* 시설 정보 */}
              <div className="space-y-3">
                <Label className="block text-base font-semibold mb-1">
                  시설 정보
                </Label>

                <div className="mb-2">
                  <Label className="block text-sm font-medium mb-1">
                    화장실 시설
                  </Label>
                  <Select>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="없음" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="없음">없음</SelectItem>
                      <SelectItem value="실내">실내 화장실</SelectItem>
                      <SelectItem value="실외">실외 화장실</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6">
                  <CheckboxWithLabel label="휴식 공간" />
                  <CheckboxWithLabel label="취사 시설" />
                  <CheckboxWithLabel label="CCTV 설치" />
                  <CheckboxWithLabel label="승객 보험 가입" />
                  <CheckboxWithLabel label="낚시 장비 대여" />
                  <CheckboxWithLabel label="식사 제공" />
                  <CheckboxWithLabel label="주차 공간" />
                  <CheckboxWithLabel label="낚시 의자" />
                </div>

                <div className="mt-4 flex justify-end">
                  <Button size="sm" className="cursor-pointer">
                    선박 정보 저장
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </section>

        <div className="pt-6 flex justify-end">
          <Button className="cursor-pointer">가입 완료</Button>
        </div>
      </Card>
    </div>
  );
}

function CheckboxWithLabel({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
      <Checkbox id={label} />
      <span>{label}</span>
    </label>
  );
}
