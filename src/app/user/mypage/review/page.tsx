import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Edit, Trash2, Search, ThumbsUp, MessageSquare } from "lucide-react"

export default function Review() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">내 리뷰</h1>
        <Badge variant="outline" className="px-3 py-1">
          총 8개 리뷰
        </Badge>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="리뷰 검색..." className="pl-9" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">전체 리뷰</TabsTrigger>
          <TabsTrigger value="boats">선상 낚시</TabsTrigger>
          <TabsTrigger value="spots">낚시 포인트</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          <ReviewCard
            title="해양호"
            type="boat"
            date="2023년 10월 15일"
            rating={5}
            content="정말 좋은 경험이었습니다. 선장님이 친절하시고 물고기도 많이 잡았어요. 특히 참돔 대물을 낚아서 기분이 좋았습니다. 다음에도 꼭 이용할 예정입니다."
            location="부산 기장군"
            likes={24}
            comments={8}
            images={["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"]}
          />
          <ReviewCard
            title="기장 학리 방파제"
            type="spot"
            date="2023년 9월 3일"
            rating={4}
            content="감성돔 조황이 좋았습니다. 주차 공간이 넉넉하고 화장실도 깨끗해서 좋았어요. 다만 주말에는 사람이 많아 자리 잡기가 조금 힘들었습니다."
            location="부산 기장군"
            likes={15}
            comments={5}
            images={["/placeholder.svg?height=100&width=100"]}
          />
          <ReviewCard
            title="블루오션호"
            type="boat"
            date="2023년 8월 22일"
            rating={3}
            content="시설은 깨끗하고 좋았으나 조황이 생각보다 좋지 않았습니다. 선장님은 친절하셨지만 물고기가 잘 안 잡혀서 아쉬웠어요."
            location="강원 속초시"
            likes={8}
            comments={3}
            images={[]}
          />
        </TabsContent>

        <TabsContent value="boats" className="mt-6 space-y-4">
          <ReviewCard
            title="해양호"
            type="boat"
            date="2023년 10월 15일"
            rating={5}
            content="정말 좋은 경험이었습니다. 선장님이 친절하시고 물고기도 많이 잡았어요. 특히 참돔 대물을 낚아서 기분이 좋았습니다. 다음에도 꼭 이용할 예정입니다."
            location="부산 기장군"
            likes={24}
            comments={8}
            images={["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"]}
          />
          <ReviewCard
            title="블루오션호"
            type="boat"
            date="2023년 8월 22일"
            rating={3}
            content="시설은 깨끗하고 좋았으나 조황이 생각보다 좋지 않았습니다. 선장님은 친절하셨지만 물고기가 잘 안 잡혀서 아쉬웠어요."
            location="강원 속초시"
            likes={8}
            comments={3}
            images={[]}
          />
        </TabsContent>

        <TabsContent value="spots" className="mt-6 space-y-4">
          <ReviewCard
            title="기장 학리 방파제"
            type="spot"
            date="2023년 9월 3일"
            rating={4}
            content="감성돔 조황이 좋았습니다. 주차 공간이 넉넉하고 화장실도 깨끗해서 좋았어요. 다만 주말에는 사람이 많아 자리 잡기가 조금 힘들었습니다."
            location="부산 기장군"
            likes={15}
            comments={5}
            images={["/placeholder.svg?height=100&width=100"]}
          />
          <ReviewCard
            title="속초 영랑호"
            type="spot"
            date="2023년 7월 15일"
            rating={5}
            content="민물낚시 포인트로 최고입니다. 붕어와 잉어가 잘 잡히고 주변 경치도 좋아요. 화장실과 편의점도 가까워서 편리했습니다."
            location="강원 속초시"
            likes={18}
            comments={7}
            images={["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"]}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReviewCard({
                      title,
                      type,
                      date,
                      rating,
                      content,
                      location,
                      likes,
                      comments,
                      images,
                    }: {
  title: string
  type: "boat" | "spot"
  date: string
  rating: number
  content: string
  location: string
  likes: number
  comments: number
  images: string[]
}) {
  const typeText = type === "boat" ? "선상 낚시" : "낚시 포인트"
  const typeColor = type === "boat" ? "bg-cyan-100 text-cyan-800" : "bg-green-100 text-green-800"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="text-xl font-bold">{title}</h3>
              <Badge className={`ml-2 ${typeColor}`}>{typeText}</Badge>
            </div>
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
              ))}
              <span className="ml-2 text-sm text-gray-500">{date}</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>

            <p className="mt-4 text-gray-700">{content}</p>

            {images.length > 0 && (
              <div className="mt-4 flex space-x-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`리뷰 이미지 ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{likes}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{comments}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" /> 수정
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="h-4 w-4" /> 삭제
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

