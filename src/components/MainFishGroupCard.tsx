import Image from "next/image";
import {ArrowRightCircle} from "lucide-react";
import React from "react";
import Link from "next/link";
import {GroupFishPost} from "@/lib/api/groupFishingAPI";

export default function MainFishGroupCard({ height, postData } : {height: number, postData : GroupFishPost}) {
  return (
    <Link
      href={`/fishing-group/post/${postData.fishingTripPostId}`}
      className={`relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105`}
      style={{ height: `${height}px` }}
    >
      <div className="relative w-full h-full">
        <Image
          src={postData.imageUrl ?? "/images/test.png"}
          alt="어류 사진"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-semibold">{postData.subject}</h3>
        <p className="text-sm">{postData.content}</p>
      </div>
      <div className="absolute right-4 bottom-4">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
          <ArrowRightCircle className="h-5 w-5 text-white" />
        </div>
      </div>
    </Link>
  )
}