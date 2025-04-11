import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addComment,
  updateComment,
  deleteComment,
} from "@/lib/api/fishingPostAPI";
import { Comment } from "@/types/comment";

interface UseCommentMutationsProps {
  postId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setExpandedReplies: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  fetchData: () => Promise<void>;
}

export function useCommentMutations({
  postId,
  setComments,
  setExpandedReplies,
  fetchData,
}: UseCommentMutationsProps) {
  const queryClient = useQueryClient();

  // 댓글 추가 mutation
  const addCommentMutation = useMutation({
    mutationFn: async ({
      content,
      parentId,
    }: {
      content: string;
      parentId?: string;
    }) => {
      const response = await addComment(
        Number(postId),
        content,
        parentId ? Number(parentId) : undefined
      );
      if (!response.success) {
        throw new Error(response.message || "댓글 등록에 실패했습니다.");
      }
      return { response, parentId };
    },
    onSuccess: ({ parentId }) => {
      toast.success("댓글이 등록되었습니다.");

      // 답글인 경우 해당 댓글의 답글 목록을 펼침
      if (parentId) {
        // 먼저 토글 상태를 업데이트
        setExpandedReplies((prev) => ({
          ...prev,
          [parentId]: true,
        }));

        fetchData();
      } else {
        fetchData();
      }

      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error: Error) => {
      console.error("댓글 추가 실패:", error);
      toast.error(error.message || "댓글 등록 중 오류가 발생했습니다.");
    },
  });

  // 댓글 수정 mutation
  const updateCommentMutation = useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      const response = await updateComment(
        Number(postId),
        Number(commentId),
        content
      );
      if (!response.success) {
        throw new Error(response.message || "댓글 수정에 실패했습니다.");
      }
      return response;
    },
    onSuccess: () => {
      toast.success("댓글이 수정되었습니다.");

      // 댓글 목록 다시 불러오기
      fetchData();

      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error: Error) => {
      console.error("댓글 수정 중 오류 발생:", error);
      toast.error(error.message || "댓글 수정에 실패했습니다.");
    },
  });

  // 댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await deleteComment(Number(postId), Number(commentId));
      if (!response.success) {
        throw new Error(response.message || "댓글 삭제에 실패했습니다.");
      }
      return response;
    },
    onSuccess: (_, commentId) => {
      toast.success("댓글이 삭제되었습니다.");

      // 답글인 경우 해당 댓글의 답글 목록 업데이트
      setComments((prevComments) => {
        return prevComments
          .map((comment) => {
            // 답글을 삭제한 경우
            if (comment.replies.some((reply) => reply.id === commentId)) {
              return {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== commentId
                ),
                childCount: comment.childCount - 1,
              };
            }
            // 댓글 자체를 삭제한 경우
            if (comment.id === commentId) {
              return null;
            }
            return comment;
          })
          .filter(Boolean) as Comment[];
      });

      fetchData();

      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error: Error) => {
      console.error("댓글 삭제 중 오류 발생:", error);
      toast.error(error.message || "댓글 삭제에 실패했습니다.");
    },
  });

  // 핸들러 함수들
  const handleAddComment = async (content: string, parentId?: string) => {
    addCommentMutation.mutate({
      content,
      parentId: parentId ? parentId : undefined,
    });
  };

  const handleUpdateComment = async (commentId: string, content: string) => {
    updateCommentMutation.mutate({ commentId, content });
  };

  const handleDeleteComment = async (commentId: string) => {
    deleteCommentMutation.mutate(commentId);
  };

  const handleCommentSubmit = async (content: string) => {
    await handleAddComment(content);
  };

  const handleReplySubmit = async (parentId: string, content: string) => {
    try {
      await handleAddComment(content, parentId);
    } catch (error) {
      console.error("답글 작성 중 오류 발생:", error);
      toast.error("답글 작성에 실패했습니다.");
    }
  };

  return {
    addCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
    handleCommentSubmit,
    handleReplySubmit,
  };
}
