import { axiosInstance } from "./axiosInstance";

interface CreateFishingPostParams {
  subject: string;
  content: string;
  fishingDate: string;
  fishingPointId: number;
  recruitmentCount: number;
  isShipFish: boolean;
  fileIdList: number[];
}

export async function createFishingPost(postData: CreateFishingPostParams) {
  try {
    const response = await axiosInstance.post("/fishing-trip-post", postData);
    return response.data;
  } catch (error) {
    console.error("동출 모집 게시글 생성 중 오류:", error);
    throw error;
  }
}
