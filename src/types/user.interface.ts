export interface BaseUser {
  memberId : number;
  name: string;
  email: string;
  nickname: string;
  phone : string;
  fileUrl : string | null;
  description: string | null;
  isAddInfo : boolean;
}

export interface NormalUser extends BaseUser {
  role: 'USER';
}

export interface CaptainUser extends BaseUser {
  role: 'CAPTAIN';
  shipLicenseNumber? : string;
  shipList? : number[];
}

export type User = NormalUser | CaptainUser

export interface NormalUserInputData {
  nickname: string;
  fileId? : number; // TODO 추후 fileUrl 로 수정 필요
  description : string;
}

export interface BoatInputData {
  nickname : string;
  fileId? : number; // TODO 추후 fileUrl 로 수정 필요
  description : string;
  shipLicenseNumber : string;
  shipList : number[];
}

export interface BoatInfo {
  shipName: string;
  shipNumber: string;
  departurePort: string;
  passengerCapacity: string;
  restroomType : 'PUBLIC' | 'SEPARATION' | 'NONE';
  loungeArea : boolean;
  kitchenFacility : boolean;
  fishingChair : boolean;
  passengerInsurance : boolean;
  fishingGearRental : boolean;
  mealProvided : boolean;
  parkingAvailable : boolean;
}

export interface BoatData extends BoatInfo{
  id : number;
  isSaved : boolean;
}

export type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

export type BoatInfoBooleanKeys = BooleanKeys<BoatData>;

export interface UserReview {
  reviewId: number;
  rating : 1 | 2 | 3 | 4 | 5;
  content : string;
  fileUrlList : string[];
  shipFishingPostId : number;
  memberId: number;
  nickname: string;
  isAuthor: boolean;
  createdAt: string;
}