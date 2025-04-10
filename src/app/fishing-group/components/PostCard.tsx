"use client";

import { ThumbsUp, Eye, MessageCircle, Calendar, Users } from "lucide-react";

interface PostCardProps {
  title: string;
  content: string;
  date: string;
  location: string;
  views: number;
  likes: number;
  comments: number;
  thumbnail?: string;
  isRecruiting?: boolean;
  memberCount: number;
}

export function PostCard({
  title,
  content,
  date,
  location,
  views,
  likes,
  comments,
  thumbnail,
  isRecruiting = true,
  memberCount,
}: PostCardProps) {
  return (
    <div className="w-full mb-4 border border-gray-300 rounded-lg hover:bg-gray-50 px-4 md:px-6 py-4">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
        {/* 썸네일 이미지 */}
        <div className="w-full md:w-[180px] h-[120px] rounded-md overflow-hidden flex-shrink-0">
          <img
            src={thumbnail || "/images/default-thumbnail.jpg"}
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
                  isRecruiting
                    ? "bg-[#2CD5D7] text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {isRecruiting ? "모집중" : "모집완료"}
              </span>
              <h3 className="text-lg font-medium text-gray-900">
                <span className="text-gray-600">[{location}]</span> {title}
              </h3>
            </div>

            <p className="text-base text-gray-600 line-clamp-2">{content}</p>
          </div>

          {/* 하단 통계 영역 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-3">

            <div className="flex items-center gap-x-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                동출날짜: {date}
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} />
                모집인원: {memberCount}명
              </span>
            </div>

            <div className="flex items-center gap-x-4 text-sm text-gray-500 mt-2 sm:mt-0">
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {views}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp size={16} />
                {likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} />
                {comments}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}