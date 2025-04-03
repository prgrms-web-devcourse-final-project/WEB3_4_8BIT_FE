import React from "react";
import { MapPin } from "lucide-react"; // 아이콘 import

const FishingPoint = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 bg-white mx-auto max-w-7xl">
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          바다 낚시 포인트 지도
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          전국의 인기 낚시 포인트의 정확한 위치를 확인하세요. <br />
          실시간 날씨 정보와 함께 최적의 낚시 장소를 찾아보세요.
        </p>
        <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer flex items-center">
          <MapPin className="mr-2" />
          지도 보기
        </button>
      </div>

      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center items-center bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="w-full h-[300px] bg-gray-200 rounded-lg">
          {/* 카카오맵 */}
          <p className="text-center text-gray-500">지도 자리</p>
        </div>
      </div>
    </div>
  );
};

export default FishingPoint;
