import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Star, X} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";

interface ReviewModalProps {
  setIsReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewModal({ setIsReviewModalOpen }: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      setIsReviewModalOpen(false);
    },1000)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="grid gap-4 align-right bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between">
          <div className="grid gap-1">
            <div className="font-bold text-xl">리뷰 작성</div>
            <div className="text-gray-30">선상 낚시에 대한 경험을 공유해주세요!</div>
          </div>
          <X
            className="cursor-pointer text-gray-30"
            onClick={() => setIsReviewModalOpen(false)}
          />
        </div>
        <div className="grid gap-2">
          <div className="font-bold">별점</div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  fill={(hoverRating || rating) >= value ? "currentColor" : "none"}
                  className={`w-6 h-6 ${(hoverRating || rating) >= value ? "text-amber-500" : "text-gray-300"}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="font-bold">리뷰 내용</div>
          <Textarea placeholder="선상 낚시 후기를 작성해주세요." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="picture" className="text-md font-bold">사진 첨부</Label>
          <Input id="picture" type="file" />
          <div className="text-sm text-gray-30 ml-0.5">최대 5장까지 업로드 가능합니다.</div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="cursor-pointer" onClick={() => setIsReviewModalOpen(false)}>
            취소
          </Button>
          <Button type="submit" className="cursor-pointer">
            리뷰 등록
          </Button>
        </div>
      </div>
    </div>
  );
}