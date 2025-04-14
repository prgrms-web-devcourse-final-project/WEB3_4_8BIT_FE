"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Fish, Calendar, Users, Star, LogOut, Heart } from "lucide-react";
import { UserAPI } from "@/lib/api/userAPI";
import { useEffect, useState } from "react";
import { User } from "@/types/user.interface";
import { toast } from "sonner";

const navItems = [
  { name: "홈", href: "/user/mypage", icon: Home },
  { name: "어류 도감", href: "/user/mypage/fish-encyclopedia", icon: Fish },
  { name: "예약 내역", href: "/user/mypage/reservation", icon: Calendar },
  { name: "내 좋아요", href: "/user/mypage/likes", icon: Heart },
  { name: "동출 모집", href: "/user/mypage/fishing-group", icon: Users },
  { name: "내 리뷰", href: "/user/mypage/review", icon: Star },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await UserAPI.getMemberInfo();
        setUser(userData);
      } catch (error) {
        console.error("사용자 정보 로딩 중 오류 발생:", error);
        toast.error("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    try {
      toast.success("로그아웃 되었습니다.");

      // 로그인 페이지로 리다이렉트
      router.push("/auth/login");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      toast.error("로그아웃 중 오류가 발생했습니다.");
    }
  };

  // 사용자 정보 로딩 중일 때 스켈레톤 UI 표시
  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 mb-4 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-2" />
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mt-1" />
            <div className="mt-4 w-full">
              <div className="h-9 w-full bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4 space-y-3">
            {navItems.map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        </Card>
      </div>
    );
  }
  console.log(user);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage
              src={user?.fileUrl || "/placeholder.svg?height=96&width=96"}
              alt={user?.nickname || "User"}
            />
            <AvatarFallback>{user?.nickname?.[0] || "?"}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{user?.nickname || "사용자"}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {/*{user?.role === "USER" ? "일반 회원" : "선장 회원"}*/}
            "일반 회원"
          </p>
          {user?.description && (
            <p className="text-sm text-gray-600 mt-2">{user.description}</p>
          )}
          <div className="mt-4 w-full">
            <Link href="/user/mypage/edit">
              <Button variant="outline" className="w-full cursor-pointer">
                프로필 수정
              </Button>
            </Link>
          </div>
        </div>
      </Card>
      <Card>
        <nav className="flex flex-col p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-cyan-50 text-primary"
                    : "text-gray-40 hover:bg-gray-80"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-primary" : "text-gray-40"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </Card>
      <Card>
        <div className="p-4 space-y-3 font-medium">
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 text-base"
          >
            <LogOut className="h-5 w-5 mr-2" />
            로그아웃
          </Button>
        </div>
      </Card>
    </div>
  );
}