export interface FishLocation {
  value: number;
  name: string;
  title: string;
  lat: number;
  lng: number;
}

export interface CurrentWeatherData {
  windSpeed: string;
  currentTemp: string;
  humidity: string;
  waveHeight: string;
  precipitation: string;
}

export interface SeaTemperatureData {
  air_temp: number;
  water_temp: number;
  wind_speed: number;
}

export interface WeatherTemp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

export interface WeatherFeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface DailyWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: WeatherFeelsLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: WeatherTemp;
  uvi: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface CurrentWeather {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export type WeatherResponse = {
  current: CurrentWeather;
  daily: DailyWeather[];
};

export interface WeatherCardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ReactNode;
  iconColor: string;
  currentTime: string;
  currentDate: string;
  valueColor?: string;
  className?: string;
}
