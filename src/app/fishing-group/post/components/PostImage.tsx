"use client";

import Image from "next/image";

interface PostImagesProps {
  images: string[];
}

export default function PostImages({ images }: PostImagesProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((image: string, index: number) => (
        <div
          key={index}
          className="relative w-full h-[250px] rounded-lg overflow-hidden"
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`낚시 이미지 ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
