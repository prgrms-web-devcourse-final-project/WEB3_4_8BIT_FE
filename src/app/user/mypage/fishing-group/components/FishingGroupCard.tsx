import {Card, CardContent} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  ContactRound,
  Edit,
  MapPin,
  MessageSquare,
  ThumbsUp,
  Trash2,
  Users,
  Info
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import type React from "react";

export default function FishingGroupCard({
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
}: {
  title: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  comments: number
  likes: number
  status: "active" | "completed"
  isAuthor: boolean
}) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
  }

  const statusText = {
    active: "모집 중",
    completed: "완료됨",
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

          <div className="flex flex-col items-end self-stretch">
            <Badge className={statusColors[status]}>{statusText[status]}</Badge>

            <div className="mt-auto">
              {isAuthor && status === "active" && (
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer">
                    <Trash2 className="h-4 w-4" /> 취소
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 cursor-pointer">
                    <Edit className="h-4 w-4" /> 수정
                  </Button>
                  <Button size="sm" className="bg-primary cursor-pointer">
                    <ContactRound className="h-4 w-4"/>신청 현황
                  </Button>
                </div>
              )}

              {!isAuthor && status === "active" && (
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="gap-1 cursor-pointer">
                    <Info className="h-4 w-4" />상세 보기
                  </Button>
                  <Button size="sm" className="bg-primary cursor-pointer">
                    <ContactRound className="h-4 w-4"/>신청 현황
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
