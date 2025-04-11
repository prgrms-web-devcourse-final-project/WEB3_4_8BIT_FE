"use client";

import { useEffect, useState } from "react";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "@/lib/api/fishingPostAPI";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";
import ReplyItem from "./ReplyItem";
import CommentForm from "./CommentForm";
import ReplyForm from "./ReplyForm";

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

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [expandedReplies, setExpandedReplies] = useState<
    Record<string, boolean>
  >({});

  // 부모 댓글 불러오기
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

  // 대댓글 불러오기
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
    // 대댓글 영역 기본 접힌 상태로 설정
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
    try {
      const response = await addComment(
        Number(postId),
        content,
        parentId ? Number(parentId) : undefined
      );
      if (response.success) {
        await fetchData();
        toast.success("댓글이 등록되었습니다.");
      } else {
        toast.error(response.message || "댓글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 추가 실패:", error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "댓글 등록 중 오류가 발생했습니다."
      );
    }
  };

  const handleUpdateComment = async (commentId: string, content: string) => {
    try {
      await updateComment(Number(postId), Number(commentId), content);
      await fetchData();
      toast.success("댓글이 수정되었습니다.");
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
      toast.error("댓글 수정에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(Number(postId), Number(commentId));
      await fetchData();
      toast.success("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      toast.error("댓글 삭제에 실패했습니다.");
    }
  };

  const handleCommentSubmit = async (content: string) => {
    await handleAddComment(content);
  };

  const handleReplySubmit = async (parentId: string, content: string) => {
    await handleAddComment(content, parentId);
  };

  // 토글 버튼으로로 대댓글 영역 펼치기/접기
  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="w-full my-6 p-4">
      <h3 className="text-xl font-bold mb-4 text-gray-900">
        댓글 ({comments.length})
      </h3>

      {/* 댓글 작성 영역 */}
      <CommentForm onSubmit={handleCommentSubmit} />

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-700">아직 작성된 댓글이 없습니다.</p>
        )}
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isAuthor={comment.isAuthor}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            onToggleReplies={toggleReplies}
            isExpanded={expandedReplies[comment.id] || false}
          >
            {expandedReplies[comment.id] && (
              <div className="ml-8 mt-2">
                {comment.replies.map((reply) => (
                  <ReplyItem
                    key={reply.id}
                    reply={reply}
                    isAuthor={reply.isAuthor}
                    onUpdate={handleUpdateComment}
                    onDelete={handleDeleteComment}
                  />
                ))}
                <div className="mt-4">
                  <ReplyForm
                    onSubmit={(content) =>
                      handleReplySubmit(comment.id, content)
                    }
                    placeholder="댓글을 입력하세요."
                    buttonText="댓글 작성"
                  />
                </div>
              </div>
            )}
          </CommentItem>
        ))}
      </div>
    </div>
  );
}
