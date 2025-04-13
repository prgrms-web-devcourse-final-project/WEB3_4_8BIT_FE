import FilterBox from "@/app/boat-reservation/components/FilterBox";
import {
  ShipFishingPostParams,
  ShipPostListAPIResponse,
} from "@/types/boatPostType";
import BoatList from "./components/BoatList";
import SortBox from "./components/SortBox";
import { cookies } from "next/headers";

async function getShipPosts(
  params?: ShipFishingPostParams
): Promise<ShipPostListAPIResponse> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const token = process.env.NEXT_PUBLIC_API_TOKEN || "기본_토큰_값";

    const query = new URLSearchParams({
      order: params?.order || "desc",
      sort: params?.sort || "createdAt",
      type: params?.type || "next",
      fieldValue: params?.fieldValue ?? "",
      id: params?.id?.toString() ?? "",
      size: params?.size?.toString() || "4",
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
          Cookie: cookieHeader,
          Authorization: token,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
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
    size: typeof awaitedParams.size === "string" ? +awaitedParams.size : 4,
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
    order:
      typeof awaitedParams.order === "string"
        ? awaitedParams.order === "asc" || awaitedParams.order === "desc"
          ? awaitedParams.order
          : "desc"
        : "desc",
    sort:
      typeof awaitedParams.sort === "string" ? awaitedParams.sort : "createdAt",
    type:
      typeof awaitedParams.type === "string"
        ? awaitedParams.type === "next" || awaitedParams.type === "prev"
          ? awaitedParams.type
          : "next"
        : "next",
    fieldValue:
      typeof awaitedParams.fieldValue === "string"
        ? awaitedParams.fieldValue
        : undefined,
    id: typeof awaitedParams.id === "string" ? +awaitedParams.id : undefined,
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterBox />
          <div className="lg:col-span-3 space-y-6">
            <SortBox shipPostsData={shipPostsData} />

            <BoatList shipPostsData={shipPostsData} />
          </div>
        </div>
      </div>
    </div>
  );
}
