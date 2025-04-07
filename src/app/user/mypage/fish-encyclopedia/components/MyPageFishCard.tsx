"use client"

import {Card} from "@/components/ui/card";
import {Ruler, Fish, Plus, Search} from "lucide-react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import FishRegisterModal from "@/app/user/mypage/fish-encyclopedia/components/FishRegisterModal";
import {FishInfo} from "@/types/fish.interface";
import FishUpdateModal from "@/app/user/mypage/fish-encyclopedia/components/FishUpdateModal";
import React, {useState} from "react";

export default function MyPageFishCard({
  image,
  fishName,
  count,
  largestSize,
}: FishInfo) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

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
              <Button className="cursor-pointer" onClick={() => setIsRegisterModalOpen(true)}>
                <Plus />
                도감 추가
              </Button>
            ) : (
              <Button className="cursor-pointer" onClick={() => setIsUpdateModalOpen(true)}>
                <Search />
                도감 조회
              </Button>
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

      {isRegisterModalOpen && (
        <FishRegisterModal
          setIsRegisterModalOpen={setIsRegisterModalOpen}
        />
      )}

      {isUpdateModalOpen && (
        <FishUpdateModal
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
          description={"농어는 농어목 농어과의 바닷물고기로, 한국, 일본, 중국 등 동아시아 연안에 분포합니다. 몸은 길쭉한 방추형이며 은백색을 띱니다. 연안, 하구, 만 등에 서식하며 육식성 어류입니다."}
          season={"6월 ~ 10월"}
          living={"연안, 하구, 만, 수심 0~50m"}
          catchPlaces={[
            { date : '2024-04-11', placeName: "부산 기장", point: "부산 포인트", largestSize: 250, count: 50 },
            { date : '2024-03-14', placeName: "학리 방파제", point: "학리 포인트", largestSize: 260, count: 40 },
            { date : '2023-05-19', placeName: "인천 앞바다", point: "인천 포인트", largestSize: 270, count: 60 },
          ]}
          image={"/images/test.png"}
          fishName={"농어"}
          count={10}
          largestSize={48}
        />
      )}
    </Card>
  )
}