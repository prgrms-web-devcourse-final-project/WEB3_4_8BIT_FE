import {MapPin} from "lucide-react";
import type React from "react";

export default function FishItem({
  image,
  name,
  size,
  location,
  date,
}: {
  image: string
  name: string
  size: number
  location: string
  date: string
}) {
  return (
    <div className="flex items-center p-3 border rounded-lg">
      <img src={image || "/placeholder.svg"} alt={name} className="w-16 h-16 object-cover rounded-md mr-4" />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{size}cm</p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{location}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  )
}