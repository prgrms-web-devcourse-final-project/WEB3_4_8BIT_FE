import { MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function BoatCard({
  image,
  name,
  location,
  rating,
  reviews,
  price,
  fishTypes,
}: {
  image: string
  name: string
  location: string
  rating: number
  reviews: number
  price: number
  fishTypes: string[]
}) {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-48 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" /> {location}
            </CardDescription>
          </div>
          <div className="flex items-center bg-cyan-50 text-cyan-800 px-2 py-1 rounded">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
            <span className="font-medium">{rating}</span>
            <span className="text-xs text-gray-500 ml-1">({reviews})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {fishTypes.map((fish, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {fish}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">1인 기준</span>
            <p className="text-xl font-bold text-cyan-800">₩{price.toLocaleString()}</p>
          </div>
          <Link href={`/boat-reservation/${name.replace(/\s+/g, "-").toLowerCase()}`}>
            <Button className="bg-cyan-600 hover:bg-cyan-700">예약하기</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}