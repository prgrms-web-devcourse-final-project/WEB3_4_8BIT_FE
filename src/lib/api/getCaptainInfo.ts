import { apiInstance } from "./apiInstance";

export interface CaptainInfoApiResponse {
  timestamp: string;
  data: {
    memberId: number;
    email: string;
    name: string;
    nickname: string;
    phone: string;
    profileImg: string | null;
    description: string;
    role: string;
    shipLicenseNumber: string;
    shipList: any[] | null;
  };
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
