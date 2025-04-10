import { axiosInstance } from "./axiosInstance";
import { MOCK_HOT_POSTS } from "../mocks/fishingPostMock";

const API_BASE_URL = "https://api.mikki.kr/api/v1";

// API 응답 데이터 구조 정의
export interface Post {
  fishingTripPostId: number;
  name: string;
  subject: string;
  content: string;
  currentCount: number;
  recruitmentCount: number;
  createDate: string;
  fishingDate: string;
  fishPointDetailName: string;
  fishPointName: string;
  longitude: number;
  latitude: number;
  fileUrlList: string[];
  imageUrl?: string;
  postStatus: "RECRUITING" | "COMPLETED";
}

export interface ApiResponseData {
  content: Post[];
  last: boolean;
  // ... 기타 필요한 페이지 정보
}

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

// 게시글 수정 파라미터 인터페이스
interface UpdateFishingPostParams
  extends Omit<CreateFishingPostParams, "fishingPointId"> {
  fishingTripPostId: number;
  fishingPointId: number;
  regionId: number;
}

// 게시글 수정
export const updateFishingPost = async (postData: UpdateFishingPostParams) => {
  try {
    const { fishingTripPostId, ...updateData } = postData;
    console.log(`수정 요청 URL: /fishing-trip-post/${fishingTripPostId}`);
    console.log("수정 요청 데이터:", updateData);

    // axios.patch의 URL을 직접 설정
    const url = `/fishing-trip-post/${fishingTripPostId}`;
    console.log("최종 요청 URL:", url);

    const response = await axiosInstance.patch(url, updateData);
    console.log("게시글 수정 응답:", response.data);
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

// 게시글 목록 조회 (커서 기반) 파라미터 타입 정의
export interface CursorRequestParams {
  order: string;
  sort: string;
  type: string;
  fieldValue: string | null;
  id: number | null;
  size: number;
  status?: string;
  keyword?: string;
}

export const getFishingPostsByCursor = async (
  cursorRequest: CursorRequestParams
) => {
  try {
    // null 값 파라미터 제외
    const filteredParams = Object.fromEntries(
      Object.entries(cursorRequest).filter(([, v]) => v != null)
    ); // _ 대신 빈 배열 요소 사용

    const response = await axiosInstance.get(
      `${API_BASE_URL}/fishing-trip-post/scroll`,
      {
        params: filteredParams,
      }
    );
    // 응답 타입 명시 (예시, 실제 API 응답 구조에 맞게 조정 필요)
    return response.data as { success: boolean; data: ApiResponseData };
  } catch (error) {
    console.error("Failed to fetch posts by cursor.", error);
    throw error;
  }
};
