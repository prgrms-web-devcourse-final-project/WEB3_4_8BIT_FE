import axios, {InternalAxiosRequestConfig} from "axios";

// 백엔드가 설정한 기본 API 응답
export interface APIDataResponse<T> {
  data : T;
  success : boolean;
  timestamp : string;
}

export const apiInstance = axios.create({
  baseURL: 'https://api.mikki.kr/api/v1',
  timeout: 5000,
  headers : {
    "Content-Type": "application/json",
  },
  withCredentials: true
})

apiInstance.interceptors.request.use(
  function getAccessToken(config : InternalAxiosRequestConfig) : InternalAxiosRequestConfig {
    const token = localStorage.getItem('accessToken'); // TODO 추후 수정해야함
    if (token) {
      config.headers.Authorization = token
    }
    return config;
  }
)