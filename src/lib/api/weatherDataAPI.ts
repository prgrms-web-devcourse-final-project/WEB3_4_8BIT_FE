import { getWeatherStatus, getWindSpeedStatus } from "@/utils/getWeatherStatus";
import dayjs from "dayjs";

interface WeatherItem {
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  category: string;
}

const yesterday = dayjs().subtract(1, "day").format("YYYYMMDD");

export const getCurrentWeatherData = async (lat: number, lng: number) => {
  const response = await fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=14&nx=${Math.floor(
      lat
    )}&ny=${Math.floor(lng)}&base_date=${yesterday}&base_time=1400&serviceKey=${
      process.env.NEXT_PUBLIC_WEATHER_API_KEY
    }&pageNo=10&dataType=JSON`
  );

  if (!response.ok) {
    throw new Error("기상청 api 호출을 실패했습니다.");
  }

  const responseData = await response.json();
  const weatherData: WeatherItem[] = responseData.response.body.items.item;

  const formattedWeatherData = {
    windSpeed:
      weatherData.find((item) => item.category === "WSD")?.fcstValue || "",
    windSpeedStatus: getWindSpeedStatus(
      weatherData.find((item) => item.category === "WSD")?.fcstValue || ""
    ),
    skyStatus: getWeatherStatus(
      weatherData.find((item) => item.category === "SKY")?.fcstValue || ""
    ),
    currentTemp:
      weatherData.find((item) => item.category === "TMP")?.fcstValue || "",
    humidity:
      weatherData.find((item) => item.category === "REH")?.fcstValue || "",
    waveHeight:
      weatherData.find((item) => item.category === "WAV")?.fcstValue || "",
    precipitation:
      weatherData.find((item) => item.category === "PCP")?.fcstValue || "",
  };
  getTodayWeatherData(lat, lng);
  return formattedWeatherData;
};

export const getTodayWeatherData = async (lat: number, lng: number) => {
  const targetDate = dayjs().format("YYYYMMDD");

  const response = await fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=100&nx=${Math.floor(
      lat
    )}&ny=${Math.floor(lng)}&base_date=${yesterday}&base_time=2300&serviceKey=${
      process.env.NEXT_PUBLIC_WEATHER_API_KEY
    }&pageNo=2&dataType=JSON`
  );

  if (!response.ok) {
    throw new Error("기상청 api 호출을 실패했습니다.");
  }

  const responseData = await response.json();
  const weatherData: WeatherItem[] = responseData.response.body.items.item;

  // 필요한 데이터만 추출
  const formattedData = {
    skyStatus: getWeatherStatus(
      weatherData.find(
        (item) =>
          item.category === "SKY" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || ""
    ),
    maxTemp:
      weatherData.find(
        (item) =>
          item.category === "TMX" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    minTemp:
      weatherData.find(
        (item) =>
          item.category === "TMN" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    precipitation:
      weatherData.find(
        (item) =>
          item.category === "POP" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    windSpeed:
      weatherData.find(
        (item) =>
          item.category === "WSD" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    windSpeedStatus: getWindSpeedStatus(
      weatherData.find(
        (item) =>
          item.category === "WSD" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || ""
    ),
    waveHeight:
      weatherData.find(
        (item) =>
          item.category === "WAV" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    humidity:
      weatherData.find(
        (item) =>
          item.category === "REH" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
  };

  return formattedData;
};

export const getTomorrowWeatherData = async (lat: number, lng: number) => {
  const targetDate = dayjs().add(1, "day").format("YYYYMMDD");

  const response = await fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=100&nx=${Math.floor(
      lat
    )}&ny=${Math.floor(lng)}&base_date=${yesterday}&base_time=2300&serviceKey=${
      process.env.NEXT_PUBLIC_WEATHER_API_KEY
    }&pageNo=5&dataType=JSON`
  );

  if (!response.ok) {
    throw new Error("기상청 api 호출을 실패했습니다.");
  }

  const responseData = await response.json();
  const weatherData: WeatherItem[] = responseData.response.body.items.item;

  // 필요한 데이터만 추출
  const formattedData = {
    skyStatus: getWeatherStatus(
      weatherData.find(
        (item) =>
          item.category === "SKY" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || ""
    ),
    maxTemp:
      weatherData.find(
        (item) =>
          item.category === "TMX" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    minTemp:
      weatherData.find(
        (item) =>
          item.category === "TMN" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    precipitation:
      weatherData.find(
        (item) =>
          item.category === "POP" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    windSpeed:
      weatherData.find(
        (item) =>
          item.category === "WSD" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    windSpeedStatus: getWindSpeedStatus(
      weatherData.find(
        (item) =>
          item.category === "WSD" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || ""
    ),
    waveHeight:
      weatherData.find(
        (item) =>
          item.category === "WAV" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    humidity:
      weatherData.find(
        (item) =>
          item.category === "REH" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
  };

  return formattedData;
};

export const getDayAfterTomorrowWeatherData = async (
  lat: number,
  lng: number
) => {
  const targetDate = dayjs().add(2, "day").format("YYYYMMDD");

  const response = await fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=100&nx=${Math.floor(
      lat
    )}&ny=${Math.floor(lng)}&base_date=${yesterday}&base_time=2300&serviceKey=${
      process.env.NEXT_PUBLIC_WEATHER_API_KEY
    }&pageNo=8&dataType=JSON`
  );

  if (!response.ok) {
    throw new Error("기상청 api 호출을 실패했습니다.");
  }

  const responseData = await response.json();
  const weatherData: WeatherItem[] = responseData.response.body.items.item;

  // 필요한 데이터만 추출
  const formattedData = {
    skyStatus: getWeatherStatus(
      weatherData.find(
        (item) =>
          item.category === "SKY" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || ""
    ),
    maxTemp:
      weatherData.find(
        (item) =>
          item.category === "TMX" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    minTemp:
      weatherData.find(
        (item) =>
          item.category === "TMN" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    precipitation:
      weatherData.find(
        (item) =>
          item.category === "POP" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    windSpeed:
      weatherData.find(
        (item) =>
          item.category === "WSD" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    windSpeedStatus: getWindSpeedStatus(
      weatherData.find(
        (item) =>
          item.category === "WSD" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || ""
    ),
    waveHeight:
      weatherData.find(
        (item) =>
          item.category === "WAV" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    humidity:
      weatherData.find(
        (item) =>
          item.category === "REH" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
  };

  return formattedData;
};

export const getTideData = async (lat: number, lng: number) => {
  const targetDate = dayjs().add(3, "day").format("YYYYMMDD");

  const response = await fetch(
    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=100&nx=${Math.floor(
      lat
    )}&ny=${Math.floor(lng)}&base_date=${yesterday}&base_time=2300&serviceKey=${
      process.env.NEXT_PUBLIC_WEATHER_API_KEY
    }&pageNo=10&dataType=JSON`
  );

  if (!response.ok) {
    throw new Error("기상청 api 호출을 실패했습니다.");
  }

  const responseData = await response.json();
  const weatherData: WeatherItem[] = responseData.response.body.items.item;

  // 필요한 데이터만 추출
  const formattedData = {
    skyStatus: getWeatherStatus(
      weatherData.find(
        (item) =>
          item.category === "SKY" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || ""
    ),
    maxTemp:
      weatherData.find(
        (item) =>
          item.category === "TMX" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    minTemp:
      weatherData.find(
        (item) =>
          item.category === "TMN" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    precipitation:
      weatherData.find(
        (item) =>
          item.category === "POP" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    windSpeed:
      weatherData.find(
        (item) =>
          item.category === "WSD" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    windSpeedStatus: getWindSpeedStatus(
      weatherData.find(
        (item) =>
          item.category === "WSD" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || ""
    ),
    waveHeight:
      weatherData.find(
        (item) =>
          item.category === "WAV" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
    humidity:
      weatherData.find(
        (item) =>
          item.category === "REH" &&
          item.fcstDate === targetDate &&
          item.fcstTime === "1500"
      )?.fcstValue || "",
  };

  return formattedData;
};
