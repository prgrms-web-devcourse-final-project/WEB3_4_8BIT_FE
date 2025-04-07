import { MapPin, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/types/boatPostType";

export default function BoatCard({ boatData }: { boatData: PostType }) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow pt-0">
      <div className="h-48 overflow-hidden">
        <Image
          src={
            boatData.imageList && boatData.imageList.length > 0
              ? boatData.imageList[0]
              : "/placeholder.svg"
          }
          alt={boatData.subject}
          className="w-full h-full object-cover"
          height={195}
          width={440}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex gap-1.5 items-center">
              {boatData.subject}
              <Heart className="text-red-500 cursor-pointer" />
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" /> {boatData.location}
            </CardDescription>
          </div>
          <div className="flex items-center bg-cyan-50 text-gray-20 px-2 py-1 rounded">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
            <span className="font-medium">{boatData.reviewEverRate}</span>
            <span className="text-xs text-gray-500 ml-1">
              ({boatData.reviewCount})
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {boatData.fishList.map((fish, index) => (
            <span
              key={index}
              className="bg-gray-80 text-gray-800 text-xs px-2 py-1 rounded"
            >
              {fish}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">1인 기준</span>
            <p className="text-xl font-bold text-primary-color">
              {boatData.price.toLocaleString()}원
            </p>
          </div>
          <Link href={`/boat-reservation/${boatData.shipFishingPostId}`}>
            <Button className="bg-primary hover:bg-sub-1 cursor-pointer">
              예약하기
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
