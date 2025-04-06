import {Button} from "@/components/ui/button";
import {ChevronLeft, Flag, MoreVertical, Send, Smile, Users, X, ImagePlus } from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ChatMessage} from "@/components/chat/ChatMessage";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import type React from "react";
import {ChatMessageItem, ChatRoomFishingGroup, ChatRoomFishingSpot} from "@/types/Chat.types";

interface ChatRoomProps {
  handleBackToList : () => void;
  currentRoom : ChatRoomFishingGroup | ChatRoomFishingSpot;
  messages : ChatMessageItem[];
  messagesEndRef : React.RefObject<HTMLDivElement> | null;
  previewImage : string | null;
  cancelImageUpload : () => void;
  fileInputRef : React.RefObject<HTMLInputElement>;
  handleFileChange : (event: React.ChangeEvent<HTMLInputElement>) => void;
  newMessage : string;
  setNewMessage : React.Dispatch<React.SetStateAction<string>>;
  isUploading : boolean;
  handleKeyDown : (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSendMessage : () => void;
}

export default function ChatRoom({
  handleBackToList,
  currentRoom,
  messages,
  messagesEndRef,
  previewImage,
  cancelImageUpload,
  fileInputRef,
  handleFileChange,
  newMessage,
  setNewMessage,
  isUploading,
  handleKeyDown,
  handleSendMessage,
  } : ChatRoomProps) {


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
            <h3 className="font-medium">{currentRoom?.name}</h3>
            <p className="text-sm text-gray-500">온라인 {currentRoom?.onlineCount}명</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Flag className="h-4 w-4 mr-2" /> 신고하기
            </DropdownMenuItem>
            <DropdownMenuItem>채팅 알림 끄기</DropdownMenuItem>
            <DropdownMenuItem>채팅방 나가기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="flex-1 p-4 overflow-scroll">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
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
          <Button variant="ghost" size="icon" className="text-gray-500" onClick={() => fileInputRef.current?.click()}>
            <ImagePlus className="h-5 w-5" />
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Smile className="h-5 w-5" />
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
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}