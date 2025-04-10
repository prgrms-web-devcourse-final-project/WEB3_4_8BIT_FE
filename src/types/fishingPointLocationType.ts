export interface FishingPointLocation {
  regionId: string;
  regionName: string;
  latitude: number;
  longitude: number;
}

export interface FishingPoint {
  fishPointId: number;
  fishPointName: string;
  fishPointDetailName: string;
  latitude: number;
  longitude: number;
  isBan: boolean;
}

export interface fishList {
  fileUrl: string;
  fishId: number;
  fishName: string;
  spawnSeasonList: number[];
  totalCount: number;
}

export interface FishingPointDetail {
  fishPointId: number;
  fishPointName: string;
  fishPointDetailName: string;
  latitude: number;
  longitude: number;
  isBan: boolean;
  fishList: fishList[];
}

export interface FishingPointDetailAPIResponse {
  timestamp: string;
  data: FishingPointDetail;
  success: boolean;
}
