import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Fish} from "lucide-react";
import type React from "react";

export default function TabFish(){
  // 물고기 정보
  const fishTypes = [
    { name: "참돔", season: "봄-가을", probability: "높음", image: "/placeholder.svg?height=100&width=100" },
    { name: "감성돔", season: "봄-가을", probability: "높음", image: "/placeholder.svg?height=100&width=100" },
    { name: "농어", season: "여름-가을", probability: "중간", image: "/placeholder.svg?height=100&width=100" },
    { name: "볼락", season: "가을-겨울", probability: "높음", image: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>이런 물고기를 잡을 수 있어요</CardTitle>
        <CardDescription>계절과 날씨에 따라 잡히는 어종이 달라질 수 있습니다</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fishTypes.map((fish, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 rounded-lg border border-gray-200">
              <img
                src={fish.image || "/placeholder.svg"}
                alt={fish.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h4 className="font-medium text-lg">{fish.name}</h4>
                <div className="text-sm text-gray-500 mt-1">
                  <p>제철: {fish.season}</p>
                  <p>확률: {fish.probability}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-cyan-50 p-4 rounded-lg">
          <h4 className="font-medium flex items-center text-cyan-800">
            <Fish className="h-5 w-5 mr-2" /> 이달의 추천 어종
          </h4>
          <p className="mt-2 text-cyan-800">
            11월은 참돔과 감성돔의 조황이 좋은 시기입니다. 특히 아침 시간대에 크릴 미끼를 사용하면 대물을
            낚을 확률이 높습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}