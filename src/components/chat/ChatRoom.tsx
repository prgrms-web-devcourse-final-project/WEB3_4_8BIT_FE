import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Send, Users, X, ImagePlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChatMessageResponse, ChatRoomData } from "@/types/Chat.types";
import { ChatAPI } from "@/lib/api/chatAPI";

interface ChatRoomProps {
  roomData: ChatRoomData;
  handleBackToList: () => void;
}

export default function ChatRoom({ roomData, handleBackToList }: ChatRoomProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<any>(null);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    async function fetchInitialMessages() {
      try {
        const res = await ChatAPI.getRoomMessages(roomData.roomId);
        // 유효한 메시지 객체만 필터링합니다
        if (Array.isArray(res.content)) {
          console.log("받은 메시지 데이터:", res.content);
          setMessages(res.content);
        } else {
          console.error("메시지 데이터가 배열이 아닙니다:", res.content);
          setMessages([]);
        }
      } catch (err) {
        console.error("기존 메시지 불러오기 실패", err);
      }
    }
    fetchInitialMessages();
  }, [roomData.roomId]);


  useEffect(() => {
    // SockJS 옵션에 쿠키를 포함하도록 설정
    const sockJsOptions = {
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      withCredentials: true  // 이 부분이 중요: 쿠키를 포함시킴
    };

    socketRef.current = new SockJS("http://localhost:8080/ws/chat", null, sockJsOptions);

    stompClientRef.current = new Client({
      webSocketFactory: () => socketRef.current,
      connectHeaders: {
        // 필요한 경우 여기에 추가 헤더를 포함할 수 있음
      },
      onConnect: (frame) => {
        console.log("STOMP 연결 성공:", frame);
        stompClientRef.current?.subscribe(`/topic/chat/${roomData.roomId}`, (message) => {
          try {
            const messageData = JSON.parse(message.body);
            console.log("수신된 메시지 데이터:", messageData);

            // 메시지 데이터 구조 확인 (messageData 또는 messageData.content)
            const messageContent = messageData.content || messageData;

            if (messageContent) {
              console.log("처리할 메시지 내용:", messageContent);
              setMessages((prev) => [...prev, messageContent]);
            } else {
              console.error("처리할 메시지 내용이 없습니다:", messageData);
            }
          } catch (error) {
            console.error("메시지 처리 중 오류 발생:", error, message.body);
          }
        });
      },
      onDisconnect: () => {
        console.log("STOMP 연결 종료");
      },
      // STOMP 연결에 대한 추가 옵션
      beforeConnect: () => {
        console.log("STOMP 연결 시도 중...");
      },
      onStompError: (frame) => {
        console.error("STOMP 오류:", frame);
      }
    });

    stompClientRef.current.activate();

    return () => {
      stompClientRef.current?.deactivate();
      socketRef.current?.close();
    };
  }, [roomData.roomId]);

  const handleSendMessage = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      console.log('메시지 전송 시도');
      const messageRequest = {
        roomId: roomData.roomId,
        content: newMessage,
        fileIds: previewImage ? [/* 이미지 업로드 후 해당 fileIds*/] : [],
        type: "TALK", // TEXT or IMAGE
      };

      stompClientRef.current.publish({
        destination: "/pub/chat/send",
        body: JSON.stringify(messageRequest),
      });

      // 메시지 전송 후 입력값 초기화
      setNewMessage("");
      setPreviewImage(null);
    } else {
      console.log('연결 안됨... 메시지 전송 실패');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 파일 업로드 핸들러 (예시: 미리보기 기능 포함)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const cancelImageUpload = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 메시지 배열 유효성 검사 (디버깅용 로그 포함)
  console.log("현재 메시지 목록:", messages);
  const validMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="flex flex-col h-full">
      {/* 상단 헤더: 방 나가기, 방 정보 */}
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

      {/* 채팅 메시지 스크롤 */}
      <ScrollArea className="flex-1 p-4 overflow-scroll">
        <div className="space-y-4">
          {validMessages.map((message, index) => {
            // 각 메시지에 messageId가 없는 경우 인덱스를 사용
            const key = message.messageId ? `message-${message.messageId}` : `message-index-${index}`;
            return (
              <ChatMessage
                key={key}
                message={message}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* 이미지 미리보기 */}
      {previewImage && (
        <div className="p-2 border-t">
          <div className="relative inline-block">
            <Image src={previewImage || "/placeholder.svg"} alt="Preview" width={80} height={80} className="h-20 rounded-md object-cover" />
            <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={cancelImageUpload}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* 메시지 입력 및 전송 */}
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
          <Button onClick={handleSendMessage} disabled={isUploading || (newMessage.trim() === "" && !previewImage)} className="bg-primary cursor-pointer">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}