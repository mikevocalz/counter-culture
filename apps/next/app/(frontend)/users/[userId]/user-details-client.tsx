'use client'

import nextDynamic from 'next/dynamic'

const UserDetailScreen = nextDynamic(
  () => import('app/features/user/detail-screen').then((m) => m.UserDetailScreen),
  { ssr: false }
)

export default function UserDetailsClient() {
  return <UserDetailScreen />
}
