"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Upload } from "lucide-react";
import { CaptainSidebar } from "../components/SideBar";

export default function CaptainProfileEditPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <CaptainSidebar />

      <div className="md:col-span-3 space-y-6">
        <h1 className="text-2xl font-bold">프로필 수정</h1>
        <p className="text-gray-40">
          프로필 정보를 수정하여 다른 낚시 애호가들에게 나를 보여주세요.
        </p>

        <Card>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage alt="선장님 프로필" />
                <AvatarFallback>이미지</AvatarFallback>
              </Avatar>
              <p className="mb-3 text-gray-40">
                권장 이미지 크기: 500x500 픽셀, 최대 5MB
              </p>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" /> 이미지 변경
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-6 w-full max-w-md mx-auto">
              <div>
                <label className="block mb-1 font-medium">닉네임</label>
                <Input placeholder="변경할 닉네임 입력" />
                <p className="text-sm text-gray-40 mt-1">
                  다른 사용자에게 표시될 이름입니다.
                </p>
              </div>

              <div>
                <label className="block mb-1 font-medium">전화번호</label>
                <Input placeholder="010-1234-5678" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" className="cursor-pointer">
              취소
            </Button>
            <Button className="cursor-pointer">변경사항 저장</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
