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
  Settings,
  Phone,
  Mail,
  BadgeCheck,
} from "lucide-react";

const navItems = [
  { name: "대시보드", href: "/captain/mypage", icon: LayoutDashboard },
  { name: "예약 관리", href: "/captain/mypage/reservation", icon: Calendar },
  { name: "게시글 관리", href: "/captain/posts", icon: ClipboardList },
  { name: "선박 정보", href: "/captain/ships", icon: Ship },
];

export function CaptainSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-6 max-w-sm mx-auto w-full">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt="Captain"
            />
            <AvatarFallback>선장님</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">김선장</h2>
          <p className="text-sm text-gray-500 mt-1">선장님</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
            <BadgeCheck className="h-4 w-4 text-green-500" />
            <span>12345678</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>010-1234-5678</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>test@email.com</span>
          </div>
          <div className="mt-4 w-full">
            <Link href="/captain/mypage/edit">
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
            className="w-full justify-start cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 mr-2" />
            로그아웃
          </Button>
          <Button
            variant="ghost"
            className="w-full cursor-pointer justify-start hover:bg-gray-80"
          >
            <Settings className="h-5 w-5 mr-2 text-gray-50" />
            회원탈퇴
          </Button>
        </div>
      </Card>
    </div>
  );
}
