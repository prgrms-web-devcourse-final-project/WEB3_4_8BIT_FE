import {
  BoatInfo,
  BoatInputData,
  NormalUserInputData,
  User,
  UserActivityHistory,
  UserReservationInfo,
  UserReviewInput,
  UserWrittenGroupFishing,
} from "@/types/user.interface";
import { apiInstance } from "@/lib/api/apiInstance";
import { APIResponse, PostAPIResponse } from "@/lib/api/fishAPI";

// 사용자 관련 API 클래스
export class UserAPI {
  public static async getMemberInfo(): Promise<User> {
    try {
      const response = await apiInstance.get<APIResponse<User>>("/members");
      return response.data.data;
    } catch (error) {
      console.error("getMemberInfo error:", error);
      throw error;
    }
  }

  public static async postLogout(): Promise<boolean> {
    try {
      await apiInstance.get("/api/auth/logout");
      return true;
    } catch (error) {
      console.error("postLogout error:", error);
      throw error;
    }
  }

  public static async postMemberInfo(
    userInput: NormalUserInputData
  ): Promise<APIResponse<unknown>> {
    try {
      const response = await apiInstance.post("/members", userInput);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public static async patchMemberInfo(
    userInput: NormalUserInputData
  ): Promise<PostAPIResponse> {
    try {
      const response = await apiInstance.patch<PostAPIResponse>(
        "/members",
        userInput
      );
      return response.data;
    } catch (error) {
      console.error("patchMemberInfo error:", error);
      throw error;
    }
  }

  public static async getCaptainMemberInfo(data: unknown) {}

  public static async postCaptainMemberInfo(
    boatInput: BoatInputData
  ): Promise<APIResponse<unknown>> {
    try {
      const response = await apiInstance.post("/members/captains", boatInput);
      return response.data;
    } catch (error) {
      console.error("postCaptainMemberInfo error:", error);
      throw error;
    }
  }

  public static async patchCaptainMemberInfo(data: unknown) {}

  public static async postCaptainBoatInfo(boat: BoatInfo) {
    try {
      const response = await apiInstance.post("/ship", boat);
      return response.headers;
    } catch (error) {
      console.error("postCaptainBoatInfo error:", error);
      throw error;
    }
  }

  public static async deleteUserReview(
    reviewId: number
  ): Promise<PostAPIResponse> {
    try {
      const response = await apiInstance.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error("deleteUserReview error:", error);
      throw error;
    }
  }

  public static async getUserBoatReservation(
    afterToday: boolean,
    isConfirm: boolean
  ): Promise<UserReservationInfo[]> {
    try {
      const response = await apiInstance.get<
        APIResponse<{ content: UserReservationInfo[] }>
      >("/reservations/members", {
        params: {
          afterToday: afterToday,
          isConfirm: isConfirm,
          sort: "createdAt",
          size: 10,
        },
      });
      return response.data.data.content;
    } catch (error) {
      console.error("getUserBoatReservation error:", error);
      throw error;
    }
  }

  public static async deleteUserBoatReservation(
    reservationId: number
  ): Promise<PostAPIResponse> {
    try {
      const response = await apiInstance.patch<PostAPIResponse>(
        `/reservations/${reservationId}`
      );
      return response.data;
    } catch (error) {
      console.error("deleteUserBoatReservation error:", error);
      throw error;
    }
  }

  public static async postUserBoatReservationReview(
    reservationId: number,
    reviewInput: UserReviewInput
  ): Promise<PostAPIResponse> {
    try {
      const response = await apiInstance.post<PostAPIResponse>(
        `/reservations/${reservationId}/reviews`,
        reviewInput
      );
      return response.data;
    } catch (error) {
      console.error("review submit error:", error);
      throw error;
    }
  }

  public static async getUserGroupFish(
    status: "RECRUITING" | "COMPLETED"
  ): Promise<UserWrittenGroupFishing[]> {
    try {
      const response = await apiInstance.get<
        APIResponse<{ content: UserWrittenGroupFishing[] }>
      >(`/fishing-trip-post/my-post`, {
        params: {
          status: status,
          size: 20,
          sort: "createdAt",
        },
      });
      return response.data.data.content;
    } catch (error) {
      console.error("getUserGroupFishPost error:", error);
      throw error;
    }
  }

  public static async deleteUserGroupFish(
    fishingTripPostId: number
  ): Promise<PostAPIResponse> {
    try {
      const response = await apiInstance.delete<PostAPIResponse>(
        `/fishing-trip-post/${fishingTripPostId}`
      );
      return response.data;
    } catch (error) {
      console.error("deleteUserGroupFish error:", error);
      throw error;
    }
  }

  public static async getUserParticipateGroupFish(
    status: "RECRUITING" | "COMPLETED"
  ): Promise<UserWrittenGroupFishing[]> {
    try {
      const response = await apiInstance.get<
        APIResponse<{ content: UserWrittenGroupFishing[] }>
      >(`/fishing-trip-post/my-participate`, {
        params: {
          status: status,
          size: 20,
          sort: "createdAt",
        },
      });
      return response.data.data.content;
    } catch (error) {
      console.error("getUserGroupFishPost error:", error);
      throw error;
    }
  }

  public static async getUserActivityHistories(
    activityType:
      | "FISHING_TRIP_POST"
      | "RESERVATION"
      | "FISH_ENCYCLOPEDIA"
      | "ALL"
  ): Promise<UserActivityHistory[]> {
    let params = {};
    if (activityType === "ALL") {
      params = {
        size: 20,
        sort: "createdAt",
      };
    } else {
      params = {
        activityType: activityType,
        size: 20,
        sort: "createdAt",
      };
    }
    try {
      const response = await apiInstance.get<
        APIResponse<{ content: UserActivityHistory[] }>
      >("/activity-histories", {
        params: params,
      });
      return response.data.data.content;
    } catch (error) {
      console.error("getUserActivityHistoriesError:", error);
      throw error;
    }
  }

  public static async getUserFishEncyclopediaCount(): Promise<number> {
    try {
      const response = await apiInstance.get<APIResponse<number>>(
        "/fishes/my-count"
      );
      return response.data.data;
    } catch (error) {
      console.error("getMyFishEncyclopediaCount error:", error);
      throw error;
    }
  }

  public static async getUserReservationCount(): Promise<number> {
    try {
      const response = await apiInstance.get<APIResponse<number>>(
        "/reservations/count"
      );
      return response.data.data;
    } catch (error) {
      console.error("getMyReservationCount error:", error);
      throw error;
    }
  }
}
