"use client";

import Image from "next/image";
import WritePostForm from "./components/WritePostForm";

export default function WritePage() {
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