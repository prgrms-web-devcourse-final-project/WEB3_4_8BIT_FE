"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { applyFishingTripRecruitment } from "@/lib/api/fishingTripRecruitmentAPI";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface JoinInfoCardProps {
  postId: number;
  recruitmentCount: number;
  currentCount: number;
  fishingDate: string;
  fishPointName: string;
  fishPointDetailName: string;
  postStatus: string;
  longitude: number;
  latitude: number;
  author: string;
  fishingTripPostId: number;
  isOwner?: boolean;
  isApplicant?: boolean;
  participants: Array<{
    memberId: number;
    nickname: string;
    profileImageUrl: string | null;
  }>;
  onApplicationSuccess?: () => void;
}

export default function JoinInfoCard({
  postId,
  recruitmentCount,
  currentCount,
  fishingDate,
  fishPointName,
  fishPointDetailName,
  postStatus,
  longitude,
  latitude,
  author,
  fishingTripPostId,
  isOwner = false,
  isApplicant = false,
  participants,
  onApplicationSuccess,
}: JoinInfoCardProps) {
  // 참여 여부 및 모달 오픈 상태 관리
  const [isJoined, setIsJoined] = useState(isApplicant);
  const [showModal, setShowModal] = useState(false);

  // isApplicant prop이 변경될 때마다 isJoined 상태 업데이트
  useEffect(() => {
    setIsJoined(isApplicant);
  }, [isApplicant]);

  // 모달 내부 폼 상태
  const [experience, setExperience] = useState("BEGINNER");
  const [applicationText, setApplicationText] = useState("");

  // 현재 날짜 (YYYY-MM-DD)
  const currentDate = new Date().toISOString().split("T")[0];

  const handleJoinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("참여 신청 제출 시작");

    if (!applicationText.trim()) {
      console.log("신청 내용 없음");
      toast.error("신청 내용을 입력해주세요.");
      return;
    }
    console.log("신청 내용 유효함");

    try {
      console.log("API 요청 시도:", {
        fishingTripPostId,
        introduction: applicationText.trim(),
        fishingLevel: experience,
      });

      const response = await applyFishingTripRecruitment({
        fishingTripPostId,
        introduction: applicationText.trim(),
        fishingLevel: experience,
      });

      console.log("API 응답 받음:", response);

      if (response.success) {
        toast.success(response.message || "참여 신청이 완료되었습니다.");
        setIsJoined(true);
        setShowModal(false);
        onApplicationSuccess?.();
      } else {
        toast.error(response.message || "참여 신청에 실패했습니다.");
      }
    } catch (error) {
      console.error("참여 신청 중 오류 발생:", error);
      toast.error("참여 신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 border border-gray-70 space-y-4">
        {/* 참여 현황 */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold mb-2">참여 현황</span>
          <span className="font-medium text-base">
            {currentCount}/{recruitmentCount}명
          </span>
        </div>

        <Slider
          value={[currentCount]}
          min={0}
          max={recruitmentCount}
          step={1}
          disabled
          className="w-full h-2 bg-gray-50 rounded-full accent-sub-1"
        />

        {/* 참여 신청 버튼 (신청 후에는 disabled 처리) */}
        {!isJoined && currentCount < recruitmentCount && (
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2 rounded-lg text-white bg-primary hover:bg-[#2f8ae0] cursor-pointer"
          >
            참여 신청하기
          </button>
        )}

        {isJoined && (
          <button
            disabled
            className="w-full py-2 rounded-lg text-green-500 border border-green-500 cursor-not-allowed"
          >
            참여 신청 완료
          </button>
        )}

        {!isJoined && currentCount >= recruitmentCount && (
          <button
            disabled
            className="w-full py-2 rounded-lg text-gray-500 border border-gray-300 cursor-not-allowed"
          >
            모집 인원 마감
          </button>
        )}

        <button className="w-full py-2 border border-gray-70 rounded-lg text-base hover:bg-gray-80 cursor-pointer">
          참여자 채팅방
        </button>

        {/* 작성자 정보 */}
        <div>
          <h4 className="font-medium text-base mb-2 mt-4">작성자 정보</h4>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <div className="w-full h-full bg-gray-400 rounded-full" />
            </div>
            <div>
              <p className="font-medium text-base text-gray-700">{author}</p>
            </div>
          </div>
          <button className="w-full py-2 border border-gray-70 rounded-lg text-base hover:bg-gray-80 cursor-pointer">
            1:1 채팅 보내기
          </button>
        </div>

        {/* 수정된 참여자 목록 */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">참여자 목록</h3>
          {participants && participants.length > 0 ? (
            <ul className="space-y-2">
              {participants.map((participant) => (
                <li key={participant.memberId} className="flex items-center">
                  {participant.profileImageUrl ? (
                    <Image
                      src={participant.profileImageUrl}
                      alt={participant.nickname ?? "참여자 프로필"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/default-user.png";
                      }}
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <span>{participant.nickname ?? "이름 없음"}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">참여자가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 참여 신청 모달 */}
      {showModal && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50">
          {/* 배경 오버레이 */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
            onClick={() => setShowModal(false)}
          />
          {/* 모달 콘텐츠 */}
          <div className="relative bg-white rounded-lg p-6 max-w-md w-full z-10">
            {/* 모달 닫기 버튼 */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">참여 신청하기</h3>
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              {/* 자기소개 입력 */}
              <div>
                <label
                  htmlFor="applicationText"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  자기소개 및 신청 내용
                </label>
                <textarea
                  id="applicationText"
                  value={applicationText}
                  onChange={(e) => setApplicationText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="간단한 자기소개나 참여하고 싶은 이유를 작성해주세요."
                  required
                />
              </div>

              {/* 낚시 경험 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  낚시 경험
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="BEGINNER">초급 (낚시 경험 거의 없음)</option>
                  <option value="INTERMEDIATE">중급 (취미로 즐김)</option>
                  <option value="ADVANCED">고급 (전문가 수준)</option>
                </select>
              </div>

              {/* 제출 버튼 */}
              <Button type="submit" className="w-full">
                신청 제출
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
