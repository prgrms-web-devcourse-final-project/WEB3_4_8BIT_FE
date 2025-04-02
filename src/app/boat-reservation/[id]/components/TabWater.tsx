import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronLeft, ChevronRight, Droplets, Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";

export default function TabWater() {
  const [currentTideIndex, setCurrentTideIndex] = useState(0)

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
  ]

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
                        {info.date}
                        {index === 0 && (
                          <span className="ml-2 text-sm bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">
                            오늘
                          </span>
                        )}
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
                      <div className="relative h-40 bg-gradient-to-b from-sky-50 to-blue-100 rounded-lg overflow-hidden">
                        {/* Tide Wave Visualization */}
                        <div className="absolute inset-0">
                          <svg viewBox="0 0 1440 120" className="absolute bottom-0 w-full">
                            <path
                              fill="rgba(59, 130, 246, 0.3)"
                              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                            ></path>
                          </svg>
                        </div>

                        {/* High Tide Markers */}
                        {info.highTide
                          .filter((time) => time !== "--:--")
                          .map((time, i) => {
                            // Calculate position based on time (simplified)
                            const hour = Number.parseInt(time.split(":")[0])
                            const minute = Number.parseInt(time.split(":")[1])
                            const position = ((hour * 60 + minute) / (24 * 60)) * 100

                            return (
                              <div
                                key={`high-${i}`}
                                className="absolute top-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                                style={{ left: `${position}%` }}
                              >
                                <div className="flex flex-col items-center">
                                  <span>만조</span>
                                  <span>{time}</span>
                                  <div className="h-16 border-l border-dashed border-blue-400 mt-1"></div>
                                </div>
                              </div>
                            )
                          })}

                        {/* Low Tide Markers */}
                        {info.lowTide.map((time, i) => {
                          // Calculate position based on time (simplified)
                          const hour = Number.parseInt(time.split(":")[0])
                          const minute = Number.parseInt(time.split(":")[1])
                          const position = ((hour * 60 + minute) / (24 * 60)) * 100

                          return (
                            <div
                              key={`low-${i}`}
                              className="absolute bottom-10 bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
                              style={{ left: `${position}%` }}
                            >
                              <div className="flex flex-col items-center">
                                <div className="h-8 border-l border-dashed border-blue-400 mb-1"></div>
                                <span>간조</span>
                                <span>{time}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
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

          {/* 캐러셀 조작 버튼 */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center -mt-6 px-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full cursor-pointer bg-white shadow-md h-10 w-10"
              onClick={() => setCurrentTideIndex(Math.max(0, currentTideIndex - 1))}
              disabled={currentTideIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full cursor-pointer bg-white shadow-md h-10 w-10"
              onClick={() => setCurrentTideIndex(Math.min(tideInfo.length - 1, currentTideIndex + 1))}
              disabled={currentTideIndex === tideInfo.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* 캐러셀 */}
          <div className="flex justify-center mt-4 space-x-2">
            {tideInfo.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  index === currentTideIndex ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentTideIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium flex items-center text-blue-800">
            <Droplets className="h-5 w-5 mr-2" /> 물때 팁
          </h4>
          <p className="mt-2 text-blue-800">
            참돔과 감성돔은 주로 간조에서 만조로 바뀌는 창조류 때 활발하게 활동합니다. 특히 해 뜨기 직전과
            해 질 무렵의 창조류 시간대가 가장 조황이 좋습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}