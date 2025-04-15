import { axiosInstance } from "./axiosInstance";
import axios from 'axios';

// 게시글 삭제
export const deleteShip = async (shipId: number) => {
  try {
    const response = await axiosInstance.delete(`/ship/${shipId}`);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    // axios 에러인 경우
    if (axios.isAxiosError(error) && error.response) {
      // 서버에서 보낸 응답 본문(response.data)에 오류 메시지가 있는 경우
      return {
        success: false,
        message: error.response.data.message || "요청 처리 중 오류가 발생했습니다."
      };
    }

    // 일반 에러인 경우
    return {
      success: false,
      message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
};