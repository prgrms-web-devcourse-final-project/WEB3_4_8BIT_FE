import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReservationCard from "@/app/user/mypage/reservation/components/ReservationCard";

export default function Reservations() {
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
          <ReservationCard
            title="부산 기장 해양호"
            date="2023년 11월 20일"
            time="오전 6:00"
            location="부산 기장군 기장읍 연화리 선착장"
            people={2}
            price={160000}
            status="confirmed"
            image="/images/test.png"
          />
          <ReservationCard
            title="제주 서귀포 블루오션호"
            date="2023년 12월 15일"
            time="오전 5:30"
            location="제주 서귀포시 서귀동 어항"
            people={1}
            price={90000}
            status="confirmed"
            image="/images/test.png"
          />
        </TabsContent>

        <TabsContent value="past" className="mt-6 space-y-4">
          <ReservationCard
            title="강원 속초 블루오션호"
            date="2023년 10월 15일"
            time="오전 5:00"
            location="강원 속초시 영랑동 속초항"
            people={2}
            price={140000}
            status="completed"
            image="/images/test.png"
          />
          <ReservationCard
            title="인천 옹진 황금어장호"
            date="2023년 9월 3일"
            time="오전 6:30"
            location="인천 옹진군 영흥면 선착장"
            people={3}
            price={195000}
            status="completed"
            image="/images/test.png"
          />
          <ReservationCard
            title="부산 기장 해양호"
            date="2023년 8월 22일"
            time="오전 6:00"
            location="부산 기장군 기장읍 연화리 선착장"
            people={1}
            price={80000}
            status="completed"
            image="/images/test.png"
          />
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6 space-y-4">
          <ReservationCard
            title="통영 거제 바다왕호"
            date="2023년 7월 10일"
            time="오전 5:30"
            location="경남 통영시 산양읍 선착장"
            people={2}
            price={160000}
            status="cancelled"
            image="/images/test.png"
            cancellationReason="기상 악화로 인한 출항 취소"
          />
          <ReservationCard
            title="문어 낚시 갑시다~"
            date="2023년 7월 10일"
            time="오전 5:30"
            location="경남 통영시 산양읍 선착장"
            people={2}
            price={160000}
            status="cancelled"
            image="/images/test.png"
            cancellationReason="사용자의 취소"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}