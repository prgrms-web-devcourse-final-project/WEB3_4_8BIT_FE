export interface FishInfo {
  fishEncyclopediaId : number;
  fileUrl: string;
  fishName: string;
  bestLength: number | null;
  totalCount: number | null;
}

export interface FishDetailInfo {
  fishEncyclopediaId : number;
  length : number;
  count : number;
  fishPointName : string;
  fishPointDetailName : string;
  createdAt : string;
}

export interface FishUpload {
  fishId : number;
  length : number | null;
  count : number | null;
  fishPointId : number | null;
}

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface FishDictionaryInfo {
  fishId : number;
  name : string;
  description : string;
  fileUrl : string;
  spawnSeasonList : Month[];
  spawnLocation : string;
}