"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export default function Banner() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isCaptain = user?.role === "CAPTAIN";

  const handleClick = () => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login");
      return;
    }
    if (!isCaptain) {
      alert("선장만 글을 작성할 수 있습니다.");
      return;
    }
    router.push("/fishing-registration");
  };

  return (
    <div className="bg-sky-700 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              선상 낚시 예약
            </h1>
            <p className="text-lg text-cyan-100 max-w-3xl">
              전국 각지의 선상 낚시를 검색하고 예약해보세요!
            </p>
          </div>
          {isCaptain && (
            <div className="w-full md:w-auto">
              <button
                onClick={handleClick}
                className="w-full md:w-auto px-8 h-14 cursor-pointer bg-white text-blue-600 border-2 border-blue-500 rounded-lg hover:bg-blue-50 text-base font-medium transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
              >
                <span className="mr-2">+</span> 글쓰기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
