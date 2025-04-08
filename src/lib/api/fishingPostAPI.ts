import { axiosInstance } from "./axiosInstance";
import { MOCK_POSTS, MOCK_HOT_POSTS } from "../mocks/fishingPostMock";

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

// 게시글 상세 조회 (목업 데이터 사용)
export const getFishingPost = async (postId: number) => {
  const post = MOCK_POSTS.find((p) => p.data.fishingTripPostId === postId);
  if (!post) {
    const hotPost = MOCK_HOT_POSTS.find(
      (p) => p.data.fishingTripPostId === postId
    );
    if (!hotPost) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }
    return hotPost;
  }
  return post;
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
