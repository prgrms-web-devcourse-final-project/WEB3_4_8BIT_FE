import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.mikki.kr/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the token directly without 'Bearer' prefix
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQxNjg1NjIsImV4cCI6MTc0NDI1NDk2Mn0.iT-Zv_SvmTPi9E6xz69PR6GAWCXXyAcE3s7fId1yB5gqFEqJs1RNsgieOSsLnP8N5tkhsN1gY9yT2QXdghC9Gg";

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      console.error("API Error Status:", error.response.status);
    }
    return Promise.reject(error);
  }
);
