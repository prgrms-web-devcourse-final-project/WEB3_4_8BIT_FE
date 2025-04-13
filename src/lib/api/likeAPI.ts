import { axiosInstance } from "./axiosInstance";
import { AxiosError } from "axios";

export type LikeTargetType = "SHIP_FISHING_POST" | "FISHING_TRIP_POST";

interface ToggleLikeRequest {
  targetType: LikeTargetType;
  targetId: number;
}

interface UpdateLikeCountRequest {
  targetType: LikeTargetType;
  targetId: number;
  increment: boolean; // true면 증가, false면 감소
}

interface LikeResponse {
  success: boolean;
  data?: {
    isLiked: boolean;
  };
  message?: string;
}

interface LikeCountResponse {
  success: boolean;
  data?: number;
  message?: string;
}

interface CursorRequestDto {
  order: "desc" | "asc";
  sort: string;
  type: "next" | "prev";
  fieldValue: string;
  id: number;
  size: number;
}

interface PaginatedResponse<T> {
  content: T[];
  pageSize: number;
  numberOfElements: number;
  isFirst: boolean;
  isLast: boolean;
}

interface BasePaginatedApiResponse<T> {
  success: boolean;
  data?: PaginatedResponse<T>;
  message?: string;
}

/**
 * 좋아요 토글 API
 * 게시글에 대한 좋아요를 추가하거나 제거
 * @param params - targetType: 좋아요 대상 타입 (선상낚시 게시글/동출 모집 게시글), targetId: 대상 ID
 */
export const toggleLike = async (
  params: ToggleLikeRequest
): Promise<LikeResponse> => {
  try {
    const response = await axiosInstance.post("/likes/toggle", params);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "좋아요 처리 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
};

/**
 * 좋아요한 게시글 개수 조회 API
 * 로그인한 사용자가 종류별로 좋아요한 게시글의 개수를 조회
 * @param targetType - 조회할 게시글 종류 (선상낚시 게시글/동출 모집 게시글)
 */
export const getLikeCount = async (
  targetType: LikeTargetType
): Promise<LikeCountResponse> => {
  try {
    const response = await axiosInstance.get(
      `/likes/count?targetType=${targetType}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data.message ||
          "좋아요 개수 조회 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
};

/**
 * 좋아요한 동출 모집 게시글 목록 조회 API
 * 로그인한 사용자가 좋아요한 동출 모집 게시글을 최신순으로 조회
 * @param params - 페이지네이션 파라미터 (정렬 순서, 페이지 크기 등)
 */
export const getLikedFishingTripPosts = async <T>(
  params: CursorRequestDto
): Promise<BasePaginatedApiResponse<T>> => {
  try {
    const queryParams = new URLSearchParams({
      order: params.order,
      sort: params.sort,
      type: params.type,
      fieldValue: params.fieldValue,
      id: params.id.toString(),
      size: params.size.toString(),
    });

    const response = await axiosInstance.get(
      `/likes/fishing-trip-post?${queryParams}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data.message ||
          "좋아요한 동출 모집 게시글 조회 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
};

/**
 * 좋아요한 선상 낚시 게시글 목록 조회 API
 * 로그인한 사용자가 좋아요한 선상 낚시 게시글을 최신순으로 조회
 * @param params - 페이지네이션 파라미터 (정렬 순서, 페이지 크기 등)
 */
export const getLikedShipFishingPosts = async <T>(
  params: CursorRequestDto
): Promise<BasePaginatedApiResponse<T>> => {
  try {
    const queryParams = new URLSearchParams({
      order: params.order,
      sort: params.sort,
      type: params.type,
      fieldValue: params.fieldValue,
      id: params.id.toString(),
      size: params.size.toString(),
    });

    const response = await axiosInstance.get(
      `/likes/ship-fishing-post?${queryParams}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data.message ||
          "좋아요한 선상 낚시 게시글 조회 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
};

/**
 * 좋아요 카운트 갱신 API
 * 게시글의 좋아요 카운트를 증가 또는 감소
 * @param params - targetType: 좋아요 대상 타입, targetId: 대상 ID, increment: 증가 여부
 */
export const updateLikeCount = async (
  params: UpdateLikeCountRequest
): Promise<LikeCountResponse> => {
  try {
    const response = await axiosInstance.post("/likes/update-count", params);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data.message ||
          "좋아요 카운트 갱신 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      message: "네트워크 오류가 발생했습니다.",
    };
  }
};
