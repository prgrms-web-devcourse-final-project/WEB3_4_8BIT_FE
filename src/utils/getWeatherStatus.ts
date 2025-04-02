/**
 * 하늘 상태 조회
 * @param skyStatus - 하늘 상태 코드 (1 ~ 10)
 * @returns 하늘 상태 문자열 (맑음, 구름많음, 흐림, 알 수 없음)
 */
export const getWeatherStatus = (skyStatus: string): string => {
  const status = parseInt(skyStatus);

  switch (true) {
    case status >= 1 && status <= 5:
      return "맑음";
    case status >= 6 && status <= 8:
      return "구름많음";
    case status >= 9 && status <= 10:
      return "흐림";
    default:
      return "알 수 없음";
  }
};

/**
 * 풍속 상태 조회
 * @param windSpeed - 풍속 코드 (0 ~ 10)
 * @returns 풍속 상태 문자열 (약풍, 중풍, 강풍, 알 수 없음)
 */
export const getWindSpeedStatus = (windSpeed: string): string => {
  const status = parseInt(windSpeed);

  switch (true) {
    case status >= 0 && status <= 3:
      return "약풍";
    case status >= 4 && status <= 7:
      return "중풍";
    case status >= 8 && status <= 10:
      return "강풍";
    default:
      return "알 수 없음";
  }
};
