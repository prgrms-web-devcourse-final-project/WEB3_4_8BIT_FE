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