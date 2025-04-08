import { axiosInstance } from "./axiosInstance";

interface CreateFishingPostParams {
  subject: string;
  content: string;
  recruitmentCount: number;
  isShipFish: boolean;
  fishingDate: string;
  fishingPointId: number;
  fileIdList: number[];
}

export async function createFishingPost(postData: CreateFishingPostParams) {
  try {
    const response = await axiosInstance.post("/fishing-trip-post", postData);
    return response.data;
  } catch (error) {
    console.error("요청 중 오류 발생:", error);
    throw error;
  }
}
