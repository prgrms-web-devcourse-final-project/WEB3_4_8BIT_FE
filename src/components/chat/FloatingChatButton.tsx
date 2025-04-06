"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatContainer } from "@/components/chat/ChatContainer"
import { cn } from "@/lib/utils"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
    }
  }, [isOpen])

  return (
    <>
     {isOpen && <ChatContainer />}

    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg cursor-pointer",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary",
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
        )}
      </Button>
    </div>
    </>
  )
}

