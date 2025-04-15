"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, PlusCircle } from "lucide-react";
import Image from "next/image";
import {
  deleteCaptainPost,
  getCaptainPostList,
} from "@/lib/api/getCaptainInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CaptainPostsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleShowPostDetail = (id: number) => {
    router.push(`/boat-reservation/${id}`);
  };

  const handleDeletePost = async (id: number) => {
    const checked = confirm("게시글을 삭제하시겠습니까?");
    if (checked) {
      const success = await deleteCaptainPost(id);
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["postList"] });
        toast.success("게시글이 삭제되었습니다.");
      }
    }
  };

  const { data: postListData, isLoading: isPostListLoading } = useQuery({
    queryKey: ["postList"],
    queryFn: () => getCaptainPostList(),
  });

  if (isPostListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:col-span-3 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">게시글 관리</h1>
        <Link href="/fishing-registration">
          <Button className="cursor-pointer flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            선상 낚시 게시글 작성하기
          </Button>
        </Link>
      </div>

      {postListData?.data.map((post) => (
        <Card
          key={post.shipFishingPostId}
          className="p-4 transition-colors space-y-2"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-bold flex items-center gap-1">
                {post.subject}
                <span className="flex items-center text-sm text-yellow-500 ml-2">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  {post.reviewEverRate.toFixed(1)} ({post.reviewCount})
                </span>
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                {post.location}
                <span className="ml-4 text-sm font-medium text-blue-600">
                  1인 기준 {post.price.toLocaleString()}원
                </span>
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer hover:bg-gray-80"
                onClick={() => handleShowPostDetail(post.shipFishingPostId)}
              >
                상세보기
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-500 border-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
                onClick={() => handleDeletePost(post.shipFishingPostId)}
              >
                삭제
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {post.fileUrlList.slice(0, 3).map((url, idx) => (
              <div
                key={idx}
                className="w-full h-40 bg-gray-100 rounded-md overflow-hidden relative"
              >
                <Image
                  src={url}
                  alt={`post-image-${idx}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
