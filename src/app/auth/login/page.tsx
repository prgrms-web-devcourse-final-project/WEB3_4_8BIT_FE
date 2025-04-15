"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fish } from "lucide-react";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  // 배경 스타일을 body에 적용
  useEffect(() => {
    document.body.style.background =
      "linear-gradient(to bottom right, #eff6ff, #e0f2fe, #ccfbf1)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const handleSocialLogin = async (provider: "kakao" | "naver") => {
    try {
      if (provider === "kakao") {
        router.push("https://api.mikki.kr/oauth2/authorization/kakao");
      } else if (provider === "naver") {
        router.push("https://api.mikki.kr/oauth2/authorization/naver");
      }
    } catch (error) {
      // TODO 추후 에러 처리 필요!
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      {/* 배경 장식 요소 */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200 rounded-full opacity-10 blur-3xl"></div>

      <Card className="w-[520px] h-auto py-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="flex justify-center mb-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full">
              <Fish className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            로그인
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            소셜 계정으로 간편하게 로그인하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-8">
          <Button
            variant="outline"
            className="w-full font-semibold text-md h-14 relative bg-[#FEE500] hover:bg-yellow-200 cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            onClick={() => handleSocialLogin("kakao")}
          >
            <div className="flex gap-4">
              <Image
                src="/icons/kakao.svg"
                alt="Kakao Logo"
                width={28}
                height={28}
                className="rounded-sm"
              />
              <span className="flex-1 text-center text-lg">
                카카오로 로그인
              </span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full font-semibold text-md text-white h-14 relative bg-[#03c75b] hover:bg-green-400 hover:text-white cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            onClick={() => handleSocialLogin("naver")}
          >
            <div className="flex gap-4">
              <Image
                src="/icons/naver.svg"
                alt="Naver Logo"
                width={28}
                height={28}
              />
              <span className="flex-1 text-center text-lg">
                네이버로 로그인
              </span>
            </div>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 px-8 pt-2">
          <p className="text-sm text-center text-gray-500">
            로그인함으로써 미끼미끼의{" "}
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              이용약관
            </Link>{" "}
            및{" "}
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              개인정보처리방침
            </Link>
            에 동의합니다.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
