import {BoatInfo, BoatInputData, NormalUserInputData, User} from "@/types/user.interface";
import {apiInstance} from "@/lib/api/apiInstance";

// 백엔드가 설정한 기본 API 응답
interface APIDataResponse<T> {
  data : T;
  success : boolean;
  timestamp : string;
}

export class UserAPI {
  public static async getMemberInfo() : Promise<User | null> {
    try {
      const response = await apiInstance.get<APIDataResponse<User | null>>('/members')
      return response.data.data
    } catch (error) {
      console.error('getMemberInfo error:', error)
      return null
    }
  }

  public static async postMemberInfo(userInput : NormalUserInputData) : Promise<APIDataResponse<unknown> | null> {
    try {
      const response = await apiInstance.post('/members', userInput)
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public static async patchMemberInfo(data : unknown) {

  }

  public static async getCaptainMemberInfo(data : unknown) {

  }

  public static async postCaptainMemberInfo(boatInput : BoatInputData) : Promise<APIDataResponse<unknown> | null> {
    try {
      const response = await apiInstance.post('/members/captains',boatInput);
      return response.data
    } catch (error) {
      console.error('postCaptainMemberInfo error:', error)
      return null
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
      return null
    }
  }
}

