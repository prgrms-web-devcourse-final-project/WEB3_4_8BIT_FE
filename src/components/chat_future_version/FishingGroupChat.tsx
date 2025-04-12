"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockCommunityMessages } from "@/components/chat/mock-chat-data"
import {ChatMessageItem, ChatRoomFishingGroup} from "@/types/Chat.types";
import ChatRoom from "@/components/chat/ChatRoom";

const communityRooms : ChatRoomFishingGroup[] = [
  {
    id: "room-1",
    name: "일반 낚시 토론방",
    description: "낚시에 관한 모든 주제를 다루는 채팅방입니다.",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 3,
    lastMessage: "오늘 기장 앞바다 조황 어떤가요?",
    unreadCount: 3,
  },
  {
    id: "room-2",
    name: "초보 낚시꾼 모임",
    description: "낚시를 처음 시작하는 분들을 위한 채팅방입니다.",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 4,
    lastMessage: "낚싯대 추천 부탁드립니다!",
    unreadCount: 0,
  },
  {
    id: "room-3",
    name: "바다 낚시 동호회",
    description: "바다 낚시를 좋아하는 분들의 채팅방입니다.",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 5,
    lastMessage: "이번 주말 동해안 출조 계획 있으신 분?",
    unreadCount: 5,
  },
  {
    id: "room-4",
    name: "민물 낚시 동호회",
    description: "민물 낚시를 좋아하는 분들의 채팅방입니다.",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 8,
    lastMessage: "붕어 낚시 포인트 공유합니다.",
    unreadCount: 0,
  },
  {
    id: "room-5",
    name: "루어 낚시 채팅방",
    description: "루어 낚시에 관한 정보를 공유하는 채팅방입니다.",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 3,
    lastMessage: "새로운 루어 구매했어요!",
    unreadCount: 1,
  },
]

export function FishingGroupChat() {
  const [messages, setMessages] = useState<ChatMessageItem[]>(mockCommunityMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !previewImage) return

    const newMsg : ChatMessageItem = {
      id: `msg-${Date.now()}`,
      sender: {
        id: "current-user",
        name: "나",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      content: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true,
    }

    if (previewImage) {
      newMsg.image = previewImage
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
    setPreviewImage(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }, 1000)
  }

  const cancelImageUpload = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoom(roomId)
  }

  const handleBackToList = () => {
    setSelectedRoom(null)
  }

  const filteredRooms = communityRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const currentRoom = selectedRoom ? communityRooms.find((room) => room.id === selectedRoom) : null

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
                  key={room.id}
                  className="w-full p-3 flex items-center gap-3 hover:bg-gray-80 rounded-lg text-left cursor-pointer"
                  onClick={() => handleSelectRoom(room.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={room.image} alt={room.name} />
                      <AvatarFallback>{room.name[0]}</AvatarFallback>
                    </Avatar>
                    {room.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 font-semibold bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {room.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{room.name}</p>
                      <span className="text-xs text-gray-500">{room.onlineCount}명</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{room.description}</p>
                    <p className="text-sm truncate">{room.lastMessage}</p>
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
      currentRoom={currentRoom}
      messages={messages}
      messagesEndRef={messagesEndRef}
      previewImage={previewImage}
      cancelImageUpload={cancelImageUpload}
      fileInputRef={fileInputRef}
      handleFileChange={handleFileChange}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      isUploading={isUploading}
      handleKeyDown={handleKeyDown}
      handleSendMessage={handleSendMessage} />
  )
}