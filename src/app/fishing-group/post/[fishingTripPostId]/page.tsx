import PostDetailContent from "../components/PostDetailContent";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ fishingTripPostId: string }>;
}) {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.fishingTripPostId);
  return <PostDetailContent postId={postId} />;
}

// 이 주석은 해당 API를 사용하는 예제 코드입니다.
// 참고용으로만 사용하세요. 실제 구현은 PostDetailContent 컴포넌트에 있습니다.

/*
// 참여 정보를 가져오는 예시 코드
import { useEffect, useState } from "react";
import { getPostParticipation, PostParticipationInfo } from "@/lib/api/fishingPostAPI";

// 컴포넌트 내부
const fetchParticipationInfo = async (postId: number) => {
  try {
    const response = await getPostParticipation(postId);
    
    if (response.success) {
      const participationInfo = response.data;
      
      // 사용자가 작성자인지 확인
      const isOwner = participationInfo.isCurrentUserOwner;
      
      // 사용자가 참여 신청했는지 확인
      const isApplicant = participationInfo.isApplicant;
      
      // 참여자 목록 가져오기
      const participants = participationInfo.participants;
      
      console.log("현재 사용자가 작성자인가요?", isOwner);
      console.log("현재 사용자가 참여 신청했나요?", isApplicant);
      console.log("참여자 목록:", participants);
      
      // 작성자인 경우에만 수정/삭제 버튼 표시
      if (isOwner) {
        // 수정/삭제 버튼 표시 로직
      }
      
      // 참여자 수 표시
      const currentCount = participationInfo.currentCount;
      const recruitmentCount = participationInfo.recruitmentCount;
      
      // 모집 상태 표시
      const postStatus = participationInfo.postStatus;
      // RECRUITING: 모집중, COMPLETED: 모집완료
    }
  } catch (error) {
    console.error("참여 정보 조회 중 오류 발생:", error);
  }
};

// useEffect에서 API 호출
useEffect(() => {
  fetchParticipationInfo(postId);
}, [postId]);
*/
