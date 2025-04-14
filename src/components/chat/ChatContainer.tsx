"use client"

import { FishingGroupChat } from "@/components/chat/FishingGroupChat"

export function ChatContainer() {
  return (
    <div
      className="fixed bottom-24 right-6 z-50 w-[76%] sm:w-[450px] h-[660px] max-h-[80vh] bg-white border-2 rounded-xl overflow-hidden flex flex-col"
    >
      <FishingGroupChat />
    </div>
  )
}

