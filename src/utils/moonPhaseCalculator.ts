interface MoonPhase {
  lunarDay: number;
  tide: number;
  tideName: string;
  moonPhase: string;
}

export function calculateMoonPhase(date: Date = new Date()): MoonPhase {
  const knownNewMoon = new Date("1999-12-22");

  const lunarMonth = 29.53058867;
  const diff = date.getTime() - knownNewMoon.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  // ✅ 음력 날짜 계산 (1~30일)
  const lunarDay = (Math.floor(days % lunarMonth) + 1) % 30 || 30;

  // ✅ 물때 계산 (음력 날짜 + 6)
  let tideNumber = lunarDay + 6;

  if (tideNumber > 30) {
    tideNumber -= 30;
  } else if (tideNumber > 15) {
    tideNumber -= 15;
  }

  // ✅ 물때 이름 (조금, 무시 포함)
  const tideNames = [
    "1물",
    "2물",
    "3물",
    "4물",
    "5물",
    "6물",
    "7물",
    "8물",
    "9물",
    "10물",
    "11물",
    "12물",
    "13물",
    "조금",
    "무시",
  ];

  const tideName = tideNames[tideNumber - 1] || "오류"; // 예외 방지

  const moonPhase = getMoonPhaseDescription(lunarDay / lunarMonth);

  return {
    lunarDay,
    tide: tideNumber,
    moonPhase,
    tideName,
  };
}

function getMoonPhaseDescription(phase: number): string {
  if (phase < 0.1) return "새달";
  if (phase < 0.25) return "초승달";
  if (phase < 0.5) return "상현달";
  if (phase < 0.75) return "보름달";
  if (phase < 0.9) return "하현달";
  return "그믐달";
}
