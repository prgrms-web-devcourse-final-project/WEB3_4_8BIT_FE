import { DailyTideData } from "@/lib/api/getSeaTemperatureAPI";
import dayjs from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useRef, useEffect, useState } from "react";

interface TideChartData {
  time: string;
  tide: number;
  type: string;
}

export default function TideChart({
  tideChartData,
}: {
  tideChartData: DailyTideData[] | undefined;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [labelPositions, setLabelPositions] = useState<
    { x: number; y: number; text: string; color: string }[]
  >([]);
  const [chartData, setChartData] = useState<TideChartData[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");

  // 데이터 처리
  useEffect(() => {
    if (!tideChartData) return;

    const tempTideData: TideChartData[] = [];

    // 첫 번째 날짜의 마지막 조석 데이터
    if (tideChartData[0] && tideChartData[0].tides.length > 0) {
      const firstDayLastTide =
        tideChartData[0].tides[tideChartData[0].tides.length - 1];
      tempTideData.push({
        time: dayjs(firstDayLastTide.tph_time).format("HH:mm"),
        tide: +firstDayLastTide.tph_level,
        type: firstDayLastTide.hl_code,
      });

      // 두 번째 날짜의 모든 조석 데이터
      tideChartData[1].tides.forEach((tide) => {
        tempTideData.push({
          time: dayjs(tide.tph_time).format("HH:mm"),
          tide: +tide.tph_level,
          type: tide.hl_code,
        });
      });

      tideChartData[2].tides.forEach((tide) => {
        tempTideData.push({
          time: dayjs(tide.tph_time).format("HH:mm"),
          tide: +tide.tph_level,
          type: tide.hl_code,
        });
      });
    }

    setChartData(tempTideData);
    setCurrentTime(dayjs().format("HH:mm"));
  }, [tideChartData]);

  // 차트가 렌더링된 후 레이블 위치 계산
  useEffect(() => {
    if (!chartRef.current || chartData.length === 0) return;

    const chartElement = chartRef.current;
    const svgElement = chartElement.querySelector("svg");

    if (svgElement) {
      // 차트의 크기와 위치 정보 가져오기
      const chartRect = chartElement.getBoundingClientRect();

      // X축의 눈금 위치 계산
      const xAxisElement = svgElement.querySelector(".recharts-xAxis");
      const ticks = xAxisElement?.querySelectorAll(
        ".recharts-cartesian-axis-tick"
      );

      if (ticks) {
        const positions: {
          x: number;
          y: number;
          text: string;
          color: string;
        }[] = [];

        // 저조와 고조 지점의 위치 계산
        chartData.forEach((data, index) => {
          // 첫 번째 데이터는 제외
          if (index === 0) return;

          const tickElement = ticks[index];
          if (tickElement) {
            const tickRect = tickElement.getBoundingClientRect();
            const x = tickRect.left - chartRect.left + tickRect.width / 2;
            const y = 40; // 차트 상단에서의 거리

            positions.push({
              x,
              y,
              text: `${data.type === "저조" ? "간조" : "만조"} (${
                data.time
              }) ((${data.tide}))`,
              color: data.type === "저조" ? "red" : "blue",
            });
          }
        });

        setLabelPositions(positions);
      }
    }
  }, [chartData, currentTime]);

  if (!tideChartData) {
    return <div>물때 데이터를 불러오는 중입니다...</div>;
  }

  // 저조와 만조 지점을 찾아서 ReferenceLine으로 표시
  const referenceLines = chartData.map((data, index) => {
    if (index === 0) return;

    if (data.type === "저조") {
      return (
        <ReferenceLine
          key={`low-${index}`}
          x={data.time}
          stroke="red"
          strokeDasharray="3 3"
        />
      );
    } else if (data.type === "고조") {
      return (
        <ReferenceLine
          key={`high-${index}`}
          x={data.time}
          stroke="blue"
          strokeDasharray="3 3"
        />
      );
    }
    return null;
  });

  return (
    <div className="overflow-x-auto">
      <div
        className="lg:w-[2600px] md:w-[2000px] w-[1600px] h-[300px] relative"
        ref={chartRef}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 80, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgb(59, 130, 246)"
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="rgb(59, 130, 246)"
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>

            <XAxis dataKey="time" tick={{ fontSize: 10 }} interval={0} />
            <YAxis tick={{ fontSize: 10 }} />
            <Area
              type="monotone"
              dataKey="tide"
              stroke="rgb(59, 130, 246)"
              fill="url(#tideGradient)"
              strokeWidth={2}
            />
            {referenceLines}
          </AreaChart>
        </ResponsiveContainer>

        {/* 오버레이 레이블 */}
        {labelPositions.map((pos, index) => (
          <div
            key={`label-${index}`}
            className="absolute flex flex-col items-center"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              border: `1px solid ${pos.color}`,
              borderRadius: "4px",
              padding: "4px 12px 8px",
              fontSize: "14px",
              color: pos.color,
              zIndex: 10,
            }}
          >
            <span className="font-bold">{pos.text.split(" (")[0]}</span>
            <span>{pos.text.split(" (")[1].replace(")", "")}</span>
            <span>{pos.text.split(" (")[2].replace(")", "")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
