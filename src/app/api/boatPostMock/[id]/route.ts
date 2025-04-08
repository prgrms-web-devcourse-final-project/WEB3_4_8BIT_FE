import { PostDetailType } from "@/types/boatPostType";
import { NextResponse } from "next/server";

export async function GET() {
  const dummyApiResponse: PostDetailType = {
    timestamp: "2025-04-07T15:32:34.893934441Z",
    data: {
      detailShipFishingPost: {
        shipFishingPostId: 1,
        subject: "빵빵이호 낚시 투어",
        content:
          "동해안 최고의 우럭 포인트에서 낚시를 즐겨보세요! 초보자도 쉽게 잡을 수 있는 포인트로 안내해 드립니다. \n낚시 장비는 모두 제공되며, 잡은 물고기는 손질해서 가져가실 수 있습니다. \n선상에서 간단한 식사와 음료가 제공됩니다. 가족, 친구들과 함께 잊지 못할 낚시 경험을 만들어보세요.",
        price: 100000,
        imageList: [
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
        ],
        startTime: "15:00",
        durationTime: "02:30",
        maxGuestCount: 10,
        reviewEverRate: 5.0,
      },
      detailShip: {
        shipId: 1,
        shipName: "빵빵이호",
        shipNumber: "SEA123",
        departurePort: "부산 기장군 기장읍 연화리 어촌계 선착장",
        publicRestroom: true, //공용 화장실, 남/여 구분 화장실, 없음
        loungeArea: true,
        kitchenFacility: true,
        fishingChair: true,
        passengerInsurance: true,
        fishingGearRental: true,
        mealProvided: true,
        parkingAvailable: true,
      },
      detailMember: {
        memberId: 1,
        email: "captain@example.com",
        name: "김선장",
        phone: "010-1234-5678",
      },
    },
    success: true,
  };

  return NextResponse.json(dummyApiResponse);
}
