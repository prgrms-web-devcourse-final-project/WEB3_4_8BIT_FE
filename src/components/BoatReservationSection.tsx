"use client";

import React from "react";
import Link from "next/link";
import {Ship, Calendar, ChevronRight, Star} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {useQuery} from "@tanstack/react-query";
import {getTodayBoatFishing, ISODateString} from "@/lib/api/boatFishAPI";
import {ShipPostData} from "@/types/boatPostType";

const today: ISODateString = new Date().toISOString().split('T')[0] as ISODateString;

export default function BoatReservation() {
  const { data, isSuccess } = useQuery<ShipPostData[]>({
    queryKey: ['upcomingBoatFishing'],
    queryFn: () => getTodayBoatFishing(today),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="mx-auto w-full px-4 py-8">
      <div className="flex items-center mb-4">
        <Ship className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">다가오는 선상 낚시</h2>
      </div>

      <Card className="shadow-xl h-[382px]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            바로 출항
          </CardTitle>
          <CardDescription className="text-gray-500">
            오늘 곧바로 출발할 수 있는 선상 낚시 일정입니다
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 h-[211px]">
          {isSuccess && data?.length > 0 && (
            data.map(item => {
              return (
                <Link href={`/boat-reservation/${item.shipFishingPostId}`} className="space-y-4" key={item.shipFishingPostId}>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-cyan-50 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="bg-cyan-100 p-3 rounded-full mr-3">
                        <Calendar className="h-5 w-5 text-cyan-700" />
                      </div>
                      <div>
                        <p className="font-medium">{item.subject}</p>
                        <div className="flex gap-2 items-center">
                          <p className="text-sm text-gray-500">{item.location}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-sm fill-amber-400 text-amber-400 mr-1" />
                              <span className="text-sm">{item.reviewEverRate}점</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {item.location}
                    </Badge>
                  </div>
                </Link>
              )
            })
          )}
        </CardContent>
        <CardFooter>
          <Link
            href="/boat-reservation"
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            모든 선상 낚시 보기 <ChevronRight className="h-4 w-4 inline ml-1" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
