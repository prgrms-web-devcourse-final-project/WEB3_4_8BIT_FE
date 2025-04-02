import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Anchor, Clock, Droplets, MapPin, Ship, Users, Utensils, Wifi} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import type React from "react";

export default function TabDetail(){
  // 편의시설 정보
  const amenities = [
    { icon: <Ship className="h-5 w-5" />, name: "선실", description: "쾌적한 실내 공간" },
    { icon: <Utensils className="h-5 w-5" />, name: "식사 제공", description: "점심 도시락 포함" },
    { icon: <Droplets className="h-5 w-5" />, name: "화장실", description: "깨끗한 화장실 구비" },
    { icon: <Wifi className="h-5 w-5" />, name: "와이파이", description: "무료 인터넷 제공" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>상세 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">출항 정보</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">출항지</p>
                <p className="text-gray-600">부산 기장군 기장읍 연화리 어촌계 선착장</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">출항 시간</p>
                <p className="text-gray-600">오전 6시 (새벽 5시 30분까지 집결)</p>
              </div>
            </div>
            <div className="flex items-start">
              <Anchor className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">선박 정보</p>
                <p className="text-gray-600">해양호 (9.77톤, 정원 20명)</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">최소 인원</p>
                <p className="text-gray-600">10명 (미달 시 출항 취소될 수 있음)</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">낚시 정보</h3>
          <p className="text-gray-700 mb-4">
            기장 앞바다는 다양한 어종이 서식하는 천혜의 낚시터입니다. 특히 봄부터 가을까지는 참돔, 감성돔 등
            고급 어종을 낚을 수 있는 최적의 장소입니다. 선장님의 30년 경력을 바탕으로 그날의 조황에 맞는
            최적의 포인트로 안내해 드립니다.
          </p>
          <p className="text-gray-700">
            초보자도 쉽게 낚시를 즐길 수 있도록 기본적인 낚시 방법을 알려드리며, 필요한 장비도 대여해
            드립니다. 가족, 친구, 회사 동료들과 함께 잊지 못할 낚시 경험을 만들어 보세요.
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-sub-2 text-primary p-3 rounded-full">{amenity.icon}</div>
              <div>
                <h4 className="font-medium">{amenity.name}</h4>
                <p className="text-gray-600 text-sm mt-1">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">취소 및 환불 규정</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>7일 전 취소: 100% 환불</li>
            <li>5일 전 취소: 70% 환불</li>
            <li>3일 전 취소: 50% 환불</li>
            <li>2일 전 취소: 30% 환불</li>
            <li>1일 전 취소: 환불 불가</li>
            <li>기상 악화로 인한 출항 취소 시: 100% 환불 또는 일정 변경</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}