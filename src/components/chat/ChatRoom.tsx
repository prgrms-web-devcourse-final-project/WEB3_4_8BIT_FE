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
import { uploadImagesToS3 } from "@/lib/api/uploadImageAPI";

interface ChatRoomProps {
  roomData: ChatRoomData;
  handleBackToList: () => void;
}

export default function ChatRoom({ roomData, handleBackToList }: ChatRoomProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedFileIds, setUploadedFileIds] = useState<number[]>([]); 
  const [nextCursorId, setNextCursorId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<any>(null);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    async function fetchInitialMessages() {
      try {
        const res = await ChatAPI.getRoomMessages(roomData.roomId);
        if (Array.isArray(res.content)) {
          console.log("받은 메시지 데이터:", res.content);
          setMessages(res.content.reverse()); 
          setNextCursorId(res.nextCursorId);
          console.log("다음 커서 ID: ", res.nextCursorId);
        } else {
          console.error("메시지 데이터가 배열이 아닙니다:", res.content);
          setMessages([]);
        }
      } catch (err) {
        console.error("기존 메시지 불러오기 실패", err);
      } finally {
        setIsInitialLoading(false);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
    fetchInitialMessages();
  }, [roomData.roomId]);

  // 무한 스크롤을 위한 함수
  const fetchMoreMessages = async () => {
    if (!nextCursorId) return;
  
    try {
      const res = await ChatAPI.getRoomMessages(roomData.roomId, nextCursorId);
      if (Array.isArray(res.content)) {
        setMessages((prev) => [...res.content.reverse(), ...prev]);
        setNextCursorId(res.nextCursorId);
      }
    } catch (err) {
      console.error("이전 메시지 불러오기 실패", err);
    }
  };

   // 스크롤 이벤트 핸들러
   const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    if (scrollTop === 0) {
      fetchMoreMessages(); // 최상단에 도달했을 때 메시지 요청
    }
  };

  useEffect(() => {
    const sockJsOptions = {
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      withCredentials: true
    };

    socketRef.current = new SockJS("https://api.mikki.kr/ws/chat", null, sockJsOptions);

    stompClientRef.current = new Client({
      webSocketFactory: () => socketRef.current,
      connectHeaders: {},
      onConnect: (frame) => {
        console.log("STOMP 연결 성공:", frame);
        stompClientRef.current?.subscribe(`/topic/chat/${roomData.roomId}`, (message) => {
          try {
            const messageData = JSON.parse(message.body);
            console.log("수신된 메시지 데이터:", messageData); // 메시지 데이터 확인

            // 수신한 메시지를 상태에 추가 (가장 하단에 추가)
            setMessages((prev) => [ ...prev, messageData]);
          } catch (error) {
            console.error("메시지 처리 중 오류 발생:", error, message.body);
          }
        });
      },
      onDisconnect: () => {
        console.log("STOMP 연결 종료");
      },
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
            content: previewImage ? "" : newMessage, // 이미지 전송 시 content는 빈 문자열
            fileIds: previewImage ? uploadedFileIds : [], // 이미지가 있을 경우 uploadedFileIds 사용
            type: previewImage ? "IMAGE" : "TALK", // 이미지 전송 시 타입을 IMAGE로 설정
        };

        stompClientRef.current.publish({
            destination: "/pub/chat/send",
            body: JSON.stringify(messageRequest),
        });

        // 전송 후 입력값 초기화
        setNewMessage("");
        setPreviewImage(null);

        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
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
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
        const domain = "chat";
        const uploadedFileIds = await uploadImagesToS3(Array.from(files), domain); // presigned URL 요청 및 업로드
        setUploadedFileIds(uploadedFileIds); // 추가된 부분

        // 업로드 후 미리보기 설정
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target?.result as string);
            setIsUploading(false);
        };
        reader.readAsDataURL(files[0]); // 첫 번째 파일 미리보기 설정
    } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        setIsUploading(false);
    }
  };

  const cancelImageUpload = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 상단 헤더: 방 나가기, 방 정보 */}
      <div className="p-4 border-b flex justify-between items-center shrink-0">
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
  
      {/* 채팅 메시지 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-4" ref={scrollRef} onScroll={handleScroll}>
        <div className="space-y-4 pr-2">
          {messages.map((msg, i) => {
            const key = msg.messageId ?? `index-${i}`;
            return <ChatMessage key={key} message={msg} />;
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
  
      {/* 이미지 미리보기 */}
      {previewImage && (
        <div className="p-2 border-t shrink-0">
          <div className="relative inline-block">
            <Image src={previewImage || "/placeholder.svg"} alt="Preview" width={80} height={80} className="h-20 rounded-md object-cover" />
            <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={cancelImageUpload}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
  
      {/* 메시지 입력 및 전송 */}
      <div className="p-4 border-t shrink-0">
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
