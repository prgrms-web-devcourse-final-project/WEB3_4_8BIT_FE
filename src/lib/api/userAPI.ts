import {BoatInfo, BoatInputData, User} from "@/types/user.interface";
import {apiInstance} from "@/lib/api/apiInstance";

// 백엔드가 설정한 기본 API 응답
interface APIDataResponse<T> {
  data : T;
  success : boolean;
  timestamp : string;
}

export class UserAPI {
  public async getMemberInfo() : Promise<User | null> {
    try {
      const response = await apiInstance.get<APIDataResponse<User | null>>('/members')
      return response.data.data
    } catch (error) {
      console.error('getMemberInfo error:', error)
      return null
    }
  }

  public async postMemberInfo(data : unknown) {

  }

  public async patchMemberInfo(data : unknown) {

  }

  public async getCaptainMemberInfo(data : unknown) {

  }

  public async postCaptainMemberInfo(boatInput : BoatInputData) : Promise<APIDataResponse<unknown> | null> {
    try {
      const response = await apiInstance.post('/members/captains',boatInput);
      return response.data
    } catch (error) {
      console.error('getMemberInfo error:', error)
      return null
    }
  }

  public async patchCaptainMemberInfo(data : unknown) {

  }

  public async postCaptainBoatInfo(boat : BoatInfo) {
    try {
      const response = await apiInstance.post('/ship',boat);
      return response.headers
    } catch (error) {
      console.error('getMemberInfo error:', error)
      return null
    }
  }
}

