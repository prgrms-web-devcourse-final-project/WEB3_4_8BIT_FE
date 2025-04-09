import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.mikki.kr/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const token =
    localStorage.getItem("accessToken") ||
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQxNjQwOTIsImV4cCI6MTc0NDI1MDQ5Mn0.8uzhLMqNeK99KjaHhFHNvlEkl5tsPoOom1CbjlBqVTo3wwK5R6AwWRHZQs_nvc9QyS-2dzs0ycdu3I9419a2_Q";
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

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
