import { axiosInstance } from "./axiosInstance";
import { MOCK_POSTS, MOCK_HOT_POSTS } from "../mocks/fishingPostMock";

// 날짜에 따른 게시글 상태 체크
function checkPostStatus(fishingDate: string): "모집중" | "모집완료" {
  const now = new Date();
  const fishingDateTime = new Date(fishingDate);
  return fishingDateTime > now ? "모집중" : "모집완료";
}

// 게시글 상세 조회
export async function getFishingPost(postId: number) {
  try {
    // 목업 데이터에서 해당 ID 게시글 찾기
    const post = MOCK_POSTS.find((p) => p.fishingTripPostId === postId);
    if (!post) {
      throw new Error("게시글을 찾을 수 없습니다.");
    }
    // 날짜에 따라 상태 업데이트
    post.postStatus = checkPostStatus(post.fishingDate);
    return post;
  } catch (error) {
    console.error("게시글 조회 중 오류:", error);
    throw error;
  }
}

// 게시글 목록 조회
export const getFishingPosts = async (
  page = 0,
  size = 10,
  status = "모집중"
) => {
  try {
    const response = await axiosInstance.get(
      `/fishing-trip-post?page=${page}&size=${size}&status=${encodeURIComponent(
        status
      )}`
    );
    return response.data;
  } catch (error) {
    console.error("낚시 모임 목록 조회 중 오류:", error);
    return MOCK_POSTS;
  }
};

// 핫포스트 목록 조회
export const getHotFishingPosts = async () => {
  try {
    const response = await axiosInstance.get("/fishing-trip-posts/hot");
    return response.data;
  } catch (error) {
    console.error("인기 낚시 모임 목록 조회 중 오류:", error);
    return MOCK_HOT_POSTS;
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
