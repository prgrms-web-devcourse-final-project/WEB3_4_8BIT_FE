"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

interface PostImagesProps {
  images: string[];
}

export default function PostImages({ images }: PostImagesProps) {
  if (!images || images.length === 0) return null;

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      spaceBetween={10}
      slidesPerView={1}
      className="rounded-lg overflow-hidden"
    >
      {images.map((image: string, index: number) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[500px]">
            <Image
              src={image || "/placeholder.svg"}
              alt={`낚시 이미지 ${index + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
