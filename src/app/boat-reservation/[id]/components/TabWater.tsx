"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Droplets, Moon, Sun } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  DailyTideData,
  getTideChartData,
} from "@/lib/api/getSeaTemperatureAPI";
import TideChart from "@/app/fishing-point/[pointId]/component/TideChart";
import dayjs from "dayjs";
import { getCoordinatesFromAddress } from "@/lib/api/getCoordinatesFromAddress";
import { WeatherResponse } from "@/types/weatherTypes";
import { getWeatherData } from "@/lib/api/weatherDataAPI";

export default function TabWater({ departurePort }: { departurePort: string }) {
  const { data: coordinates } = useQuery<{
    latitude: number;
    longitude: number;
  } | null>({
    queryKey: ["coordinates", departurePort],
    queryFn: () => getCoordinatesFromAddress(departurePort),
  });

  const { data: tideChartData, isLoading: tideChartLoading } = useQuery<
    DailyTideData[]
  >({
    queryKey: ["tideChartData"],
    queryFn: () =>
      getTideChartData(coordinates!.latitude, coordinates!.longitude),
    enabled: !!coordinates,
  });

  const { data: currentWeather, isLoading: currentWeatherLoading } =
    useQuery<WeatherResponse>({
      queryKey: ["currentWeather"],
      queryFn: () =>
        getWeatherData(coordinates!.longitude, coordinates!.latitude),
      enabled: !!coordinates,
    });

  if (tideChartLoading || currentWeatherLoading) {
    return <div>Loading...</div>;
  }

  console.log(currentWeather);

  const tideInfo = tideChartData?.[1];
  return (
    <Card>
      <CardHeader>
        <CardTitle>물때 정보</CardTitle>
        <CardDescription>낚시 계획에 참고하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out">
              <div className="w-full flex-shrink-0 px-1">
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <span className="ml-2 text-sm bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">
                        {dayjs(tideInfo?.date).format("M월 D일")}
                      </span>
                    </h3>
                    <div className="flex space-x-4">
                      <div className="flex items-center text-amber-500">
                        <Sun className="h-4 w-4 mr-1" />{" "}
                        {currentWeather &&
                          dayjs
                            .unix(+currentWeather.current.sunrise!)
                            .format("HH:mm")}
                      </div>
                      <div className="flex items-center text-indigo-500">
                        <Moon className="h-4 w-4 mr-1" />
                        {currentWeather &&
                          dayjs
                            .unix(+currentWeather.current.sunset!)
                            .format("HH:mm")}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <TideChart tideChartData={tideChartData} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">만조 시간</h4>
                      <div className="space-y-1">
                        {tideInfo?.tides
                          .filter((time) => time.hl_code === "고조")
                          .map((time) => (
                            <div
                              key={time.tph_time}
                              className="flex items-center"
                            >
                              <Droplets className="h-4 w-4 text-blue-600 mr-2" />
                              <span>
                                {new Date(time.tph_time).toLocaleTimeString(
                                  "ko-KR",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  }
                                )}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">간조 시간</h4>
                      <div className="space-y-1">
                        {tideInfo?.tides
                          .filter((time) => time.hl_code === "저조")
                          .map((time) => (
                            <div
                              key={time.tph_time}
                              className="flex items-center"
                            >
                              <Droplets className="h-4 w-4 text-blue-300 mr-2" />
                              <span>
                                {new Date(time.tph_time).toLocaleTimeString(
                                  "ko-KR",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  }
                                )}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium flex items-center text-blue-800">
            <Droplets className="h-5 w-5 mr-2" /> 물때 팁
          </h4>
          <p className="mt-2 text-blue-800">
            참돔과 감성돔은 주로 간조에서 만조로 바뀌는 창조류 때 활발하게
            활동합니다. 특히 해 뜨기 직전과 해 질 무렵의 창조류 시간대가 가장
            조황이 좋습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
