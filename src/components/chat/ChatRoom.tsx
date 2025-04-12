import {Button} from "@/components/ui/button";
import {ChevronLeft, Send, Users, X, ImagePlus } from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ChatMessage} from "@/components/chat/ChatMessage";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {ChatMessageResponse, ChatRoomData} from "@/types/Chat.types";
import {ChatAPI} from "@/lib/api/chatAPI";
import {io, Socket} from "socket.io-client";

interface ChatRoomProps {
  roomData : ChatRoomData;
  handleBackToList : () => void;
}

export default function ChatRoom({
  roomData,
  handleBackToList,
  } : ChatRoomProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<ChatMessageResponse[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const wsRef = useRef<WebSocket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // useEffect(() => {
  //   // 만약 HTTPS를 사용한다면 WebSocket 연결에는 wss://를 사용해야 합니다.
  //   const ws = new WebSocket("https://api.mikki.kr/ws/chat");
  //   wsRef.current = ws;
  //
  //   ws.onopen = () => {
  //     console.log("WebSocket 연결 성공");
  //     // 필요한 경우 서버에 초기 메시지 전송 등 추가 처리
  //   };
  //
  //   ws.onmessage = (event) => {
  //     console.log("메시지 수신:", event.data);
  //     // 메시지 처리 로직 구현
  //   };
  //
  //   ws.onerror = (error) => {
  //     console.error("WebSocket 오류", error);
  //   };
  //
  //   ws.onclose = () => {
  //     console.log("WebSocket 연결 종료");
  //   };
  //
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  useEffect(() => {
    // 기본 도메인과 path 옵션 사용, transports 옵션을 통해 WebSocket 강제 사용
    const socket = io("https://api.mikki.kr", {
      path: "/ws/chat",
      transports: ["websocket"],
      reconnectionDelayMax: 10000,
    });
    socketRef.current = socket;

    socket.on("connect", async () => {
      console.log("Socket.IO 연결 성공: " + socket.id);
      const data = await ChatAPI.getRoomMessages(1) // TODO 추후 1 말고 다른걸로
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO 연결 종료");
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);


  const cancelImageUpload = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const messageRequest = {
      roomId: Number(roomData.roomId), // roomId는 Long 타입이므로 숫자로 변환
      content: newMessage,
      fileIds: [], // 파일 ID가 필요하다면 여기에 추가
      type: "TALK" // MessageType에 맞는 값을 설정 (예: TEXT, IMAGE 등)
    }

    const jsonMessage = JSON.stringify(messageRequest)
    console.log(socketRef.current)
    socketRef.current?.emit("pub/chat/send", jsonMessage)
    // const newMsg : ChatMessageItem = {
    //   id: `msg-${Date.now()}`,
    //   sender: {
    //     id: "current-user",
    //     name: "나",
    //     avatar: "/placeholder.svg?height=40&width=40",
    //     isOnline: true,
    //   },
    //   content: newMessage,
    //   timestamp: new Date().toISOString(),
    //   isOwn: true,
    // }
    //
    // if (previewImage) {
    //   newMsg.image = previewImage
    // }
    // setPreviewImage(null)
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

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBackToList} className="mr-2 cursor-pointer">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="bg-cyan-100 text-cyan-800 p-2 rounded-full mr-3">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{roomData.targetName}</h3>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 overflow-scroll">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.messageId} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {previewImage && (
        <div className="p-2 border-t">
          <div className="relative inline-block">
            <Image src={previewImage || "/placeholder.svg"} alt="Preview" className="h-20 rounded-md object-cover" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={cancelImageUpload}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <ImagePlus className="h-5 w-5" />
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="메시지를 입력하세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10"
            />
            {isUploading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="h-4 w-4 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={isUploading || (newMessage.trim() === "" && !previewImage)}
            className="bg-primary cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}