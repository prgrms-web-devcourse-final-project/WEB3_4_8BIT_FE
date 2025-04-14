import React from "react";
import {
  MapPin,
  ChevronRight,
  Fish,
  Droplets,
  ThermometerSun,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// KaKaoMap을 동적으로 import (클라이언트 사이드 렌더링)
const KaKaoMap = dynamic(
  () => import("@/app/fishing-point/components/KaKaoMap"),
  { ssr: false }
);

const FishingPoint = () => {
  const router = useRouter();

  const handleMapClick = () => {
    router.push("/fishing-point");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8  mx-auto max-w-7xl">
      <div className="w-full md:w-1/2 text-left pr-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          바다 낚시 포인트 지도
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          전국의 인기 낚시 포인트의 정확한 위치를 확인하세요. <br />
          실시간 날씨 정보와 함께 최적의 낚시 장소를 찾아보세요.
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-lg">
            <ThermometerSun className="text-blue-600 w-5 h-5" />
            <span className="text-sm font-medium text-blue-800">기온 정보</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 p-2 rounded-lg">
            <Fish className="text-green-600 w-5 h-5" />
            <span className="text-sm font-medium text-green-800">
              어종 정보
            </span>
          </div>
          <div className="flex items-center gap-2 bg-amber-100 p-2 rounded-lg">
            <Droplets className="text-amber-600 w-5 h-5" />
            <span className="text-sm font-medium text-amber-800">
              물때 정보
            </span>
          </div>
        </div>

        <button
          onClick={handleMapClick}
          className="bg-primary text-white py-3 px-5 rounded-md hover:bg-blue-600 cursor-pointer flex items-center transition-colors duration-500 ease-in-out"
        >
          <MapPin className="mr-2" />
          지도 보기
          <ChevronRight className="ml-2 w-4 h-4" />
        </button>
      </div>

      <div
        className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center items-center bg-white p-6 rounded-lg shadow-md cursor-pointer border-1 transition-all duration-300 hover:shadow-lg"
        onClick={handleMapClick}
      >
        <div className="w-full h-[300px] rounded-lg overflow-hidden border border-gray-200">
          <KaKaoMap />
        </div>
      </div>
    </div>
  );
};

export default FishingPoint;
