"use client";

import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  return (
    <header className="w-full h-[90px] bg-[rgba(0,0,0,0.6)] backdrop-blur-[6px] flex items-center justify-between fixed top-0 left-0 right-0 z-[9999]">
      <div className="w-[1280px] h-full mx-auto flex items-center justify-between xl:px-0 px-[20px]">
        {/* 헤더 왼쪽 */}
        <div className="flex items-center justify-between">
          <div className="mr-[65px]">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={130}
              height={30}
              className="w-[200px] h-[full] cursor-pointer"
              onClick={goToHome}
            />
          </div>
          <nav className="hidden md:block">
            <ul className="flex lg:gap-[51px] gap-[30px]">
              <Link href={'/boat-reservation'} className="text-[18px] text-[#fff] font-semibold cursor-pointer">
                선상 낚시 예약
              </Link>
              <Link href={'/fishing-group'} className="text-[18px] text-[#fff] font-semibold cursor-pointer">
                낚시 동출 모집
              </Link>
              <Link href={'/fishing-point'} className="text-[18px] text-[#fff] font-semibold cursor-pointer">
                낚시 포인트
              </Link>
              <Link href={'/user/mypage/fish-encyclopedia'} className="text-[18px] text-[#fff] font-semibold cursor-pointer">
                어류 도감
              </Link>
              <Link href={'/user/mypage'} className="text-[18px] text-[#fff] font-semibold cursor-pointer">
                마이페이지
              </Link>
            </ul>
          </nav>
        </div>

        {/* 헤더 오른쪽 - 로그인 버튼 */}
        <div className="hidden md:block">
          <Link href="/auth/login" className="inline-block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[14px] px-[20px] py-[6px] rounded-full shadow-md flex items-center gap-2 cursor-pointer">
              <User className="w-[18px] h-[18px]" />
              로그인
            </button>
          </Link>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="block md:hidden">
          <button onClick={toggleMenu} className="cursor-pointer">
            <Menu className="w-[24px] h-[24px] text-[#fff]" />
          </button>
        </div>

        {/* 오른쪽 슬라이드 메뉴 */}
        <div
          className={`fixed top-0 right-0 h-screen w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[10000] ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <Link href="/auth/login" className="inline-block w-full">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[14px] px-[20px] py-[10px] rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer">
                  <User className="w-[18px] h-[18px]" />
                  로그인
                </button>
              </Link>
            </div>

            <nav>
              <ul className="space-y-6">
                <li className="text-[18px] text-gray-800 font-semibold cursor-pointer">
                  menu1
                </li>
                <li className="text-[18px] text-gray-800 font-semibold cursor-pointer">
                  menu2
                </li>
                <li className="text-[18px] text-gray-800 font-semibold cursor-pointer">
                  menu3
                </li>
                <li className="text-[18px] text-gray-800 font-semibold cursor-pointer">
                  menu4
                </li>
                <li className="text-[18px] text-gray-800 font-semibold cursor-pointer">
                  menu5
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* 메뉴가 열렸을 때 배경 오버레이 */}
        {isMenuOpen && (
          <div
            className="fixed left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[9999]"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </header>
  );
}
