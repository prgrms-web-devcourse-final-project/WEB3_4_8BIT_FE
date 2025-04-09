import { Badge } from "@/components/ui/badge"
import { cookies } from 'next/headers';
import MyPageFishCard from "@/app/user/mypage/fish-encyclopedia/components/MyPageFishCard";
import {FishInfo} from "@/types/fish.interface";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default async function FishEncyclopedia() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch('https://api.mikki.kr/api/v1/fishes/encyclopedias', {
    headers: {
      Cookie: cookieHeader,
      // TODO 추후 쿠키로 통일해야함
      Authorization : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IkNBUFRBSU4iLCJlbWFpbCI6InRveWF6eEBuYXZlci5jb20iLCJpYXQiOjE3NDQxODA2MTIsImV4cCI6MTc0NDI2NzAxMn0.uhLhUHzlKc9K6THqYPcCUxzcfORBksafiNj7xti8hRAdLhkQ9D5YynFORaRrfDHT882_VPO8P7Tyj4pivZ2OeQ',
    }
  });
  const responseData = await response.json();
  const fishData : FishInfo[] = responseData.data;
  console.log(fishData);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">내 어류 도감</h1>
        <Badge variant="outline" className="px-3 py-1">
          총 {fishData?.length}종 수집
        </Badge>
      </div>

      <div className="text-gray-30">잡은 물고기를 등록해 어류 도감에 추가해보세요.</div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fishData?.map((item) => (
          <MyPageFishCard
            key={item.fishEncyclopediaId}
            fishEncyclopediaId={item.fishEncyclopediaId}
            fileUrl={item.fileUrl}
            fishName={item.fishName}
            bestLength={item.bestLength}
            totalCount={item.totalCount}
          />
        ))}
      </div>
    </div>
  )
}