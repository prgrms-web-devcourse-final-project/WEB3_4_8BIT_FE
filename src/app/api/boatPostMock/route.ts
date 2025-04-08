import { PostType } from "@/types/boatPostType";
import { NextResponse } from "next/server";

const dummyBoats: PostType[] = [
  {
    subject: "빵빵이호 낚시 투어",
    price: 80000,
    location: "부산 기장군",
    startTime: "15:00",
    endTime: "17:30",
    durationTime: "02:30",
    shipFishingPostId: 1,
    imageList: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    fishList: [1, 2, 3],
    reviewEverRate: 5.0,
    reviewCount: 31,
  },
  {
    subject: "옥지호 바다 낚시",
    price: 120000,
    location: "제주 서귀포시",
    startTime: "09:00",
    endTime: "12:00",
    durationTime: "03:00",
    shipFishingPostId: 2,
    imageList: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    fishList: [2, 4, 5],
    reviewEverRate: 4.0,
    reviewCount: 36,
  },
  {
    subject: "김노엠호 낚시 투어",
    price: 60000,
    location: "인천 옹진군",
    startTime: "13:00",
    endTime: "16:00",
    durationTime: "03:00",
    shipFishingPostId: 3,
    imageList: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    fishList: [1, 3, 6],
    reviewEverRate: 4.5,
    reviewCount: 14,
  },
  {
    subject: "제갈제니호 낚시",
    price: 100000,
    location: "강원 속초시",
    startTime: "10:00",
    endTime: "14:00",
    durationTime: "04:00",
    shipFishingPostId: 4,
    imageList: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    fishList: [2, 5, 7],
    reviewEverRate: 2.5,
    reviewCount: 32,
  },
];

export async function GET() {
  return NextResponse.json(dummyBoats);
}

export async function POST(req: Request) {
  const newPost: PostType = await req.json();
  newPost.shipFishingPostId = dummyBoats.length + 1;
  dummyBoats.push(newPost);
  return NextResponse.json(newPost);
}
