// TODO 추후 윤서님 코드와 합치기

export interface GroupFishPost {
  fishingTripPostId: number;
  regionId: number;
  regionType: string;
  subject: string;
  content: string;
  fishingDate: string;
  createdAt: string;
  recruitmentCount: number;
  postStatus: 'RECRUITING' | 'COMPLETED';
  imageUrl: string | null;
}

import {apiInstance} from "@/lib/api/apiInstance";
import {APIResponse} from "@/lib/api/fishAPI";

export async function getNearFishingPoints() : Promise<GroupFishPost[]> {
  try {
    const response = await apiInstance.get<APIResponse<{content : GroupFishPost[]}>>('/fishing-trip-post/scroll?size=3&status=RECRUITING')
    return response.data.data.content
  } catch (error) {
    console.error(error);
    throw error
  }
}