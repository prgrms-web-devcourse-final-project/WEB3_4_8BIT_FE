import { axiosInstance } from "./axiosInstance";
import { AxiosError } from "axios";

export type LikeTargetType =
  | "SHIP_FISHING_POST"
  | "FISHING_TRIP_POST"
  | "COMMENT";

interface ToggleLikeRequest {
  targetType: LikeTargetType;
  targetId: number;
}

interface LikeResponse {
  success: boolean;
  data?: {
    isLiked: boolean;
  };
  message?: string;
}

export const toggleLike = async (
  params: ToggleLikeRequest
): Promise<LikeResponse> => {
  try {
    const response = await axiosInstance.post("/likes/toggle", params);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "좋아요 처리 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
};
