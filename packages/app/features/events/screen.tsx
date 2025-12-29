'use client'

import { Platform, View, useWindowDimensions } from 'react-native'
import ScreenScrollView from '@components/ScreenScrollView'
import { BottomNav } from '@components/BottomNav'
import { EventCard } from '@components/EventCard'
import { eventListings } from 'app/lib/data'
import { useRouter } from 'solito/navigation'
import { cn } from 'app/lib/utils'
import { LegendList, type LegendListRenderItemProps } from '@legendapp/list'
import { Motion } from '@legendapp/motion'

export function EventsScreen() {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const cardHeight = width >= 768 ? 520 : 420
  const containerClass =
    Platform.OS === 'web' ? 'mx-auto w-full max-w-3xl' : 'w-full'

  return (
    <View className="flex-1 bg-stone-950">
      <ScreenScrollView className="flex-1 pb-24">
        <View className={cn(containerClass, 'px-4 py-6')}>
          <LegendList
            data={eventListings}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }: LegendListRenderItemProps<(typeof eventListings)[number]>) => (
              <Motion.View 
                className="mb-5"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  type: 'spring',
                  damping: 20,
                  stiffness: 100,
                  delay: index * 0.1
                }}
              >
                <EventCard
                  event={item}
                  height={cardHeight}
                  onPress={() => router.push(`/events/${item.id}`)}
                />
              </Motion.View>
            )}
            scrollEnabled={false}
            estimatedItemSize={cardHeight + 24}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScreenScrollView>
      <BottomNav />
    </View>
  )
}
