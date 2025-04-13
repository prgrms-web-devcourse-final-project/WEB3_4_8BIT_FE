import Image from "next/image";
import { fishList } from "@/types/fishingPointLocationType";
import { formatFishSeason } from "@/utils/foramtFishSeason";

export default function MainFishList({
  fishList,
}: {
  fishList: fishList[] | undefined;
}) {
  return (
    <div className="w-full p-[16px] mb-[32px]">
      <div className="mb-[28px]">
        <h5 className="text-title-5 mb-[6px]">대표 어종</h5>
        <p className="text-body-4 text-gray-50">
          해당 포인트에서 자주 낚이는 대표 어종이에요.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {(!fishList || fishList.length === 0) && (
          <div className="text-body-4 text-gray-50">
            해당 포인트의 자료가 부족합니다.
          </div>
        )}
        {fishList?.map((fish) => (
          <div
            key={fish.fishId}
            className="flex items-center gap-[12px] p-4 rounded-lg"
          >
            <div className="w-[56px] h-[56px] rounded-full bg-gray-70 flex items-center justify-center flex-shrink-0">
              <Image
                src={fish.fileUrl}
                alt={fish.fishName}
                width={36}
                height={36}
              />
            </div>
            <div className="min-w-0">
              <strong className="text-body-3 block truncate">
                {fish.fishName}
              </strong>
              <p className="text-body-5 text-gray-50">
                제철:{" "}
                {formatFishSeason(
                  fish.spawnSeasonList[0],
                  fish.spawnSeasonList[fish.spawnSeasonList.length - 1]
                )}
              </p>
              <div className="bg-[#EFF6FF] py-[4px] px-[8px] inline-block mt-1">
                <span className="text-[#1E40AF] text-body-5">
                  {fish.totalCount} 마리+
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
