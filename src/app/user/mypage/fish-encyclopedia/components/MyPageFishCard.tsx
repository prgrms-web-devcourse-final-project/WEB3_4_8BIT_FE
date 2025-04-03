import {Card} from "@/components/ui/card";
import {Ruler, Fish} from "lucide-react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import FishRegisterModal from "@/app/user/mypage/fish-encyclopedia/components/FishRegisterModal";
import {FishInfo} from "@/types/Fish.types";
import FishUpdateModal from "@/app/user/mypage/fish-encyclopedia/components/FishUpdateModal";

export default function MyPageFishCard({
  image,
  fishName,
  count,
  largestSize,
}: FishInfo) {

  // 추후 image 변수를 Image 태그에 넣으면 됩니다

  return (
    <Card className="overflow-hidden hover:shadow-md py-0 gap-0 transition-shadow">
      <div className="relative w-full aspect-[291/221]">
        <Image
          src="/images/test.png"
          alt={fishName}
          fill
          className="object-cover rounded-t-md"
        />
      </div>
      <div className="p-3">
        <div className="ml-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">{fishName}</h3>
            {count === 0 ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="cursor-pointer">
                    도감에 추가하기
                  </Button>
                </DialogTrigger>
                <FishRegisterModal/>
              </Dialog>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="cursor-pointer">
                    도감 조회하기
                  </Button>
                </DialogTrigger>
                <FishUpdateModal
                  description={"농어는 농어목 농어과의 바닷물고기로, 한국, 일본, 중국 등 동아시아 연안에 분포합니다. 몸은 길쭉한 방추형이며 은백색을 띱니다. 연안, 하구, 만 등에 서식하며 육식성 어류입니다."}
                  season={"6월 ~ 10월"}
                  living={"연안, 하구, 만, 수심 0~50m"}
                  catchPlaces={["부산 기장","학리 방파제","인천 앞바다"]}
                  image={"/images/test.png"}
                  fishName={"농어"}
                  count={10}
                  largestSize={48}
                />
              </Dialog>
            )}
          </div>
          <div className="mt-2 space-y-1 text-sm font-medium text-gray-40">
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