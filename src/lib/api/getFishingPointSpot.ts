import { axiosInstance } from "./axiosInstance";

export interface FishingPointSpot {
  timestamp: string;
  data: {
    fishPointId: number;
    fishPointName: string;
    fishPointDetailName: string;
    recruitmentCount: number;
  }[];
  success: boolean;
}

export async function getFishingPointSpot(): Promise<FishingPointSpot> {
  try {
    const response = await axiosInstance.get("/fish-points/popular");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
