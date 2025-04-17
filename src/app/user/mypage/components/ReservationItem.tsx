import {Calendar, Clock} from "lucide-react";
import type React from "react";

export default function ReservationItem({
  title,
  date,
  time,
}: {
  title: string
  date: string
  time: string
}) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center">
        <div className="bg-cyan-100 p-3 rounded-full mr-4">
          <Calendar className="h-5 w-5 text-cyan-700" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-3">{date}</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}