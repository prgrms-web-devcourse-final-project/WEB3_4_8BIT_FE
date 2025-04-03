import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type React from "react";
import FishingGroupCard from "@/app/user/mypage/fishing-group/components/FishingGroupCard";

export default function FishingGroup() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">동출 모집</h1>

      <div className="text-gray-30">나의 동출 모집 내역을 확인해보세요.</div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">진행 중</TabsTrigger>
          <TabsTrigger value="completed">완료됨</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">내가 작성한 동출 글</h2>
          <FishingGroupCard
            title="이번 주말 기장 방파제 감성돔 낚시 같이 가실 분"
            date="2023년 11월 18일"
            time="오전 5:00 - 오후 2:00"
            location="부산 기장군 기장읍 연화리 방파제"
            participants={4}
            maxParticipants={6}
            comments={8}
            likes={12}
            status="active"
            isAuthor={true}
          />

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">내가 참여 중인 동출 글</h2>
            <div className="space-y-4">
              <FishingGroupCard
                title="주말 서해 갯바위 우럭 낚시"
                date="2023년 11월 25일"
                time="오전 5:00 - 오후 3:00"
                location="인천 옹진군 덕적도"
                participants={3}
                maxParticipants={5}
                comments={4}
                likes={7}
                status="active"
                isAuthor={false}
              />
              <FishingGroupCard
                title="동해 방어시즌 출조 인원 모집"
                date="2023년 12월 10일"
                time="오전 4:30 - 오후 2:00"
                location="강원 속초시 외옹치항"
                participants={6}
                maxParticipants={8}
                comments={10}
                likes={15}
                status="active"
                isAuthor={false}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-4">
          <FishingGroupCard
            title="속초 영랑호 붕어낚시 함께해요"
            date="2023년 10월 8일"
            time="오전 6:00 - 오후 6:00"
            location="강원 속초시 영랑호"
            participants={5}
            maxParticipants={5}
            comments={12}
            likes={18}
            status="completed"
            isAuthor={true}
          />
          <FishingGroupCard
            title="서해 갯바위 우럭 낚시"
            date="2023년 9월 16일"
            time="오전 5:30 - 오후 3:00"
            location="인천 옹진군 영흥도 십리포해변"
            participants={3}
            maxParticipants={4}
            comments={6}
            likes={9}
            status="completed"
            isAuthor={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}