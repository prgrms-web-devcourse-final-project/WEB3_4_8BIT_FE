"use client";

import { useState } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";

interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  isAuthor?: boolean;
}

interface JoinInfoCardProps {
  currentMembers: number;
  maxMembers: number;
  members: Member[];
  author: {
    name: string;
    avatarUrl: string;
  };
}

export default function JoinInfoCard({
  currentMembers,
  maxMembers,
  members,
  author,
}: JoinInfoCardProps) {
  // 예시: 참여 여부 상태
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinToggle = () => {
    setIsJoined((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      {/* 참여 현황 */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold mb-2">참여 현황</span>
        <span className="font-medium text-base">
          {currentMembers}/{maxMembers}명
        </span>
      </div>

      <Slider
        value={[currentMembers]}
        min={0}
        max={maxMembers}
        step={1}
        disabled
        className="w-full h-2 bg-gray-50 rounded-full accent-sub-1"
      />

      {/* 참여/취소 버튼 */}
      <button
        onClick={handleJoinToggle}
        className={`w-full py-2 rounded-lg text-white ${
          isJoined
            ? "bg-red-500 hover:bg-red-600"
            : "bg-primary hover:bg-[#2f8ae0]"
        }`}
      >
        {isJoined ? "참여 취소하기" : "참여 신청하기"}
      </button>

      <button className="w-full py-2 border border-gray-70 rounded-lg text-base hover:bg-gray-80">
        참여자 채팅방
      </button>

      {/* 참여 멤버 목록 */}
      <div>
        <h4 className="font-medium text-base mb-3">참여 멤버</h4>
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                {member.avatarUrl ? (
                  <Image
                    src={member.avatarUrl}
                    alt={member.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                ) : null}
              </div>
              {/* 이름 + 모집자 표시 */}
              <div className="flex items-center gap-2">
                <span className="text-base text-gray-700">{member.name}</span>
                {member.isAuthor && (
                  <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-lg">
                    모집자
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 작성자 정보 */}
      <div>
        <h4 className="font-medium text-base mb-2 mt-4">작성자 정보</h4>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            {author.avatarUrl ? (
              <Image
                src={author.avatarUrl}
                alt={author.name}
                width={32}
                height={32}
                className="object-cover"
              />
            ) : null}
          </div>
          <div>
            <p className="font-medium text-base text-gray-700">{author.name}</p>
          </div>
        </div>
        <button className="w-full py-2 border border-gray-70 rounded-lg text-base hover:bg-gray-80">
          1:1 채팅 보내기
        </button>
      </div>
    </div>
  );
}
