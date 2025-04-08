/**
 * 낚시 동출 게시글 관련 API 함수
 */

import { MOCK_POSTS, MOCK_HOT_POSTS } from "@/lib/mocks/fishingPostMock";

// API 기본 URL 및 공통 설정
const API_BASE_URL = "https://api.mikki.kr";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQwNzEyMzMsImV4cCI6MTc0NDE1NzYzM30.t3xpBK1sryN1Vp8_7JQPaipsaco2PG49P07Bpf2xheo7-F_F7943p3H8L1Irg7VtmZNJVeBZHYhBKNKIAR4Dpw";

// 날짜에 따른 게시글 상태 체크
function checkPostStatus(fishingDate: string): "모집중" | "모집완료" {
  const now = new Date();
  const fishingDateTime = new Date(fishingDate);
  return fishingDateTime > now ? "모집중" : "모집완료";
}

// 게시글 상세 조회
export async function getFishingPost(postId: number) {
  try {
    // 목업 데이터에서 해당 ID의 게시글 찾기
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
export async function getFishingPosts() {
  try {
    // 목업 데이터의 상태를 현재 날짜 기준으로 업데이트
    const updatedPosts = MOCK_POSTS.map((post) => ({
      ...post,
      postStatus: checkPostStatus(post.fishingDate),
    }));
    return updatedPosts;
  } catch (error) {
    console.error("게시글 목록 조회 중 오류:", error);
    throw error;
  }
}

// 핫포스트 목록 조회
export async function getHotFishingPosts() {
  try {
    // 목업 데이터의 상태를 현재 날짜 기준으로 업데이트
    const updatedHotPosts = MOCK_HOT_POSTS.map((post) => ({
      ...post,
      postStatus: checkPostStatus(post.fishingDate),
    }));
    return updatedHotPosts;
  } catch (error) {
    console.error("핫포스트 목록 조회 중 오류:", error);
    throw error;
  }
}

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
export async function createFishingPost(postData: CreateFishingPostParams) {
  if (!ACCESS_TOKEN) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/fishing-trip-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ACCESS_TOKEN,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("게시글 작성 실패:", error);
      throw new Error("게시글 작성에 실패했습니다.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("요청 중 오류 발생:", error);
    throw error;
  }
}

// 게시글 수정
export async function updateFishingPost(
  postId: number,
  postData: {
    subject?: string;
    content?: string;
    fishingDate?: string;
    fishingPointId?: number;
    recruitmentCount?: number;
    isShipFish?: boolean;
    fileIdList?: number[];
  }
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/fishing-trip-post/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN,
        },
        body: JSON.stringify(postData),
      }
    );

    if (!response.ok) {
      throw new Error(`게시글 수정 실패: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "게시글 수정에 실패했습니다.");
    }

    return data.data;
  } catch (error) {
    console.error("게시글 수정 중 오류:", error);
    throw error;
  }
}

// 게시글 삭제
export async function deleteFishingPost(postId: number) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/fishing-trip-post/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`게시글 삭제 실패: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "게시글 삭제에 실패했습니다.");
    }

    return data.data;
  } catch (error) {
    console.error("게시글 삭제 중 오류:", error);
    throw error;
  }
}
