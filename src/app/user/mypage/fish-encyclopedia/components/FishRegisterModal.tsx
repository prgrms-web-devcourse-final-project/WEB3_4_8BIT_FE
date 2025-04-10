import React, {useEffect, useReducer, useState} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {useQuery} from "@tanstack/react-query";
import {getFishingRegion, getRegions} from "@/lib/api/fishingPointAPI";
import {FishUpload} from "@/types/fish.interface";
import {FishAPI} from "@/lib/api/fishAPI";
import {useRouter} from "next/navigation";

interface ModalProps {
  fishName: string;
  fishEncyclopediaId: number;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Action  =
  | {type : 'changed_fish_point_id', nextFishPointId : number}
  | {type : 'changed_length', nextLength : number}
  | {type : 'changed_count', nextCount : number}

function reducer(state : FishUpload, action : Action) : FishUpload {
  switch (action.type) {
    case 'changed_fish_point_id': {
      return {
        ...state,
        fishPointId : action.nextFishPointId,
      };
    }
    case 'changed_length': {
      return {
        ...state,
        length : action.nextLength,
      };
    }
    case 'changed_count': {
      return {
        ...state,
        count : action.nextCount,
      }
    }
    default :
      throw new Error('Unknown action type');
  }
}

export default function FishRegisterModal({ fishName, fishEncyclopediaId, setIsRegisterModalOpen }: ModalProps) {
  const initialState : FishUpload = {
    fishId : fishEncyclopediaId,
    fishPointId : null,
    length : null,
    count : null,
  };
  const [fishUploadState, dispatch] = useReducer(reducer, initialState);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const router = useRouter();

  const { data: regionData, isSuccess: isRegionSuccess } = useQuery({
    queryKey: ['regions'],
    queryFn: getRegions,
    staleTime: 1000 * 60 * 5,
  });

  const { data: pointData, isSuccess: isPointSuccess } = useQuery({
    queryKey: ['point', selectedRegion],
    queryFn: () => getFishingRegion(selectedRegion as string),
    staleTime: 1000 * 60 * 5,
    enabled: !!selectedRegion,
  });

  const handleRegionChange = (regionName: string) => {
    setSelectedRegion(regionName);
  };

  const handlePointChange = (pointId: string) => {
    dispatch({ type: "changed_fish_point_id", nextFishPointId: Number(pointId) });
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value)) {
      e.target.value = '';
    }
    dispatch({ type: "changed_length", nextLength: Number(e.target.value) });
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value)) {
      e.target.value = '';
    }
    dispatch({ type: "changed_count", nextCount: Number(e.target.value) });
  };

  const validateData = (uploadFishData: FishUpload): boolean => {
    if (uploadFishData.fishId === null || uploadFishData.fishId < 0) return false;
    if (uploadFishData.fishPointId === null || uploadFishData.fishPointId < 0) return false;
    if (uploadFishData.length === null || uploadFishData.length < 0) return false;
    if (uploadFishData.count === null || uploadFishData.count < 0) return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateData(fishUploadState)) {
      alert("모든 필드가 채워져야 하며, 값은 음수가 될 수 없습니다."); // TODO 수정 필요
      return;
    }

    const response = await FishAPI.postFishEncyclopedias(fishUploadState);
    if (response.success) {
      alert('등록 완료'); // TODO: 수정 필요
    }
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="grid align-right bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between">
          <div className="grid gap-1">
            <div className="font-bold text-xl">{fishName} 등록하기</div>
            <div className="text-gray-30">새로운 어종을 도감에 등록해보세요.</div>
          </div>
          <X
            className="cursor-pointer text-gray-30"
            onClick={() => setIsRegisterModalOpen(false)}
          />
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="point" className="text-right">
              잡은 지역
            </Label>
            <Select onValueChange={handleRegionChange}>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="지역 선택하기" />
              </SelectTrigger>
              {isRegionSuccess && regionData?.length > 0 && (
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>지역구 목록</SelectLabel>
                    {regionData.map((item) => (
                      <SelectItem
                        key={item.regionId}
                        value={String(item.regionId)}
                      >
                        {item.regionName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              )}
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4 h-[35px]">
            <Label htmlFor="point" className="text-right">
              잡은 낚시 포인트
            </Label>
            <Select onValueChange={handlePointChange}>
            {isPointSuccess && (
              <>
                {pointData?.length > 0 ? (
                  <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue placeholder="낚시 포인트 선택하기" />
                  </SelectTrigger>
                ) : (
                  <SelectTrigger className="w-[180px] cursor-pointer" disabled>
                    <SelectValue placeholder="포인트가 없습니다." />
                  </SelectTrigger>
                )}
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>낚시 포인트 목록</SelectLabel>
                    {pointData.map((item) => (
                      <SelectItem
                        key={item.fishPointId}
                        value={String(item.fishPointId)}
                      >
                        {item.fishPointDetailName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </>
            )}
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="length" className="text-right">
              길이(cm)
            </Label>
            <Input
              id="length"
              placeholder="길이를 입력하세요"
              className="col-span-3"
              value={fishUploadState.length ?? ""}
              onChange={handleLengthChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              마릿수
            </Label>
            <Input
              id="quantity"
              placeholder="마릿수를 입력하세요"
              className="col-span-3"
              value={fishUploadState.count ?? ""}
              onChange={handleCountChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="cursor-pointer">
            + 기록 추가
          </Button>
        </div>
      </div>
    </form>
  );
}