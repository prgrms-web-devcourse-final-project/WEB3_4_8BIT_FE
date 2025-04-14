// 채팅 관련 API 클래스
import {apiInstance} from "@/lib/api/apiInstance";
import {ChatMessageResponse, ChatRoomData} from "@/types/Chat.types";
import {APIResponse} from "@/lib/api/fishAPI";

export interface GetMessageResponse {
  content: ChatMessageResponse[];
  nextCursorId: string | null;
}

export class ChatAPI {
  public static async getChatRooms() : Promise<ChatRoomData[]>{
    try {
      const response = await apiInstance.get<APIResponse<ChatRoomData[]>>('/chats');
      return response.data.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  public static async getRoomMessages(roomId : number, messageId? : number) : Promise<GetMessageResponse> {
    try {
      const response = await apiInstance.get<APIResponse<{ content : ChatMessageResponse[], nextCursorId : null | string}>>(`/chats/${roomId}/messages`,{
        params : {
          id : messageId,
          size : 10
        }
      })
      return {
        content: response.data.data.content,
        nextCursorId: response.data.data.nextCursorId
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

