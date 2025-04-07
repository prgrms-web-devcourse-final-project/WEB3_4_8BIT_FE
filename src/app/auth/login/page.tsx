"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const router = useRouter()

  const handleSocialLogin = async (provider: 'kakao' | 'naver' ) => {
    try {
      if (provider === 'kakao') {
        router.push("https://api.mikki.kr/oauth2/authorization/kakao")
      } else if (provider === 'naver') {
        router.push("https://api.mikki.kr/oauth2/authorization/naver")
      }
    } catch (error) {
      // TODO 추후 에러 처리 필요!
      console.error(error)
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-white">
      <Card className="w-[476px] h-[400px] mt-20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">로그인</CardTitle>
          <CardDescription>소셜 계정으로 간편하게 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full font-semibold text-md h-12 relative bg-[#FEE500] hover:bg-yellow-200 cursor-pointer"
            onClick={() => handleSocialLogin("kakao")}
          >
            <div className="flex gap-4">
              <Image
                src="/icons/kakao.svg"
                alt="Kakao Logo"
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="flex-1 text-center">카카오로 로그인</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full font-semibold text-md text-white h-12 relative bg-[#03c75b] hover:bg-green-400 hover:text-white cursor-pointer"
            onClick={() => handleSocialLogin("naver")}
          >
            <div className="flex gap-4">
              <Image
                src="/icons/naver.svg"
                alt="Naver Logo"
                width={24}
                height={24}
              />
              <span className="flex-1 text-center">네이버로 로그인</span>
            </div>
          </Button>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
              또는
            </span>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              아직 회원이 아니신가요?{" "}
              <Link href="/auth/register" className="text-primary hover:text-sub-1 font-medium">
                회원가입
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-xs text-center text-gray-500">
            로그인함으로써 미끼미끼의{" "}
            <Link href="/" className="underline">
              이용약관
            </Link>{" "}
            및{" "}
            <Link href="/" className="underline">
              개인정보처리방침
            </Link>
            에 동의합니다.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

