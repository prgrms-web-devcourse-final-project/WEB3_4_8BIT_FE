"use client";

import { useUserStore } from "@/stores/userStore";
import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    clearUser();
    await fetch("/api/logout");
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();

  const goToHome = () => {
    router.push("/");
    closeMenu();
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <header
      className={`w-full h-[90px] backdrop-blur-[6px] flex items-center justify-between fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled ? "bg-[#111827] shadow-lg" : "bg-[#111827]/80"
      }`}
    >
      <div className="w-[1280px] h-full mx-auto flex items-center justify-between xl:px-0 px-[20px]">
        {/* 헤더 왼쪽 */}
        <div className="flex items-center justify-between">
          <div className="mr-[65px] group">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={130}
              height={30}
              className="w-[200px] h-[full] cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={goToHome}
            />
          </div>
          <nav className="hidden md:block">
            <ul className="flex lg:gap-[51px] gap-[30px]">
              <Link
                href={"/boat-reservation"}
                className="text-[18px] text-[#fff] paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group"
              >
                선상 낚시 예약
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href={"/fishing-group"}
                className="text-[18px] text-[#fff] paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group"
              >
                낚시 동출 모집
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href={"/fishing-point"}
                className="text-[18px] text-[#fff] paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group"
              >
                낚시 포인트
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href={"/user/mypage/fish-encyclopedia"}
                className="text-[18px] text-[#fff] paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group"
              >
                어류 도감
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href={"/user/mypage"}
                className="text-[18px] text-[#fff] paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group"
              >
                마이페이지
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </ul>
          </nav>
        </div>

        {/* 헤더 오른쪽 - 로그인 버튼 */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-[8px]">
                <p className="text-[16px] text-[#fff] paperlogy-6semibold">
                  환영합니다, {user?.nickname}님!
                </p>
                <div className="inline-block">
                  <button
                    onClick={handleLogout}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[16px] px-[20px] py-[6px] rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 paperlogy-6semibold"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link href="/auth/login" className="inline-block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-[16px] px-[20px] py-[6px] rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 paperlogy-6semibold">
                <User className="w-[20px] h-[20px]" />
                로그인
              </button>
            </Link>
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            <Menu className="w-[24px] h-[24px] text-[#fff]" />
          </button>
        </div>

        {/* 오른쪽 슬라이드 메뉴 */}
        <div
          className={`fixed top-0 right-0 h-screen w-[300px] bg-[#111827] shadow-lg transform transition-transform duration-300 ease-in-out z-[10000] ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-primary cursor-pointer transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-8">
              {isLoggedIn ? (
                <div className="flex flex-col items-center gap-[8px]">
                  <p className="text-[16px] text-[#fff] paperlogy-6semibold">
                    환영합니다, {user?.nickname} 님!
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[18px] px-[20px] py-[12px] rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 paperlogy-6semibold"
                  >
                    <User className="w-[20px] h-[20px]" />
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link href="/auth/login" className="inline-block w-full">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[18px] px-[20px] py-[12px] rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 paperlogy-6semibold">
                    <User className="w-[20px] h-[20px]" />
                    로그인
                  </button>
                </Link>
              )}
            </div>

            <nav>
              <ul className="space-y-6">
                <li className="text-[20px] text-white paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group">
                  <Link href={"/boat-reservation"} onClick={handleLinkClick}>
                    선상 낚시 예약
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-[20px] text-white paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group">
                  <Link href={"/fishing-group"} onClick={handleLinkClick}>
                    낚시 동출 모집
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-[20px] text-white paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group">
                  <Link href={"/fishing-point"} onClick={handleLinkClick}>
                    낚시 포인트
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-[20px] text-white paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group">
                  <Link
                    href={"/user/mypage/fish-encyclopedia"}
                    onClick={handleLinkClick}
                  >
                    어류 도감
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-[20px] text-white paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group">
                  <Link href={"/user/mypage"} onClick={handleLinkClick}>
                    마이페이지
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
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
