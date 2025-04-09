"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoToBack({ text }: { text: string }) {
  const router = useRouter();

  const goToBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center gap-[8px] xl:w-[1280px] mx-auto lg:pl-0 pl-[16px] w-full">
      <div
        onClick={goToBack}
        className="cursor-pointer flex items-center gap-[8px] text-primary my-[36px]"
      >
        <ArrowLeft className="w-[18px] h-[18px]" />
        {text}
      </div>
    </div>
  );
}
