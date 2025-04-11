// 선상 낚시 포스트 타입
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

// 선상 낚시 포스트 목록 조회 API 응답 타입
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
 * 선상 낚시 포스트 조회 API 요청 파라미터
 * @interface ShipFishingPostParams
 * @description 무한 스크롤 기반의 선상 낚시 포스트 목록 조회를 위한 파라미터 정의
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

export interface PostDetailMember {
  memberId: number;
  email: string;
  name: string;
  phone: string;
}

export interface PostDetailShip {
  shipId: number;
  shipName: string;
  shipNumber: string;
  departurePort: string;
  restroomType: "공용 화장실" | "남/여 구분 화장실" | "없음";
  loungeArea: boolean; // 휴게실 여부
  kitchenFacility: boolean; // 주방 시설 여부
  fishingChair: boolean; // 낚시 의자 여부
  passengerInsurance: boolean; // 여행자 보험 여부
  fishingGearRental: boolean; // 낚시 장비 대여 여부
  mealProvided: boolean; // 식사 제공 여부
  parkingAvailable: boolean; // 주차 가능 여부
}

export interface ShipFishingPostDetailData {
  shipFishingPostId: number;
  subject: string;
  content: string;
  price: number;
  fileUrlList: string[];
  startTime: string;
  durationTime: string;
  maxGuestCount: number;
  reviewEverRate: number;
  detailFish: string[];
  detailShip: PostDetailShip;
  detailMember: PostDetailMember;
}

// 선상 낚시 포스트 상세 조회 API 응답 타입
export interface ShipFishingPostDetailAPIResponse {
  timestamp: string;
  data: ShipFishingPostDetailData;
  success: boolean;
}

// 예약 불가능 날짜 조회 API 응답 타입
export interface ReservationUnavailableDateAPIResponse {
  timestamp: string;
  data: string[];
  success: boolean;
}
