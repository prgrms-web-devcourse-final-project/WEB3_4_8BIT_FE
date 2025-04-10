export interface FileInfo {
  fileId: number;
  fileUrl: string;
}

export interface EditPostFormProps {
  postId: number;
}

export interface PostData {
  fishingTripPostId: number;
  subject: string;
  content: string;
  recruitmentCount: number;
  isShipFish: boolean;
  fishingDate: string;
  fishingPointId: number;
  regionId: number;

  fileList?: Array<{ fileId: number; fileUrl: string }>;
  fileIdList?: number[];
  fileUrlList?: string[];
  files?: Array<{ fileId: number; fileUrl: string }>;
}
