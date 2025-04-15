"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Calendar, Fish, MapPin, ChevronRight, Sailboat} from "lucide-react"
import Link from "next/link"
import ActivityCard from "@/app/user/mypage/components/ActivityCard";
import ReservationItem from "@/app/user/mypage/components/ReservationItem";
import ActivityItem from "@/app/user/mypage/components/ActivityItem";
import { UserAPI } from "@/lib/api/userAPI"
import { useQuery } from "@tanstack/react-query"
import { UserActivityHistory, UserReservationInfo } from "@/types/user.interface"
import { formatKoreanTime, formatRelativeTime } from "@/utils/formatTime";

const iconMap = {
  FISHING_TRIP_POST : <Calendar className="h-5 w-5 text-cyan-600" />,
  RESERVATION : <Sailboat className="h-5 w-5 text-primary" />,
  FISH_ENCYCLOPEDIA : <Fish className="h-5 w-5 text-amber-500" />,
}

export default function UserMyPage() {
  const { data: allActivity, isSuccess: isAllActivitySuccess } = useQuery<UserActivityHistory[]>({
    queryKey: ['user-activity-histories', 'ALL'],
    queryFn: () => UserAPI.getUserActivityHistories('ALL'),
  })

  const { data: upcomingConfirmed = [], isSuccess: isUpcomingConfirmedSuccess } = useQuery<UserReservationInfo[]>({
    queryKey: ['userMyPageReservations', 'upcoming', 'confirmed'],
    queryFn: () => UserAPI.getUserBoatReservation(true, true),
  });

  const {data : reservationCount, isSuccess : isReservationCountSuccess} = useQuery<number>({
    queryKey : ['userMyPageReservationCount'],
    queryFn : () => UserAPI.getUserReservationCount(),
  })

  const {data : fishEncyclopediaCount, isSuccess : isFishEncyclopediaCountSuccess} = useQuery<number>({
    queryKey : ['userMyPageFishEncyclopediaCount'],
    queryFn : () => UserAPI.getUserFishEncyclopediaCount(),
  })

  const {data : shipFishingPostCount, isSuccess : isShipFishingPostCountSuccess} = useQuery<number>({
    queryKey : ['userMyPageShipFishingPostCount'],
    queryFn : () => UserAPI.getUserShipFishingPostLikeCount(),
  })


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">마이페이지</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isReservationCountSuccess && (
          <ActivityCard
            title="예약 내역"
            value={reservationCount+'회'}
            description="선상 낚시 예약"
            icon={<Sailboat className="h-5 w-5 text-primary" />}
          />
        )}
        {isFishEncyclopediaCountSuccess && ( 
          <ActivityCard
            title="어류 도감"
            value={fishEncyclopediaCount+'종'}
            description="수집한 어종"
            icon={<Fish className="h-5 w-5 text-amber-500" />}
          />
        )}
        {isShipFishingPostCountSuccess && (
          <ActivityCard
            title="선상 낚시"
            value={shipFishingPostCount+'곳'}
            description="좋아요한 선상 낚시 리스트"
            icon={<MapPin className="h-5 w-5 text-red-500"/>}
          />
        )}
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
              {isAllActivitySuccess && allActivity.map((activity, idx) => {
                return (
                  <ActivityItem
                    key={`activity-${idx}`}
                    icon={iconMap[activity.activityType]}
                    title={activity.activityTypeKr}
                    description={activity.description}
                    time={formatRelativeTime(activity.createdAt)}
                    type={activity.activityType}
                  />
                )
              })}
            </TabsContent>
            <TabsContent value="reservations" className="mt-4 space-y-4">
              {isAllActivitySuccess && allActivity.map((activity, idx) => {
                if(activity.activityType === 'RESERVATION') {
                  return (
                    <ActivityItem
                      key={`reservation-${idx}`}
                      title={activity.activityTypeKr}
                      description={activity.description}
                      time={formatRelativeTime(activity.createdAt)}
                      type={activity.activityType}
                      icon={iconMap[activity.activityType]}
                    />
                  )
                }
              })}
            </TabsContent>
            <TabsContent value="community" className="mt-4 space-y-4">
              {isAllActivitySuccess && allActivity.map((activity, idx) => {
                if(activity.activityType === 'FISHING_TRIP_POST') {
                  return (
                    <ActivityItem
                      key={`fishing-trip-post-${idx}`}
                      title={activity.activityTypeKr}
                      description={activity.description}
                      time={formatRelativeTime(activity.createdAt)}
                      type={activity.activityType}
                      icon={iconMap[activity.activityType]}
                    />
                  )
                }
              })}
            </TabsContent>
            <TabsContent value="logs" className="mt-4 space-y-4">
              {isAllActivitySuccess && allActivity.map((activity, idx) => {
                if(activity.activityType === 'FISH_ENCYCLOPEDIA') {
                  return (
                    <ActivityItem
                      key={`fish-encyclopedia-${idx}`}
                      title={activity.activityTypeKr}
                      description={activity.description}
                      time={formatRelativeTime(activity.createdAt)}
                      type={activity.activityType}
                      icon={iconMap[activity.activityType]}
                    />
                  )
                }
              })}
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
            <Button variant="ghost" size="sm" className="gap-1 cursor-pointer">
              전체보기 <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isUpcomingConfirmedSuccess && upcomingConfirmed.map((reservation, idx) => (
              <ReservationItem
                key={`reservation-${idx}`}
                title={reservation.subject}
                date={reservation.reservationDate}
                time={formatKoreanTime(reservation.startTime)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}