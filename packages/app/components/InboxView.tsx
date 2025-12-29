'use client'

import { useState } from 'react'
import { ScrollView, Text, View, Pressable } from 'react-native'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { ChatView } from '@components/ChatView'
import { cn } from 'app/lib/utils'

const conversations = [
  {
    id: '1',
    user: {
      username: 'sarah_design',
      name: 'Sarah Anderson',
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: 'That sounds amazing! When are you free?',
    timestamp: '2m ago',
    unread: 2,
  },
  {
    id: '2',
    user: {
      username: 'alex_creator',
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: 'Thanks for the feedback on my post!',
    timestamp: '1h ago',
    unread: 1,
  },
  {
    id: '3',
    user: {
      username: 'maya_photo',
      name: 'Maya Rodriguez',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: 'I loved your latest photo series.',
    timestamp: '3h ago',
    unread: 0,
  },
]

export function InboxView() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  if (selectedConversation) {
    const conversation = conversations.find((c) => c.id === selectedConversation)
    if (conversation) {
      return <ChatView conversation={conversation} onBack={() => setSelectedConversation(null)} />
    }
  }

  return (
    <View className="flex-1">
      <View className="border-b border-stone-800 px-4 py-3">
        <Text className="text-base font-semibold text-stone-100">Messages</Text>
        <Text className="text-xs text-stone-500">Recent conversations</Text>
      </View>
      <ScrollView className="flex-1">
        {conversations.map((conversation, index) => (
          <Pressable
            key={conversation.id}
            onPress={() => setSelectedConversation(conversation.id)}
            className={cn(
              'flex-row items-center gap-3 px-4 py-3',
              conversation.unread > 0 && 'bg-emerald-500/5'
            )}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={conversation.user.avatar} />
              <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-stone-100">{conversation.user.name}</Text>
                <Text className="text-xs text-stone-500">{conversation.timestamp}</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-stone-400" numberOfLines={1}>
                  {conversation.lastMessage}
                </Text>
                {conversation.unread > 0 ? (
                  <View className="ml-2 h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                    <Text className="text-[10px] font-semibold text-stone-950">
                      {conversation.unread}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </Pressable>
        ))}
        <View className="h-20" />
      </ScrollView>
    </View>
  )
}
