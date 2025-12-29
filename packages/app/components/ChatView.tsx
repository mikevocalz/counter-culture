'use client'

import { useState } from 'react'
import { ScrollView, Text, TextInput, View, Pressable } from 'react-native'
import { ArrowLeft, Send } from 'lucide-react-native'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { cn } from 'app/lib/utils'

interface Message {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp: string
}

interface ChatViewProps {
  conversation: {
    id: string
    user: {
      username: string
      name: string
      avatar: string
    }
  }
  onBack: () => void
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! Did you see my latest post?',
    sender: 'other',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: 'Yes! The sunset shots are incredible.',
    sender: 'user',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    text: "Thanks! I've been working on my composition.",
    sender: 'other',
    timestamp: '10:33 AM',
  },
]

export function ChatView({ conversation, onBack }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue('')
  }

  return (
    <View className="flex-1">
      <View className="flex-row items-center gap-3 border-b border-stone-800 px-4 py-3">
        <Pressable onPress={onBack} className="h-9 w-9 items-center justify-center rounded-full bg-stone-900/60">
          <ArrowLeft size={18} color="#e7e5e4" />
        </Pressable>
        <Avatar className="h-10 w-10">
          <AvatarImage src={conversation.user.avatar} />
          <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-stone-100">{conversation.user.name}</Text>
          <Text className="text-xs text-stone-500">@{conversation.user.username}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="gap-3 py-4">
          {messages.map((message) => (
            <View
              key={message.id}
              className={cn(
                'flex-row',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'other' ? (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={conversation.user.avatar} />
                  <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ) : null}
              <View
                className={cn(
                  'max-w-[75%] rounded-2xl px-4 py-2',
                  message.sender === 'user'
                    ? 'bg-emerald-500/20'
                    : 'bg-stone-900/70'
                )}
              >
                <Text className="text-sm text-stone-100">{message.text}</Text>
                <Text className="mt-1 text-[10px] text-stone-500">{message.timestamp}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row items-center gap-2 border-t border-stone-800 px-4 py-3">
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Message..."
          placeholderTextColor="#78716c"
          className="flex-1 rounded-2xl bg-stone-900/70 px-4 py-2 text-sm text-stone-100"
        />
        <Pressable
          onPress={handleSend}
          disabled={!inputValue.trim()}
          className={cn(
            'h-10 w-10 items-center justify-center rounded-2xl',
            inputValue.trim() ? 'bg-emerald-500' : 'bg-stone-800'
          )}
        >
          <Send size={16} color={inputValue.trim() ? '#0c0a09' : '#a8a29e'} />
        </Pressable>
      </View>
    </View>
  )
}
