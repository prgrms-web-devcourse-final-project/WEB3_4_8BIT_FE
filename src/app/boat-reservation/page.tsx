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
import Link from "next/link";

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
      keyword: params?.keyword || "",
      guestCount: params?.guestCount?.toString() || "",
      minRating: params?.minRating?.toString() || "",
      maxPrice: params?.maxPrice?.toString() || "",
      fishId: params?.fishId?.toString() || "",
      duration: params?.duration || "",
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

export default async function BoatReservation({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const awaitedParams = await searchParams;

  const params: ShipFishingPostParams = {
    keyword:
      typeof awaitedParams.keyword === "string" ? awaitedParams.keyword : "",
    size: typeof awaitedParams.size === "string" ? +awaitedParams.size : 10,
    guestCount:
      typeof awaitedParams.guestCount === "string"
        ? +awaitedParams.guestCount - 1
        : undefined,
    searchDate:
      typeof awaitedParams.searchDate === "string"
        ? awaitedParams.searchDate
        : undefined,
    minRating:
      typeof awaitedParams.minRating === "string"
        ? +awaitedParams.minRating
        : undefined,
    maxPrice:
      typeof awaitedParams.maxPrice === "string"
        ? +awaitedParams.maxPrice
        : undefined,
    fishId:
      typeof awaitedParams.fishId === "string"
        ? +awaitedParams.fishId
        : undefined,
    duration:
      typeof awaitedParams.duration === "string"
        ? awaitedParams.duration
        : undefined,
  };

  const shipPostsData = await getShipPosts(params);

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
              {shipPostsData.data.content.length === 0 ? (
                <div className="col-span-2 flex flex-col items-center justify-center py-16 rounded-lg border border-gray-100 shadow-sm">
                  <div className="text-gray-400 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-700 mb-3">
                    검색 결과가 없습니다
                  </h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    다른 검색 조건으로 다시 시도해보세요. 필터를 조정하거나
                    검색어를 변경해보세요.
                  </p>
                  <Link
                    href="/boat-reservation"
                    className="px-5 py-2.5 bg-primary text-white rounded-md hover:bg-sub-1 transition-colors shadow-sm"
                  >
                    필터 초기화
                  </Link>
                </div>
              ) : (
                shipPostsData.data.content.map((post) => (
                  <BoatCard key={post.shipFishingPostId} boatData={post} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
