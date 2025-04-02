import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CalendarIcon, MapPin, Star} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {format} from "date-fns";
import {ko} from "date-fns/locale";
import {Calendar} from "@/components/ui/calendar";
import React, {useState} from "react";

export default function ReservationInfo(){
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedPeople, setSelectedPeople] = useState(1)

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">해양호</CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" /> 부산 기장군
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
            <span className="font-medium">1</span>
            <span className="text-sm text-gray-500 ml-1">(1)</span>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">날짜 선택</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: ko }) : "날짜를 선택하세요"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ko} />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="font-medium mb-3">인원 선택</h3>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedPeople(Math.max(1, selectedPeople - 1))}
            >
              -
            </Button>
            <span className="text-lg font-medium">{selectedPeople}명</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedPeople(Math.min(10, selectedPeople + 1))}
            >
              +
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>기본 요금 (1인)</span>
            <span>₩80,000</span>
          </div>
          {selectedPeople > 1 && (
            <div className="flex justify-between text-gray-600">
              <span>추가 인원 ({selectedPeople - 1}명)</span>
              <span>₩{(selectedPeople - 1) * 80000}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>총 금액</span>
            <span>₩{selectedPeople * 80000}</span>
          </div>
        </div>

        <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-lg py-6" disabled={!date}>
          {date ? "예약하기" : "날짜를 선택해주세요"}
        </Button>

        <div className="text-center text-sm text-gray-500">
          지금 바로 예약하고 선상 낚시를 즐겨보세요.
        </div>
      </CardContent>
    </Card>
  )
}