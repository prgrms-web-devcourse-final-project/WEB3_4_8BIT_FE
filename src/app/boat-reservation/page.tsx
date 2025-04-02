import {Calendar, RotateCw, Search, Star} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import BoatCard from "@/components/BoatCard";

export default function BoatReservation() {
  return (
    <div className="min-h-screen">
      <div className="bg-sky-700 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">선상 낚시 예약</h1>
          <p className="text-lg text-cyan-100 max-w-3xl">전국 각지의 선상 낚시를 검색하고 예약해보세요!</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-[1px] rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="date" className="mb-2 block">
                날짜
              </Label>
              <div className="relative">
                <Input id="date" type="date" className="pl-10" />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            <div>
              <Label htmlFor="search" className="mb-2 block">
                검색어
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input id="search" type="search" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="fish-type" className="mb-2 block">
                인원수
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="인원 수 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => (
                    <SelectItem key={i} value={String(i + 1)}>
                      {i + 1}명
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-primary hover:bg-sub-1">
                <Search className="h-4 w-4 mr-2" /> 검색
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">전체</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4plus" id="4plus" />
                      <Label htmlFor="4plus" className="flex items-center">
                        4.0 이상 <Star className="h-3 w-3 fill-amber-400 text-amber-400 ml-1" />
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3plus" id="3plus" />
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
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">전체</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4plus" id="4plus" />
                      <Label htmlFor="4plus" className="flex items-center">
                        2시간 이하
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3plus" id="3plus" />
                      <Label htmlFor="3plus" className="flex items-center">
                        4시간 이하
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3plus" id="3plus" />
                      <Label htmlFor="3plus" className="flex items-center">
                        6시간 이하
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <h4 className="font-medium mb-3">대상 어종</h4>
                  <Select>
                    <SelectTrigger id="fish-type">
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
                    <SelectTrigger id="location">
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
                      <RadioGroupItem value="all" id="size-all" />
                      <Label htmlFor="size-all">전체</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small">소형 (10인 이하)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">중형 (11-20인)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large">대형 (21인 이상)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">검색 결과 (24)</h2>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">추천순</SelectItem>
                  <SelectItem value="price-low">가격 낮은순</SelectItem>
                  <SelectItem value="price-high">가격 높은순</SelectItem>
                  <SelectItem value="rating">평점 높은순</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BoatCard
                id="0"
                image="/placeholder.svg?height=200&width=300"
                name="해양호"
                location="부산 기장군"
                rating={4.8}
                reviews={124}
                price={80000}
                fishTypes={["참돔", "감성돔", "농어"]}
              />
              <BoatCard
                id="0"
                image="/placeholder.svg?height=200&width=300"
                name="블루오션호"
                location="강원 속초시"
                rating={4.5}
                reviews={98}
                price={70000}
                fishTypes={["가자미", "방어", "대구"]}
              />
              <BoatCard
                id="2"
                image="/placeholder.svg?height=200&width=300"
                name="황금어장호"
                location="인천 옹진군"
                rating={4.3}
                reviews={56}
                price={65000}
                fishTypes={["우럭", "광어", "놀래미"]}
              />
              <BoatCard
                id="1"
                image="/placeholder.svg?height=200&width=300"
                name="제주바다호"
                location="제주 서귀포시"
                rating={4.7}
                reviews={112}
                price={90000}
                fishTypes={["다금바리", "참돔", "방어"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}