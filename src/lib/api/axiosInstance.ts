import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.mikki.kr/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("accessToken");
    }

    // 토큰이 있는 경우에만 Authorization 헤더 추가
    if (token) {
      config.headers["Authorization"] = token;
    }

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
