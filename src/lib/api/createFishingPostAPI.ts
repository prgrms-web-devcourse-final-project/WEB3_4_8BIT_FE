interface CreateFishingPostParams {
  subject: string;
  content: string;
  recruitmentCount: number;
  isShipFish: boolean;
  fishingDate: string;
  fishingPointId: number;
  fileIdList: number[];
}

export async function createFishingPost(postData: CreateFishingPostParams) {
  const API_BASE_URL = "https://api.mikki.kr";

  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQwMzE3MzQsImV4cCI6MTc0NDAzNTMzNH0.aMe0XkalWqVNPV3DqObQcejL26oNRRmfwEIkDY1XXnC7PmqEfiERBZeYmWRfVK8JjcoeaR6MbV5GyS1VrvBkxw";

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/fishing-trip-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("게시글 작성 실패:", error);
      throw new Error("게시글 작성에 실패했습니다.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("요청 중 오류 발생:", error);
    throw error;
  }
}
