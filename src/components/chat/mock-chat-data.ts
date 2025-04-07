import {ChatMessageItem, ChatRoomFishingSpot} from "@/types/Chat.types";

export const mockCommunityMessages : ChatMessageItem[] = [
  {
    id: "msg-1",
    sender: {
      id: "user-1",
      name: "바다사랑",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    content: "안녕하세요! 오늘 기장 앞바다 조황 어떤가요?",
    timestamp: "2023-11-01T09:30:00Z",
    isOwn: false,
  },
  {
    id: "msg-2",
    sender: {
      id: "user-2",
      name: "낚시왕",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
    },
    content: "오늘 아침에 다녀왔는데 참돔이 잘 나오더라구요. 크릴 미끼로 5마리 정도 잡았습니다.",
    timestamp: "2023-11-01T09:32:00Z",
    isOwn: false,
  },
  {
    id: "msg-3",
    sender: {
      id: "user-1",
      name: "바다사랑",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    content: "오~ 정보 감사합니다! 혹시 어느 포인트에서 잡으셨나요?",
    timestamp: "2023-11-01T09:35:00Z",
    isOwn: false,
  },
  {
    id: "msg-4",
    sender: {
      id: "current-user",
      name: "나",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    content: "저도 이번 주말에 기장 가려고 했는데 좋은 정보네요!",
    timestamp: "2023-11-01T09:40:00Z",
    isOwn: true,
  },
  {
    id: "msg-5",
    sender: {
      id: "user-2",
      name: "낚시왕",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
    },
    content: "연화리 쪽 방파제에서 잡았어요. 아침 물때가 좋았습니다.",
    timestamp: "2023-11-01T09:42:00Z",
    isOwn: false,
    image: "/images/test.png",
  },
]

export const mockSpotMessages : ChatMessageItem[] = [
  {
    id: "spot-msg-1",
    sender: {
      id: "user-3",
      name: "갯바위사랑",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    content: "지금 기장 학리 방파제 현장입니다. 감성돔 입질이 좋네요!",
    timestamp: "2023-11-01T10:15:00Z",
    isOwn: false,
    image: "/images/test.png",
  },
  {
    id: "spot-msg-2",
    sender: {
      id: "user-4",
      name: "도미헌터",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
    },
    content: "어떤 미끼 쓰고 계신가요?",
    timestamp: "2023-11-01T10:20:00Z",
    isOwn: false,
  },
  {
    id: "spot-msg-3",
    sender: {
      id: "user-3",
      name: "갯바위사랑",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    content: "크릴이랑 청갯지렁이 번갈아가며 쓰고 있어요. 둘 다 잘 물어요!",
    timestamp: "2023-11-01T10:22:00Z",
    isOwn: false,
  },
  {
    id: "spot-msg-4",
    sender: {
      id: "current-user",
      name: "나",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    content: "저도 지금 가는 중인데 자리 많이 차있나요?",
    timestamp: "2023-11-01T10:25:00Z",
    isOwn: true,
  },
  {
    id: "spot-msg-5",
    sender: {
      id: "user-3",
      name: "갯바위사랑",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    content: "아직 자리 여유 있어요. 빨리 오세요!",
    timestamp: "2023-11-01T10:27:00Z",
    isOwn: false,
  },
]

export const fishingSpots : ChatRoomFishingSpot[] = [
  {
    id: "spot-1",
    name: "기장 학리 방파제",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 15,
  },
  {
    id: "spot-2",
    name: "부산 다대포 방파제",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 8,
  },
  {
    id: "spot-3",
    name: "포항 구룡포 항",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 12,
  },
  {
    id: "spot-4",
    name: "속초 영랑호",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 5,
  },
  {
    id: "spot-5",
    name: "제주 서귀포 앞바다",
    image: "/placeholder.svg?height=40&width=40",
    onlineCount: 20,
  },
]

