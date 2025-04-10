"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { applyFishingTripRecruitment } from "@/lib/api/fishingTripRecruitmentAPI";
import { Button } from "@/components/ui/button";

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

  // 현재 사용자 더미 데이터
  const currentUser = {
    nickname: "테스트 사용자",
    profileImageUrl: "/default-user.png",
  };

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

        {/* 참여자 정보 */}
        <div>
          <h4 className="font-medium text-base mb-2 mt-4">참여자 정보</h4>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={currentUser.profileImageUrl}
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-base text-gray-700">
                {currentUser.nickname}
              </p>
            </div>
          </div>
        </div>

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

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">참여자 목록</h3>
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li key={participant.memberId} className="flex items-center">
                {participant.profileImageUrl ? (
                  <img
                    src={participant.profileImageUrl}
                    alt={participant.nickname}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-2" />
                )}
                <span>{participant.nickname}</span>
              </li>
            ))}
          </ul>
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
              {/* 사용자 프로필 및 닉네임 상단 배치 */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={currentUser.profileImageUrl}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <span className="text-base font-medium">
                  {currentUser.nickname}
                </span>
              </div>
              {/* 경험 선택 */}
              <div>
                <label className="block text-sm font-medium mb-1">경험</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="BEGINNER">초급</option>
                  <option value="INTERMEDIATE">중급</option>
                  <option value="ADVANCED">고급</option>
                </select>
              </div>
              {/* 신청 내용 */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  신청 내용
                </label>
                <textarea
                  value={applicationText}
                  onChange={(e) => setApplicationText(e.target.value)}
                  placeholder="신청 내용을 작성해주세요."
                  className="w-full border border-gray-300 rounded-md p-2"
                  rows={4}
                />
              </div>
              {/* 신청일자 - 현재 날짜 표시 (수정 불가) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  신청일자
                </label>
                <div className="w-full border border-gray-300 rounded-md p-2">
                  {currentDate}
                </div>
              </div>
              {/* 버튼 */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!applicationText.trim()}
                  className={`py-2 px-4 bg-primary text-white rounded-md cursor-pointer hover:bg-[#2f8ae0] ${
                    !applicationText.trim() && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  신청하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
