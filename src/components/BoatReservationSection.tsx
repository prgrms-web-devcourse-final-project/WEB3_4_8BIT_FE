"use client";

import React from "react";
import Link from "next/link";
import { Ship, Calendar, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BoatReservation() {
  return (
    <div className="mx-auto w-full px-4 py-8">
      <div className="flex items-center mb-4">
        <Ship className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">다가오는 선상 낚시</h2>
      </div>

      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            다가오는 출조 일정
          </CardTitle>
          <CardDescription className="text-gray-500">
            곧 출발하는 선상 낚시 일정입니다
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-cyan-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="bg-cyan-100 p-3 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-cyan-700" />
                </div>
                <div>
                  <p className="font-medium">기장 참돔 출조</p>
                  <p className="text-sm text-gray-500">11월 18일 (토) 05:00</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                부산시 기장군
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-cyan-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="bg-gray-100 p-3 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium">속초 오징어 출조</p>
                  <p className="text-sm text-gray-500">11월 25일 (토) 17:00</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                부산시 기장군
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-cyan-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="bg-gray-100 p-3 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium">제주 다금바리 출조</p>
                  <p className="text-sm text-gray-500">12월 2일 (토) 06:00</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                부산시 기장군
              </Badge>
            </div>
          </div>
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
