import { axiosInstance } from "./axiosInstance";

// 게시글 삭제
export const deleteShip = async (shipId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/ship/${shipId}`
    );
    return { success: true, data: response.data };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
    };
  }
};