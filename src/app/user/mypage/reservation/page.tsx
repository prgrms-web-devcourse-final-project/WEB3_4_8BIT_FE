"use client"

import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReservationCard from "@/app/user/mypage/reservation/components/ReservationCard";
import {useQueryClient, useMutation, useQuery} from "@tanstack/react-query";
import { UserAPI } from "@/lib/api/userAPI";
import {UserReservationInfo} from "@/types/user.interface";

export default function Reservations() {
  const { data: upcomingConfirmed = [], isSuccess: isUpcomingConfirmedSuccess } = useQuery<UserReservationInfo[]>({
    queryKey: ['userMyPageReservations', 'upcoming', 'confirmed'],
    queryFn: () => UserAPI.getUserBoatReservation(true, true),
  });

  const { data: pastConfirmed = [], isSuccess: isPastConfirmedSuccess } = useQuery<UserReservationInfo[]>({
    queryKey: ['userMyPageReservations', 'past', 'confirmed'],
    queryFn: () => UserAPI.getUserBoatReservation(false, true),
  });

  const { data: upcomingCancelled = [], isSuccess: isUpcomingCancelledSuccess } = useQuery<UserReservationInfo[]>({
    queryKey: ['userMyPageReservations', 'upcoming', 'cancelled'],
    queryFn: () => UserAPI.getUserBoatReservation(true, false),
  });

  const { data: pastCancelled = [], isSuccess: isPastCancelledSuccess } = useQuery<UserReservationInfo[]>({
    queryKey: ['userMyPageReservations', 'past', 'cancelled'],
    queryFn: () => UserAPI.getUserBoatReservation(false, false),
  });

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const isMorning = hour < 12;
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `오${isMorning ? '전' : '후'} ${displayHour}:${minute.toString().padStart(2, '0')}`;
  };

  const getImage = (info: UserReservationInfo) => {
    return info.fileUrlList?.[0] || "/images/test.png";
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn : (reservationId : number) => {
      return UserAPI.deleteUserBoatReservation(reservationId);
    },
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ['userMyPageReservations'] })
    }
  })

  const handleCancel = (reservationId: number) => {
    mutation.mutate(reservationId);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">예약 내역</h1>
      <div className="text-gray-30">나의 선상 낚시 예약 내역을 확인해보세요.</div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">예정된 예약</TabsTrigger>
          <TabsTrigger value="past">지난 예약</TabsTrigger>
          <TabsTrigger value="cancelled">취소된 예약</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6 space-y-4">
          {isUpcomingConfirmedSuccess &&
            upcomingConfirmed.map((item) => (
              <ReservationCard
                key={item.reservationId}
                postId={item.shipFishingPostId}
                reservationId={item.reservationId}
                title={item.subject}
                date={formatDate(item.reservationDate)}
                time={formatTime(item.startTime)}
                location={item.location}
                people={item.guestCount}
                price={item.totalPrice}
                status="confirmed"
                image={getImage(item)}
                handleCancel={handleCancel}
              />
            ))}
        </TabsContent>

        <TabsContent value="past" className="mt-6 space-y-4">
          {isPastConfirmedSuccess &&
            pastConfirmed.map((item) => (
              <ReservationCard
                key={item.reservationId}
                postId={item.shipFishingPostId}
                reservationId={item.reservationId}
                title={item.subject}
                date={formatDate(item.reservationDate)}
                time={formatTime(item.startTime)}
                location={item.location}
                people={item.guestCount}
                price={item.totalPrice}
                status="completed"
                image={getImage(item)}
                handleCancel={handleCancel}
              />
            ))}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6 space-y-4">
          {isUpcomingCancelledSuccess &&
            upcomingCancelled.map((item) => (
              <ReservationCard
                key={item.reservationId}
                postId={item.shipFishingPostId}
                reservationId={item.reservationId}
                title={item.subject}
                date={formatDate(item.reservationDate)}
                time={formatTime(item.startTime)}
                location={item.location}
                people={item.guestCount}
                price={item.totalPrice}
                status="cancelled"
                image={getImage(item)}
                cancellationReason="취소된 예약"
                handleCancel={handleCancel}
              />
            ))}
          {isPastCancelledSuccess &&
            pastCancelled.map((item) => (
              // TODO props를 객체로 해서 추후 리팩토링
              <ReservationCard
                key={item.reservationId}
                postId={item.shipFishingPostId}
                reservationId={item.reservationId}
                title={item.subject}
                date={formatDate(item.reservationDate)}
                time={formatTime(item.startTime)}
                location={item.location}
                people={item.guestCount}
                price={item.totalPrice}
                status="cancelled"
                image={getImage(item)}
                cancellationReason="취소된 예약"
                handleCancel={handleCancel}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}