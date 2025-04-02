import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCurrentWeatherData,
  getDayAfterTomorrowWeatherData,
  getTideData,
  getTodayWeatherData,
  getTomorrowWeatherData,
} from "@/lib/api/weatherDataAPI";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Cloud,
  Droplets,
  ThermometerSnowflake,
  ThermometerSun,
  Umbrella,
  Waves,
  Wind,
} from "lucide-react";

interface FishLocation {
  value: number;
  name: string;
  title: string;
  lat: number;
  lng: number;
}

export default function FishingConditionsTab({
  pointDataProp,
}: {
  pointDataProp: FishLocation | null;
}) {
  const { data } = useQuery({
    queryKey: ["weatherData", pointDataProp?.title],
    queryFn: () =>
      getCurrentWeatherData(pointDataProp!.lat, pointDataProp!.lng),
    enabled: !!pointDataProp,
  });

  const { data: todayData } = useQuery({
    queryKey: ["todayWeatherData", pointDataProp?.title],
    queryFn: () => getTodayWeatherData(pointDataProp!.lat, pointDataProp!.lng),
    enabled: !!pointDataProp,
  });

  const { data: tomorrowData } = useQuery({
    queryKey: ["tomorrowWeatherData", pointDataProp?.title],
    queryFn: () =>
      getTomorrowWeatherData(pointDataProp!.lat, pointDataProp!.lng),
    enabled: !!pointDataProp,
  });

  const { data: dayAfterTomorrowData } = useQuery({
    queryKey: ["dayAfterTomorrowWeatherData", pointDataProp?.title],
    queryFn: () =>
      getDayAfterTomorrowWeatherData(pointDataProp!.lat, pointDataProp!.lng),
    enabled: !!pointDataProp,
  });

  const { data: tideData } = useQuery({
    queryKey: ["tideData", pointDataProp?.title],
    queryFn: () => getTideData(pointDataProp!.lat, pointDataProp!.lng),
    enabled: !!pointDataProp,
  });

  if (!pointDataProp) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <Tabs defaultValue="weather" className="w-full mx-auto">
      <TabsList className="w-full h-[40px]">
        <TabsTrigger value="weather" className="cursor-pointer">
          날씨 정보
        </TabsTrigger>
        <TabsTrigger value="tide" className="cursor-pointer">
          물때 정보
        </TabsTrigger>
      </TabsList>
      <TabsContent value="weather">
        <WeatherInfo
          data={data}
          todayData={todayData}
          tomorrowData={tomorrowData}
          dayAfterTomorrowData={dayAfterTomorrowData}
          tideData={tideData}
        />
      </TabsContent>
      <TabsContent value="tide">
        <TideInfo />
      </TabsContent>
    </Tabs>
  );
}

function WeatherInfo({
  data,
  todayData,
  tomorrowData,
  dayAfterTomorrowData,
  tideData,
}: {
  data: any;
  todayData: any;
  tomorrowData: any;
  dayAfterTomorrowData: any;
  tideData: any;
}) {
  return (
    <article className="w-full p-[16px] mt-[46px]">
      <div className="mb-[12px]">
        <h5 className="text-title-5 mb-[6px]">현재 날씨 정보</h5>
      </div>

      {/* 날씨 정보 */}
      <div className="grid grid-cols-4 gap-[30px] pb-[40px] mb-[40px] border-b border-gray-70">
        {/* 현재 날씨 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">날씨</p>
          <div className="flex items-center gap-[8px]">
            <Cloud className="w-[20x] h-[20px] text-gray-40" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              {data?.skyStatus}
            </span>
          </div>
        </div>
        {/* 기온 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">기온</p>
          <div className="flex items-center gap-[8px]">
            <ThermometerSun className="w-[20x] h-[20px] text-[#EF4444]" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              {data?.currentTemp}℃
            </span>
          </div>
        </div>
        {/* 수온 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">수온</p>
          <div className="flex items-center gap-[8px]">
            <ThermometerSnowflake className="w-[20x] h-[20px] text-primary" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              18.2℃
            </span>
          </div>
        </div>
        {/* 습도 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">습도</p>
          <div className="flex items-center gap-[8px]">
            <Droplets className="w-[20x] h-[20px] text-primary" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              {data?.humidity}%
            </span>
          </div>
        </div>
        {/* 풍속 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">풍속</p>
          <div className="flex items-center gap-[8px]">
            <Wind className="w-[20x] h-[20px] text-[#06B6D4]" />
            <span
              className={`paperlogy-6semibold text-body-1 ${
                data?.windSpeedStatus === "약풍"
                  ? "text-primary"
                  : data?.windSpeedStatus === "중풍"
                  ? "text-normal"
                  : "text-warning"
              }`}
            >
              {data?.windSpeed}m/s
            </span>
          </div>
        </div>
        {/* 파고 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">파고</p>
          <div className="flex items-center gap-[8px]">
            <Waves className="w-[20x] h-[20px] text-primary" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              {data?.waveHeight}m
            </span>
          </div>
        </div>
        {/* 강수량 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">강수량</p>
          <div className="flex items-center gap-[8px]">
            <Umbrella className="w-[20x] h-[20px] text-primary" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              {data?.precipitation === "강수없음" ? "0" : data?.precipitation}mm
            </span>
          </div>
        </div>
      </div>

      {/* 날씨 예보 테이블 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>날짜</TableHead>
            <TableHead>날씨</TableHead>
            <TableHead>기온</TableHead>
            <TableHead>강수확률</TableHead>
            <TableHead>풍속</TableHead>
            <TableHead>파고</TableHead>
            <TableHead>습도</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{dayjs().format("YYYY-MM-DD")}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <Cloud className="w-[24px] h-[24px] text-gray-40" />
                <p className="text-body-5">{todayData?.skyStatus}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#EF4444] text-body-3">
                  {todayData?.maxTemp}°
                </p>
                <p className="text-primary text-body-3">
                  {todayData?.minTemp ? todayData.minTemp : "--"}°
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#1D4ED8] text-body-3">
                  {todayData?.precipitation}%
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p
                  className={`text-[#F97316] text-body-3 ${
                    todayData?.windSpeedStatus === "약풍"
                      ? "text-primary"
                      : todayData?.windSpeedStatus === "중풍"
                      ? "text-normal"
                      : "text-warning"
                  }`}
                >
                  {todayData?.windSpeed} m/s
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">
                  {todayData?.waveHeight} m
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#09090B] text-body-3">
                  {todayData?.humidity}%
                </p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{dayjs().add(1, "day").format("YYYY-MM-DD")}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <Cloud className="w-[24px] h-[24px] text-gray-40" />
                <p className="text-body-5">{tomorrowData?.skyStatus}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#EF4444] text-body-3">
                  {tomorrowData?.maxTemp}°
                </p>
                <p className="text-primary text-body-3">
                  {tomorrowData?.minTemp ? tomorrowData.minTemp : "--"}°
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#1D4ED8] text-body-3">
                  {tomorrowData?.precipitation}%
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p
                  className={`text-[#F97316] text-body-3 ${
                    tomorrowData?.windSpeedStatus === "약풍"
                      ? "text-primary"
                      : tomorrowData?.windSpeedStatus === "중풍"
                      ? "text-normal"
                      : "text-warning"
                  }`}
                >
                  {tomorrowData?.windSpeed} m/s
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">
                  {tomorrowData?.waveHeight} m
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#09090B] text-body-3">
                  {tomorrowData?.humidity}%
                </p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{dayjs().add(2, "day").format("YYYY-MM-DD")}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <Cloud className="w-[24px] h-[24px] text-gray-40" />
                <p className="text-body-5">{dayAfterTomorrowData?.skyStatus}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#EF4444] text-body-3">
                  {dayAfterTomorrowData?.maxTemp}°
                </p>
                <p className="text-primary text-body-3">
                  {dayAfterTomorrowData?.minTemp
                    ? dayAfterTomorrowData.minTemp
                    : "--"}
                  °
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#1D4ED8] text-body-3">
                  {dayAfterTomorrowData?.precipitation}%
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p
                  className={`text-[#F97316] text-body-3 ${
                    dayAfterTomorrowData?.windSpeedStatus === "약풍"
                      ? "text-primary"
                      : dayAfterTomorrowData?.windSpeedStatus === "중풍"
                      ? "text-normal"
                      : "text-warning"
                  }`}
                >
                  {dayAfterTomorrowData?.windSpeed} m/s
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">
                  {dayAfterTomorrowData?.waveHeight} m
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#09090B] text-body-3">
                  {dayAfterTomorrowData?.humidity}%
                </p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{dayjs().add(3, "day").format("YYYY-MM-DD")}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <Cloud className="w-[24px] h-[24px] text-gray-40" />
                <p className="text-body-5">{tideData?.skyStatus}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#EF4444] text-body-3">
                  {tideData?.maxTemp}°
                </p>
                <p className="text-primary text-body-3">
                  {tideData?.minTemp ? tideData.minTemp : "--"}°
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#1D4ED8] text-body-3">
                  {tideData?.precipitation}%
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p
                  className={`text-[#F97316] text-body-3 ${
                    tideData?.windSpeedStatus === "약풍"
                      ? "text-primary"
                      : tideData?.windSpeedStatus === "중풍"
                      ? "text-normal"
                      : "text-warning"
                  }`}
                >
                  {tideData?.windSpeed} m/s
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">
                  {tideData?.waveHeight} m
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#09090B] text-body-3">
                  {tideData?.humidity}%
                </p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{dayjs().add(4, "day").format("YYYY-MM-DD")}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <Cloud className="w-[24px] h-[24px] text-gray-40" />
                <p className="text-body-5">흐림</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#EF4444] text-body-3">22°</p>
                <p className="text-primary text-body-3">14°</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#1D4ED8] text-body-3">70%</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">5.8 m/s</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">1.2 m</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#09090B] text-body-3">75%</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{dayjs().add(5, "day").format("YYYY-MM-DD")}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <Cloud className="w-[24px] h-[24px] text-gray-40" />
                <p className="text-body-5">흐림</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#EF4444] text-body-3">22°</p>
                <p className="text-primary text-body-3">14°</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#1D4ED8] text-body-3">70%</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">5.8 m/s</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">1.2 m</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#09090B] text-body-3">75%</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{dayjs().add(6, "day").format("YYYY-MM-DD")}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <Cloud className="w-[24px] h-[24px] text-gray-40" />
                <p className="text-body-5">흐림</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#EF4444] text-body-3">22°</p>
                <p className="text-primary text-body-3">14°</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#1D4ED8] text-body-3">70%</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">5.8 m/s</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#F97316] text-body-3">1.2 m</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-[#09090B] text-body-3">75%</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </article>
  );
}

function TideInfo() {
  return <div>물때 정보</div>;
}
