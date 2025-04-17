"use client";

import { useEffect, useState } from "react";
import { getComments } from "@/lib/api/fishingPostAPI";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";
import ReplyItem from "./ReplyItem";
import CommentForm from "./CommentForm";
import { useCommentMutations } from "../hooks/useCommentMutations";

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
  const [totalCommentCount, setTotalCommentCount] = useState(0);

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

      // 기존 댓글 목록을 유지하면서 특정 댓글의 답글만 업데이트
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId
            ? { ...comment, replies: formattedReplies }
            : comment
        )
      );

      // 총 댓글 수 업데이트
      setTotalCommentCount((prev) => {
        const parentComment = comments.find((c: Comment) => c.id === parentId);
        if (parentComment) {
          return prev - parentComment.replies.length + formattedReplies.length;
        }
        return prev;
      });
    } catch (error) {
      console.error("대댓글 불러오기 실패:", error);
    }
  };

  // 부모 댓글과 대댓글 모두 불러오기
  const fetchData = async () => {
    const parentComments = await fetchParentComments();
    let totalCount = parentComments.length;

    // 기존 댓글 목록과 새 댓글 목록을 비교하여 변경된 부분만 업데이트
    setComments((prevComments) => {
      // 새 댓글 목록에서 기존 댓글의 답글 정보를 유지
      const updatedComments = parentComments.map((newComment) => {
        const existingComment = prevComments.find(
          (c) => c.id === newComment.id
        );
        return existingComment
          ? { ...newComment, replies: existingComment.replies }
          : newComment;
      });

      return updatedComments;
    });

    // 대댓글이 있는 댓글들의 답글을 불러옵니다
    for (const comment of parentComments) {
      if (comment.childCount > 0) {
        await fetchChildComments(comment.id);
        totalCount += comment.childCount;
      }
    }

    setTotalCommentCount(totalCount);
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  // 커스텀 훅을 사용하여 mutation 로직 분리
  const {
    handleCommentSubmit,
    handleReplySubmit,
    handleUpdateComment,
    handleDeleteComment,
  } = useCommentMutations({
    postId,
    setComments,
    setExpandedReplies,
    fetchData,
  });

  // 토글 버튼으로 대댓글 영역 펼치기/접기
  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="w-full my-6 p-4">
      <h3 className="text-xl font-bold mb-4 text-gray-900">
        댓글 ({totalCommentCount})
      </h3>

      {/* 댓글 작성 영역 */}
      <CommentForm onSubmit={handleCommentSubmit} />

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <p className="text-gray-700 text-center">
              아직 작성된 댓글이 없습니다.
            </p>
          </div>
        )}
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isAuthor={comment.isAuthor}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            onToggleReplies={toggleReplies}
            onAddReply={handleReplySubmit}
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
              </div>
            )}
          </CommentItem>
        ))}
      </div>
    </div>
  );
}
