/**
 * 지역 타입을 한글로 변환하는 함수
 * @param regionType 지역 타입 (영문)
 * @returns 한글로 변환된 지역 이름
 */
export const convertRegionTypeToKorean = (regionType: string): string => {
  const regionMap: Record<string, string> = {
    SEOUL: "서울특별시",
    BUSAN: "부산광역시",
    DAEGU: "대구광역시",
    INCHEON: "인천광역시",
    GWANGJU: "광주광역시",
    DAEJEON: "대전광역시",
    ULSAN: "울산광역시",
    SEJONG: "세종특별자치시",
    GYEONGGI: "경기도",
    GANGWON: "강원도",
    CHUNGBUK: "충청북도",
    CHUNGNAM: "충청남도",
    JEONBUK: "전라북도",
    JEONNAM: "전라남도",
    GYEONGBUK: "경상북도",
    GYEONGNAM: "경상남도",
    JEJU: "제주특별자치도",
  };

  return regionMap[regionType] || regionType;
};
