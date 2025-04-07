"use client"

import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";

interface Sender {
  id: string
  name: string
  avatar: string
  isOnline: boolean
}

interface MessageProps {
  id: string
  sender: Sender
  content: string
  timestamp: string
  isOwn?: boolean
  image?: string | null
}

export function ChatMessage({ message }: { message: MessageProps }) {
  const formattedTime = format(new Date(message.timestamp), "p", { locale: ko })

  // 이미지 눌렀을때 크게 나오도록 하기?

  return (
    <div className={`group flex items-start font-medium gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}>
      <div className="relative flex-shrink-0">
        <Avatar>
          <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
          <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
        </Avatar>
        {message.sender.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
        )}
      </div>

      <div className={`flex flex-col ${message.isOwn ? "items-end" : "items-start"} max-w-[75%]`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-medium ${message.isOwn ? "order-2" : ""}`}>{message.sender.name}</span>
          <span className={`text-xs text-gray-40 ${message.isOwn ? "order-1" : ""}`}>{formattedTime}</span>
        </div>

        <div
          className={`rounded-lg px-4 py-2 ${
            message.isOwn ? "bg-primary text-white rounded-tr-none" : "bg-gray-80 text-gray-10"
          }`}
        >
          {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}

          {message.image && (
            <div className={`mt-2 ${message.content ? "" : "mt-0"}`}>
              <Image
                src={message.image || "/images/test.png"}
                alt="Shared image"
                height={120}
                width={120}
                className="rounded-md max-h-60 object-cover cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

