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
  getSeaTemperature,
  getWeeklyTideData,
  DailyTideData,
} from "@/lib/api/getSeaTemperatureAPI";
import {
  getCurrentWeatherData,
  getWeatherData,
} from "@/lib/api/weatherDataAPI";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Droplets,
  Moon,
  Radiation,
  Sunrise,
  Sunset,
  ThermometerSnowflake,
  ThermometerSun,
  Timer,
  Waves,
  Wind,
} from "lucide-react";
import TableContent from "./TableContent";
import {
  FishLocation,
  CurrentWeatherData,
  SeaTemperatureData,
  WeatherResponse,
} from "@/types/weatherTypes";
import {
  getWeatherIcon,
  getWeatherText,
  getUVIColor,
  getUVIText,
  formatTemperature,
} from "@/utils/weatherStatusFormater";
import { calculateMoonPhase } from "@/utils/moonPhaseCalculator";
import SeaTimeDescription from "./seaTimeDescription";

export default function FishingConditionsTab({
  pointDataProp,
}: {
  pointDataProp: FishLocation | null;
}) {
  const { data, isLoading: isCurrentWeatherDataLoading } =
    useQuery<CurrentWeatherData>({
      queryKey: ["Data", pointDataProp?.title],
      queryFn: () =>
        getCurrentWeatherData(pointDataProp!.lat, pointDataProp!.lng),
      enabled: !!pointDataProp,
    });

  const { data: seaTemperatureData, isLoading: isSeaTemperatureDataLoading } =
    useQuery<SeaTemperatureData>({
      queryKey: ["seaTemperatureData", pointDataProp?.title],
      queryFn: () => getSeaTemperature(pointDataProp!.lat, pointDataProp!.lng),
      enabled: !!pointDataProp,
    });

  const { data: weatherData, isLoading: isWeatherDataLoading } =
    useQuery<WeatherResponse>({
      queryKey: ["weatherData", pointDataProp?.title],
      queryFn: () => getWeatherData(pointDataProp!.lat, pointDataProp!.lng),
      enabled: !!pointDataProp,
    });

  const { data: tideData, isLoading: isTideDataLoading } = useQuery<
    DailyTideData[]
  >({
    queryKey: ["tideData", pointDataProp?.title],
    queryFn: () => getWeeklyTideData(pointDataProp!.lat, pointDataProp!.lng),
    enabled: !!pointDataProp,
  });

  if (
    !pointDataProp ||
    isCurrentWeatherDataLoading ||
    isSeaTemperatureDataLoading ||
    isWeatherDataLoading ||
    isTideDataLoading
  ) {
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
          seaTemperatureData={seaTemperatureData}
          weatherData={weatherData}
        />
      </TabsContent>
      <TabsContent value="tide">
        <TideInfo tideData={tideData} weatherData={weatherData} />
      </TabsContent>
    </Tabs>
  );
}

function WeatherInfo({
  data,
  seaTemperatureData,
  weatherData,
}: {
  data: CurrentWeatherData | undefined;
  seaTemperatureData: SeaTemperatureData | undefined;
  weatherData: WeatherResponse | undefined;
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
            {getWeatherIcon(weatherData?.current?.weather[0]?.main)}
            <span className="text-primary paperlogy-6semibold text-body-1">
              {getWeatherText(weatherData?.current?.weather[0]?.main)}
            </span>
          </div>
        </div>
        {/* 기온 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">기온</p>
          <div className="flex items-center gap-[8px]">
            <ThermometerSun className="w-[20x] h-[20px] text-[#EF4444]" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              {formatTemperature(weatherData?.current?.temp ?? 0)}℃
            </span>
          </div>
        </div>
        {/* 수온 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">수온</p>
          <div className="flex items-center gap-[8px]">
            <ThermometerSnowflake className="w-[20x] h-[20px] text-primary" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              {seaTemperatureData?.water_temp ?? "--"}℃
            </span>
          </div>
        </div>
        {/* 습도 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">습도</p>
          <div className="flex items-center gap-[8px]">
            <Droplets className="w-[20x] h-[20px] text-primary" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              {weatherData?.current.humidity ?? "--"}%
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
                seaTemperatureData?.wind_speed &&
                seaTemperatureData?.wind_speed < 4
                  ? "text-primary"
                  : seaTemperatureData?.wind_speed &&
                    seaTemperatureData?.wind_speed < 8
                  ? "text-normal"
                  : "text-warning"
              }`}
            >
              {seaTemperatureData?.wind_speed ?? "--"}m/s
            </span>
          </div>
        </div>
        {/* 파고 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">파고</p>
          <div className="flex items-center gap-[8px]">
            <Waves className="w-[20x] h-[20px] text-primary" />
            <span className="text-primary paperlogy-6semibold text-body-1">
              {data?.waveHeight ?? "--"}m
            </span>
          </div>
        </div>
        {/* 자외선 */}
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">자외선</p>
          <div className="flex items-center gap-[8px]">
            <Radiation
              className={`w-[20x] h-[20px] text-primary ${getUVIColor(
                weatherData?.current?.uvi ?? 0
              )}`}
            />
            <span
              className={`text-primary paperlogy-6semibold text-body-1 ${getUVIColor(
                weatherData?.current?.uvi ?? 0
              )}`}
            >
              {getUVIText(weatherData?.current?.uvi ?? 0)}
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
            <TableHead>체감온도</TableHead>
            <TableHead>습도</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {weatherData && weatherData.daily.length > 0 ? (
            <>
              <TableContent
                day={dayjs().format("YYYY-MM-DD")}
                dayData={weatherData.daily[0]}
              />
              <TableContent
                day={dayjs().add(1, "day").format("YYYY-MM-DD")}
                dayData={weatherData.daily[1]}
              />
              <TableContent
                day={dayjs().add(2, "day").format("YYYY-MM-DD")}
                dayData={weatherData.daily[2]}
              />
              <TableContent
                day={dayjs().add(3, "day").format("YYYY-MM-DD")}
                dayData={weatherData.daily[3]}
              />
              <TableContent
                day={dayjs().add(4, "day").format("YYYY-MM-DD")}
                dayData={weatherData.daily[4]}
              />
              <TableContent
                day={dayjs().add(5, "day").format("YYYY-MM-DD")}
                dayData={weatherData.daily[5]}
              />
              <TableContent
                day={dayjs().add(6, "day").format("YYYY-MM-DD")}
                dayData={weatherData.daily[6]}
              />
              <TableContent
                day={dayjs().add(7, "day").format("YYYY-MM-DD")}
                dayData={weatherData.daily[7]}
              />
            </>
          ) : (
            <TableRow>
              <td colSpan={7} className="text-center py-4">
                날씨 데이터가 없습니다.
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </article>
  );
}

function TideInfo({
  tideData,
  weatherData,
}: {
  tideData: DailyTideData[] | undefined;
  weatherData: WeatherResponse | undefined;
}) {
  console.log(weatherData?.daily);
  return (
    <article className="w-full p-[16px] mt-[46px]">
      <div className="mb-[12px]">
        <h5 className="text-title-5 mb-[6px]">현재 물때 정보</h5>
      </div>

      {/* 현재 물때 정보 */}
      <div className="grid grid-cols-3 gap-[30px] pb-[40px] mb-[40px] border-b border-gray-70">
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">현재 상태</p>
          <div className="flex items-center gap-[8px]">
            <Waves className="w-[20x] h-[20px] text-primary" />
            <span>만조 진행중</span>
          </div>
        </div>
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">오늘 물때</p>
          <div className="flex items-center gap-[8px]">
            <Timer className="w-[20x] h-[20px] text-primary" />
            <span>{calculateMoonPhase().tideName}</span>
          </div>
        </div>
        <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
          <p className="text-body-4 text-gray-40 mb-[4px]">달의 위상</p>
          <div className="flex items-center gap-[8px]">
            <Moon className="w-[20x] h-[20px] text-primary" />
            <span>{calculateMoonPhase().moonPhase}</span>
          </div>
        </div>
      </div>

      {/* 물때 설명 섹션 */}
      <SeaTimeDescription />

      <Table className="mt-[40px] text-body-4">
        <TableHeader>
          <TableRow>
            <TableHead>날짜</TableHead>
            <TableHead>물때</TableHead>
            <TableHead>일출/일몰</TableHead>
            <TableHead>만조</TableHead>
            <TableHead>간조</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#09090B]">
          {tideData?.map((data, index) => {
            // 저조와 고조 데이터 분리
            const lowTides = data.tides.filter(
              (tide) => tide.hl_code === "저조"
            );
            const highTides = data.tides.filter(
              (tide) => tide.hl_code === "고조"
            );

            // 시간만 추출 (HH:mm 형식)
            const formatTime = (dateTime: string) => {
              return dayjs(dateTime).format("HH:mm");
            };

            return (
              <TableRow key={data.date}>
                <TableCell>{data.date}</TableCell>
                <TableCell className="text-body-3">
                  {calculateMoonPhase(dayjs(data.date).toDate()).tideName}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[4px]">
                      <Sunrise className="text-[#D97706] w-[18px] h-[18px]" />
                      <span>
                        {dayjs
                          .unix(+weatherData!.daily[index].sunrise)
                          .format("HH:mm")}
                      </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <Sunset className="w-[18px] h-[18px]" />
                      <span>
                        {dayjs
                          .unix(+weatherData!.daily[index].sunset)
                          .format("HH:mm")}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-primary gap-[4px]">
                    {highTides.map((tide, index) => (
                      <span key={index}>{formatTime(tide.tph_time)}</span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-[#D97706] gap-[4px]">
                    {lowTides.map((tide, index) => (
                      <span key={index}>{formatTime(tide.tph_time)}</span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </article>
  );
}
