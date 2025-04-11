"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "@/lib/api/fishingPostAPI";
import { axiosInstance } from "@/lib/api/axiosInstance";

interface ApiComment {
  commentId: number;
  nickname: string;
  content: string;
  createdAt: string;
  isAuthor: boolean;
  authorProfileImg?: string;
  replies?: ApiComment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  isAuthor: boolean;
  authorImageUrl?: string;
  childCount: number;
}

interface Reply {
  id: string;
  author: string;
  content: string;
  date: string;
  isAuthor: boolean;
  authorImageUrl?: string;
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [newComment, setNewComment] = useState("");
  const [replyContents, setReplyContents] = useState<Record<string, string>>(
    {}
  );

  const fetchComments = async () => {
    try {
      const comments = await getComments(Number(postId));
      const formattedComments = comments.map((comment: ApiComment) => ({
        id: comment.commentId.toString(),
        author: comment.nickname,
        content: comment.content,
        date: comment.createdAt,
        isAuthor: comment.isAuthor,
        authorImageUrl: comment.authorProfileImg,
        childCount: comment.replies?.length || 0,
      }));
      setComments(formattedComments);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  const fetchReplies = async (parentId: string) => {
    try {
      const response = await axiosInstance.get(
        `/fishing-trip-post/${postId}/comment`,
        {
          params: {
            size: 10,
            parentId: Number(parentId),
          },
        }
      );
      const replies = response.data.data.content;
      const formattedReplies = replies.map((reply: ApiComment) => ({
        id: reply.commentId.toString(),
        author: reply.nickname,
        content: reply.content,
        date: reply.createdAt,
        isAuthor: reply.isAuthor,
        authorImageUrl: reply.authorProfileImg,
      }));
      setReplies((prev) => ({ ...prev, [parentId]: formattedReplies }));
    } catch (error) {
      console.error("대댓글 불러오기 실패:", error);
    }
  };

  const handleAddComment = async (content: string, parentId?: string) => {
    const response = await addComment(
      Number(postId),
      content,
      parentId ? Number(parentId) : undefined
    );
    if (response.success) {
      fetchComments();
      if (parentId) {
        fetchReplies(parentId);
      }
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    const response = await updateComment(Number(postId), commentId, content);
    if (response.success) {
      fetchComments();
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const response = await deleteComment(Number(postId), commentId);
    if (response.success) {
      fetchComments();
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      handleAddComment(newComment);
      setNewComment("");
    }
  };

  const handleReplySubmit = async (parentId: string) => {
    const content = replyContents[parentId];
    if (content?.trim()) {
      await handleAddComment(content, parentId);
      setReplyContents((prev) => ({ ...prev, [parentId]: "" }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4 border border-gray-70">
      <h3 className="text-lg font-bold">댓글 {comments?.length || 0}개</h3>
      <div className="space-y-4">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="border-b border-gray-200 pb-4 pt-4 flex items-start space-x-4"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              {comment.authorImageUrl ? (
                <Image
                  src={comment.authorImageUrl}
                  alt={comment.author}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-400 rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-base">
                    {comment.author}
                  </span>
                  {comment.isAuthor && (
                    <span className="text-xs text-primary">작성자</span>
                  )}
                </div>
                {comment.isAuthor && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateComment(Number(comment.id), comment.content)
                      }
                      className="text-xs text-blue-500"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteComment(Number(comment.id))}
                      className="text-xs text-red-500"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <p className="text-base text-gray-700 mt-2">{comment.content}</p>
              <div className="flex justify-end mt-2">
                <span className="text-xs text-gray-400">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              {/* Display replies */}
              {comment.childCount > 0 && (
                <div className="ml-10 mt-4">
                  {replies[comment.id]?.map((reply) => (
                    <div
                      key={reply.id}
                      className="flex items-start space-x-3 bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                        {reply.authorImageUrl ? (
                          <Image
                            src={reply.authorImageUrl}
                            alt={reply.author}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {reply.author}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(reply.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Reply input */}
              <div className="ml-10 mt-2">
                <textarea
                  value={replyContents[comment.id] || ""}
                  onChange={(e) =>
                    setReplyContents((prev) => ({
                      ...prev,
                      [comment.id]: e.target.value,
                    }))
                  }
                  placeholder="답글을 작성해주세요"
                  className="w-full border border-gray-300 rounded p-2 text-base"
                  rows={2}
                />
                <button
                  onClick={() => handleReplySubmit(comment.id)}
                  className="mt-1 px-3 py-1 bg-primary text-white rounded-lg hover:bg-[#2f8ae0] cursor-pointer"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        ))}
        {(!comments || comments.length === 0) && (
          <div className="text-gray-500 text-sm">
            아직 작성된 댓글이 없습니다.
          </div>
        )}
      </div>
      {/* Comment input */}
      <div className="pt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성해주세요"
          className="w-full border border-gray-300 rounded p-2 text-base"
          rows={3}
        />
        <div className="flex justify-end">
          <button
            onClick={handleCommentSubmit}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#2f8ae0] cursor-pointer"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
