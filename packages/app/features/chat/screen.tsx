'use client'

import { View } from 'react-native'
import ScreenScrollView from '@components/ScreenScrollView'
import { InboxView } from '@components/InboxView'
import { BottomNav } from '@components/BottomNav'

export function ChatScreen() {
  return (
    <View className="flex-1 bg-stone-950">
      <ScreenScrollView className="flex-1 pb-24">
        <InboxView />
      </ScreenScrollView>
      <BottomNav />
    </View>
  )
}
