import { Badge } from "@/components/ui/badge"
import MyPageFishCard from "@/app/user/mypage/fish-encyclopedia/components/MyPageFishCard";

export default function FishEncyclopedia() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">내 어류 도감</h1>
        <Badge variant="outline" className="px-3 py-1">
          총 8종 수집
        </Badge>
      </div>

      <div className="text-gray-30">잡은 물고기를 등록해 어류 도감에 추가해보세요.</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MyPageFishCard
          image="/placeholder.svg?height=150&width=150"
          fishName="참돔"
          count={0}
          largestSize={52}
        />
        <MyPageFishCard
          image="/placeholder.svg?height=150&width=150"
          fishName="감성돔"
          count={5}
          largestSize={42}
        />
        <MyPageFishCard
          image="/placeholder.svg?height=150&width=150"
          fishName="농어"
          count={2}
          largestSize={45}
        />
        <MyPageFishCard
          image="/placeholder.svg?height=150&width=150"
          fishName="광어"
          count={4}
          largestSize={48}
        />
        <MyPageFishCard
          image="/placeholder.svg?height=150&width=150"
          fishName="볼락"
          count={6}
          largestSize={32}
        />
        <MyPageFishCard
          image="/placeholder.svg?height=150&width=150"
          fishName="다금바리"
          count={0}
          largestSize={48}
        />
      </div>
    </div>
  )
}