"use client";

import { ArrowLeft, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import KaKaoMap from "../components/KaKaoMap";
import fishLocation from "@/constants/fish-location.json";
import Image from "next/image";
import FishingConditionsTab from "./component/FishingConditionsTab";

interface FishLocation {
  value: number;
  name: string;
  title: string;
  lat: number;
  lng: number;
}
export default function FishingPointPage({
  params,
}: {
  params: Promise<{ pointId: string }>;
}) {
  const [pointData, setPointData] = useState<FishLocation | null>(null);

  const router = useRouter();
  const { pointId } = use(params);

  const goToBack = () => {
    router.back();
  };

  useEffect(() => {
    const data = fishLocation.find(
      (item: FishLocation) => item.value === +pointId
    );
    if (data) {
      setPointData(data);
    }
  }, [pointId]);

  return (
    <section className="xl:w-[1280px] w-[calc(100%-20px)] mx-auto">
      <div className="flex items-center gap-[8px]">
        <div
          onClick={goToBack}
          className="cursor-pointer flex items-center gap-[8px] text-primary my-[36px]"
        >
          <ArrowLeft className="w-[18px] h-[18px]" />
          검색 화면 돌아가기
        </div>
      </div>
      <KaKaoMap />

      {/* 낚시 포인트 이름, 위치*/}
      <div className="w-full p-[16px] text-white bg-primary mt-[73px]">
        <h5 className="text-title-4">{pointData?.title}</h5>
        <div className="flex items-center gap-[4px]">
          <MapPin className="w-[16px] h-[16px]" />
          <span className="text-body-4">{pointData?.name}</span>
        </div>
      </div>

      {/* 대표 어종 */}
      <div className="w-full p-[16px] mb-[32px]">
        <div className="mb-[28px]">
          <h5 className="text-title-5 mb-[6px]">대표 어종</h5>
          <p className="text-body-4 text-gray-50">
            해당 포인트에서 자주 낚이는 대표 어종이에요.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-[12px] p-4 rounded-lg">
            <div className="w-[56px] h-[56px] rounded-full bg-gray-70 flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/fish-dummy-img1.png"
                alt="문어"
                width={36}
                height={36}
              />
            </div>
            <div className="min-w-0">
              <strong className="text-body-3 block truncate">문어</strong>
              <p className="text-body-5 text-gray-50">제철: 봄-가을</p>
              <div className="bg-[#EFF6FF] py-[4px] px-[8px] inline-block mt-1">
                <span className="text-[#1E40AF] text-body-5">100 마리+</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[12px] p-4 rounded-lg">
            <div className="w-[56px] h-[56px] rounded-full bg-gray-70 flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/fish-dummy-img1.png"
                alt="문어"
                width={36}
                height={36}
              />
            </div>
            <div className="min-w-0">
              <strong className="text-body-3 block truncate">문어</strong>
              <p className="text-body-5 text-gray-50">제철: 봄-가을</p>
              <div className="bg-[#EFF6FF] py-[4px] px-[8px] inline-block mt-1">
                <span className="text-[#1E40AF] text-body-5">100 마리+</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[12px] p-4 rounded-lg">
            <div className="w-[56px] h-[56px] rounded-full bg-gray-70 flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/fish-dummy-img1.png"
                alt="문어"
                width={36}
                height={36}
              />
            </div>
            <div className="min-w-0">
              <strong className="text-body-3 block truncate">문어</strong>
              <p className="text-body-5 text-gray-50">제철: 봄-가을</p>
              <div className="bg-[#EFF6FF] py-[4px] px-[8px] inline-block mt-1">
                <span className="text-[#1E40AF] text-body-5">100 마리+</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[12px] p-4 rounded-lg">
            <div className="w-[56px] h-[56px] rounded-full bg-gray-70 flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/fish-dummy-img1.png"
                alt="문어"
                width={36}
                height={36}
              />
            </div>
            <div className="min-w-0">
              <strong className="text-body-3 block truncate">문어</strong>
              <p className="text-body-5 text-gray-50">제철: 봄-가을</p>
              <div className="bg-[#EFF6FF] py-[4px] px-[8px] inline-block mt-1">
                <span className="text-[#1E40AF] text-body-5">100 마리+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 날씨 정보 */}
      <FishingConditionsTab pointDataProp={pointData} />
    </section>
  );
}
