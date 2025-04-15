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
  fileUrlList: FileUrlMap;
}

interface FileUrlMap {
  [key: number]: string;
}