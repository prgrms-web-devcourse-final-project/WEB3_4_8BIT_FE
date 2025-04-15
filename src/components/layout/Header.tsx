"use client";

import useDebouncedRequest from "@/hooks/useDebouncedReques";
import { UserAPI } from "@/lib/api/userAPI";
import { useUserStore } from "@/stores/userStore";
import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface MenuItem {
  name: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: "선상 낚시 예약", path: "/boat-reservation" },
  { name: "낚시 동출 모집", path: "/fishing-group" },
  { name: "낚시 포인트", path: "/fishing-point" },
  { name: "어류 도감", path: "/user/mypage/fish-encyclopedia" },
  { name: "마이페이지", path: "/user/mypage" },
];

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const isCaptain = useUserStore((state) => state.isCaptain());

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  useEffect(() => {
    const loadUserData = async () => {
      if (isLoggedIn && !user) {
        try {
          const userData = await UserAPI.getMemberInfo();
          setUser(userData);
        } catch (error) {
          console.error("유저 정보 불러오기에 실패했습니다.", error);
          toast.error("유저 정보 불러오기에 실패했습니다.");
        }
      }
    };

    loadUserData();
  }, [isLoggedIn, user, setUser]);

  const clearUser = useUserStore((state) => state.clearUser);

  const { trigger: handleLogout } = useDebouncedRequest(async () => {
    const response = await UserAPI.postLogout();
    if (response) {
      clearUser();
      router.push("/");
      window.location.reload();
    }
  });

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
              className="w-auto h-auto max-w-[180px] lg:max-w-[200px] cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={goToHome}
              priority
            />
          </div>
          <nav className="hidden lg:block">
            <ul className="flex md:gap-[30px] xl:gap-[51px] gap-[20px]">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-[14px] lg:text-[16px] text-[#fff] paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
              {isClient && isCaptain && (
                <li>
                  <Link
                    href="/captain/mypage"
                    className="text-[14px] lg:text-[16px] text-[#fff] paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group"
                  >
                    선장 대시보드
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* 헤더 오른쪽 - 로그인 버튼 */}
        <div className="hidden lg:block">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-[8px]">
                {user?.isAddInfo && (
                  <p className="text-[14px] text-[#fff] paperlogy-6semibold">
                    환영합니다, {user?.nickname}님!
                  </p>
                )}
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
        <div className="block lg:hidden">
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
                  {user?.isAddInfo && (
                    <p className="text-[16px] text-[#fff] paperlogy-6semibold">
                      환영합니다, {user?.nickname} 님!
                    </p>
                  )}
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
                {menuItems.map((item) => (
                  <li
                    key={item.path}
                    className="text-[20px] text-white paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group"
                  >
                    <Link href={item.path} onClick={handleLinkClick}>
                      {item.name}
                    </Link>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </li>
                ))}
                {isClient && isCaptain && (
                  <li>
                    <Link
                      href="/captain/mypage"
                      className="text-[16px] lg:text-[18px] text-[#fff] paperlogy-6semibold cursor-pointer transition-all duration-300 hover:text-primary hover:scale-105 relative group"
                    >
                      선장 대시보드
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>

        {/* 메뉴가 열렸을 때 배경 오버레이 */}
        {isMenuOpen && (
          <div
            className="fixed w-[100vw] h-[100vh] top-0 left-0  bg-[rgba(0,0,0,0.5)] z-[9999]"
            onClick={closeMenu}
          ></div>
        )}
      </div>
    </header>
  );
}
