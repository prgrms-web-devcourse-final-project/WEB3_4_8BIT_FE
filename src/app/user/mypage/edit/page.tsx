"use client"

import type React from "react";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Upload} from "lucide-react";

export default function Edit() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">프로필 수정</h1>
      <div className="text-gray-40">프로필 정보를 수정하여 다른 낚시 애호가들에게 나를 보여주세요.</div>
      <Card>
        <CardContent>
          <div className="flex flex-col items-center mb-7">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage alt={"captain.name"} />
              <AvatarFallback>이미지</AvatarFallback>
            </Avatar>
            <div className="mb-4 text-gray-40">권장 이미지 크가: 500x500 픽셀, 최대 5MB</div>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" /> 이미지 변경
            </Button>
          </div>
          <div className="grid justify-items-center mb-10">
            <div className="w-5/7">
              <Separator />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-3/5 grid gap-3">
              <div>닉네임</div>
              <Input placeholder="변경할 닉네임 입력"/>
              <div className="text-gray-40">다른 사용자에게 표시될 이름입니다.</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button className="cursor-pointer" variant="outline">취소</Button>
          <Button className="cursor-pointer">변경사항 저장</Button>
        </CardFooter>
      </Card>
    </div>
  )
}