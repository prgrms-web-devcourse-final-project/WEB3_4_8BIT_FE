import { axiosInstance } from "./axiosInstance";
import {apiInstance} from "@/lib/api/apiInstance";
import {APIResponse} from "@/lib/api/fishAPI";

interface FishingTripRecruitmentRequest {
  fishingTripPostId: number;
  introduction: string;
  fishingLevel: string;
}

export const applyFishingTripRecruitment = async (params: {
  fishingTripPostId: number;
  introduction: string;
  fishingLevel: string;
}) => {
  try {
    console.log("참여 신청 API 요청:", params);
    const response = await axiosInstance.post(
      `/fishing-trip-recruitment`,
      params
    );
    return response.data;
  } catch (error) {
    console.error("참여 신청 중 오류:", error);
    throw error;
  }
};

export type ParticipantStatus  = 'APPROVED' | 'PENDING' | 'REJECTED';

export interface ParticipantInfo {
  fishingTripRecruitmentId : number;
  nickname : string;
  imageUrl : string;
  fishingLevel : "초급" | "중급" | "고급";
  introduction : string;
  recruitmentStatus : ParticipantStatus;
  createdAt : string;
}

export async function getParticipants (postID : number, status : ParticipantStatus) : Promise<ParticipantInfo[]>{
  try {
    const response = await apiInstance.get<APIResponse<{ content : ParticipantInfo[] }>>(`/fishing-trip-recruitment/participants`,{
      params : {
        fishingTripPostId : postID,
        status : status,
        order : 'desc',
        sort : 'createdAt',
        size : 10,
      }
    })
    return response.data.data.content;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function patchAcceptParticipant (recruitmentId : number) {
  try {
    const response = await apiInstance.patch(`/fishing-trip-recruitment/${recruitmentId}/accept`)
    return response.data
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function patchRefuseParticipant (recruitmentId : number) {
  try {
    const response = await apiInstance.patch(`/fishing-trip-recruitment/${recruitmentId}/refuse`)
    return response.data
  } catch (error) {
    console.error(error);
    throw error
  }
}

