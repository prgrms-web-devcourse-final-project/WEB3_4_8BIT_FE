import { findNearestStation } from "@/utils/findNearestStation";

export const getSeaTemperature = async (lat: number, lng: number) => {
  const stationId = findNearestStation(lat, lng);

  const response = await fetch(
    `http://www.khoa.go.kr/api/oceangrid/tideObsRecent/search.do?ServiceKey=${process.env.NEXT_PUBLIC_BADANORI_API_KEY}&ObsCode=${stationId}&ResultType=json`
  );
  const data = await response.json();

  return data.result.data;
};
