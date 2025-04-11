import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.mikki.kr/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 하드코딩된 토큰 (폴백용)
const fallbackToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQzNDA4MDQsImV4cCI6MTc0NDQyNzIwNH0.3foq6L816Etco7d6RQq6s-auAUVZUJjwpSHhmKvOV2gTR56Vf6a1Ur5dAglmANqfzfPbhdfiBzNoRS6qMWXMvQ";

axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("accessToken");
    }

    // 토큰이 있으면 사용, 없으면 하드코딩된 폴백 토큰 사용
    config.headers["Authorization"] = token || fallbackToken;
    console.log("🚀 사용하는 토큰:", config.headers["Authorization"]); // 디버깅용 로그
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
