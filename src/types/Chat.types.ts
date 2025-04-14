export interface ChatRoomFishingGroup {
  id : string;
  name : string;
  description : string;
  image : string;
  onlineCount : number;
  lastMessage : string;
  unreadCount : number;
}

export interface ChatRoomFishingSpot {
  id : string;
  name : string;
  image : string;
  onlineCount : number;
}

export interface Sender {
  id : string;
  name : string;
  avatar : string;
  isOnline: boolean;
}

export interface ChatMessageItem {
  id : string;
  sender : Sender;
  content: string;
  timestamp : string;
  isOwn : boolean;
  image? : string;
}

export interface ChatRoomData {
  roomId : number;
  targetId : number;
  targetName : string;
  targetType : string;
  participantCount : number;
  lastMessage: LastMessage | null;
}

export interface LastMessage {
  content: string;
  type: "TALK" | "IMAGE";
  senderNickname: string;
  createdAt: string;
}

export interface ChatMessageResponse {
  messageId: string;
  roomId: number;
  senderId: number;
  senderNickname: string;
  senderProfileImageUrl: string;
  content: string;
  fileUrls: string[];
  isOwn: boolean;
  type: "TALK" | "IMAGE";
  createdAt: string;
}