import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111827] py-16 text-[#9CA3AF] mt-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-30">
          <div className="flex-1">
            <div className="flex flex-col items-start gap-3">
              <Image
                src="/images/logo.png"
                alt="미끼미끼 로고"
                width={220}
                height={30}
                className="mb-1"
              />
              <div className="space-y-3">
                <p className="text-lg font-medium text-white">
                  낚시의 모든 순간을 연결하다, 미끼미끼
                </p>
                <div className="space-y-2">
                  <p className="text-base text-gray-400">
                    선상 예약, 포인트 정보, 출조 동행까지
                  </p>
                  <p className="text-base text-gray-400">
                    낚시를 즐기는 모든 사람들의 경험을 한 곳에 연결합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Info */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-6">
              Team Members
            </h3>
            <div className="space-y-8">
              <div>
                <p className="text-md font-medium text-gray-400 mb-2">
                  Frontend Team
                </p>
                <p className="text-base text-white">
                  <span>김재영</span>
                  <span className="mx-2 text-gray-500">|</span>
                  <span>김동현</span>
                  <span className="mx-2 text-gray-500">|</span>
                  <span>최윤서</span>
                </p>
              </div>
              <div>
                <p className="text-md font-medium text-gray-400 mb-2">
                  Backend Team
                </p>
                <p className="text-base text-white">
                  <span>김동오</span>
                  <span className="mx-2 text-gray-500">|</span>
                  <span>성기훈</span>
                  <span className="mx-2 text-gray-500">|</span>
                  <span>강정수</span>
                  <span className="mx-2 text-gray-500">|</span>
                  <span>심원준</span>
                  <span className="mx-2 text-gray-500">|</span>
                  <span>장현석</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-md">
            © 2025 programmers Final Project 13team 8bit All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
