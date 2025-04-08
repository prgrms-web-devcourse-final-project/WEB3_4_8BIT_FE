import axios from "axios";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQwOTEyMTksImV4cCI6MTc0NDE3NzYxOX0.mec6El5qKOJ2u3hkLEpCPZWORDAfzFw30mHJa0Z5JpmEuZUnoGwusaCDBN24HVbiOGESDeUGvd2HKy3p39X9mg";

export const axiosInstance = axios.create({
  baseURL: "https://api.mikki.kr/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
