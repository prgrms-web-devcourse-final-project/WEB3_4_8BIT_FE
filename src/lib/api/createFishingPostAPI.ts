import { axiosInstance } from "./axiosInstance";

interface CreateFishingPostRequest {
  subject: string;
  content: string;
  fishingDate: string;
  fishPointName: string;
  fishPointDetailName: string;
  recruitmentCount: number;
  fileUrlList: string[];
}

export const createFishingPost = async (data: CreateFishingPostRequest) => {
  try {
    const response = await axiosInstance.post("/fishing-trip-posts", data);
    return response.data;
  } catch (error) {
    console.error("동출 모집 게시글 생성 중 오류:", error);
    throw error;
  }
};
