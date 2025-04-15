export interface PostDetailContentProps {
  postId: number;
}

// 상세 조회용 Type
export interface PostData {
  fishingTripPostId: number;
  name: string;
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
  fileUrlList: string[];
  postStatus: string;
  likeCount: number;
  isLiked: boolean;
  isPostOwner: boolean;
}
