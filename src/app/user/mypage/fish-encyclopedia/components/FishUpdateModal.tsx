import { FishInfo } from "@/types/Fish.types";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {X, MapPin} from "lucide-react";
import {Button} from "@/components/ui/button";

interface CatchPlace {
  date : string;
  placeName: string;
  point: string;
  largestSize: number;
  count: number;
}

interface FishUpdateProps extends FishInfo {
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  season: string;
  living: string;
  catchPlaces: CatchPlace[];
}

export default function FishUpdateModal({
  setIsUpdateModalOpen,
  setIsRegisterModalOpen,
  fishName,
  image,
  description,
  largestSize,
  count,
  season,
  living,
  catchPlaces,
}: FishUpdateProps) {

  const handleAdd = () => {
    setIsUpdateModalOpen(false);
    setIsRegisterModalOpen(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 md:py-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-5">
        <div className="flex justify-between mb-4">
          <div className="grid gap-1">
            <div className="font-bold text-xl">문어 등록하기</div>
            <div className="text-gray-30">새로운 어종을 도감에 등록해보세요.</div>
          </div>
          <X
            className="cursor-pointer text-gray-30"
            onClick={() => setIsUpdateModalOpen(false)}
          />
        </div>
        <div className="grid grid-flow-row md:grid-flow-col md:grid-rows-[2fr_1fr_1fr] gap-4 md:h-[270px]">
          <Image
            className="w-full md:w-[270px] md:h-[270px] object-cover md:row-span-3 rounded-lg"
            src={image}
            alt="물고기 이미지"
            width={270}
            height={270}
          />
          <div>
            <div className="font-semibold text-xl">설명</div>
            <p>{description}</p>
          </div>
          <div className="flex justify-between w-3/5">
            <div className="font-semibold">
              최대 길이
              <div className="font-bold text-xl text-primary">{largestSize}cm</div>
            </div>
            <div className="font-semibold">
              총 마릿수
              <div className="font-bold text-xl text-primary">{count}마리</div>
            </div>
          </div>
          <div className="font-semibold">
            잘 잡히는 시기
            <div className="font-bold text-xl text-primary">{season}</div>
          </div>
        </div>
        <Separator className="bg-gray-60 my-4" />
        <div className="grid gap-2">
          <div className="flex items-center gap-1">
            <MapPin/>
            <div className="font-bold text-xl">서식지</div>
          </div>
          <div>{living}</div>
        </div>
        <Separator className="bg-gray-60 my-4" />
        <div>
          <div className="flex mb-4 items-center gap-1">
            <MapPin/>
            <div className="font-bold text-xl">잡은 장소</div>
          </div>
          <div className="grid gap-3">
            {catchPlaces.map((item, index) => (
              <div className="grid bg-gray-70 rounded-md p-1.5 px-3 gap-1" key={index}>
                <div className="flex justify-between">
                  <div>
                    {item.placeName}
                  </div>
                  <div className="text-gray-40">
                    {item.date}
                  </div>
                </div>
                <div className="flex justify-between sm:w-7/8 md:w-3/5 text-gray-40">
                  <div>포인트 : {item.point}</div>
                  <div>최대 길이 : {item.largestSize}cm</div>
                  <div>총 마릿수 : {item.count}마리</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" className="cursor-pointer" onClick={handleAdd}>
            + 기록 추가
          </Button>
        </div>
      </div>
    </div>
  );
}