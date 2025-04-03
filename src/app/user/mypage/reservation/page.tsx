import type React from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Phone } from "lucide-react"

export default function Reservations() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">예약 내역</h1>

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
            image="/placeholder.svg?height=200&width=300"
          />
          <ReservationCard
            title="제주 서귀포 블루오션호"
            date="2023년 12월 15일"
            time="오전 5:30"
            location="제주 서귀포시 서귀동 어항"
            people={1}
            price={90000}
            status="pending"
            image="/placeholder.svg?height=200&width=300"
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
            image="/placeholder.svg?height=200&width=300"
          />
          <ReservationCard
            title="인천 옹진 황금어장호"
            date="2023년 9월 3일"
            time="오전 6:30"
            location="인천 옹진군 영흥면 선착장"
            people={3}
            price={195000}
            status="completed"
            image="/placeholder.svg?height=200&width=300"
          />
          <ReservationCard
            title="부산 기장 해양호"
            date="2023년 8월 22일"
            time="오전 6:00"
            location="부산 기장군 기장읍 연화리 선착장"
            people={1}
            price={80000}
            status="completed"
            image="/placeholder.svg?height=200&width=300"
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
            image="/placeholder.svg?height=200&width=300"
            cancellationReason="기상 악화로 인한 출항 취소"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReservationCard({
                           title,
                           date,
                           time,
                           location,
                           people,
                           price,
                           status,
                           image,
                           cancellationReason,
                         }: {
  title: string
  date: string
  time: string
  location: string
  people: number
  price: number
  status: "confirmed" | "pending" | "completed" | "cancelled"
  image: string
  cancellationReason?: string
}) {
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const statusText = {
    confirmed: "예약 확정",
    pending: "승인 대기",
    completed: "이용 완료",
    cancelled: "예약 취소",
  }

  return (
    <Card>
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{date}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{time}</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>{people}명</span>
                <span className="mx-2">•</span>
                <span>₩{price.toLocaleString()}</span>
              </div>

              {cancellationReason && <div className="mt-3 text-sm text-red-600">취소 사유: {cancellationReason}</div>}
            </div>
            <Badge className={statusColors[status]}>{statusText[status]}</Badge>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {status === "confirmed" && (
              <>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" /> 일정 변경
                </Button>
                <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                  예약 취소
                </Button>
              </>
            )}

            {status === "pending" && (
              <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                예약 취소
              </Button>
            )}

            {status === "completed" && (
              <>
                <Button variant="outline" className="gap-2">
                  <Star className="h-4 w-4" /> 리뷰 작성
                </Button>
                <Button variant="outline" className="gap-2">
                  예약 다시하기
                </Button>
              </>
            )}

            <Button variant="ghost" className="gap-2">
              <Phone className="h-4 w-4" /> 문의하기
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

