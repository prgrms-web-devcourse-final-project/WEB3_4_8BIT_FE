import {
  FishDetailInfo,
  FishDictionaryInfo,
  FishInfo,
} from "@/types/fish.interface";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { APIResponse, FishAPI } from "@/lib/api/fishAPI";

interface FishUpdateProps extends FishInfo {
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FishUpdateModal({
  setIsUpdateModalOpen,
  setIsRegisterModalOpen,
  fishEncyclopediaId,
  fishName,
  fileUrl,
  bestLength,
  totalCount,
}: FishUpdateProps) {
  const results = useQueries<
    [
      UseQueryResult<APIResponse<FishDictionaryInfo>, Error>,
      UseQueryResult<APIResponse<{ content: FishDetailInfo[] }>, Error>
    ]
  >({
    queries: [
      {
        queryKey: ["fishDictionary", fishEncyclopediaId],
        queryFn: () => FishAPI.getFishDictionaryData(fishEncyclopediaId),
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["userFishEncyclopedia", fishEncyclopediaId],
        queryFn: () => FishAPI.getDetailFishEncyclopedias(fishEncyclopediaId),
        staleTime: 1000 * 60 * 5,
      },
    ],
  });

  const handleAdd = () => {
    setIsUpdateModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 md:py-10">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl mx-5 max-h-[70vh] overflow-y-auto">
        <div className="flex justify-between mb-3">
          <div className="grid gap-1">
            <div className="font-bold text-xl">{fishName} 정보</div>
            <div className="text-gray-30">어류 도감 정보를 확인해보세요.</div>
          </div>
          <X
            className="cursor-pointer text-gray-30"
            onClick={() => setIsUpdateModalOpen(false)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="md:col-span-1">
            <Image
              className="w-full h-[180px] object-cover rounded-lg"
              src={fileUrl}
              alt="물고기 이미지"
              width={220}
              height={220}
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-1 gap-2">
            <div>
              <div className="font-semibold">최대 길이</div>
              <div className="font-bold text-xl text-primary">
                {bestLength}cm
              </div>
            </div>
            <div>
              <div className="font-semibold">총 마릿수</div>
              <div className="font-bold text-xl text-primary">
                {totalCount}마리
              </div>
            </div>
            <div>
              <div className="font-semibold">잘 잡히는 시기</div>
              {results[0].isSuccess &&
                (() => {
                  const spawnSeasonList = results[0].data?.data.spawnSeasonList;
                  if (!spawnSeasonList || spawnSeasonList.length === 0) {
                    return null;
                  }
                  const firstSeason = spawnSeasonList[0];
                  const lastSeason =
                    spawnSeasonList[spawnSeasonList.length - 1];
                  return (
                    <div className="font-bold text-xl text-primary">
                      {`${firstSeason}월 ~ ${lastSeason}월`}
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <MapPin />
              <div className="font-bold text-lg">서식지</div>
            </div>
            {results[0].isSuccess && (
              <div className="bg-gray-70 rounded-md p-2 text-sm">
                {results[0].data?.data.spawnLocation}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <MapPin />
              <div className="font-bold text-lg">설명</div>
            </div>
            {results[0].isSuccess && (
              <div className="bg-gray-70 rounded-md p-2 text-sm">
                {results[0].data?.data.description}
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-gray-60 my-2" />

        <div>
          <div className="flex mb-2 items-center gap-1">
            <MapPin />
            <div className="font-bold text-lg">잡은 장소</div>
          </div>
          <div className="grid gap-2 max-h-[150px] overflow-y-auto pr-2">
            {results[1].isSuccess &&
              results[1].data?.data.content.map((item: FishDetailInfo) => (
                <div
                  className="grid bg-gray-70 rounded-md p-2 gap-1"
                  key={item.fishEncyclopediaId}
                >
                  <div className="flex justify-between">
                    <div className="font-medium">{item.fishPointName}</div>
                    <div className="text-gray-40 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-1 text-gray-40 text-sm">
                    <div>포인트: {item.fishPointDetailName}</div>
                    <div>최대 길이: {item.length}cm</div>
                    <div>총 마릿수: {item.count}마리</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <Button type="submit" className="cursor-pointer" onClick={handleAdd}>
            + 기록 추가
          </Button>
        </div>
      </div>
    </div>
  );
}
