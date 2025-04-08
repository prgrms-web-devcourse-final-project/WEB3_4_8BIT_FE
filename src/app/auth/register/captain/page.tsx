"use client";

import React, {useEffect, useRef, useState} from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Upload } from "lucide-react";
import Image from "next/image";
import {useUserStore} from "@/stores/userStore";
import {BoatData, BoatInputData, User} from "@/types/user.interface";
import BoatFormCard from "@/app/auth/register/captain/components/BoatFormCard";
import {UserAPI} from "@/lib/api/userAPI";

export default function CaptainRegisterPage() {
  const user = useUserStore(state => state.user);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [nickname, setNickname] = useState("");
  const [shipLicenseNumber, setShipLicenseNumber] = useState("");
  const [description, setDescription] = useState("");
  const [boatsData, setBoatsData] = useState<BoatData[]>([]);
  const boatIndex = useRef(0);

  const formData = {
    nickname,
    description,
    shipLicenseNumber,
  }

  const handleAddBoat = () => {
    if (boatsData.length === 5) {
      alert('선박은 5개까지 추가 가능합니다')
      return;
    }

    const newBoatInfo : BoatData = {
      id : boatIndex.current,
      shipName: '',
      shipNumber: '',
      departurePort: '',
      passengerCapacity: '',
      restroomType : 'NONE',
      loungeArea : false,
      kitchenFacility : false,
      fishingChair : false,
      passengerInsurance : false,
      fishingGearRental : false,
      mealProvided : false,
      parkingAvailable : false,
      isSaved : false,
    }
    setBoatsData([...boatsData, newBoatInfo]);
    boatIndex.current += 1;
  };

  const handleDeleteBoat = (boatId: number) => {
    setBoatsData((prev) => prev.filter((boat) => boat.id !== boatId));
  };

  const handleBoatInfoChange = (boatId: number, updatedBoat: BoatData) => {
    setBoatsData((prev) =>
      prev.map((boat) => (boat.id === boatId ? updatedBoat : boat))
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();

    const unsavedBoats = boatsData.filter((boat) => !boat.isSaved);
    if (unsavedBoats.length > 0) {
      alert("모든 선박은 '선박 저장' 버튼을 눌러 저장한 후 가입 완료를 진행해주세요.");
      return;
    }

    const savedBoats = boatsData.filter((boat) => boat.isSaved);
    if (savedBoats.length < 1) {
      alert("선박 정보는 추가해야 합니다!")
      return;
    }

    const boatSavePromises : Promise<any>[] = [];

    for (const item of savedBoats) {
      const { id, isSaved, ...newItem } = item;
      console.log(newItem);
      const promise = UserAPI.prototype.postCaptainBoatInfo(newItem);
      boatSavePromises.push(promise)
    }

    const boatIds : number[] = [];
    Promise.all(boatSavePromises).then(function(responses) {
      responses.forEach((response, index) => {
        boatIds.push(response['Location']);
        console.log(`Boat ${index} location: ${response['Location']}`); // 또는 response.location
      });
    });

    console.log(boatIds);

    const newFormData : BoatInputData = {...formData, shipList : boatIds}

    const response = await UserAPI.prototype.postCaptainMemberInfo(newFormData);
    console.log(response);
    if (response?.success) {
      alert('선장님의 추가 정보 입력이 완료되었습니다!')
      router.replace("/");
    }
  }

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
        <form className="grid gap-13" onSubmit={handleSubmit}>
          <section className="space-y-6">
            <h2 className="text-base font-semibold">선장 정보</h2>
            <div>
              <Label className="block mb-2 text-sm font-medium">
                닉네임 <span className="text-red-500">*</span>
              </Label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                placeholder="닉네임을 입력하세요"
              />
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium cursor-pointer">
                선장 면허 번호 <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="면허 번호를 입력해주세요"
                onChange={(e) => setShipLicenseNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="block mb-2 text-sm font-medium cursor-pointer">
                자기 소개 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={description}
                placeholder="선장님 소개글이나 낚시에 대해 알려주세요"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </section>

          <Separator />

          {/* 선박 정보 */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">선박 정보 <span className="text-red-500">*</span></h2>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleAddBoat}
                className="cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-1" /> 선박 추가
              </Button>
            </div>

            {boatsData.map((boat,index) => (
              <BoatFormCard
                key={boat.id}
                index={index}
                boatInfo={boat}
                onBoatInfoChange={(updatedBoat) => handleBoatInfoChange(boat.id, updatedBoat)}
                handleDeleteBoat={() => handleDeleteBoat(boat.id)}
              />
              )
            )}
          </section>

          <div className="pt-6 flex justify-end">
            <Button className="cursor-pointer">가입 완료</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}