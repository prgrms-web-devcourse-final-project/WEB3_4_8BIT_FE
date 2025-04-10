export interface PostType {
  shipFishingPostId: number; // 추후 shipFishPostId로 변경
  subject: string;
  location: string;
  price: number;
  startTime: string;
  endTime: string;
  durationTime: string;
  imageList: string[] | null;
  reviewEverRate: number;
  fishList: number[]; // 추후에 추가 예정
  reviewCount: number; // 추후에 추가 예정
}

export interface PostDetailPost {
  shipFishingPostId: number;
  subject: string;
  content: string;
  price: number;
  imageList: string[] | null;
  startTime: string;
  durationTime: string;
  maxGuestCount: number;
  reviewEverRate: number;
}

export interface PostDetailShip {
  shipId: number;
  shipName: string;
  shipNumber: string;
  departurePort: string;
  publicRestroom: boolean;
  loungeArea: boolean;
  kitchenFacility: boolean;
  fishingChair: boolean;
  passengerInsurance: boolean;
  fishingGearRental: boolean;
  mealProvided: boolean;
  parkingAvailable: boolean;
}

export interface PostDetailMember {
  memberId: number;
  email: string;
  name: string;
  phone: string;
}

export interface PostDetailType {
  timestamp: string;
  data: {
    detailShipFishingPost: PostDetailPost;
    detailShip: PostDetailShip;
    detailMember: PostDetailMember;
  };
  success: boolean;
}

// ------------

export interface ShipPostData {
  shipFishingPostId: number;
  subject: string;
  location: string;
  price: number;
  fileUrlList: string[];
  fishNameList: string[];
  reviewEverRate: number;
  reviewCount: number;
  createdAt: Date;
}

export interface ShipPostListAPIResponse {
  timestamp: Date;
  data: {
    content: ShipPostData[];
    pageSize: number;
    numberOfElements: number;
    isFirst: boolean;
    isLast: boolean;
  };
  success: boolean;
}

/**
 * 선박 낚시 포스트 조회 API 요청 파라미터
 * @interface ShipFishingPostParams
 * @description 무한 스크롤 기반의 선박 낚시 포스트 목록 조회를 위한 파라미터 정의
 *
 * @property {('asc'|'desc')} [order='desc'] - 정렬 방향 (오름차순/내림차순)
 * @property {string} [sort='createdAt'] - 정렬 기준 필드
 * @property {('next'|'prev')} [type='next'] - 페이지네이션 방향 (다음/이전)
 * @property {string} [fieldValue] - 커서 기반 페이지네이션을 위한 기준값
 * @property {number} [id] - 현재 조회 중인 포스트의 ID
 * @property {number} [size=10] - 한 페이지당 조회할 포스트 수
 */
export interface ShipFishingPostParams {
  order?: "asc" | "desc";
  sort?: string;
  type?: "next" | "prev";
  fieldValue?: string;
  id?: number;
  size?: number;
}
