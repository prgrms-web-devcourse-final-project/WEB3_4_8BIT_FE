import { convertToGrid } from "@/utils/coordinateConverter";
import dayjs from "dayjs";
import { CurrentWeatherData, WeatherResponse } from "@/types/weatherTypes";

interface WeatherItem {
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  category: string;
}

const yesterday = dayjs().subtract(1, "day").format("YYYYMMDD");

export const getCurrentWeatherData = async (
  lat: number,
  lng: number
): Promise<CurrentWeatherData> => {
  const { nx, ny } = convertToGrid(lat, lng);
  const response = await fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=14&nx=${nx}&ny=${ny}&base_date=${yesterday}&base_time=1400&serviceKey=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&pageNo=10&dataType=JSON`
  );

  if (!response.ok) {
    throw new Error("기상청 api 호출을 실패했습니다.");
  }

  const responseData = await response.json();
  const weatherData: WeatherItem[] = responseData.response.body.items.item;

  const formattedWeatherData: CurrentWeatherData = {
    windSpeed:
      weatherData.find((item) => item.category === "WSD")?.fcstValue || "",
    currentTemp:
      weatherData.find((item) => item.category === "TMP")?.fcstValue || "",
    humidity:
      weatherData.find((item) => item.category === "REH")?.fcstValue || "",
    waveHeight:
      weatherData.find((item) => item.category === "WAV")?.fcstValue || "",
    precipitation:
      weatherData.find((item) => item.category === "PCP")?.fcstValue || "",
  };
  return formattedWeatherData;
};

export const getWeatherData = async (
  lat: number,
  lng: number
): Promise<WeatherResponse> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("날씨 정보 api 호출에 실패했습니다.");
  }

  const responseData = await response.json();
  return responseData;
};
