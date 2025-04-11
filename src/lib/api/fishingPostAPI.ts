import { axiosInstance } from "@/lib/api/axiosInstance";
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

// PostCard 컴포넌트에서 사용하는 인터페이스
export interface PostCardProps {
  fishingTripPostId: number;
  title: string;
  content: string;
  date: string;
  location: string;
  recruitmentCount: number;
  fishPointName: string;
  fileUrlList?: string[];
  imageUrl?: string;
  postStatus: string;
  latitude?: number;
  longitude?: number;
  regionType?: string;
}

export interface ApiResponseData {
  content: Post[];
  last: boolean;
}

// 게시글 목록 조회
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
  fileIdList?: number[];
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
  fileIdList?: number[];
}

// 게시글 수정
export const updateFishingPost = async (postData: UpdateFishingPostParams) => {
  try {
    const { fishingTripPostId, ...updateData } = postData;
    console.log(`📝 수정 요청 URL: /fishing-trip-post/${fishingTripPostId}`);
    console.log("📝 수정 요청 데이터:", updateData);

    // 필수 필드 확인
    const requiredFields = [
      "subject",
      "content",
      "recruitmentCount",
      "fishingDate",
      "fishingPointId",
      "regionId",
    ] as const;
    const missingFields = requiredFields.filter((field) => {
      const value = updateData[field as keyof typeof updateData];
      return value === undefined || value === null;
    });

    if (missingFields.length > 0) {
      console.error("❌ 필수 필드 누락:", missingFields);
      throw new Error(
        `필수 필드가 누락되었습니다: ${missingFields.join(", ")}`
      );
    }

    // fileIdList가 빈 배열이면 제거 (API에 따라 필요할 수 있음)
    if (updateData.fileIdList && updateData.fileIdList.length === 0) {
      console.log("⚠️ fileIdList가 비어있어 요청에서 제외합니다");
      delete updateData.fileIdList;
    }

    // axios.patch의 URL을 직접 설정
    const url = `/fishing-trip-post/${fishingTripPostId}`;
    console.log("📝 최종 요청 URL:", url);
    console.log("📝 최종 요청 데이터:", JSON.stringify(updateData));

    const response = await axiosInstance.patch(url, updateData);
    console.log("📝 게시글 수정 응답:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("❌ 게시글 수정 중 오류:", error);
    throw error;
  }
};

// Fetch region data
export const getRegions = async () => {
  try {
    const response = await axiosInstance.get("/regions");
    console.log("지역 데이터 API 응답:", response.data);
    if (
      response.data &&
      response.data.success &&
      Array.isArray(response.data.data)
    ) {
      return response.data;
    } else {
      throw new Error("Invalid regions data format");
    }
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
  regionId?: string;
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

// 게시글 참여 정보 인터페이스
export interface PostParticipationInfo {
  fishingTripPostId: number;
  recruitmentCount: number;
  currentCount: number;
  postStatus: string; // "RECRUITING", "COMPLETED"
  isApplicant: boolean;
  isCurrentUserOwner: boolean;
  postOwnerId: number;
  ownerNickname: string | null;
  ownerProfileImageUrl: string | null;
  participants: Array<{
    memberId: number;
    nickname: string;
    profileImageUrl: string | null;
  }>;
}

// 게시글 참여 정보 조회
export const getPostParticipation = async (fishingTripPostId: number) => {
  try {
    console.log(
      `📊 게시글 참여 정보 조회 요청: fishingTripPostId=${fishingTripPostId}`
    );

    const response = await axiosInstance.get(
      `/fishing-trip-post/participation`,
      {
        params: { fishingTripPostId },
      }
    );

    console.log("📊 게시글 참여 정보 응답:", response.data);

    // 응답 데이터 구조 확인 및 로깅
    if (response.data && response.data.data) {
      console.log(
        "📊 응답 데이터 구조:",
        JSON.stringify(response.data.data, null, 2)
      );
    }

    return response.data as {
      timestamp: string;
      success: boolean;
      data: PostParticipationInfo;
    };
  } catch (error) {
    console.error("❌ 게시글 참여 정보 조회 중 오류:", error);
    throw error;
  }
};

// 게시글 삭제
export const deleteFishingPost = async (fishingTripPostId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/fishing-trip-post/${fishingTripPostId}`
    );
    console.log("게시글 삭제 성공:", response.data);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("게시글 삭제 실패:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
    };
  }
};

export const addComment = async (
  fishingTripPostId: number,
  content: string,
  parentId?: number
) => {
  try {
    const response = await axiosInstance.post(
      `/fishing-trip-post/${fishingTripPostId}/comment`,
      {
        content,
        parentId: parentId || null,
      }
    );
    console.log("댓글 추가 성공:", response.data);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("댓글 추가 실패:", error as Error);
    return { success: false, message: (error as Error).message };
  }
};

export const updateComment = async (
  fishingTripPostId: number,
  commentId: number,
  content: string
) => {
  try {
    const response = await axiosInstance.patch(
      `/fishing-trip-post/${fishingTripPostId}/comment/${commentId}`,
      {
        content,
      }
    );
    console.log("댓글 수정 성공:", response.data);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("댓글 수정 실패:", error as Error);
    return { success: false, message: (error as Error).message };
  }
};

export const deleteComment = async (
  fishingTripPostId: number,
  commentId: number
) => {
  try {
    const response = await axiosInstance.delete(
      `/fishing-trip-post/${fishingTripPostId}/comment/${commentId}`
    );
    console.log("댓글 삭제 성공:", response.data);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("댓글 삭제 실패:", error as Error);
    return { success: false, message: (error as Error).message };
  }
};

export const getComments = async (fishingTripPostId: number) => {
  try {
    console.log(`댓글 조회 시작: fishingTripPostId=${fishingTripPostId}`);
    const response = await axiosInstance.get(
      `/fishing-trip-post/${fishingTripPostId}/comment`,
      {
        params: {
          size: 10,
          order: "asc",
          sort: "createdAt",
        },
      }
    );
    console.log("전체 응답 데이터:", response.data);
    console.log("댓글 조회 성공:", response.data.data.content);
    return response.data.data.content;
  } catch (error: unknown) {
    console.error("댓글 불러오기 실패:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred");
  }
};
