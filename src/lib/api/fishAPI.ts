import {apiInstance} from "@/lib/api/apiInstance";
import {FishDetailInfo, FishDictionaryInfo, FishInfo, FishUpload} from "@/types/fish.interface";

// 백엔드가 설정한 기본 API 응답
export interface APIResponse<T> {
  data : T;
  success : boolean;
  timestamp : string;
}

// post에 대한 응답 타입
export interface PostAPIResponse {
  timestamp : string;
  success : boolean;
}

// 사용자의 물고기 도감용 + 물고기 관련 API 클래스
export class FishAPI {
  public static async getFishEncyclopedias() : Promise<FishInfo> {
    try{
      const response = await apiInstance.get<APIResponse<FishInfo>>('/fishes/encyclopedias');
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async postFishEncyclopedias(fishData : FishUpload) : Promise<PostAPIResponse> {
    try {
      const response = await apiInstance.post('/fishes/encyclopedias', fishData);
      return response.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getDetailFishEncyclopedias (fishEncyclopediaId : number) : Promise<APIResponse<{content : FishDetailInfo[]}>> {
    try {
      const response = await apiInstance.get(`/fishes/${fishEncyclopediaId}/encyclopedias`);
      return response.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getFishDictionaryData (fishEncyclopediaId : number) : Promise<APIResponse<FishDictionaryInfo>> {
    try {
      const response = await apiInstance.get(`/fishes/${fishEncyclopediaId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async getPopularFish() : Promise<FishDictionaryInfo[]> {
    try {
      const response = await apiInstance.get<APIResponse<FishDictionaryInfo[]>>('/fishes/popular?size=4');
      return response.data.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}