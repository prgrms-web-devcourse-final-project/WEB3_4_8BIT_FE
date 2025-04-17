"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockSpotMessages, fishingSpots } from "@/components/chat/mock-chat-data"
import ChatRoom from "@/components/chat/ChatRoom";
import {ChatMessageItem} from "@/types/Chat.types";

export function FishingSpotChat() {
  const [messages, setMessages] = useState(mockSpotMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null)
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

  const handleSelectSpot = (spotId: string) => {
    setSelectedSpot(spotId)
    setMessages(mockSpotMessages.slice(0, Math.floor(Math.random() * 5) + 3))
  }

  const handleBackToList = () => {
    setSelectedSpot(null)
  }

  const filteredSpots = fishingSpots.filter((spot) => spot.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const currentSpot = selectedSpot ? fishingSpots.find((spot) => spot.id === selectedSpot) : null

  if (!selectedSpot) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h3 className="font-bold mb-3">낚시 포인트 채팅</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="낚시터 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 overflow-scroll">
          <div className="p-2">
            {filteredSpots.length > 0 ? (
              filteredSpots.map((spot) => (
                <button
                  key={spot.id}
                  className="w-full p-3 flex items-center gap-3 hover:bg-gray-80 rounded-lg transition-colors text-left cursor-pointer"
                  onClick={() => handleSelectSpot(spot.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={spot.image} alt={spot.name} />
                      <AvatarFallback>{spot.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {spot.onlineCount}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{spot.name}</p>
                    <p className="text-sm text-gray-500">온라인 {spot.onlineCount}명</p>
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

  return (
    <ChatRoom
      handleBackToList={handleBackToList}
      currentRoom={currentSpot}
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
      handleSendMessage={handleSendMessage}
    />
  )
}
