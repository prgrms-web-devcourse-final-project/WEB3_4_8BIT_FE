"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Droplets, Moon, Sun } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DailyTideData,
  getTideChartData,
} from "@/lib/api/getSeaTemperatureAPI";
import TideChart from "@/app/fishing-point/[pointId]/component/TideChart";
import dayjs from "dayjs";

export default function TabWater() {
  const [currentTideIndex, setCurrentTideIndex] = useState(0);
  const { data: tideChartData } = useQuery<DailyTideData[]>({
    queryKey: ["tideChartData"],
    queryFn: () => getTideChartData(37.2688889, 126.2919444),
  });

  // 물때 정보
  const tideInfo = [
    {
      date: "2023.11.01",
      sunrise: "06:32",
      sunset: "17:45",
      highTide: ["09:15", "21:45"],
      lowTide: ["03:20", "15:50"],
    },
    {
      date: "2023.11.02",
      sunrise: "06:33",
      sunset: "17:44",
      highTide: ["10:00", "22:30"],
      lowTide: ["04:05", "16:35"],
    },
    {
      date: "2023.11.03",
      sunrise: "06:34",
      sunset: "17:43",
      highTide: ["10:45", "23:15"],
      lowTide: ["04:50", "17:20"],
    },
    {
      date: "2023.11.04",
      sunrise: "06:35",
      sunset: "17:42",
      highTide: ["11:30", "23:59"],
      lowTide: ["05:35", "18:05"],
    },
    {
      date: "2023.11.05",
      sunrise: "06:36",
      sunset: "17:41",
      highTide: ["12:15", "--:--"],
      lowTide: ["06:20", "18:50"],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>물때 정보</CardTitle>
        <CardDescription>낚시 계획에 참고하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Tide Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentTideIndex * 100}%)` }}
            >
              {tideInfo.map((info, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <span className="ml-2 text-sm bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">
                          {dayjs(info.date).format("MM월 DD일")}
                        </span>
                      </h3>
                      <div className="flex space-x-4">
                        <div className="flex items-center text-amber-500">
                          <Sun className="h-4 w-4 mr-1" /> {info.sunrise}
                        </div>
                        <div className="flex items-center text-indigo-500">
                          <Moon className="h-4 w-4 mr-1" /> {info.sunset}
                        </div>
                      </div>
                    </div>

                    {/* Tide Visualization */}
                    <div className="mb-6">
                      <TideChart tideChartData={tideChartData} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">만조 시간</h4>
                        <div className="space-y-1">
                          {info.highTide.map((time, i) => (
                            <div key={i} className="flex items-center">
                              <Droplets className="h-4 w-4 text-blue-600 mr-2" />
                              <span>{time !== "--:--" ? time : "-"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">간조 시간</h4>
                        <div className="space-y-1">
                          {info.lowTide.map((time, i) => (
                            <div key={i} className="flex items-center">
                              <Droplets className="h-4 w-4 text-blue-300 mr-2" />
                              <span>{time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
