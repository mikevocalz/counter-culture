'use client'

import nextDynamic from 'next/dynamic'

const EventsScreen = nextDynamic(
  () => import('app/features/events/screen').then((m) => m.EventsScreen),
  { ssr: false }
)

export default function EventsClient() {
  return <EventsScreen />
}
