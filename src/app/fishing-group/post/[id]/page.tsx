"use client";

import PostImages from "../components/PostImage";
import PostInfo from "../components/PostInfo";
import PostContent from "../components/PostContent";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  // PostImage 예시 데이터
  const post = {
    id: params.id,
    images: ["/images/test.png", "/images/test.png"],
  };

  // PostInfo 예시 데이터
  const postInfoData = {
    placeName: "부산 기장군 기장읍 연화리 방파제",
    date: "2025.11.18",
    time: "05:00",
    currentMembers: 3,
    maxMembers: 6,
  };

  // PostContent 예시 데이터
  const postContentData = `이번 주말(11월 18일) 기장 방파제에서 감성돔 낚시 계획 중입니다. 함께 하실 분 모집합니다. 

준비물: 
- 낚시대 (감성돔용 선상/갯바위 릴대 권장) 
- 채비 (감성돔 원투 채비) 
- 미끼 (크릴, 청갯지렁이 등) 
- 쿨러백, 장갑, 칼, 집게 등 기본 장비 
- 구명조끼 (안전을 위해 필수)  

초보자분들은 장비가 없으시면 말씀해주세요. 제가 여분 장비를 가져갈 수 있습니다. 
차량은 제가 운전해서 가며, 기장역에서 픽업 가능합니다. 
식사는 현장에서 각자 해결하거나 근처 식당에서 함께 할 예정입니다.  
날씨가 좋지 않을 경우 일정이 변경될 수 있으니 참고해주세요.`;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <PostImages images={post.images} />
        <div className="mt-6">
          <PostInfo {...postInfoData} />
        </div>
        <div className="mt-6">
          <PostContent content={postContentData} />
        </div>
      </div>
    </div>
  );
}
