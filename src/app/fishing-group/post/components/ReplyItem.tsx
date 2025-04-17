"use client";

import Image from "next/image";
import { useState } from "react";
import { ReplyItemProps } from "@/types/comment";

export default function ReplyItem({
  reply,
  isAuthor,
  onUpdate,
  onDelete,
}: ReplyItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);

  const startEditing = () => {
    setIsEditing(true);
    setEditContent(reply.content);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditContent(reply.content);
  };

  const handleUpdateComment = async () => {
    await onUpdate(reply.id, editContent);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0];
  };

  return (
    <div className="w-full py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          {reply.authorImageUrl ? (
            <Image
              src={reply.authorImageUrl}
              alt={reply.author}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <Image
              src="/default-avatar.png"
              alt="default avatar"
              width={40}
              height={40}
              className="object-cover"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-blue-900">{reply.author}</span>
              {isAuthor && (
                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded">
                  작성자
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              {isAuthor && !isEditing && (
                <>
                  <button
                    onClick={startEditing}
                    className="text-sm md:text-xs text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => onDelete(reply.id)}
                    className="text-sm md:text-xs text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mt-2">
            {isEditing ? (
              <div className="flex-1">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-800 bg-white"
                  rows={2}
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={handleUpdateComment}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                  >
                    저장
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800">{reply.content}</p>
            )}
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-sm text-gray-500">
              {formatDate(reply.date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
