"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function UserRegistrationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push("/")
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">회원 등록</CardTitle>
            <CardDescription>추가 회원 정보를 입력해주세요</CardDescription>
            <p className="text-sm text-gray-500 mt-1">이메일, 전화번호, 이름은 소셜 계정에서 가져온 정보입니다</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">기본 정보</h3>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
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
                      <Plus className="h-4 w-4" />
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
                    <Label htmlFor="email">
                      이메일
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                      defaultValue="user@example.com"
                      disabled
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">
                      전화번호
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-4948-4098"
                      required
                      defaultValue="010-3094-0398"
                      disabled
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">
                      이름
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="김길동"
                      required
                      defaultValue="김길동"
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
                  <Input id="nickname" placeholder="바다사랑" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="introduction">자기 소개</Label>
                  <Textarea
                    id="introduction"
                    placeholder="자기 소개와 낚시 경험에 대해 알려주세요"
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <CardFooter className="flex justify-end px-0 pt-4">
                <Button type="submit" className="bg-primary cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 처리 중...
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
  )
}

