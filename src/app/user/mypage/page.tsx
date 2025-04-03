import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Calendar, Fish, MapPin, Star, Users, ChevronRight, Sailboat, Bookmark} from "lucide-react"
import Link from "next/link"
import ActivityCard from "@/app/user/mypage/components/ActivityCard";
import ReservationItem from "@/app/user/mypage/components/ReservationItem";
import ActivityItem from "@/app/user/mypage/components/ActivityItem";
import FishItem from "@/app/user/mypage/components/FishItem";

export default function UserMyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">마이페이지</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActivityCard
          title="예약 내역"
          value="12회"
          description="선상 낚시 예약"
          icon={<Sailboat className="h-5 w-5 text-primary" />}
        />
        <ActivityCard
          title="어류 도감"
          value="28종"
          description="수집한 어종"
          icon={<Fish className="h-5 w-5 text-amber-500" />}
        />
        <ActivityCard
          title="선상 낚시"
          value="8곳"
          description="좋아요한 선상 낚시 리스트"
          icon={<MapPin className="h-5 w-5 text-red-500" />}
        />
      </div>

      {/* 최근 활동 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
          <CardDescription>지난 30일 동안의 활동 내역입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="cursor-pointer">전체</TabsTrigger>
              <TabsTrigger value="reservations" className="cursor-pointer">선상 낚시 예약</TabsTrigger>
              <TabsTrigger value="community" className="cursor-pointer">동출 모집</TabsTrigger>
              <TabsTrigger value="logs" className="cursor-pointer">어류 도감</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4 space-y-4">
              <ActivityItem
                icon={<Calendar className="h-5 w-5 text-cyan-600" />}
                title="선상 낚시 예약"
                description="부산 기장 해양호 - 11월 20일"
                time="3일 전"
                type="reservation"
              />
              <ActivityItem
                icon={<Users className="h-5 w-5 text-indigo-600" />}
                title="동출 모집글 작성"
                description="이번 주말 기장 방파제 감성돔 낚시 같이 가실 분"
                time="5일 전"
                type="fishinggroup"
              />
              <ActivityItem
                icon={<Fish className="h-5 w-5 text-green-600" />}
                title="낚시 기록 추가"
                description="감성돔 42cm - 부산 기장 학리"
                time="1주일 전"
                type="fish"
              />
              <ActivityItem
                icon={<Star className="h-5 w-5 text-amber-500" />}
                title="리뷰 작성"
                description="해양호 - ★★★★★"
                time="2주일 전"
                type="review"
              />
              <ActivityItem
                icon={<Bookmark className="h-5 w-5 text-purple-600" />}
                title="위시리스트 추가"
                description="제주 서귀포 블루오션호"
                time="3주일 전"
                type="wishlist"
              />
            </TabsContent>
            <TabsContent value="reservations" className="mt-4 space-y-4">
              <ActivityItem
                icon={<Calendar className="h-5 w-5 text-cyan-600" />}
                title="선상 낚시 예약"
                description="부산 기장 해양호 - 11월 20일"
                time="3일 전"
                type="reservation"
              />
              <ActivityItem
                icon={<Star className="h-5 w-5 text-amber-500" />}
                title="리뷰 작성"
                description="해양호 - ★★★★★"
                time="2주일 전"
                type="review"
              />
              <ActivityItem
                icon={<Bookmark className="h-5 w-5 text-purple-600" />}
                title="위시리스트 추가"
                description="제주 서귀포 블루오션호"
                time="3주일 전"
                type="wishlist"
              />
            </TabsContent>
            <TabsContent value="community" className="mt-4 space-y-4">
              <ActivityItem
                icon={<Users className="h-5 w-5 text-indigo-600" />}
                title="동출 모집글 작성"
                description="이번 주말 기장 방파제 감성돔 낚시 같이 가실 분"
                time="5일 전"
                type="fishinggroup"
              />
            </TabsContent>
            <TabsContent value="logs" className="mt-4 space-y-4">
              <ActivityItem
                icon={<Fish className="h-5 w-5 text-green-600" />}
                title="낚시 기록 추가"
                description="감성돔 42cm - 부산 기장 학리"
                time="1주일 전"
                type="fish"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/*예정된 예약*/}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>예정된 예약</CardTitle>
            <CardDescription>다가오는 낚시 일정입니다.</CardDescription>
          </div>
          <Link href="/user/mypage/reservation">
            <Button variant="ghost" size="sm" className="gap-1">
              전체보기 <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ReservationItem title="부산 기장 해양호" date="2023년 11월 20일" time="오전 6:00"/>
            <ReservationItem title="제주 서귀포 블루오션호" date="2023년 12월 15일" time="오전 5:30"/>
          </div>
        </CardContent>
      </Card>

      {/* 어류 도감 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>최근 어류 도감</CardTitle>
            <CardDescription>최근에 잡은 물고기 기록입니다.</CardDescription>
          </div>
          <Link href="/user/mypage/fish-encyclopedia">
            <Button variant="ghost" size="sm" className="gap-1">
              전체보기 <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FishItem
              image="/placeholder.svg?height=100&width=100"
              name="감성돔"
              size={42}
              location="부산 기장 학리"
              date="2023년 11월 8일"
            />
            <FishItem
              image="/placeholder.svg?height=100&width=100"
              name="참돔"
              size={52}
              location="제주 서귀포"
              date="2023년 10월 25일"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}