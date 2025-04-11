import { findNearestStation } from "@/utils/findNearestStation";
import dayjs from "dayjs";

export interface TideData {
  tph_level: string;
  tph_time: string;
  hl_code: "고조" | "저조";
}

export interface DailyTideData {
  date: string;
  tides: TideData[];
}

/**
 * 바다누리 api를 통해 가장 가까운 관측소의 관측 데이터를 가져옴
 * @param lat 위도
 * @param lng 경도
 * @returns 최근 관측 데이터
 */
export const getSeaTemperature = async (lat: number, lng: number) => {
  const stationId = findNearestStation(lat, lng);

  const response = await fetch(
    `http://www.khoa.go.kr/api/oceangrid/tideObsRecent/search.do?ServiceKey=${process.env.NEXT_PUBLIC_BADANORI_API_KEY}&ObsCode=${stationId}&ResultType=json`
  );

  if (!response.ok) {
    throw new Error("바다누리 api 호출을 실패했습니다.");
  }

  const data = await response.json();

  return data.result.data;
};

/**
 * 바다누리 api를 통해 가장 가까운 관측소의 일별 조석 데이터를 가져옴
 * @param lat 위도
 * @param lng 경도
 * @returns 일별 조석 데이터
 */
export const getWeeklyTideData = async (
  lat: number,
  lng: number
): Promise<DailyTideData[]> => {
  const stationId = findNearestStation(lat, lng);

  // 현재부터 7일 후까지의 데이터를 가져옴
  const weeklyData = await Promise.all(
    Array.from({ length: 8 }, async (_, i) => {
      const forecastDate = dayjs().add(i, "day").format("YYYYMMDD");
      const response = await fetch(
        `http://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do?ServiceKey=${process.env.NEXT_PUBLIC_BADANORI_API_KEY}&ObsCode=${stationId}&Date=${forecastDate}&ResultType=json`
      );
      return response.json();
    })
  );

  // 날짜별로 데이터를 묶어서 반환
  return weeklyData.map((data, index) => {
    const currentDate = dayjs().add(index, "day").format("YYYY-MM-DD");
    return {
      date: currentDate,
      tides: data.result.data,
    };
  });
};

export const getTideChartData = async (
  lat: number,
  lng: number
): Promise<DailyTideData[]> => {
  const stationId = findNearestStation(lat, lng);

  const tideData = await Promise.all(
    Array.from({ length: 3 }, async (_, i) => {
      const forecastDate = dayjs()
        .add(i - 1, "day")
        .format("YYYYMMDD");
      const response = await fetch(
        `http://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do?ServiceKey=${process.env.NEXT_PUBLIC_BADANORI_API_KEY}&ObsCode=${stationId}&Date=${forecastDate}&ResultType=json`
      );
      return response.json();
    })
  );

  const formattedTideData = tideData.map((data, index) => {
    return {
      date: dayjs()
        .add(index - 1, "day")
        .format("MM-DD"),
      tides: data.result.data,
    };
  });

  return formattedTideData;
};
