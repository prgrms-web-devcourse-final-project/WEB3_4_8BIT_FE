import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Star, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Wishlist() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">위시리스트</h1>
        <Badge variant="outline" className="px-3 py-1">
          총 5개 항목
        </Badge>
      </div>

      <Tabs defaultValue="boats">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="boats" className="cursor-pointer">선상 낚시</TabsTrigger>
          <TabsTrigger value="spots" className="cursor-pointer">동출 모집</TabsTrigger>
        </TabsList>

        <TabsContent value="boats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BoatWishlistCard
              title="제주 서귀포 블루오션호"
              location="제주 서귀포시"
              rating={4.7}
              reviews={112}
              price={90000}
              fishTypes={["다금바리", "참돔", "방어"]}
              image="/placeholder.svg?height=200&width=300"
            />
            <BoatWishlistCard
              title="통영 거제 바다왕호"
              location="경남 통영시"
              rating={4.5}
              reviews={87}
              price={85000}
              fishTypes={["감성돔", "참돔", "볼락"]}
              image="/placeholder.svg?height=200&width=300"
            />
            <BoatWishlistCard
              title="포항 구룡포 동해호"
              location="경북 포항시"
              rating={4.6}
              reviews={95}
              price={75000}
              fishTypes={["가자미", "도다리", "광어"]}
              image="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>

        <TabsContent value="spots" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpotWishlistCard
              title="기장 학리 방파제"
              location="부산 기장군"
              fishTypes={["감성돔", "볼락", "농어"]}
              facilities={["주차장", "화장실", "낚시점"]}
              bestSeason="봄-가을"
              image="/placeholder.svg?height=200&width=300"
            />
            <SpotWishlistCard
              title="속초 영랑호"
              location="강원 속초시"
              fishTypes={["붕어", "잉어", "메기"]}
              facilities={["주차장", "화장실", "매점"]}
              bestSeason="여름"
              image="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BoatWishlistCard({
                            title,
                            location,
                            rating,
                            reviews,
                            price,
                            fishTypes,
                            image,
                          }: {
  title: string
  location: string
  rating: number
  reviews: number
  price: number
  fishTypes: string[]
  image: string
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex items-center bg-amber-50 text-amber-800 px-2 py-1 rounded">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
            <span className="font-medium">{rating}</span>
            <span className="text-xs text-gray-500 ml-1">({reviews})</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {fishTypes.map((fish, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {fish}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-sm text-gray-500">1인 기준</span>
              <p className="text-lg font-bold text-cyan-800">₩{price.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/boat-reservation/${title.replace(/\s+/g, "-").toLowerCase()}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <ExternalLink className="h-4 w-4" /> 상세보기
                </Button>
              </Link>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                예약하기
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SpotWishlistCard({
                            title,
                            location,
                            fishTypes,
                            facilities,
                            bestSeason,
                            image,
                          }: {
  title: string
  location: string
  fishTypes: string[]
  facilities: string[]
  bestSeason: string
  image: string
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>

        <div className="mt-3 space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">주요 어종</p>
            <div className="flex flex-wrap gap-2">
              {fishTypes.map((fish, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {fish}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">편의 시설</p>
            <div className="flex flex-wrap gap-2">
              {facilities.map((facility, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700">
                  {facility}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-500">최적 시기:</span>
            <span className="text-sm ml-1">{bestSeason}</span>
          </div>

          <div className="flex justify-end">
            <Link href={`/fishing-map?spot=${title.replace(/\s+/g, "-").toLowerCase()}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="h-4 w-4" /> 지도에서 보기
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

