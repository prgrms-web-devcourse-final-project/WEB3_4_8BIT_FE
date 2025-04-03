import {Card} from "@/components/ui/card";
import {Ruler, Fish} from "lucide-react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function MyPageFishCard({
  image,
  name,
  count,
  largestSize,
}: {
  image: string
  name: string
  count: number
  largestSize: number
}) {

  // 추후 image 변수를 Image 태그에 넣으면 됩니다

  return (
    <Card className="overflow-hidden hover:shadow-md py-0 gap-0 transition-shadow">
      <div className="relative w-full aspect-[291/221]">
        <Image
          src="/images/test.png"
          alt={name}
          fill
          className="object-cover rounded-t-md"
        />
      </div>
      <div className="p-3">
        <div className="ml-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">{name}</h3>
            {count === 0 ? (
              <Button className="cursor-pointer">
                도감에 추가하기
              </Button>
            ) : (
              <Button className="cursor-pointer">
                갱신하기
              </Button>
            )}
          </div>
          <div className="mt-2 space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Ruler size={18} strokeWidth={1.5} />
              <span>최대 길이: {largestSize}cm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fish size={18} strokeWidth={1.5} />
              <span>잡은 횟수: {count}회</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}