import { axiosInstance } from "./axiosInstance";

interface FishingTripRecruitmentRequest {
  fishingTripPostId: number;
  introduction: string;
  fishingLevel: string;
}

export const applyFishingTripRecruitment = async (params: {
  fishingTripPostId: number;
  introduction: string;
  fishingLevel: string;
}) => {
  try {
    console.log("참여 신청 API 요청:", params);
    const response = await axiosInstance.post(
      `/fishing-trip-recruitment`,
      params
    );
    return response.data;
  } catch (error) {
    console.error("참여 신청 중 오류:", error);
    throw error;
  }
};
