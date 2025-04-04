import type React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ActivityItem({
  icon,
  title,
  description,
  time,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  type: "dashboard" | "reservation" | "post" | "shipinfo";
}) {
  const linkType = {
    dashboard: "/captain/mypage",
    reservation: "/captain/mypage/reservation",
    post: "/captain/mypage/post",
    shipinfo: "/captain/mypage/ship-info",
  };

  return (
    <Link href={linkType[type]} className="block">
      <div className="flex items-start p-3 rounded-lg hover:bg-gray-80 transition-colors">
        <div className="bg-gray-80 p-2 rounded-full mr-4">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex items-center">
          <p className="text-xs text-gray-400 mr-2">{time}</p>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </Link>
  );
}
