import { apiInstance } from "./apiInstance";

export interface CaptainInfoApiResponse {
  timestamp: string;
  data: {
    memberId: number;
    email: string;
    name: string;
    nickname: string;
    phone: string;
    fileUrl: string | null;
    description: string;
    role: string;
    shipLicenseNumber: string;
    shipList: number[] | null;
  };
  success: boolean;
}

export interface CaptainDashboardApiResponse {
  timestamp: string;
  data: {
    todayReservationCount: number;
    recentReservationCount: number;
    writtenPostCount: number;
  };
  success: boolean;
}

export interface CaptainPostListApiResponse {
  timestamp: string;
  data: {
    shipFishingPostId: number;
    subject: string;
    location: string;
    price: number;
    fileUrlList: string[];
    reviewEverRate: number;
    reviewCount: number;
    createdAt: string;
  }[];
  success: boolean;
}

export interface CaptainReservationDetailApiResponse {
  timestamp: string;
  data: {
    reservationId: number;
    shipFishingPostId: number;
    memberId: number;
    name: string;
    phone: string;
    reservationNumber: string;
    guestCount: number;
    price: number;
    totalPrice: number;
    reservationDate: string;
    reservationStatus: string;
    createdAt: string;
    modifiedAt: string;
  };
  success: boolean;
}

export interface CaptainBoatInfoApiResponse {
  timestamp: string;
  data: {
    shipId: number;
    shipName: string;
    shipNumber: string;
    departurePort: string;
    portName: string;
    restroomType: string;
    loungeArea: boolean;
    kitchenFacility: boolean;
    fishingChair: boolean;
    passengerInsurance: boolean;
    fishingGearRental: boolean;
    mealProvided: boolean;
    parkingAvailable: boolean;
  }[];
  success: boolean;
}

export const getCaptainInfo = async () => {
  try {
    const response = await apiInstance.get<CaptainInfoApiResponse>(
      "/members/captains"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCaptainDashboard =
  async (): Promise<CaptainDashboardApiResponse> => {
    try {
      const response = await apiInstance.get("/reservations/dashboard", {
        params: {
          limitDays: 365,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const getCaptainReservationList = async (
  shipFishingPostId: number,
  afterToday: boolean,
  size: number
) => {
  try {
    const response = await apiInstance.get("/reservations/captains", {
      params: {
        shipFishingPostId,
        afterToday,
        size,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//
export const getCaptainPostList =
  async (): Promise<CaptainPostListApiResponse> => {
    try {
      const response = await apiInstance.get("/ship-fishing-posts/mypage", {});
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

//예약 내역 상세 조회
export const getCaptainReservationDetail = async (
  reservationId: number
): Promise<CaptainReservationDetailApiResponse> => {
  try {
    const response = await apiInstance.get(`/reservations/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCaptainPost = async (postId: number): Promise<boolean> => {
  try {
    const response = await apiInstance.delete(`/ship-fishing-posts/${postId}`);
    return response.data.success;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 선박 정보 조회
export const getCaptainBoatInfo =
  async (): Promise<CaptainBoatInfoApiResponse> => {
    try {
      const response = await apiInstance.get("/ship");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
