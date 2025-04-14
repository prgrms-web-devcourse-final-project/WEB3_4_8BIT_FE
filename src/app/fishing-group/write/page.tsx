"use client";

import Image from "next/image";
import WritePostForm from "./components/WritePostForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    setIsLoading(false);

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!token) {
      router.push("auth/login");
    }
  }, [router]);

  // 로딩 중일 때 표시할 내용
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 로그인하지 않은 경우 아무것도 표시하지 않음 (리다이렉트 중)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {/* 배너 */}
      <div className="relative w-full h-[350px]">
        <Image
          src="/images/banner.jpg"
          alt="배너"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <WritePostForm />
      </div>
    </>
  );
}
