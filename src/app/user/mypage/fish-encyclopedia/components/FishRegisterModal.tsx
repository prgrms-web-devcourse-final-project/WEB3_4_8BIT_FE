import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";

interface ModalProps {
  fishName: string;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FishRegisterModal({ fishName, setIsRegisterModalOpen }: ModalProps) {
  const [point, setPoint] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  // 포인트 값이 변경되면 잡은 위치 자동 업데이트 예정
  useEffect(() => {
    if (point) {
      setLocation(`자동 채워진 위치: ${point}`);
    } else {
      setLocation("");
    }
  }, [point]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ point, location, length, quantity });

    setTimeout(() => {
      setIsRegisterModalOpen(false);
    },1000)
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
              포인트
            </Label>
            <Input
              id="point"
              placeholder="포인트를 검색하세요"
              className="col-span-3"
              value={point}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPoint(e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              잡은 위치
            </Label>
            <Input
              id="location"
              placeholder="자동으로 채워집니다"
              className="col-span-3"
              value={location}
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="length" className="text-right">
              길이(cm)
            </Label>
            <Input
              id="length"
              placeholder="길이를 입력하세요"
              className="col-span-3"
              value={length}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLength(e.target.value)
              }
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
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(e.target.value)
              }
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