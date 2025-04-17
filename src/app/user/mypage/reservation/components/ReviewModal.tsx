import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { UserReviewInput } from "@/types/user.interface";
import Image from "next/image";
import { uploadImagesToS3 } from "@/lib/api/uploadImageAPI";
import { UserAPI } from "@/lib/api/userAPI";
import { toast } from "sonner";

interface ReviewModalProps {
  reservationId: number;
  postId: number;
  setIsReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewModal({
  reservationId,
  postId,
  setIsReviewModalOpen,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const previewImages = imageFiles.map((file: File) => {
    return URL.createObjectURL(file);
  });

  const uploadImages = async () => {
    return await uploadImagesToS3(imageFiles, "profile");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length + imageFiles.length > 5) {
        alert("최대 5장만 업로드 가능합니다"); // TODO 추후 alert 수정 필요
      }
      const tempFile = [...imageFiles];
      for (const file of e.target.files) {
        tempFile.push(file);
      }
      setImageFiles(tempFile);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const reviewData: UserReviewInput = {
        rating: rating,
        content: content,
        fileIdList: [], // 사진 업로드 후 생성되는 fileId 리스트를 넣어주면 됩니다.
        shipFishingPostId: postId,
      };

      if (imageFiles.length > 0) {
        reviewData.fileIdList = await uploadImages();
      }

      const response = await UserAPI.postUserBoatReservationReview(
        reservationId,
        reviewData
      );
      if (response.success) {
        // 리뷰 작성 성공 후 캐시 무효화
        await fetch("/api/revalidate", {
          method: "POST",
        });
        toast.success("리뷰가 등록되었습니다.");
      } else {
        toast.error("리뷰 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("리뷰 등록 중 오류 발생:", error);
      toast.error("리뷰 등록 중 오류가 발생했습니다.");
    } finally {
      setIsReviewModalOpen(false);
    }
  };

  useEffect(() => {
    console.log(previewImages);
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="grid gap-4 bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between">
          <div className="grid gap-1">
            <div className="font-bold text-xl">리뷰 작성</div>
            <div className="text-gray-500">
              선상 낚시에 대한 경험을 공유해주세요!
            </div>
          </div>
          <X
            className="cursor-pointer text-gray-500"
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
                className="cursor-pointer"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  fill={
                    (hoverRating || rating) >= value ? "currentColor" : "none"
                  }
                  className={`w-6 h-6 ${
                    (hoverRating || rating) >= value
                      ? "text-amber-500"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="font-bold">리뷰 내용</div>
          <Textarea
            placeholder="선상 낚시 후기를 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="picture" className="text-md font-bold">
            사진 첨부
          </Label>
          <Input
            id="picture"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <div className="text-sm text-gray-500">
            최대 5장까지 업로드 가능합니다.
          </div>
          {previewImages.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {previewImages.map((url, index) => (
                <div key={index} className="flex overflow-scroll w-full">
                  <Image
                    key={index}
                    height={40}
                    width={40}
                    src={url}
                    alt={`preview-${index}`}
                    className="object-cover w-full h-24 rounded border-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsReviewModalOpen(false)}
          >
            취소
          </Button>
          <Button
            type="submit"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            리뷰 등록
          </Button>
        </div>
      </div>
    </div>
  );
}
