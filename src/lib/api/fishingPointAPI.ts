import {
  FishingPoint,
  FishingPointDetailAPIResponse,
} from "@/types/fishingPointLocationType";
import { apiInstance } from "./apiInstance";

export async function getFishingRegion(
  regionId: string
): Promise<FishingPoint[]> {
  try {
    const response = await apiInstance.get(`/fish-points/regions/${regionId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("낚시 지역 조회 실패", { cause: error });
  }
}

export async function getFishingPointDetail(
  pointId: string
): Promise<FishingPointDetailAPIResponse> {
  try {
    const response = await apiInstance.get(`/fish-points/${pointId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("낚시 포인트 상세 조회 실패", { cause: error });
  }
}
