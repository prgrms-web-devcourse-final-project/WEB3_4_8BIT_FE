import { axiosInstance } from "./axiosInstance";
import { MOCK_POSTS, MOCK_HOT_POSTS } from "../mocks/fishingPostMock";
import axios from "axios";

const API_BASE_URL = "https://api.mikki.kr/api/v1";

// 날짜에 따른 게시글 상태 체크
function checkPostStatus(fishingDate: string): "모집중" | "모집완료" {
  const now = new Date();
  const fishingDateTime = new Date(fishingDate);
  return fishingDateTime > now ? "모집중" : "모집완료";
}

// 게시글 목록 조회 (목업 데이터 사용)
export const getFishingPosts = async () => {
  return MOCK_POSTS;
};

// 핫포스트 목록 조회 (목업 데이터 사용)
export const getHotFishingPosts = async () => {
  return MOCK_HOT_POSTS;
};

// 게시글 상세 조회
export const getFishingPost = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fishing-trip-post`, {
      params: { id: postId },
      headers: {
        accept: "*/*",
        Authorization:
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQxNjg1NjIsImV4cCI6MTc0NDI1NDk2Mn0.iT-Zv_SvmTPi9E6xz69PR6GAWCXXyAcE3s7fId1yB5gqFEqJs1RNsgieOSsLnP8N5tkhsN1gY9yT2QXdghC9Gg",
      },
    });
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
  // 임시 하드코딩된 지역 데이터
  return [
    { id: 1, name: "서울" },
    { id: 2, name: "부산" },
    { id: 3, name: "인천" },
    { id: 4, name: "대구" },
    { id: 5, name: "광주" },
  ];
};

// Fetch fishing point data
export const getFishingPoints = async () => {
  // 임시 하드코딩된 낚시 포인트 데이터
  return [
    { id: 1, name: "여의도 낚시터", regionId: 1 },
    { id: 2, name: "송도 낚시터", regionId: 3 },
    { id: 3, name: "부산 해운대 낚시터", regionId: 2 },
    { id: 4, name: "인천 송도 낚시터", regionId: 3 },
    { id: 5, name: "대구 달성 낚시터", regionId: 4 },
  ];
};
