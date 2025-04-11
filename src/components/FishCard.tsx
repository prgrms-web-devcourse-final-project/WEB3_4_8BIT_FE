import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function FishCard({
  name,
  season,
  imageUrl,

}: {
  name: string;
  season: string;
  imageUrl: string | null;
}) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-[#FAFAFA] rounded-lg">
      <Image
        src={imageUrl || "/images/test.png"}
        alt="어류 사진"
        className="w-14 h-14 rounded-full object-cover"
        width={56}
        height={56}
      />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">제철: {season}</p>
        <div className="flex items-center mt-1">
          <Badge className="bg-blue-50 text-blue-800 text-xs">인기</Badge>
        </div>
      </div>
    </div>
  );
}
