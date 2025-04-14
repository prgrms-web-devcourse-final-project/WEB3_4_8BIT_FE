import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type React from "react";
import {PostCard} from "@/app/fishing-group/components/PostCard";
import BoatCard from "@/components/BoatCard";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserAPI} from "@/lib/api/userAPI";
import {ShipPostData} from "@/types/boatPostType";
import {UserWrittenGroupFishing} from "@/types/user.interface";

export default function Wishlist() {
  const { data: likedBoatFish, isSuccess: isBoatFishLikesSuccess } = useQuery<ShipPostData[]>({
    queryKey: ['likes', 'boatFish'],
    queryFn: UserAPI.getUserLikesBoatFish,
  });

  const { data: likedGroupFish, isSuccess: isGroupFishLikesSuccess } = useQuery<UserWrittenGroupFishing[]>({
    queryKey: ['likes', 'groupFish'],
    queryFn: UserAPI.getUserLikesGroupFish,
  });

  // const queryClient = useQueryClient();
  //
  // // 좋아요 취소 mutation
  // const mutationUnlike = useMutation({
  //   mutationFn: (postId: number) => {
  //     return postUnlikeItem(postId); // 적절한 API 함수로 교체해야 합니다
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['likes'] });
  //   }
  // });
  //
  // // 좋아요 mutation
  // const mutationLike = useMutation({
  //   mutationFn: (postId: number) => {
  //     return postLikeItem(postId); // 적절한 API 함수로 교체해야 합니다
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['likes'] });
  //   }
  // });

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