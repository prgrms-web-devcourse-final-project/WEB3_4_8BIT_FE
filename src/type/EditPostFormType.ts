export interface PostData {
  fishingTripPostId: number;
  subject: string;
  content: string;
  recruitmentCount: number;
  isShipFish: boolean;
  fishingDate: string;
  fishingPointId: number;
  regionId: number;
  // API 응답에 따라 다양한 형태로 올 수 있는 파일 관련 필드들
  fileList?: Array<{ fileId: number; fileUrl: string }>;
  fileUrlList?: string[];
  files?: Array<{ fileId: number; fileUrl: string }>;
}
