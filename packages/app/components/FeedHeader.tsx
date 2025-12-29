'use client'

import { Header, H1 } from '@expo/html-elements'
import { Pressable, View } from 'react-native'
import { MessageCircle } from 'lucide-react-native'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

export function FeedHeader() {
  return (
    <Header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-3 border-gray-700/50">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable
          accessibilityLabel="User profile"
          className="rounded-full p-2 transition-colors hover:bg-gray-800"
        >
          <Avatar alt="User profile" className="h-8 w-8">
            <AvatarImage src="/user-profile-illustration.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Pressable>

        <H1 className="text-xl font-semibold text-white">Feed</H1>

        <Pressable
          accessibilityLabel="Messages"
          className="relative rounded-full p-2 transition-colors hover:bg-gray-800"
        >
          <MessageCircle size={24} color="#D1D5DB" />
          <View className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-400" />
        </Pressable>
      </View>
    </Header>
  )
}
