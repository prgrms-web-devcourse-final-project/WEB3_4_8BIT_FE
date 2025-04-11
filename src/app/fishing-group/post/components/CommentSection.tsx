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
  childCount: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  isAuthor: boolean;
  authorImageUrl?: string;
  childCount: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyContents, setReplyContents] = useState<Record<string, string>>({});
  // 댓글별로 대댓글 영역 펼침/접힘 상태 관리
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});

  // 부모 댓글 불러오기 & 포맷팅 (asc 정렬)
  const fetchParentComments = async (): Promise<Comment[]> => {
    try {
      const parentComments = await getComments(Number(postId));
      const formattedComments = parentComments.map((comment: ApiComment) => ({
        id: comment.commentId.toString(),
        author: comment.nickname,
        content: comment.content,
        date: comment.createdAt,
        isAuthor: comment.isAuthor,
        authorImageUrl: comment.authorProfileImg,
        childCount: comment.childCount,
        replies: [],
      }));
      return formattedComments;
    } catch (error) {
      console.error("부모 댓글 불러오기 실패:", error);
      return [];
    }
  };

  // 대댓글 불러오기 (asc 정렬, createdAt 기준)
  const fetchChildComments = async (parentId: string) => {
    try {
      const response = await axiosInstance.get(
        `/fishing-trip-post/${postId}/comment`,
        {
          params: {
            size: 10,
            parentId: Number(parentId),
            order: "asc",
            sort: "createdAt",
          },
        }
      );
      const childComments = response.data.data.content;
      const formattedReplies = childComments.map((reply: ApiComment) => ({
        id: reply.commentId.toString(),
        author: reply.nickname,
        content: reply.content,
        date: reply.createdAt,
        isAuthor: reply.isAuthor,
        authorImageUrl: reply.authorProfileImg,
      }));
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId
            ? { ...comment, replies: formattedReplies }
            : comment
        )
      );
    } catch (error) {
      console.error("대댓글 불러오기 실패:", error);
    }
  };

  // 부모 댓글과 대댓글 모두 불러오기
  const fetchData = async () => {
    const parentComments = await fetchParentComments();
    setComments(parentComments);
    // 모든 댓글의 대댓글 영역을 기본 접힌 상태로 설정
    const expandedState: Record<string, boolean> = {};
    parentComments.forEach((comment) => {
      expandedState[comment.id] = false;
      if (comment.childCount > 0) {
        fetchChildComments(comment.id);
      }
    });
    setExpandedReplies(expandedState);
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  // 댓글 추가, 수정, 삭제 후 전체 댓글 업데이트
  const handleAddComment = async (content: string, parentId?: string) => {
    const response = await addComment(
      Number(postId),
      content,
      parentId ? Number(parentId) : undefined
    );
    if (response.success) {
      await fetchData();
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    const response = await updateComment(Number(postId), commentId, content);
    if (response.success) {
      await fetchData();
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const response = await deleteComment(Number(postId), commentId);
    if (response.success) {
      await fetchData();
    }
  };

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

  // 토글 버튼을 통해 대댓글 영역 펼치기/접기
  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="w-full my-6 p-4">
      {/* 댓글 헤더 */}
      <h3 className="text-xl font-bold mb-4 text-gray-900">
        댓글 ({comments.length})
      </h3>

      {/* 댓글 작성 영역 */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
        <label className="block text-lg font-medium text-gray-800 mb-2">
          댓글 작성
        </label>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성해주세요"
          className="w-full p-2 border border-gray-300 rounded-md text-gray-800 bg-white"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            등록
          </button>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-700">아직 작성된 댓글이 없습니다.</p>
        )}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="w-full py-4 border-b border-gray-200"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                {comment.authorImageUrl ? (
                  <Image
                    src={comment.authorImageUrl}
                    alt={comment.author}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/default-avatar.png"
                    alt="default avatar"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* 닉네임에만 파란색 적용 */}
                    <span className="font-semibold text-lg text-blue-900">
                      {comment.author}
                    </span>
                    {comment.isAuthor && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                        작성자
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {comment.isAuthor && (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateComment(Number(comment.id), comment.content)
                          }
                          className="text-sm text-gray-500 hover:underline cursor-pointer"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteComment(Number(comment.id))}
                          className="text-sm text-red-500 hover:underline cursor-pointer"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-gray-800">{comment.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-800 mt-2">
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="inline-flex items-center hover:underline cursor-pointer"
                  >
                    답글 {comment.childCount}개{" "}
                    {expandedReplies[comment.id] ? "접기" : "보기"}
                    {expandedReplies[comment.id] ? (
                      <svg
                        className="w-4 h-4 ml-1 transform rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                  <span className="text-gray-600">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* 대댓글 영역: 토글된 경우에만 표시 */}
            {expandedReplies[comment.id] && (
              <div className="mt-4 ml-16 space-y-2">
                {comment.replies && comment.replies.length > 0 ? (
                  comment.replies.map((reply) => (
                    <div key={reply.id} className="w-full py-2 border-b border-gray-100">
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
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-blue-900">
                                {reply.author}
                              </span>
                              {reply.isAuthor && (
                                <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                                  작성자
                                </span>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleUpdateComment(Number(reply.id), reply.content)
                                }
                                className="text-sm text-gray-500 hover:underline cursor-pointer"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDeleteComment(Number(reply.id))}
                                className="text-sm text-red-500 hover:underline cursor-pointer"
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-800">{reply.content}</p>
                          <div className="flex justify-end">
                            <span className="text-xs text-gray-600">
                              {new Date(reply.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-700">
                    아직 작성된 답글이 없습니다.
                  </p>
                )}

                {/* 대댓글 입력 영역 */}
                <div className="mt-4">
                  <textarea
                    value={replyContents[comment.id] || ""}
                    onChange={(e) =>
                      setReplyContents((prev) => ({ ...prev, [comment.id]: e.target.value }))
                    }
                    placeholder="답글을 작성해주세요"
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-800 bg-white"
                    rows={2}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleReplySubmit(comment.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                    >
                      등록
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
