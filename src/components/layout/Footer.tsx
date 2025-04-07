import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111827] py-12 text-[#9CA3AF] mt-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h6 className="text-xl font-bold text-white mb-4">미끼미끼</h6>
            <p className=" text-sm">
              낚시를 즐기는 모든 이들을 위한 종합 플랫폼
            </p>
          </div>

          <div>
            <h6 className="text-body-2 font-semibold text-white mb-4">
              서비스
            </h6>
            <ul className="space-y-2">
              <li>어류 도감</li>
              <li>선상 낚시 예약</li>
              <li>낚시 포인트 지도</li>
              <li>커뮤니티</li>
            </ul>
          </div>

          <div>
            <h6 className="text-body-2 font-semibold text-white mb-4">
              회사정보
            </h6>
            <ul className="space-y-2">
              <li>소개</li>
              <li>개인정보처리방침</li>
              <li>이용약관</li>
              <li>문의하기</li>
            </ul>
          </div>

          <div>
            <h6 className="text-body-2 font-semibold text-white mb-4">
              소셜 미디어
            </h6>
            <div className="flex space-x-4">
              <div className="">
                <Instagram size={24} />
              </div>
              <div className="">
                <Youtube size={24} />
              </div>
              <div className="">
                <Facebook size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            © 2023 낚시왕. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
