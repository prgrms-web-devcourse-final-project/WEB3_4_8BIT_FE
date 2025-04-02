import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import type React from "react";
import {Car} from "lucide-react";

export default function PlaceInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>위치 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
          <p className="text-gray-500">지도 이미지</p>
        </div>
        <p className="text-gray-700">부산광역시 기장군 기장읍 연화리 어촌계 선착장</p>
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-start">
            <Car size={18} className="mr-2"/>
            <span>주차: 무료 주차장 이용 가능</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}