import { NotificationsScreen } from 'app/features/notifications/screen.native'
import { Stack } from 'expo-router'

export default function NotificationsPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <NotificationsScreen />
    </>
  )
}
