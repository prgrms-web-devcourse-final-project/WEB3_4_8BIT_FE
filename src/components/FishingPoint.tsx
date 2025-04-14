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
    <div className="flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 md:p-8 mx-auto max-w-7xl">
      {/* 텍스트 섹션 */}
      <div className="w-full lg:w-1/2 text-center lg:text-left pr-0 lg:pr-6 mb-6 lg:mb-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          바다 낚시 포인트 지도
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
          전국의 인기 낚시 포인트의 정확한 위치를 확인하세요.{" "}
          <br className="hidden sm:block" />
          실시간 날씨 정보와 함께 최적의 낚시 장소를 찾아보세요.
        </p>

        {/* 정보 아이콘 섹션 - 한 줄에 나란히 표시 */}
        <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-1 sm:gap-2 bg-blue-100 p-1.5 sm:p-2 rounded-lg">
            <ThermometerSun className="text-blue-600 w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-blue-800 whitespace-nowrap">
              기온 정보
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-green-100 p-1.5 sm:p-2 rounded-lg">
            <Fish className="text-green-600 w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-green-800 whitespace-nowrap">
              어종 정보
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-amber-100 p-1.5 sm:p-2 rounded-lg">
            <Droplets className="text-amber-600 w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-amber-800 whitespace-nowrap">
              물때 정보
            </span>
          </div>
        </div>

        {/* 지도 보기 버튼 - 너비 제한 */}
        <div className="flex justify-center lg:justify-start">
          <button
            onClick={handleMapClick}
            className="bg-primary text-white py-2 sm:py-3 px-4 sm:px-5 rounded-md hover:bg-blue-600 cursor-pointer flex items-center justify-center transition-colors duration-500 ease-in-out w-full xs:w-auto max-w-[200px]"
          >
            <MapPin className="mr-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="text-sm sm:text-base whitespace-nowrap">
              지도 보기
            </span>
            <ChevronRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* 지도 섹션 */}
      <div
        className="w-full lg:w-1/2 flex justify-center items-center bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md cursor-pointer border border-gray-200 transition-all duration-300 hover:shadow-lg"
        onClick={handleMapClick}
      >
        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden border border-gray-200">
          <KaKaoMap />
        </div>
      </div>
    </div>
  );
};

export default FishingPoint;
