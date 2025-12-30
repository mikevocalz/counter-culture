import dynamic from 'next/dynamic'

const ChatClient = dynamic(() => import('./chat-client'), { ssr: false })

export const dynamic = 'force-dynamic'

export default function ChatPage() {
  return <ChatClient />
}
