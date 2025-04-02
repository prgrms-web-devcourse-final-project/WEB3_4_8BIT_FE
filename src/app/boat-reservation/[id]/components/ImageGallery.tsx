import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import React, {useState} from "react";

export default function ImageGallery(){
  // 이미지 갤러리 네비게이션
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // 이미지 갤러리 데이터
  const images = [
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=500&width=800",
    "/placeholder.svg?height=500&width=800",
  ]
  return (
    <>
      {/* 이미지 갤러리 */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100 h-[400px]">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt="선상 낚시 이미지"
          className="w-full h-full object-cover"
          height={400}
          width={800}
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white cursor-pointer"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white cursor-pointer"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* 썸네일 이미지 */}
      <div className="flex space-x-2 overflow-x-auto p-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 w-20 h-20 cursor-pointer rounded-md overflow-hidden ${
              index === currentImageIndex ? "ring-2 ring-cyan-500" : ""
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`썸네일 ${index + 1}`}
              className="w-full h-full object-cover"
              height={80}
              width={80}
            />
          </button>
        ))}
      </div>
    </>
  )
}