import dayjs from "dayjs";
import { apiInstance } from "./apiInstance";

export interface ReservationRemainData {
  remainCount: number;
  isBan: boolean;
}

export interface ReservationRemainResponse {
  timestamp: string;
  data: ReservationRemainData;
  success: boolean;
}

/**
 * 예약 가능한 인원 수 조회
 * @param id 포스트 아이디
 * @param date 선택된 날짜
 * @returns remainCount: 예약 가능한 인원 수, isBan: true = 예약 불가능한 날짜, false = 예약 가능한 날짜
 */
export const getReservationRemain = async (
  id: number,
  date: Date
): Promise<ReservationRemainResponse> => {
  try {
    const response = await apiInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/reservation-dates/${id}/remain`,
      {
        params: {
          reservationDate: dayjs(date).format("YYYY-MM-DD"),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postReservation = async (
  shipFishingPostId: number,
  guestCount: number,
  price: number,
  totalPrice: number,
  reservationDate: Date
): Promise<boolean> => {
  try {
    const response = await apiInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
      {
        shipFishingPostId,
        guestCount,
        price,
        totalPrice,
        reservationDate: dayjs(reservationDate).format("YYYY-MM-DD"),
      }
    );

    return response.data.success;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
