'use client'

import nextDynamic from 'next/dynamic'

const ProfileScreen = nextDynamic(
  () => import('app/features/profile/screen').then((m) => m.ProfileScreen),
  { ssr: false }
)

export default function ProfileClient() {
  return <ProfileScreen />
}
