"use client";

import Image from "next/image";
import { useState } from "react";
import { CommentItemProps } from "@/types/comment";
import ReplyForm from "./ReplyForm";

export default function CommentItem({
  comment,
  isAuthor,
  onUpdateComment,
  onDeleteComment,
  onToggleReplies,
  onAddReply,
  isExpanded,
  children,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async () => {
    await onUpdateComment(comment.id, editContent);
    setIsEditing(false);
  };

  const handleReplySubmit = async (content: string) => {
    if (onAddReply) {
      await onAddReply(comment.id, content);
      onToggleReplies(comment.id);
    }
  };

  const formatDate = (dateString: string) => {
    return dateString.split("T")[0];
  };

  return (
    <div className="w-full py-4 border-b border-gray-200">
      <div className="flex items-start space-x-2 md:space-x-4">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {comment.authorImageUrl ? (
            <Image
              src={comment.authorImageUrl}
              alt={comment.author}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              src="/default-avatar.png"
              alt="default avatar"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="font-semibold text-base md:text-lg text-blue-900 break-all">
                {comment.author}
              </span>
              {isAuthor && (
                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded">
                  작성자
                </span>
              )}
            </div>

            {isAuthor && !isEditing && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={startEditing}
                  className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  수정
                </button>
                <button
                  onClick={() => onDeleteComment(comment.id)}
                  className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
          <div className="mt-2">
            {isEditing ? (
              <div className="flex-1">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-800 bg-white text-sm md:text-base"
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
              <p className="text-gray-800 break-words">{comment.content}</p>
            )}
          </div>
          <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              {comment.childCount > 0 ? (
                <button
                  onClick={() => onToggleReplies(comment.id)}
                  className="flex items-center space-x-1 text-sm md:text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  <span>
                    {isExpanded
                      ? "답글 숨기기"
                      : `답글 ${comment.childCount}개 보기`}
                  </span>
                  <svg
                    className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="text-xs md:text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  {showReplyForm ? "답글 취소" : "답글 작성"}
                </button>
              )}
            </div>
            <span className="text-xs md:text-sm text-gray-500">
              {formatDate(comment.date)}
            </span>
          </div>
          {showReplyForm && (
            <div className="mt-4 ml-4 md:ml-8">
              <ReplyForm
                onSubmit={handleReplySubmit}
                placeholder="답글을 입력하세요."
                buttonText="등록"
              />
            </div>
          )}
          {isExpanded && (
            <div className="mt-4 pl-4 md:pl-8 border-l-2 border-gray-200">
              <div className="space-y-4">{children}</div>
              {!showReplyForm && (
                <div className="mt-4">
                  <ReplyForm
                    onSubmit={handleReplySubmit}
                    placeholder="답글을 입력하세요."
                    buttonText="등록"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
