export interface PostDetailContentProps {
  postId: number;
}

// 상세 조회용 Type
export interface PostData {
  fishingTripPostId: number;
  nickname: string;
  subject: string;
  content: string;
  currentCount: number;
  recruitmentCount: number;
  createDate: string;
  fishingDate: string;
  fishPointDetailName: string;
  fishPointName: string;
  longitude: number;
  latitude: number;
  profileImgUrl: string;
  fileUrlList: FileUrlMap;
  postStatus: string;
  likeCount: number;
  isLiked: boolean;
  isPostOwner: boolean;
}

interface FileUrlMap {
  [key: number]: string;
}

