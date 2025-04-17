"use client";

import { MapPin, Calendar, Clock, Users } from "lucide-react";

export interface PostInfoProps {
  placeName: string;
  date: string;
  time: string;
  currentMembers: number;
  maxMembers: number;
}

export default function PostInfo({
  placeName,
  date,
  time,
  currentMembers,
  maxMembers,
}: PostInfoProps) {
  return (
    <div className="bg-gray-80 rounded-lg p-4 grid grid-cols-2 gap-4">
      {/* 장소 */}
      <div className="flex items-center space-x-3">
        <MapPin className="w-5 h-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">장소</p>
          <p className="font-medium text-gray-900">{placeName}</p>
        </div>
      </div>

      {/* 날짜 */}
      <div className="flex items-center space-x-3">
        <Calendar className="w-5 h-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">날짜</p>
          <p className="font-medium text-gray-900">{date}</p>
        </div>
      </div>

      {/* 시간 */}
      <div className="flex items-center space-x-3">
        <Clock className="w-5 h-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">시간</p>
          <p className="font-medium text-gray-900">{time}</p>
        </div>
      </div>

      {/* 인원 */}
      <div className="flex items-center space-x-3">
        <Users className="w-5 h-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">인원</p>
          <p className="font-medium text-gray-900">
            {currentMembers}/{maxMembers}명
          </p>
        </div>
      </div>
    </div>
  );
}
