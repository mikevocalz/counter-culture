import nextDynamic from 'next/dynamic'

const ChatClient = nextDynamic(() => import('./chat-client'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function ChatPage() {
  return <ChatClient />
}
