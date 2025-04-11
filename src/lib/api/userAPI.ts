 import {BoatInfo, BoatInputData, NormalUserInputData, User, UserReservationInfo} from "@/types/user.interface";
import {apiInstance} from "@/lib/api/apiInstance";
import {APIResponse, PostAPIResponse} from "@/lib/api/fishAPI";

// 사용자 관련 API 클래스
export class UserAPI {
  public static async getMemberInfo() : Promise<User> {
    try {
      const response = await apiInstance.get<APIResponse<User>>('/members')
      return response.data.data
    } catch (error) {
      console.error('getMemberInfo error:', error)
      throw error;
    }
  }

  public static async postMemberInfo(userInput : NormalUserInputData) : Promise<APIResponse<unknown>> {
    try {
      const response = await apiInstance.post('/members', userInput)
      return response.data
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  public static async patchMemberInfo(data : unknown) {

  }

  public static async getCaptainMemberInfo(data : unknown) {

  }

  public static async postCaptainMemberInfo(boatInput : BoatInputData) : Promise<APIResponse<unknown>> {
    try {
      const response = await apiInstance.post('/members/captains',boatInput);
      return response.data
    } catch (error) {
      console.error('postCaptainMemberInfo error:', error)
      throw error;
    }
  }

  public static async patchCaptainMemberInfo(data : unknown) {

  }

  public static async postCaptainBoatInfo(boat : BoatInfo) {
    try {
      const response = await apiInstance.post('/ship',boat);
      return response.headers
    } catch (error) {
      console.error('postCaptainBoatInfo error:', error)
      throw error;
    }
  }

  public static async deleteUserReview(reviewId : number) : Promise<PostAPIResponse> {
    try {
      const response = await apiInstance.delete(`/reviews/${reviewId}`);
      return response.data
    } catch (error) {
      console.error('deleteUserReview error:', error)
      throw error;
    }
  }

  public static async getUserBoatReservation(afterToday : boolean, isConfirm : boolean) : Promise<UserReservationInfo[]> {
    try {
      const response = await apiInstance.get<APIResponse<{content : UserReservationInfo[]}>>('/reservations/members',{
        params : {
          afterToday : afterToday,
          isConfirm : isConfirm,
          size : 10,
        }
      });
      return response.data.data.content
    } catch (error) {
      console.error('getUserBoatReservation error:', error)
      throw error;
    }
  }

  public static async deleteUserBoatReservation(reservationId : number) : Promise<PostAPIResponse> {
    try {
      const response = await apiInstance.patch<PostAPIResponse>(`/reservations/${reservationId}`);
      return response.data
    } catch (error) {
      console.error('deleteUserBoatReservation error:', error)
      throw error;
    }
  }

  public static async getUserGroupFishPost (): Promise<APIResponse<unknown>> {

  }
}

