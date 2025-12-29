'use client'

import { Platform, Pressable, Text, View } from 'react-native'
import { ArrowLeft, Calendar, Clock, Heart, MapPin, Share2, Users } from 'lucide-react-native'
import { SolitoImage } from 'solito/image'
import ScreenScrollView from '@components/ScreenScrollView'
import { BottomNav } from '@components/BottomNav'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { eventListings } from 'app/lib/data'
import { cn } from 'app/lib/utils'
import { useRouter } from 'solito/navigation'

type EventDetailScreenProps = {
  eventId: string
}

const perks = ['Access to curated venues', 'No cover charges', 'Exclusive drink specials', 'Event wristband']
const fallbackColors = ['bg-rose-500', 'bg-emerald-500', 'bg-sky-500', 'bg-amber-500', 'bg-indigo-500']

export function EventDetailScreen({ eventId }: EventDetailScreenProps) {
  const router = useRouter()
  const event = eventListings.find((item) => item.id === eventId)
  const containerClass =
    Platform.OS === 'web' ? 'mx-auto w-full max-w-3xl' : 'w-full'

  if (!event) {
    return (
      <View className="flex-1 bg-stone-950">
        <View className="flex-1 items-center justify-center gap-3 px-6">
          <Text className="text-lg font-semibold text-stone-100">Event not found</Text>
          <Pressable
            onPress={() => router.back()}
            className="rounded-full bg-stone-100 px-4 py-2"
          >
            <Text className="text-sm font-semibold text-stone-950">Go back</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  const dateLabel = `${event.month} ${event.date}`
  const remaining = Math.max(0, event.totalAttendees - event.attendees.length)

  return (
    <View className="flex-1 bg-stone-950">
      <ScreenScrollView className="flex-1 pb-24">
        <View className="border-b border-stone-800 bg-stone-950/90">
          <View
            className={cn(containerClass, 'flex-row items-center gap-3 px-4 py-3')}
          >
            <Pressable
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full bg-stone-900/60"
            >
              <ArrowLeft size={18} color="#e7e5e4" />
            </Pressable>
            <Text className="text-base font-semibold text-stone-100">Event</Text>
          </View>
        </View>

        <View className="relative h-72 w-full">
          <SolitoImage src={event.image} alt={event.title} fill contentFit="cover" />
          <View className="absolute inset-0 bg-black/40" />
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-2xl font-semibold text-white">{event.title}</Text>
            <Text className="mt-1 text-sm text-white/80">{event.location}</Text>
          </View>
        </View>

        <View className={cn(containerClass, 'px-4 py-6')}>
          <View className="flex-row items-start justify-between">
            <Text className="flex-1 text-3xl font-semibold text-stone-100">{event.title}</Text>
            <View className="flex-row gap-2">
              <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-stone-900/70">
                <Share2 size={18} color="#e7e5e4" />
              </Pressable>
              <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-stone-900/70">
                <Heart size={18} color="#e7e5e4" />
              </Pressable>
            </View>
          </View>

          <View className="mt-4 flex-row flex-wrap gap-3">
            <View className="flex-row items-center gap-2 rounded-full bg-stone-900/70 px-3 py-2">
              <Calendar size={16} color="#d6d3d1" />
              <Text className="text-sm text-stone-200">{dateLabel}</Text>
            </View>
            <View className="flex-row items-center gap-2 rounded-full bg-stone-900/70 px-3 py-2">
              <Clock size={16} color="#d6d3d1" />
              <Text className="text-sm text-stone-200">{event.time}</Text>
            </View>
            <View className="flex-row items-center gap-2 rounded-full bg-stone-900/70 px-3 py-2">
              <MapPin size={16} color="#d6d3d1" />
              <Text className="text-sm text-stone-200">{event.location}</Text>
            </View>
            <View className="flex-row items-center gap-2 rounded-full bg-stone-900/70 px-3 py-2">
              <Users size={16} color="#d6d3d1" />
              <Text className="text-sm text-stone-200">{event.totalAttendees} attending</Text>
            </View>
          </View>

          <View className="mt-6 rounded-2xl border border-stone-800 bg-stone-900/60 p-4">
            <Text className="text-lg font-semibold text-stone-100">About this event</Text>
            <Text className="mt-2 text-sm leading-relaxed text-stone-300">
              Join the city's most creative crowd for an evening of conversation, culture, and curated experiences.
              Expect immersive spaces, live sets, and exclusive perks reserved for attendees.
            </Text>
          </View>

          <View className="mt-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-stone-100">Who's going</Text>
              <Text className="text-sm text-stone-400">{event.totalAttendees} attending</Text>
            </View>

            <View className="mt-4 flex-row items-center">
              {event.attendees.map((attendee, index) => (
                <Avatar
                  key={`${event.id}-detail-attendee-${index}`}
                  className={cn('h-10 w-10 border-2 border-stone-950', index > 0 && '-ml-3')}
                >
                  <AvatarImage src={attendee.avatar} />
                  <AvatarFallback className={cn('h-10 w-10', fallbackColors[index % fallbackColors.length])}>
                    <Text className="text-xs font-semibold text-white">
                      {attendee.initials ?? attendee.name.slice(0, 2).toUpperCase()}
                    </Text>
                  </AvatarFallback>
                </Avatar>
              ))}
              {remaining > 0 ? (
                <View className="ml-3 rounded-full bg-stone-900/70 px-3 py-2">
                  <Text className="text-xs font-semibold text-stone-200">+{remaining} more</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View className="mt-6 rounded-2xl border border-stone-800 bg-stone-900/60 p-4">
            <Text className="text-lg font-semibold text-stone-100">Tickets</Text>
            <View className="mt-4 flex-row items-center justify-between">
              <View>
                <Text className="text-3xl font-semibold text-stone-100">${event.price}</Text>
                <Text className="text-sm text-stone-400">Early bird pricing</Text>
              </View>
              <Pressable className="rounded-full bg-emerald-400 px-5 py-2">
                <Text className="text-sm font-semibold text-stone-950">Get tickets</Text>
              </Pressable>
            </View>
            <View className="mt-4 gap-2">
              {perks.map((perk) => (
                <View key={perk} className="flex-row items-center gap-2">
                  <View className="h-2 w-2 rounded-full bg-emerald-400" />
                  <Text className="text-sm text-stone-300">{perk}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScreenScrollView>
      <BottomNav />
    </View>
  )
}

export default EventDetailScreen
