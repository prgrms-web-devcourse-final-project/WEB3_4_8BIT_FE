"use client"

import { Users, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FishCommunityChat } from "@/components/chat/FishCommunityChat"
import { FishingSpotChat } from "@/components/chat/FishingSpotChat"

export function ChatContainer() {
  return (
    <div
      className="fixed bottom-24 right-6 z-50 w-[76%] sm:w-[450px] h-[660px] max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
    >
      <Tabs defaultValue="community" className="flex flex-col h-full">
        <TabsContent value="community" className="flex-1 overflow-hidden m-0 p-0">
          <FishCommunityChat />
        </TabsContent>
        <TabsContent value="spot" className="flex-1 overflow-hidden m-0 p-0">
          <FishingSpotChat />
        </TabsContent>
        <TabsList className="w-full h-24 p-2">
          <TabsTrigger value="community" className="grid items-center justify-center text-md">
            <Users size={24}/>
            <span>낚시 동출</span>
          </TabsTrigger>
          <TabsTrigger value="spot" className="grid items-center justify-center text-md">
            <MapPin size={50}/>
            <span>낚시 포인트 채팅</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

