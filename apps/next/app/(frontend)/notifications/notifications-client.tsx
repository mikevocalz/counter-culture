'use client'

import nextDynamic from 'next/dynamic'

const NotificationsScreen = nextDynamic(
  () => import('app/features/notifications/screen').then((m) => m.NotificationsScreen),
  { ssr: false }
)

export default function NotificationsClient() {
  return <NotificationsScreen />
}
