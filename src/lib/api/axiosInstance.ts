import axios from "axios";

const BASE_URL = "https://api.mikki.kr/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQwNzM5ODUsImV4cCI6MTc0NDE2MDM4NX0.1lG7bUHg6FFW4bidRbla1yRQo7_hxbebC2klq76y4Ii6jMvh7p_jjOJwWXuUjgk_QID4ZL0cTGrDqhBH70lRzA`,
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("API Request URL:", config.url);
    console.log("API Request Headers:", config.headers);
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
