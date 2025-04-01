import {Card, CardContent} from "@/components/ui/card";
import {Star} from "lucide-react";
import type React from "react";
import Image from "next/image";

export default function ReviewCard({
  user,
  date,
  content,
  images,
  rating,
}: {
  user : string
  date : string
  content : string
  images : string[]
  rating : number
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
              {user.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="font-medium">{user}</p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-gray-700">{content}</p>

        {images.length > 0 && (
          <div className="mt-4 flex space-x-2">
            {images.map((image, i) => (
              <Image
                key={i}
                src={image || "/placeholder.svg"}
                alt={`리뷰 이미지 ${i + 1}`}
                height={80}
                width={80}
                className="rounded-md object-cover"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}