import type React from "react";
import {Card, CardContent} from "@/components/ui/card";

export default function ActivityCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-40">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            <p className="text-sm text-gray-40 mt-1">{description}</p>
          </div>
          <div className="bg-gray-80 p-2 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}