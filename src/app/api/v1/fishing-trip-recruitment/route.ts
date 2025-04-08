import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fishingTripPostId, introduction, fishingLevel } = body;

    if (!fishingTripPostId || !introduction || !fishingLevel) {
      return NextResponse.json(
        {
          timestamp: new Date().toISOString(),
          code: 400,
          data: null,
          message: "필수 정보가 누락되었습니다.",
          success: false,
        },
        { status: 400 }
      );
    }

    // 목업 응답 반환
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      code: 200,
      data: {
        fishingTripPostId,
        introduction,
        fishingLevel,
        status: "PENDING",
      },
      message: "참여 신청이 완료되었습니다.",
      success: true,
    });
  } catch (error) {
    console.error("Error in fishing-trip-recruitment API:", error);
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        code: 500,
        data: null,
        message: "참여 신청 중 오류가 발생했습니다.",
        success: false,
      },
      { status: 500 }
    );
  }
}
