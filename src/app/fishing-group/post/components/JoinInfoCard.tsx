"use client";

import { useState } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";

interface JoinInfoCardProps {
  currentCount: number;
  recruitmentCount: number;
  fishingDate: string;
  fishPointName: string;
  fishPointDetailName: string;
  postStatus: string;
  longitude: number;
  latitude: number;
  author: string;
}

export default function JoinInfoCard({
  currentCount,
  recruitmentCount,
  fishingDate,
  fishPointName,
  fishPointDetailName,
  postStatus,
  longitude,
  latitude,
  author,
}: JoinInfoCardProps) {
  // 참여 여부 및 모달 오픈 상태 관리
  const [isJoined, setIsJoined] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 모달 내부 폼 상태
  const [experience, setExperience] = useState("초급");
  const [applicationText, setApplicationText] = useState("");

  // 현재 사용자 더미 데이터
  const currentUser = {
    nickname: "User123",
    profileImageUrl: "/default-user.png",
  };

  // 현재 날짜 (YYYY-MM-DD)
  const currentDate = new Date().toISOString().split("T")[0];

  const handleJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 필수 정보(신청 내용 소개)가 입력되어어야 진행
    if (!applicationText.trim()) return;
    // 신청 처리 로직 추가
    setIsJoined(true);
    setShowModal(false);
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
        <button
          onClick={() => setShowModal(true)}
          disabled={isJoined}
          className={`w-full py-2 rounded-lg text-white ${
            isJoined
              ? "bg-gray-400 cursor-default pointer-events-none"
              : "bg-primary hover:bg-[#2f8ae0] cursor-pointer"
          }`}
        >
          참여 신청하기
        </button>

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
                  {currentUser.profileImageUrl && (
                    <Image
                      src={currentUser.profileImageUrl}
                      alt={currentUser.nickname}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  )}
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
                  <option value="초급">초급</option>
                  <option value="중급">중급</option>
                  <option value="고급">고급</option>
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
