import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fish } from "lucide-react";
import type React from "react";
import FishCard from "@/components/FishCard";
import { PostDetailFish } from "@/types/boatPostType";
import { formatFishSeason } from "@/utils/foramtFishSeason";

export default function TabFish({
  fishNameList,
}: {
  fishNameList: PostDetailFish[];
}) {
  console.log(fishNameList);
  return (
    <Card>
      <CardHeader>
        <CardTitle>이런 물고기를 잡을 수 있어요.</CardTitle>
        <CardDescription>
          계절과 날씨에 따라 잡히는 어종이 달라질 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!fishNameList || fishNameList.length === 0 ? (
            <p className="text-center text-gray-500">
              어종 데이터가 부족합니다.
            </p>
          ) : (
            fishNameList.map((fish) => (
              <FishCard
                key={fish.fishId}
                name={fish.name}
                season={formatFishSeason(
                  fish.spawnSeasonList[0],
                  fish.spawnSeasonList[fish.spawnSeasonList.length - 1]
                )}
                imageUrl={fish.fileUrl}
              />
            ))
          )}
        </div>

        <div className="mt-6 bg-cyan-50 p-4 rounded-lg">
          <h4 className="font-medium flex items-center text-cyan-800">
            <Fish className="h-5 w-5 mr-2" /> 이달의 추천 어종
          </h4>
          <p className="mt-2 text-cyan-800">
            11월은 참돔과 감성돔의 조황이 좋은 시기입니다. 특히 아침 시간대에
            크릴 미끼를 사용하면 대물을 낚을 확률이 높습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
