import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function FishingSpotsSection() {
  return (
    <section className="w-[1280px] mx-auto mt-[40px]">
      <div className="mb-[13px]">
        <h3 className="text-title-4">인기 낚시 포인트</h3>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-[408px] h-[275px] rounded-[8px] box-shadow-1">
          <div className="w-full h-[185px] px-[16px] pt-[109px] rounded-t-[8px] bg-[url('/images/fishing-point-dummy.png')] bg-cover bg-center">
            <div>
              <h4 className="text-body-2 paperlogy-5medium text-white">
                기장 학리 방파제
              </h4>
              <div className="flex items-center gap-[4px]">
                <MapPin className="w-[16px] h-[16px] text-white" />
                <p className="text-body-4 text-white">부산 기장군</p>
              </div>
            </div>
          </div>

          <div className="p-[16px] flex justify-between items-center">
            <div className="flex gap-[22px] items-center justify-between">
              <div className="flex flex-col gap-[4px] items-center">
                <p className="text-body-4 text-gray-50">기온</p>
                <p>22.5℃</p>
              </div>
              <div className="flex flex-col gap-[4px] items-center">
                <p className="text-body-4 text-gray-50">수온</p>
                <p>19.8℃</p>
              </div>
              <div className="flex flex-col gap-[4px] items-center">
                <p className="text-body-4 text-gray-50">파고</p>
                <p>0.5m</p>
              </div>
            </div>
            <Button className="bg-[#0891B2] text-white">상세보기</Button>
          </div>
        </div>
        <div className="w-[408px] h-[275px] rounded-[8px] box-shadow-1">
          <div className="w-full h-[185px] px-[16px] pt-[109px] rounded-t-[8px] bg-[url('/images/fishing-point-dummy.png')] bg-cover bg-center">
            <div>
              <h4 className="text-body-2 paperlogy-5medium text-white">
                기장 학리 방파제
              </h4>
              <div className="flex items-center gap-[4px]">
                <MapPin className="w-[16px] h-[16px] text-white" />
                <p className="text-body-4 text-white">부산 기장군</p>
              </div>
            </div>
          </div>

          <div className="p-[16px] flex justify-between items-center">
            <div className="flex gap-[22px] items-center justify-between">
              <div className="flex flex-col gap-[4px] items-center">
                <p className="text-body-4 text-gray-50">기온</p>
                <p>22.5℃</p>
              </div>
              <div className="flex flex-col gap-[4px] items-center">
                <p className="text-body-4 text-gray-50">수온</p>
                <p>19.8℃</p>
              </div>
              <div className="flex flex-col gap-[4px] items-center">
                <p className="text-body-4 text-gray-50">파고</p>
                <p>0.5m</p>
              </div>
            </div>
            <Button className="bg-[#0891B2] text-white">상세보기</Button>
          </div>
        </div>
        <div className="w-[408px] h-[275px] rounded-[8px] box-shadow-1">
          <div className="w-full h-[185px] px-[16px] pt-[109px] rounded-t-[8px] bg-[url('/images/fishing-point-dummy.png')] bg-cover bg-center">
            <div>
              <h4 className="text-body-2 paperlogy-5medium text-white">
                기장 학리 방파제
              </h4>
              <div className="flex items-center gap-[4px]">
                <MapPin className="w-[16px] h-[16px] text-white" />
                <p className="text-body-4 text-white">부산 기장군</p>
              </div>
            </div>
          </div>

          <div className="p-[16px] flex justify-between items-center">
            <div className="flex gap-[22px] items-center justify-between">
              <div className="flex flex-col gap-[4px] items-center">
                <p className="text-body-4 text-gray-50">기온</p>
                <p>22.5℃</p>
              </div>
              <div className="flex flex-col gap-[4px] items-center">
                <p className="text-body-4 text-gray-50">수온</p>
                <p>19.8℃</p>
              </div>
              <div className="flex flex-col gap-[4px] items-center">
                <p className="text-body-4 text-gray-50">파고</p>
                <p>0.5m</p>
              </div>
            </div>
            <Button className="bg-[#0891B2] text-white">상세보기</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
