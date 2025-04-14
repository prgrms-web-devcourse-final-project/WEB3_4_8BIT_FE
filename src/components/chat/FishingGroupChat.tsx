"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatRoomData } from "@/types/Chat.types";
import ChatRoom from "@/components/chat/ChatRoom";
import {useQuery} from "@tanstack/react-query";
import {ChatAPI} from "@/lib/api/chatAPI";

export function FishingGroupChat() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { data, isLoading, isError, error } = useQuery<ChatRoomData[]>({
    queryKey: ['chat-rooms'],
    queryFn: ChatAPI.getChatRooms,
    staleTime: 0,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error : {error.message}</span>
  }

  const chatRooms : ChatRoomData[] = data || [];
  const selectedChatRoom = chatRooms.filter(item => item.roomId === selectedRoom)[0];

  const handleSelectRoom = (roomId: number) => {
    setSelectedRoom(roomId)
  }

  const handleBackToList = () => {
    setSelectedRoom(null)
  }

  const filteredRooms = chatRooms.filter(
    (room) =>
      room.targetName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!selectedRoom) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h3 className="font-bold mb-3">낚시 동출 채팅</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="채팅방 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 overflow-scroll">
          <div className="p-2">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <button
                  key={room.roomId}
                  className="w-full p-3 flex items-center gap-3 hover:bg-gray-80 rounded-lg text-left cursor-pointer"
                  onClick={() => handleSelectRoom(room.roomId)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{room.targetName}</p>
                      <span className="text-xs text-gray-500">총 {room.participantCount}명</span>
                    </div>
                    <p className="text-sm truncate text-gray-30">
                      {room.lastMessage
                        ? room.lastMessage.content
                        : "메세지가 없습니다. 채팅을 시작해보세요!"}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>검색 결과가 없습니다</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    )
  }

  // 선택된 방의 채팅방 표시
  return (
    <ChatRoom
      handleBackToList={handleBackToList}
      roomData={selectedChatRoom}
    />
  )
}