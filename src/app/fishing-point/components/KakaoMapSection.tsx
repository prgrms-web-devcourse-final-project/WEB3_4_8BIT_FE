"use client";

import { Button } from "@/components/ui/button";
import KaKaoMap from "./KaKaoMap";

export default function KakaoMapSection() {
  return (
    <section className="w-full mt-[34px]">
      <div className="xl:w-[1280px] w-[calc(100%-20px)] mx-auto">
        <div className="flex items-center justify-between mb-[16px]">
          <div>서치바</div>
          <Button className="text-body-3 text-white">
            낚시 포인트 제보하기
          </Button>
        </div>
        <KaKaoMap />
      </div>
    </section>
  );
}
