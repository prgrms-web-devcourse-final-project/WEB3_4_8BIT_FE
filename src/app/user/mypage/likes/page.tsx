"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  getLikedFishingTripPosts,
  getLikedShipFishingPosts,
} from "@/lib/api/likeAPI";
import { PostCard } from "@/app/fishing-group/components/PostCard";
import { Post } from "@/lib/api/fishingPostAPI";
import BoatCard from "@/components/BoatCard";
import { ShipPostData } from "@/types/boatPostType";
import { useEffect, useState } from "react";

export default function LikesPage() {
  const [shipPosts, setShipPosts] = useState<ShipPostData[]>([]);
  const [fishingTrips, setFishingTrips] = useState<Post[]>([]);

  // 좋아요한 동출 모집 게시글 조회
  const { data: likedFishingTrips, isSuccess: isFishingTripsSuccess } =
    useQuery({
      queryKey: ["likedFishingTrips"],
      queryFn: () => getLikedFishingTripPosts<Post>(10),
    });

  // 좋아요한 선상 낚시 게시글 조회
  const { data: likedShipPosts, isSuccess: isShipPostsSuccess } = useQuery({
    queryKey: ["likedShipPosts"],
    queryFn: () => getLikedShipFishingPosts<ShipPostData>(10),
  });

  // 선상 낚시 게시글 데이터 처리
  useEffect(() => {
    if (isShipPostsSuccess && likedShipPosts?.data?.content) {
      setShipPosts(likedShipPosts.data.content);
    }
  }, [isShipPostsSuccess, likedShipPosts]);

  // 동출 모집 게시글 데이터 처리
  useEffect(() => {
    if (isFishingTripsSuccess && likedFishingTrips?.data?.content) {
      setFishingTrips(likedFishingTrips.data.content);
    }
  }, [isFishingTripsSuccess, likedFishingTrips]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">위시리스트</h1>
      <div className="text-gray-30">나의 위시 리스트 내역을 확인해보세요.</div>

      <Tabs defaultValue="boats">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="boats" className="cursor-pointer">
            선상 낚시
          </TabsTrigger>
          <TabsTrigger value="points" className="cursor-pointer">
            동출 모집
          </TabsTrigger>
        </TabsList>

        <TabsContent value="boats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shipPosts.length > 0 ? (
              shipPosts.map((post) => (
                <BoatCard key={post.shipFishingPostId} boatData={post} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                좋아요한 선상 낚시 게시글이 없습니다.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="points" className="mt-6 space-y-4">
          {fishingTrips.length > 0 ? (
            fishingTrips.map((post) => (
              <PostCard
                key={post.fishingTripPostId}
                fishingTripPostId={post.fishingTripPostId}
                title={post.subject}
                content={post.content}
                date={post.createDate}
                location={post.fishPointName}
                recruitmentCount={post.recruitmentCount}
                fishPointName={post.fishPointName}
                fileUrlList={post.fileUrlList}
                imageUrl={post.imageUrl}
                postStatus={post.postStatus}
                latitude={post.latitude}
                longitude={post.longitude}
                regionType={post.regionType || undefined}
                likeCount={post.likeCount}
                isLiked={post.isLiked}
                commentCount={post.commentCount}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              좋아요한 동출 모집 게시글이 없습니다.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
