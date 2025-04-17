"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatContainer } from "@/components/chat/ChatContainer"
import { cn } from "@/lib/utils"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
     {isOpen &&
       <div className="fixed inset-0 z-9999 flex items-center scjustify-center bg-black/50">
         <ChatContainer />
       </div>
     }

    <div className="fixed bottom-6 right-6 z-9999">
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
          </div>
        )}
      </Button>
    </div>
    </>
  )
}

