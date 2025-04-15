"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Ship,
  LogOut,
  Phone,
  Mail,
  BadgeCheck,
} from "lucide-react";
import { CaptainInfoApiResponse } from "@/lib/api/getCaptainInfo";

const navItems = [
  { name: "대시보드", href: "/captain/mypage", icon: LayoutDashboard },
  { name: "예약 관리", href: "/captain/mypage/reservation", icon: Calendar },
  { name: "게시글 관리", href: "/captain/mypage/post", icon: ClipboardList },
  { name: "선박 정보", href: "/captain/mypage/ship-info", icon: Ship },
];

export function CaptainSidebar({
  captainData,
}: {
  captainData: CaptainInfoApiResponse;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6 max-w-sm mx-auto w-full">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage
              src={captainData?.data.profileImg || "/images/default.png"}
              alt="Captain"
            />
            <AvatarFallback>선장님</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-xl font-bold">{captainData?.data.name}</h2>
            <p className="text-sm text-gray-500">
              {captainData?.data.nickname}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <BadgeCheck className="h-4 w-4 text-green-500" />
              <span>{captainData?.data.shipLicenseNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{captainData?.data.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>{captainData?.data.email}</span>
            </div>
          </div>
          {/* <div className="mt-4 w-full">
            <Link href="/captain/mypage/profile-edit">
              <Button variant="outline" className="w-full cursor-pointer">
                프로필 수정
              </Button>
            </Link>
          </div> */}
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

      <Card className="py-2">
        <div className="px-4 space-y-3 font-medium">
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 mr-2" />
            로그아웃
          </Button>
        </div>
      </Card>
    </div>
  );
}
