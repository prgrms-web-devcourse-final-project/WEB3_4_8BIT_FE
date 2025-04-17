"use client"

import {Card} from "@/components/ui/card";
import {Ruler, Fish, Plus, Search} from "lucide-react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import FishRegisterModal from "@/app/user/mypage/fish-encyclopedia/components/FishRegisterModal";
import {FishInfo} from "@/types/fish.interface";
import FishUpdateModal from "@/app/user/mypage/fish-encyclopedia/components/FishUpdateModal";
import React, {useState} from "react";
import {Separator} from "@/components/ui/separator";

export default function MyPageFishCard({
  fishEncyclopediaId,
  fileUrl,
  fishName,
  totalCount,
  bestLength,
}: FishInfo) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-md py-0 gap-0 transition-shadow">
      <div className="grid items-center justify-center w-full aspect-[291/200]">
        <Image
          src={fileUrl || '/images/empty.png'}
          alt={fishName}
          width={150}
          height={80}
          style={!totalCount ? { filter: "grayscale(100%) brightness(0.3) contrast(0)" } : {}}
        />
      </div>
      <Separator/>
      <div className="p-3">
        <div className="ml-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">{fishName}</h3>
            {totalCount ? (
              <Button className="cursor-pointer" onClick={() => setIsUpdateModalOpen(true)}>
                <Search />
                도감 조회
              </Button>
            ) : (
              <Button className="cursor-pointer" onClick={() => setIsRegisterModalOpen(true)}>
                <Plus />
                도감 추가
              </Button>
            )}
          </div>
          <div className="mt-2 space-y-1 text-sm font-medium text-gray-40">
            <div className="flex items-center gap-1.5">
              <Ruler size={18} strokeWidth={1.5} />
              <span>최대 길이: {bestLength || 0}cm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fish size={18} strokeWidth={1.5} />
              <span>잡은 횟수: {totalCount || 0}회</span>
            </div>
          </div>
        </div>
      </div>

      {isRegisterModalOpen && (
        <FishRegisterModal
          fishName={fishName}
          fishEncyclopediaId={fishEncyclopediaId}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
        />
      )}

      {isUpdateModalOpen && (
        <FishUpdateModal
          fishEncyclopediaId={fishEncyclopediaId}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
          fileUrl={fileUrl}
          fishName={fishName}
          totalCount={totalCount}
          bestLength={bestLength}
        />
      )}
    </Card>
  )
}