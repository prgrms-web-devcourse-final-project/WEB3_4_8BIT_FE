import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.mikki.kr/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQyNjUyNTAsImV4cCI6MTc0NDM1MTY1MH0.UdBtp8Xmft_w9mVl-lPaBaptvVlaPLShdmmxY6XJOoYqwqEEhmkVCJcO0ZXU5zFPpzb3q8wOI4MzFreaSzJU7g";

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
