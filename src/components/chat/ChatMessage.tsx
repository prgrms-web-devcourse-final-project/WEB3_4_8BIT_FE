"use client"

import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
import {ChatMessageResponse} from "@/types/Chat.types";

export function ChatMessage({ message }: { message: ChatMessageResponse }) {
  const formattedTime = format(new Date(message.createdAt), "p", { locale: ko })

  // TODO 이미지 눌렀을때 크게 나오도록 하기?
  // TODO 추후 id 3이랑 비교하는 부분 다 바꿔야함! message.senderId === 3 => isOwn 으로
  return (

    <div className={`group flex items-start font-medium gap-3 ${message.senderId === 3 ? "flex-row-reverse" : ""}`}>
      <div className="relative flex-shrink-0">
        <Avatar>
          <AvatarImage src={message.senderProfileImageUrl} alt={message.senderNickname} />
          <AvatarFallback>{message.senderNickname}</AvatarFallback>
        </Avatar>
      </div>

      <div className={`flex flex-col ${message.senderId === 3 ? "items-end" : "items-start"} max-w-[75%]`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-medium ${message.senderId === 3 ? "order-2" : ""}`}>{message.senderNickname}</span>
          <span className={`text-xs text-gray-40 ${message.senderId === 3 ? "order-1" : ""}`}>{formattedTime}</span>
        </div>

        <div
          className={`rounded-lg px-4 py-2 ${
            message.senderId === 3 ? "bg-primary text-white rounded-tr-none" : "bg-gray-80 text-gray-10"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.type === 'IMAGE' && (
            message.fileUrls.map(url => {
              return(
                <div key={url} className={`mt-2 ${message.content ? "" : "mt-0"}`}>
                  <Image
                    src={url || "/images/test.png"}
                    alt="Shared image"
                    height={120}
                    width={120}
                    className="rounded-md max-h-60 object-cover cursor-pointer"
                  />
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

