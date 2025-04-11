type Coordinates = {
  latitude: number;
  longitude: number;
};

/**
 * 주소를 좌표로 변환하는 함수
 * @param address 주소
 * @returns 좌표 coordinates(latitude, longitude)
 */
export const getCoordinatesFromAddress = async (
  address: string
): Promise<Coordinates | null> => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (data.documents && data.documents.length > 0) {
      const coordinates = {
        latitude: data.documents[0].x,
        longitude: data.documents[0].y,
      };
      return coordinates;
    }

    return null;
  } catch (error) {
    console.error("주소 좌표 변환 중 오류 발생:", error);
    return null;
  }
};
