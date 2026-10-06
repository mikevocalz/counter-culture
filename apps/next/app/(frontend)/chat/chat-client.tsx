'use client'

import nextDynamic from 'next/dynamic'

const ChatScreen = nextDynamic(
  () => import('app/features/chat/screen').then((m) => m.ChatScreen),
  { ssr: false }
)

export default function ChatClient() {
  return <ChatScreen />
}
