"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UserAPI } from "@/lib/api/userAPI";
import { uploadImagesToS3 } from "@/lib/api/uploadImageAPI";
import { NormalUserInputData } from "@/types/user.interface";
import { useUserStore } from "@/stores/userStore";
import { useQueryClient } from "@tanstack/react-query";

export default function UserRegistrationPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userInfo = useUserStore((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const profileUrl = profileFile ? URL.createObjectURL(profileFile) : null;

  const formData = {
    nickname,
    description,
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageFileIds: number[] = [];

      if (profileFile) {
        imageFileIds = await uploadImagesToS3([profileFile], "profile");
      }

      const newFormData: NormalUserInputData = { ...formData };

      if (imageFileIds.length > 0) {
        newFormData["fileId"] = imageFileIds[0];
      }

      const response = await UserAPI.postMemberInfo(newFormData);
      if (response?.success) {
        alert("사용자의 추가 정보 입력이 완료되었습니다!"); // TODO 모달 수정
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        router.replace("/");
      } else {
      }
    } catch (error) {
      console.error("사용자 추가 정보 등록 에러", error);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">회원 등록</CardTitle>
            <CardDescription>추가 회원 정보를 입력해주세요</CardDescription>
            <p className="text-sm text-gray-500 mt-1">
              이메일, 전화번호, 이름은 소셜 계정에서 가져온 정보입니다
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">기본 정보</h3>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-30 h-30 rounded-full relative overflow-hidden bg-gray-200 flex items-center justify-center">
                      {profileUrl ? (
                        <Image
                          src={profileUrl}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
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

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      defaultValue={userInfo?.email}
                      disabled
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">전화번호</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      defaultValue={userInfo?.phone}
                      disabled
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">이름</Label>
                    <Input
                      id="fullName"
                      required
                      defaultValue={userInfo?.name}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">추가 정보</h3>
                <div className="grid gap-2">
                  <Label htmlFor="nickname">
                    닉네임 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nickname"
                    placeholder="닉네임을 입력해주세요"
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="introduction">자기 소개</Label>
                  <Textarea
                    id="introduction"
                    placeholder="자기 소개와 낚시 경험에 대해 알려주세요"
                    className="min-h-[100px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <CardFooter className="flex justify-end px-0 pt-4">
                <Button
                  type="submit"
                  className="bg-primary cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 처리
                      중...
                    </>
                  ) : (
                    "가입 완료"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
