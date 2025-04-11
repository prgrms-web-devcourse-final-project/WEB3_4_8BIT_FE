import {
  FishingPoint,
  FishingPointDetailAPIResponse, FishingPointLocation, NearestFishingPoint, PopularFishingPoint,
} from "@/types/fishingPointLocationType";
import { apiInstance } from "./apiInstance";
import {APIResponse} from "@/lib/api/fishAPI";

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

export async function getRegions() : Promise<FishingPointLocation[]>{
  try {
    const response = await apiInstance.get<APIResponse<FishingPointLocation[]>>(`/regions`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function getPopularFishingPoints() : Promise<PopularFishingPoint[]>{
  try {
    const response = await apiInstance.get<APIResponse<PopularFishingPoint[]>>('/fish-points/popular');
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function getNearFishingPoints(latitude : number, longtitude : number) : Promise<NearestFishingPoint[]>{
  try {
    const response = await apiInstance.get<APIResponse<NearestFishingPoint[]>>('/fish-points/nearest',{
      params : {
        lat : latitude,
        lng : longtitude,
        radiusKm : 0
      }
    })
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error
  }
}