import { axiosInstance } from "./axiosInstance";
import { MOCK_HOT_POSTS } from "../mocks/fishingPostMock";

const API_BASE_URL = "https://api.mikki.kr/api/v1";

// 게시글 목록 조회 (스크롤 기반)
export const getFishingPosts = async (params: {
  order: string;
  sort: string;
  type: string;
  fieldValue: string;
  id: number;
  size: number;
}) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/fishing-trip-post/scroll`,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch fishing posts.", error);
    throw error;
  }
};

// 핫포스트 목록 조회 (목업 데이터 사용)
export const getHotFishingPosts = async () => {
  return MOCK_HOT_POSTS;
};

// 게시글 상세 조회
export const getFishingPost = async (postId: number) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/fishing-trip-post`,
      {
        params: { id: postId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch post details.", error);
    throw error;
  }
};

// 게시글 작성 인터페이스
interface CreateFishingPostParams {
  subject: string;
  content: string;
  recruitmentCount: number;
  isShipFish: boolean;
  fishingDate: string;
  fishingPointId: number;
  fileIdList: number[];
}

// 게시글 작성
export const createFishingPost = async (postData: CreateFishingPostParams) => {
  try {
    const response = await axiosInstance.post("/fishing-trip-post", postData);
    return response.data;
  } catch (error) {
    console.error("게시글 작성 중 오류:", error);
    throw error;
  }
};

// 게시글 수정
export const updateFishingPost = async (
  postId: number,
  postData: Partial<CreateFishingPostParams>
) => {
  try {
    const response = await axiosInstance.patch(
      `/fishing-trip-post/${postId}`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("게시글 수정 중 오류:", error);
    throw error;
  }
};

// Fetch region data
export const getRegions = async () => {
  try {
    const response = await axiosInstance.get("/regions");
    return response.data;
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
};

// Fetch fishing point data
export const getFishingPoints = async () => {
  try {
    const response = await axiosInstance.get("/fishing-points");
    return response.data;
  } catch (error) {
    console.error("Error fetching fishing points:", error);
    throw error;
  }
};

// 게시글 목록 조회 (커서 기반)
export const getFishingPostsByCursor = async (cursorRequest: {
  order: string;
  sort: string;
  type: string;
  fieldValue: string;
  id: number;
  size: number;
  status: string;
}) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/fishing-trip-post/scroll`,
      {
        params: cursorRequest,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts by cursor.", error);
    throw error;
  }
};
