"use client";

import React, {useEffect, useState} from "react";
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
import {useUserStore} from "@/stores/userStore";
import {User} from "@/types/user.interface";

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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const user = useUserStore(state => state.user);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    setUserInfo(user);
    console.log("zustand 상태 확인:", useUserStore.getState());
  },[user]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Card className="p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-xl font-bold">선장 회원 등록</h1>
          <p className="text-gray-500 text-sm mt-1">
            선장님의 정보를 입력해주세요. 이메일, 전화번호, 이름은 수정이 불가합니다.
          </p>
        </div>

        {/* 기본 정보 */}
        <section className="space-y-6">
          <h2 className="text-base font-semibold">기본 정보</h2>

          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-30 h-30 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {profileImage ? (
                  <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <Label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer"
              >
                <Plus className="h-6 w-6" />
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </Label>
            </div>
            <p className="text-sm text-gray-500">프로필 사진 업로드</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block mb-2 text-sm font-medium">
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                required
                defaultValue={userInfo?.email}
                disabled
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium">
                전화번호
              </Label>
              <Input
                id="phone"
                type="phone"
                placeholder=""
                required
                defaultValue={userInfo?.phone}
                disabled
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium">
                이름
              </Label>
              <Input
                id="name"
                type="name"
                placeholder=""
                required
                defaultValue={userInfo?.name}
                disabled
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* 선장 정보 */}
        <section className="space-y-6">
          <h2 className="text-base font-semibold">선장 정보</h2>
          <div>
            <Label className="block mb-2 text-sm font-medium">
              닉네임 <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="닉네임을 입력하세요"
            />
          </div>
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
