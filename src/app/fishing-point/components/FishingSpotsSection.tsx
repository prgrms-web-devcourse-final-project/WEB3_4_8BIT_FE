"use client";

import { Button } from "@/components/ui/button";
import { getFishingPointSpot } from "@/lib/api/getFishingPointSpot";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FishingSpotsSection() {
  const { data } = useQuery({
    queryKey: ["fishing-point-spot"],
    queryFn: getFishingPointSpot,
  });

  const router = useRouter();

  const handleClick = (fishPointId: number) => {
    router.push(`/fishing-point/${fishPointId}`);
  };

  return (
    <section className="xl:w-[1280px] w-[calc(100%-20px)] mx-auto mt-[40px]">
      <div className="mb-[13px]">
        <h3 className="text-title-4">인기 낚시 포인트</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="w-full h-[185px] rounded-[8px] box-shadow-1 relative">
          <div className="w-full h-[185px] px-[16px] pt-[109px] bg-[url('/images/point1.png')] rounded-[8px] bg-cover bg-center">
            <div>
              <h4 className="text-body-2 paperlogy-5medium text-white">
                {data?.data[0].fishPointDetailName}
              </h4>
              <div className="flex items-center gap-[4px]">
                <MapPin className="w-[16px] h-[16px] text-white" />
                <p className="text-body-4 text-white">
                  {data?.data[0].fishPointName}
                </p>
              </div>
            </div>
            <Button
              className="bg-[#0891B2] text-white cursor-pointer absolute bottom-[16px] right-[16px]"
              onClick={() => handleClick(data!.data[0].fishPointId)}
            >
              상세보기
            </Button>
          </div>
        </div>

        <div className="w-full h-[185px] rounded-[8px] box-shadow-1 relative">
          <div className="w-full h-[185px] px-[16px] pt-[109px] bg-[url('/images/point2.png')] rounded-[8px] bg-cover bg-center">
            <div>
              <h4 className="text-body-2 paperlogy-5medium text-white">
                {data?.data[1].fishPointDetailName}
              </h4>
              <div className="flex items-center gap-[4px]">
                <MapPin className="w-[16px] h-[16px] text-white" />
                <p className="text-body-4 text-white">
                  {data?.data[1].fishPointName}
                </p>
              </div>
            </div>
            <Button
              className="bg-[#0891B2] text-white cursor-pointer absolute bottom-[16px] right-[16px]"
              onClick={() => handleClick(data!.data[1].fishPointId)}
            >
              상세보기
            </Button>
          </div>
        </div>

        <div className="w-full h-[185px] rounded-[8px] box-shadow-1 relative">
          <div className="w-full h-[185px] px-[16px] pt-[109px] bg-[url('/images/point3.png')] rounded-[8px] bg-cover bg-center">
            <div>
              <h4 className="text-body-2 paperlogy-5medium text-white">
                {data?.data[2].fishPointDetailName}
              </h4>
              <div className="flex items-center gap-[4px]">
                <MapPin className="w-[16px] h-[16px] text-white" />
                <p className="text-body-4 text-white">
                  {data?.data[2].fishPointName}
                </p>
              </div>
            </div>
            <Button
              className="bg-[#0891B2] text-white cursor-pointer absolute bottom-[16px] right-[16px]"
              onClick={() => handleClick(data!.data[2].fishPointId)}
            >
              상세보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
