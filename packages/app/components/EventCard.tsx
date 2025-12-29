'use client'

import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Motion } from '@legendapp/motion'
import { Bookmark, Heart, Share2 } from 'lucide-react-native'
import { SolitoImage } from 'solito/image'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { cn } from 'app/lib/utils'
import type { EventListing } from 'app/lib/data'

type EventCardProps = {
  event: EventListing
  height?: number
  onPress?: () => void
}

const fallbackColors = ['bg-rose-500', 'bg-emerald-500', 'bg-sky-500', 'bg-amber-500', 'bg-indigo-500']

function formatCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toString()
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#292524',
    backgroundColor: 'rgba(28, 25, 23, 0.6)',
  },
})

export function EventCard({ event, height = 480, onPress }: EventCardProps) {
  const remaining = Math.max(0, event.totalAttendees - event.attendees.length)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Motion.Pressable
      onPress={onPress}
      disabled={!onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
      style={styles.card}
      whileTap={{ scale: 0.98 }}
    >
      <View className="relative w-full" style={{ height }}>
        <Motion.View
          style={StyleSheet.absoluteFillObject}
          initial={{ scale: 1.05 }}
          animate={{ scale: isHovered ? 1.1 : 1.05, translateY: isHovered ? -8 : 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        >
          <SolitoImage src={event.image} alt={event.title} fill contentFit="cover" />
        </Motion.View>
        <View className="absolute inset-0 bg-black/45" />

        <View className="absolute left-4 top-4 flex-row items-center">
          {event.attendees.map((attendee, index) => (
            <Avatar
              key={`${event.id}-attendee-${index}`}
              className={cn('h-9 w-9 border-2 border-stone-950', index > 0 && '-ml-3')}
            >
              <AvatarImage src={attendee.avatar} />
              <AvatarFallback className={cn('h-9 w-9', fallbackColors[index % fallbackColors.length])}>
                <Text className="text-xs font-semibold text-white">
                  {attendee.initials ?? attendee.name.slice(0, 2).toUpperCase()}
                </Text>
              </AvatarFallback>
            </Avatar>
          ))}
          {remaining > 0 ? (
            <View className="ml-2 rounded-full bg-black/40 px-2 py-1">
              <Text className="text-xs font-semibold text-white">+{remaining}</Text>
            </View>
          ) : null}
        </View>

        <View className="absolute right-4 top-4 rounded-2xl bg-stone-950/80 px-4 py-3 text-center">
          <Text className="text-2xl font-semibold text-white leading-none">{event.date}</Text>
          <Text className="mt-1 text-xs font-semibold tracking-widest text-stone-300">{event.month}</Text>
        </View>

        <Motion.View
          className="absolute bottom-0 left-0 right-0 p-5"
          animate={{ translateY: isHovered ? -4 : 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 180 }}
        >
          <View className="self-start rounded-full bg-white/15 px-3 py-1">
            <Text className="text-xs font-semibold uppercase tracking-wide text-white">{event.category}</Text>
          </View>
          <Text className="mt-3 text-2xl font-semibold text-white">{event.title}</Text>
          <Text className="mt-1 text-sm text-white/80">
            {event.time} - {event.totalAttendees} participants
          </Text>

          <View className="mt-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <Heart size={14} color="#f5f5f4" />
                <Text className="text-sm font-semibold text-white">{formatCount(event.likes)}</Text>
              </View>
              <View className="rounded-full bg-white/15 p-2">
                <Share2 size={14} color="#f5f5f4" />
              </View>
              <View className="rounded-full bg-white/15 p-2">
                <Bookmark size={14} color="#f5f5f4" />
              </View>
            </View>

            <View className="rounded-full bg-emerald-400 px-5 py-2">
              <Text className="text-sm font-semibold text-stone-950">${event.price}</Text>
            </View>
          </View>
        </Motion.View>
      </View>
    </Motion.Pressable>
  )
}
