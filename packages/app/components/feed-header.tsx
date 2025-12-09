"use client"
import { MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"

export function FeedHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-gray-700/50">
      <div className="flex items-center justify-between px-4 py-3">
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <Avatar alt="User profile" className="h-8 w-8">
            <AvatarImage src="/user-profile-illustration.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>

        <h1 className="text-xl font-semibold text-white">Feed</h1>

        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors relative">
          <MessageCircle size={24} color="#D1D5DB" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-400 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}
