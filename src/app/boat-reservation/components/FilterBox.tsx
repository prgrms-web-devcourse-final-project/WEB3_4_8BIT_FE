import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {RotateCw, Star} from "lucide-react";
import {Slider} from "@/components/ui/slider";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function FilterBox() {
  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle className="text-xl">필터</CardTitle>
          <div className="flex gap-1 items-center cursor-pointer text-gray-40">
            <RotateCw size={16}/>
            초기화
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">가격 범위</h4>
            <Slider defaultValue={[50000]} max={200000} step={10000} />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>0원</span>
              <span>200,000원</span>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">평점</h4>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" className="cursor-pointer" />
                <Label htmlFor="all">전체</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4plus" id="4plus" className="cursor-pointer" />
                <Label htmlFor="4plus" className="flex items-center">
                  4.0 이상 <Star className="h-3 w-3 fill-amber-400 text-amber-400 ml-1" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3plus" id="3plus" className="cursor-pointer" />
                <Label htmlFor="3plus" className="flex items-center">
                  3.0 이상 <Star className="h-3 w-3 fill-amber-400 text-amber-400 ml-1" />
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <h4 className="font-medium mb-3">소요 시간</h4>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" className="cursor-pointer"/>
                <Label htmlFor="all">전체</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4plus" id="4plus" className="cursor-pointer"/>
                <Label htmlFor="4plus" className="flex items-center">
                  2시간 이하
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3plus" id="3plus" className="cursor-pointer"/>
                <Label htmlFor="3plus" className="flex items-center">
                  4시간 이하
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3plus" id="3plus" className="cursor-pointer"/>
                <Label htmlFor="3plus" className="flex items-center">
                  6시간 이하
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <h4 className="font-medium mb-3">대상 어종</h4>
            <Select>
              <SelectTrigger id="fish-type" className="cursor-pointer">
                <SelectValue placeholder="어종 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="red-seabream">참돔</SelectItem>
                <SelectItem value="sea-bass">농어</SelectItem>
                <SelectItem value="flounder">광어</SelectItem>
                <SelectItem value="squid">갑오징어</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h4 className="font-medium mb-3">출항 지역</h4>
            <Select>
              <SelectTrigger id="location" className="cursor-pointer">
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="east">동해</SelectItem>
                <SelectItem value="west">서해</SelectItem>
                <SelectItem value="south">남해</SelectItem>
                <SelectItem value="jeju">제주도</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h4 className="font-medium mb-3">편의 시설 (여기부터 추가 구현 예정)</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="toilet" className="mr-2" />
                <Label htmlFor="toilet">화장실</Label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="shower" className="mr-2" />
                <Label htmlFor="shower">샤워 시설</Label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="cabin" className="mr-2" />
                <Label htmlFor="cabin">선실</Label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="food" className="mr-2" />
                <Label htmlFor="food">식사 제공</Label>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3">선박 크기</h4>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="size-all" className="cursor-pointer" />
                <Label htmlFor="size-all">전체</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" className="cursor-pointer" />
                <Label htmlFor="small">소형 (10인 이하)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" className="cursor-pointer" />
                <Label htmlFor="medium">중형 (11-20인)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" className="cursor-pointer" />
                <Label htmlFor="large">대형 (21인 이상)</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}