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
