import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BoatCard from "@/components/BoatCard";
import SearchBox from "@/app/boat-reservation/components/SearchBox";
import FilterBox from "@/app/boat-reservation/components/FilterBox";
import { PostType } from "@/types/boatPostType";

// 더미 API 함수
async function getBoatPosts(): Promise<PostType[]> {
  try {
    const response = await fetch("http://localhost:3000/api/boatPostMock", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API 호출 에러:", error);
    return []; // 에러 시 빈 배열 반환
  }
}

export default async function BoatReservation() {
  const boatPostsData = await getBoatPosts();

  return (
    <div className="min-h-screen">
      <div className="bg-sky-700 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">선상 낚시 예약</h1>
          <p className="text-lg text-cyan-100 max-w-3xl">
            전국 각지의 선상 낚시를 검색하고 예약해보세요!
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SearchBox />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterBox />
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                검색 결과 ({boatPostsData.length})
              </h2>
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
              {boatPostsData.map((boat) => (
                <BoatCard key={boat.shipFishingPostId} boatData={boat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
