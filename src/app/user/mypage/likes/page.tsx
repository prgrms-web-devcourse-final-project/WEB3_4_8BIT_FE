import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type React from "react";
import {PostCard} from "@/app/fishing-group/components/PostCard";
import BoatCard from "@/components/BoatCard";

export default function Wishlist() {
  // 테스트용 데이터
  const posts = [
    {
      id: 1,
      title: "제주도 어라카이번만 동출하실 5인 구합니다",
      content:
        "제주도 서귀포시 어라카이번만에서 참돔 낚시 동출하실 분 구합니다. 숙소는 근처 펜션 예약했고, 배 예약도 완료했습니다. 장비는 개인 지참입니다.",
      date: "2025.03.30",
      location: "제주시 서귀포시",
      views: 14,
      likes: 5,
      comments: 15,
      thumbnail: "/images/test.png",
      isRecruiting: true,
      memberCount: 5,
    },
    {
      id: 2,
      title: "기장 감성돔 낚시 동출 구해요",
      content:
        "부산 기장에서 감성돔 낚시 동출하실 분 구합니다. 주말에 가려고 하는데 4인 정도 생각하고 있습니다. 초보자도 환영합니다.",
      date: "2025.03.25",
      location: "부산시 기장군",
      views: 24,
      likes: 8,
      comments: 8,
      thumbnail: "/images/test.png",
      isRecruiting: true,
      memberCount: 4,
    },
    {
      id: 3,
      title: "방파제 갑오징어 낚시 함께해요",
      content:
        "여수 방파제에서 갑오징어 낚시 하실 분 구합니다. 저녁 8시부터 새벽까지 계획하고 있습니다. 차량 있으신 분 우대합니다.",
      date: "2025.03.20",
      location: "전라남도 여수시",
      views: 32,
      likes: 12,
      comments: 12,
      thumbnail: "/images/test.png",
      isRecruiting: false,
      memberCount: 3,
    },
  ];


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">위시리스트</h1>

      <div className="text-gray-30">나의 위시 리스트 내역을 확인해보세요.</div>

      <Tabs defaultValue="boats">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="boats" className="cursor-pointer">선상 낚시</TabsTrigger>
          <TabsTrigger value="points" className="cursor-pointer">동출 모집</TabsTrigger>
        </TabsList>

        <TabsContent value="boats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BoatCard
              name="제주 서귀포 블루오션호"
              id={"10"}
              location="제주 서귀포시"
              rating={4.7}
              reviews={112}
              price={90000}
              fishTypes={["다금바리", "참돔", "방어"]}
              image="/images/test.png"
            />
            <BoatCard
              name="통영 거제 바다왕호"
              id={"10"}
              location="경남 통영시"
              rating={4.5}
              reviews={87}
              price={85000}
              fishTypes={["감성돔", "참돔", "볼락"]}
              image="/images/test.png"
            />
            <BoatCard
              name="포항 구룡포 동해호"
              id={"10"}
              location="경북 포항시"
              rating={4.6}
              reviews={95}
              price={75000}
              fishTypes={["가자미", "도다리", "광어"]}
              image="/images/test.png"
            />
          </div>
        </TabsContent>

        <TabsContent value="points" className="mt-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              date={post.date}
              location={post.location}
              views={post.views}
              likes={post.likes}
              comments={post.comments}
              thumbnail={post.thumbnail}
              isRecruiting={post.isRecruiting}
              memberCount={post.memberCount}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}