import { ChatScreen } from 'app/features/chat/screen.native'
import { Stack } from 'expo-router'

export default function ChatPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <ChatScreen />
    </>
  )
}
