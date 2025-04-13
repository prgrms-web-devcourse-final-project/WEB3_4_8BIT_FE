// TODO 추후 동현님 선상 낚시 API 와 합치기

import { apiInstance } from "@/lib/api/apiInstance";
import { APIResponse } from "@/lib/api/fishAPI";
import { ShipPostData } from "@/types/boatPostType";

type Year = `${number}${number}${number}${number}`;
type Month =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";
type Day =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31";

export type ISODateString = `${Year}-${Month}-${Day}`;

export async function getTodayBoatFishing(
  todayDate: ISODateString
): Promise<ShipPostData[]> {
  try {
    const response = await apiInstance.get<
      APIResponse<{ content: ShipPostData[] }>
    >("/ship-fishing-posts", {
      params: {
        searchDate: todayDate,
        size: 3,
      },
    });
    return response.data.data.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getLowestPriceBoatFishing(): Promise<ShipPostData[]> {
  try {
    const response = await apiInstance.get<
      APIResponse<{ content: ShipPostData[] }>
    >("/ship-fishing-posts", {
      params: {
        order: "asc",
        sort: "price",
        size: 3,
      },
    });
    return response.data.data.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
