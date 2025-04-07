"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {Ship, User} from "lucide-react";

type UserType = "captain" | "regular" | null

export default function RegisterPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<UserType>(null)

  const handleContinue = () => {
    if (selectedType === "captain") {
      router.push("/auth/register/captain")
    } else if (selectedType === "regular") {
      router.push("/auth/register/user")
    }
  }

  return (
    <div className="min-h-screen flex justify-center">
      <Card className="max-w-md w-[476px] h-[400px] mt-20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">추가 정보 입력</CardTitle>
          <CardDescription>회원 유형을 선택해주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedType === "captain" ? "border-cyan-600 bg-cyan-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedType("captain")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-3">
                  <Ship/>
                </div>
                <h3 className="font-medium">선장</h3>
                <p className="text-sm text-gray-500 mt-2">선상 낚시 서비스를 제공하는 선장님</p>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedType === "regular" ? "border-cyan-600 bg-cyan-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedType("regular")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-3">
                  <User/>
                </div>
                <h3 className="font-medium">일반 회원</h3>
                <p className="text-sm text-gray-500 mt-2">선상 낚시를 예약하고 즐기는 회원</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full bg-primary cursor-pointer" onClick={handleContinue} disabled={!selectedType}>
              계속하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

