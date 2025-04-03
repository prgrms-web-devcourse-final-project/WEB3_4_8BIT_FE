import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, MapPin, Users, MessageSquare, ThumbsUp, Edit, Trash2, Plus, Search } from "lucide-react"

export default function FishingGroup() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">동출 모집</h1>
        <Button className="bg-cyan-600 hover:bg-cyan-700 gap-2">
          <Plus className="h-4 w-4" /> 새 모집글 작성
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="모집글 검색..." className="pl-9" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">진행 중</TabsTrigger>
          <TabsTrigger value="completed">완료됨</TabsTrigger>
          <TabsTrigger value="cancelled">취소됨</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6 space-y-4">
          <CoFishingCard
            title="이번 주말 기장 방파제 감성돔 낚시 같이 가실 분"
            date="2023년 11월 18일"
            time="오전 5:00 - 오후 2:00"
            location="부산 기장군 기장읍 연화리 방파제"
            participants={4}
            maxParticipants={6}
            comments={8}
            likes={12}
            status="active"
            isAuthor={true}
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-4">
          <CoFishingCard
            title="속초 영랑호 붕어낚시 함께해요"
            date="2023년 10월 8일"
            time="오전 6:00 - 오후 6:00"
            location="강원 속초시 영랑호"
            participants={5}
            maxParticipants={5}
            comments={12}
            likes={18}
            status="completed"
            isAuthor={true}
          />
          <CoFishingCard
            title="서해 갯바위 우럭 낚시"
            date="2023년 9월 16일"
            time="오전 5:30 - 오후 3:00"
            location="인천 옹진군 영흥도 십리포해변"
            participants={3}
            maxParticipants={4}
            comments={6}
            likes={9}
            status="completed"
            isAuthor={true}
          />
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6 space-y-4">
          <CoFishingCard
            title="동해 방어 낚시 동행 구합니다"
            date="2023년 8월 20일"
            time="오전 4:00 - 오후 2:00"
            location="강원 동해시 묵호항"
            participants={2}
            maxParticipants={4}
            comments={3}
            likes={5}
            status="cancelled"
            isAuthor={true}
            cancellationReason="기상 악화로 인한 취소"
          />
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">참여 중인 동출</h2>
        <div className="space-y-4">
          <CoFishingCard
            title="주말 서해 갯바위 우럭 낚시"
            date="2023년 11월 25일"
            time="오전 5:00 - 오후 3:00"
            location="인천 옹진군 덕적도"
            participants={3}
            maxParticipants={5}
            comments={4}
            likes={7}
            status="active"
            isAuthor={false}
          />
          <CoFishingCard
            title="동해 방어시즌 출조 인원 모집"
            date="2023년 12월 10일"
            time="오전 4:30 - 오후 2:00"
            location="강원 속초시 외옹치항"
            participants={6}
            maxParticipants={8}
            comments={10}
            likes={15}
            status="active"
            isAuthor={false}
          />
        </div>
      </div>
    </div>
  )
}

function CoFishingCard({
                         title,
                         date,
                         time,
                         location,
                         participants,
                         maxParticipants,
                         comments,
                         likes,
                         status,
                         isAuthor,
                         cancellationReason,
                       }: {
  title: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  comments: number
  likes: number
  status: "active" | "completed" | "cancelled"
  isAuthor: boolean
  cancellationReason?: string
}) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const statusText = {
    active: "모집 중",
    completed: "완료됨",
    cancelled: "취소됨",
  }

  return (
    <Card>
      <CardContent className="p-6">
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
              <span>
                참여자: {participants}/{maxParticipants}명
              </span>
            </div>

            {cancellationReason && <div className="mt-3 text-sm text-red-600">취소 사유: {cancellationReason}</div>}

            <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{comments}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{likes}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <Badge className={statusColors[status]}>{statusText[status]}</Badge>

            {isAuthor && status === "active" && (
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" /> 수정
                </Button>
                <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" /> 취소
                </Button>
              </div>
            )}

            {!isAuthor && status === "active" && (
              <div className="mt-4">
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                  참여 취소
                </Button>
              </div>
            )}

            {status === "completed" && (
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  조행기 작성
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

