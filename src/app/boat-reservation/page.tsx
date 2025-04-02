import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BoatCard from "@/components/BoatCard";
import SearchBox from "@/app/boat-reservation/components/SearchBox";
import FilterBox from "@/app/boat-reservation/components/FilterBox";

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
        <SearchBox/>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterBox/>
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">검색 결과 (24)</h2>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px] cursor-pointer">
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