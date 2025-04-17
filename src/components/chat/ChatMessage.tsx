"use client"

import { format, isValid } from "date-fns"
import { ko } from "date-fns/locale"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
import {ChatMessageResponse} from "@/types/Chat.types";

export function ChatMessage({ message }: { message: ChatMessageResponse }) {
  const getFormattedTime = () => {
    try {
      if (!message.createdAt) return '';
      
      const date = new Date(message.createdAt);
      
      // 유효한 날짜인지 확인
      if (!isValid(date)) {
        console.warn("유효하지 않은 날짜:", message.createdAt);
        return '';
      }
      
      return format(date, "p", { locale: ko });
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error, message.createdAt);
      return '';
    }
  };
  const formattedTime = getFormattedTime();
  const userData = JSON.parse(localStorage.getItem("user-storage") || "{}");
  const memberId = userData.state?.user?.memberId || null;
  const isOwn = message.senderId === memberId;

  // TODO 이미지 눌렀을때 크게 나오도록 하기?
  // TODO 추후 id 3이랑 비교하는 부분 다 바꿔야함! message.senderId === 3 => isOwn 으로
  // TODO isOwn으로 발신자 구분하면 이전 메세지는 구분이가능한데, 웹소켓으로 보낸 메세지는 서버쪽에서 별도로 메세지를 전송해야함.
  // TODO 그래서 일단 memberId로 발신자 구분으로 수정
  return (
    <div className={`group flex items-start font-medium gap-3 ${isOwn ? "flex-row-reverse" : ""}`}>
      <div className="relative flex-shrink-0">
        <Avatar>
          <AvatarImage src={message.senderProfileImageUrl} alt={message.senderNickname} />
          <AvatarFallback>{message.senderNickname}</AvatarFallback>
        </Avatar>
      </div>

      <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[75%]`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-medium ${isOwn ? "order-2" : ""}`}>{message.senderNickname}</span>
          <span className={`text-xs text-gray-40 ${isOwn ? "order-1" : ""}`}>{formattedTime}</span>
        </div>

        <div
          className={`rounded-lg px-4 py-2 ${
            isOwn ? "bg-primary text-white rounded-tr-none" : "bg-gray-80 text-gray-10"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.type === 'IMAGE' && (
            message.fileUrls.map(url => {
              return (
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

