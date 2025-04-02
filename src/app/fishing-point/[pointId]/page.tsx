"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function FishingPointPage({
  params,
}: {
  params: Promise<{ pointId: string }>;
}) {
  const router = useRouter();
  const { pointId } = use(params);

  console.log(pointId);

  const goToBack = () => {
    router.back();
  };

  return (
    <section className="w-[1280px] mx-auto mt-[40px]">
      <div className="flex items-center gap-[8px]">
        <div
          onClick={goToBack}
          className="cursor-pointer flex items-center gap-[8px] text-primary"
        >
          <ArrowLeft className="w-[24px] h-[24px]" />
          검색 화면 돌아가기
        </div>
      </div>
      <h1>FishingPointPage</h1>
      <p>{pointId}</p>
    </section>
  );
}
