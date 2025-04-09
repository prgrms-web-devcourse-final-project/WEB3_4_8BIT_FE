"use client";

import { Calendar, Users, MapPin } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  fishingTripPostId: number;
  title: string;
  content: string;
  date: string;
  location: string;
  currentCount: number;
  recruitmentCount: number;
  fishPointName: string;
  fileUrlList: string[];
  postStatus: "RECRUITING" | "COMPLETED";
}

export function PostCard({
  fishingTripPostId,
  title,
  content,
  date,
  location,
  currentCount = 0,
  recruitmentCount,
  fishPointName,
  fileUrlList = [],
  postStatus,
}: PostCardProps) {
  // 썸네일 이미지 URL 결정
  const thumbnailUrl =
    fileUrlList.length > 0 ? fileUrlList[0] : "/images/default-fishing.jpg";

  // 표시될 텍스트 변환
  const displayStatusText = postStatus === "RECRUITING" ? "모집중" : "모집완료";

  return (
    <Link href={`/fishing-group/post/${fishingTripPostId}`} className="block">
      <div className="w-full mb-4 border border-gray-300 rounded-lg hover:bg-gray-80 px-4 md:px-6 py-4 cursor-pointer transition-all duration-200">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
          {/* 썸네일 이미지 */}
          <div className="w-full md:w-[180px] h-[120px] rounded-md overflow-hidden flex-shrink-0">
            <img
              src={thumbnailUrl}
              alt="게시글 썸네일"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 게시글 정보 */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="space-y-3">
              {/* 모집 상태 & 제목 */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    postStatus === "RECRUITING"
                      ? "bg-[#2CD5D7] text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {displayStatusText}
                </span>
                <h3 className="text-lg font-medium text-gray-900">
                  <span className="text-gray-600">[{fishPointName}]</span>{" "}
                  {title}
                </h3>
              </div>

              <p className="text-base text-gray-600 line-clamp-2">{content}</p>
            </div>

            {/* 하단 정보 영역 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-3">
              <div className="flex items-center gap-x-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  동출날짜: {date}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  모집인원: {currentCount}/{recruitmentCount}명
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
