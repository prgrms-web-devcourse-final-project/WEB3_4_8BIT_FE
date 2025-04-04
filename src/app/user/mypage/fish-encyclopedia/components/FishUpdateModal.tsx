"use client"

import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {FishInfo} from "@/types/Fish.types";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";

interface FishUpdateProps extends FishInfo {
  description: string
  season : string
  living : string
  catchPlaces : string[]
}

export default function FishUpdateModal({
  fishName,
  image,
  description,
  largestSize,
  count,
  season,
  living,
  catchPlaces,
} : FishUpdateProps) {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{fishName}</DialogTitle>
        <DialogDescription>사용자의 {fishName}에 대한 도감입니다.</DialogDescription>
      </DialogHeader>
      <div className="grid grid-flow-col grid-rows-[2fr_1fr_1fr] gap-4 h-[270px]">
        <Image
          className="w-[270px] h-[270px] object-cover row-span-3"
          src={image}
          alt={"물고기 이미지"}
          height={270}
          width={270}
        />
        <div>
          <div className="font-semibold text-xl">설명</div>
          {description}
        </div>
        <div className="flex">
          <div>
            최대 길이
            <div>{largestSize}cm</div>
          </div>
          <div>
            총 마릿수
            <div>{count}마리</div>
          </div>
        </div>
        <div>
          잘 잡히는 시기
          <div>{season}</div>
        </div>
      </div>
      <Separator className="bg-gray-60"/>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" className="cursor-pointer">
            + 기록 추가
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}