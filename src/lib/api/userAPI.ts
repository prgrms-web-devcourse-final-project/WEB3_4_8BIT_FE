import axios, {InternalAxiosRequestConfig} from "axios";
import {User} from "@/types/user.interface";

// 백엔드가 설정한 기본 API 응답
interface APIDataResponse<T> {
  data : T;
  success : boolean;
  timestamp : string;
}

export const apiInstance = axios.create({
  baseURL: 'https://api.mikki.kr/api/v1',
  timeout: 5000,
})

apiInstance.interceptors.request.use(
  function getAccessToken(config : InternalAxiosRequestConfig) : InternalAxiosRequestConfig {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = token
    }
    return config;
  }
)

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

  public async postCaptainMemberInfo(data : unknown) {

  }

  public async patchCaptainMemberInfo(data : unknown) {

  }

}

