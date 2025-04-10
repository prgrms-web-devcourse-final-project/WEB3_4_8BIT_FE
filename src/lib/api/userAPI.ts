import {BoatInfo, BoatInputData, NormalUserInputData, User} from "@/types/user.interface";
import {apiInstance} from "@/lib/api/apiInstance";
import {PostAPIResponse} from "@/lib/api/fishAPI";

// 백엔드가 설정한 기본 API 응답
interface APIDataResponse<T> {
  data : T;
  success : boolean;
  timestamp : string;
}

// 사용자 관련 API 클래스
export class UserAPI {
  public static async getMemberInfo() : Promise<User> {
    try {
      const response = await apiInstance.get<APIDataResponse<User>>('/members')
      return response.data.data
    } catch (error) {
      console.error('getMemberInfo error:', error)
      throw error;
    }
  }

  public static async postMemberInfo(userInput : NormalUserInputData) : Promise<APIDataResponse<unknown>> {
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

  public static async postCaptainMemberInfo(boatInput : BoatInputData) : Promise<APIDataResponse<unknown>> {
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
}

