import { apiInstance } from "./apiInstance";

export async function getFishingReviewAPI(
  id: number,
  params?: {
    order?: "asc" | "desc";
    sort?: string;
    type?: "next" | "prev";
    fieldValue?: string;
    id?: number;
    size?: number;
  }
): Promise<FishingReviewAPIResponse> {
  const query = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, String(value));
      }
    });
  }

  const res = await apiInstance.get(
    `/ship-posts/${id}/reviews?${query.toString()}`
  );
  return res.data;
}

export interface FishingReview {
  reviewId: number;
  rating: number;
  content: string;
  fileUrlList: string[];
  shipFishingPostId: number;
  memberId: number;
  profileImg: string;
  isAuthor: boolean;
  createdAt: string;
  nickname: string;
}

export interface FishingReviewAPIResponse {
  timestamp: string;
  data: {
    content: FishingReview[];
    pageSize: number;
    numberOfElements: number;
    isFirst: boolean;
    isLast: boolean;
  };
  success: boolean;
}
