import { axiosInstance } from "./axiosInstance";

interface FishingTripRecruitmentRequest {
  fishingTripPostId: number;
  introduction: string;
  fishingLevel: string;
}

export const applyFishingTripRecruitment = async (
  data: FishingTripRecruitmentRequest
) => {
  try {
    // 실제 API 연동 전까지 목업 응답 사용
    // const response = await axiosInstance.post("/fishing-trip-recruitment", data);
    // return response.data;

    // 목업 응답
    return {
      data: {
        ...data,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      },
      message: "참여 신청이 완료되었습니다.",
      success: true,
    };
  } catch (error) {
    console.error("참여 신청 중 오류:", error);
    throw error;
  }
};
