"use client";

import { useState } from "react";
import Image from "next/image";

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  isAuthor: boolean;
  authorImageUrl?: string; // 프로필 이미지 URL 추가
}

interface CommentSectionProps {
  comments: Comment[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    // 실제 API 연동 시 댓글 전송 로직 추가
    console.log("새 댓글:", newComment);
    setNewComment("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4 border border-gray-70">
      <h3 className="text-lg font-bold">댓글 {comments.length}개</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 pb-2">
            <div className="flex items-start space-x-3">
              {/* 프로필 이미지 표시 */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                {comment.authorImageUrl ? (
                  <Image
                    src={comment.authorImageUrl}
                    alt={comment.author}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-400 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-base">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>
                <p className="text-base text-gray-700">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성해주세요"
          className="w-full border border-gray-300 rounded p-2 text-base"
          rows={3}
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#2f8ae0]"
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
}
