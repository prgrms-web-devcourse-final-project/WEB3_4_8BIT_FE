export interface FishingPointLocation {
  regionId: string;
  regionName: string;
}

export interface FishingPoint {
  fishPointId: number;
  fishPointName: string;
  fishPointDetailName: string;
  latitude: number;
  longitude: number;
  isBan: boolean;
}

export interface FishingPointDetail {
  fishPointId: number;
  fishPointName: string;
  fishPointDetailName: string;
  latitude: number;
  longitude: number;
  isBan: boolean;
  fishList: [];
}

export interface FishingPointDetailAPIResponse {
  timestamp: string;
  data: FishingPointDetail;
  success: boolean;
}
