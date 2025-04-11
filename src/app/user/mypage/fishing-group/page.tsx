"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type React from "react";
import FishingGroupCard from "@/app/user/mypage/fishing-group/components/FishingGroupCard";
import {UserAPI} from "@/lib/api/userAPI";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserWrittenGroupFishing} from "@/types/user.interface";

export default function FishingGroup() {
  const { data: myActivePosts, isSuccess: isMyActiveSuccess } = useQuery<UserWrittenGroupFishing[]>({
    queryKey: ['my-posts', 'RECRUITING'],
    queryFn: () => UserAPI.getUserGroupFish('RECRUITING'),
  })

  const { data: myCompletedPosts, isSuccess: isMyCompletedSuccess } = useQuery<UserWrittenGroupFishing[]>({
    queryKey: ['my-posts', 'COMPLETED'],
    queryFn: () => UserAPI.getUserGroupFish('COMPLETED'),
  })

  const { data: participatingActivePosts, isSuccess: isPartActiveSuccess } = useQuery<UserWrittenGroupFishing[]>({
    queryKey: ['participating-posts', 'RECRUITING'],
    queryFn: () => UserAPI.getUserParticipateGroupFish('RECRUITING'),
  })

  const { data: participatingCompletedPosts, isSuccess: isPartCompletedSuccess } = useQuery<UserWrittenGroupFishing[]>({
    queryKey: ['participating-posts', 'COMPLETED'],
    queryFn: () => UserAPI.getUserParticipateGroupFish('COMPLETED'),
  })

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn : (fishingTripPostId : number) => {
      return UserAPI.deleteUserGroupFish(fishingTripPostId);
    },
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ['my-posts', 'RECRUITING'] })
    }
  })

  const handleCancel = (fishingTripPostId: number) => {
    mutation.mutate(fishingTripPostId);
  };

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
          {isMyActiveSuccess && myActivePosts.map((post, idx) => (
            <FishingGroupCard
              handleCancel={handleCancel}
              key={`my-active-${idx}`}
              data={post}
              status="active"
              isAuthor={true}
            />
          ))}


          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">내가 참여 중인 동출 글</h2>
            <div className="space-y-4">
              {isPartActiveSuccess && participatingActivePosts.map((post, idx) => (
                <FishingGroupCard
                  handleCancel={handleCancel}
                  key={`part-active-${idx}`}
                  data={post}
                  status="active"
                  isAuthor={false}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-4">
          {isMyCompletedSuccess && myCompletedPosts.map((post, idx) => (
            <FishingGroupCard
              handleCancel={handleCancel}
              key={`my-completed-${idx}`}
              data={post}
              status="completed"
              isAuthor={true}
            />
          ))}
          {isPartCompletedSuccess && participatingCompletedPosts.map((post, idx) => (
            <FishingGroupCard
              handleCancel={handleCancel}
              key={`part-completed-${idx}`}
              data={post}
              status="completed"
              isAuthor={false}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}