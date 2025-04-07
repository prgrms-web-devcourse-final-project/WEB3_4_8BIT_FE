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

export interface ShipFishingPost {
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

export interface Ship {
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

export interface Member {
  memberId: number;
  email: string;
  name: string;
  phone: string;
}

export interface ApiResponse {
  timestamp: string;
  data: {
    detailShipFishingPost: ShipFishingPost;
    detailShip: Ship;
    detailMember: Member;
  };
  success: boolean;
}
