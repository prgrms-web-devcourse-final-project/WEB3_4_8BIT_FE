"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Fish, Calendar, Users, Star, Settings, LogOut, Heart } from "lucide-react"

const navItems = [
  { name: "홈", href: "/user/mypage", icon: Home },
  { name: "어류 도감", href: "/user/mypage/fish-encyclopedia", icon: Fish },
  { name: "예약 내역", href: "/user/mypage/reservation", icon: Calendar },
  { name: "내 좋아요", href: "/user/mypage/likes", icon: Heart },
  { name: "동출 모집", href: "/user/mypage/fishing-group", icon: Users },
  { name: "내 리뷰", href: "/user/mypage/review", icon: Star },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
            <AvatarFallback>홍길동</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">홍길동</h2>
          <p className="text-sm text-gray-500 mt-1">일반 회원</p>
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
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 font-medium rounded-md transition-colors ${
                  isActive ? "bg-cyan-50 text-primary" : "text-gray-40 hover:bg-gray-80"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-40"}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </Card>

      <Card>
        <div className="p-4 space-y-3 font-medium">
          <Button variant="ghost" className="w-full justify-start cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5 mr-2" />
            로그아웃
          </Button>
          <Button variant="ghost" className="w-full cursor-pointer justify-start hover:bg-gray-80">
            <Settings className="h-5 w-5 mr-2 text-gray-50" />
            회원탈퇴
          </Button>
        </div>
      </Card>
    </div>
  )
}

