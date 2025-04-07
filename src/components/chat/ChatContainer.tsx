"use client"

import { Users, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FishingGroupChat } from "@/components/chat/FishingGroupChat"
import { FishingSpotChat } from "@/components/chat/FishingSpotChat"

export function ChatContainer() {
  return (
    <div
      className="fixed bottom-24 right-6 z-50 w-[76%] sm:w-[450px] h-[660px] max-h-[80vh] bg-white border-2 rounded-xl overflow-hidden flex flex-col"
    >
      <Tabs defaultValue="group" className="flex flex-col h-full">
        <TabsContent value="group" className="flex-1 overflow-hidden m-0 p-0">
          <FishingGroupChat />
        </TabsContent>
        <TabsContent value="spot" className="flex-1 overflow-hidden m-0 p-0">
          <FishingSpotChat />
        </TabsContent>
        <TabsList className="w-full h-20 p-2">
          <TabsTrigger value="group" className="items-center justify-center text-md">
            <Users />
            <span>낚시 동출</span>
          </TabsTrigger>
          <TabsTrigger value="spot" className="items-center justify-center text-md">
            <MapPin />
            <span>낚시 포인트 채팅</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

