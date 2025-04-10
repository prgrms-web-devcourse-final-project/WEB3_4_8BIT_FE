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
import {
  ShipFishingPostParams,
  ShipPostListAPIResponse,
} from "@/types/boatPostType";

async function getShipPosts(
  params?: ShipFishingPostParams
): Promise<ShipPostListAPIResponse> {
  try {
    const token = process.env.NEXT_PUBLIC_API_TOKEN || "기본_토큰_값";

    const query = new URLSearchParams({
      order: params?.order || "desc",
      sort: params?.sort || "createdAt",
      type: params?.type || "next",
      fieldValue: params?.fieldValue ?? "",
      id: params?.id?.toString() ?? "",
      size: params?.size?.toString() || "10",
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/ship-fishing-posts?${query.toString()}`,
      {
        cache: "no-store",
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("선상 낚시 게시글 조회에 실패했습니다.", error);
    throw error;
  }
}

export default async function BoatReservation() {
  const shipPostsData = await getShipPosts();

  console.log(shipPostsData); // 서버 데이터

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
                검색 결과 ({shipPostsData.data.numberOfElements})
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
              {shipPostsData.data.content.map((post) => (
                <BoatCard key={post.shipFishingPostId} boatData={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
